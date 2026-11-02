'use strict';
const $ = id => document.getElementById(id);
const components = ['commit','complicate','calibrate'];
const defaults = {
  complicate: 'Examine a reasonable competing approach or a case detail that challenges your decision. Explain whether you would maintain, modify, or change your recommendation and why.',
  calibrate: 'Identify consequential missing patient information or a gap in your clinical knowledge. Explain how you would investigate it and how the answer could influence decisions.'
};
const example = {
 title:'Adult dysphagia: Oral intake decision',
 objective:'Investigate how clinical swallowing information, patient preferences, and uncertainty inform oral intake recommendations.',
 scenario:'A 72-year-old adult recovering from a stroke is alert and wants to continue eating and drinking by mouth. During a bedside swallowing evaluation, the patient coughs after several thin-liquid trials and reports that pills sometimes feel stuck. The patient has no documented instrumental swallowing study from this admission. Nursing reports reduced oral intake over the last two days, and the medical team asks for immediate diet recommendations. Consider what can and cannot be concluded from these findings before making a recommendation.',
 resources:'Course materials and peer-reviewed literature; AI tools may support investigation. Verify clinical claims and follow course AI disclosure requirements.',
 complicate:'Consider how a competing management option or the patient’s expressed preferences challenges your initial approach. Would you maintain, modify, or change it?',
 calibrate:'What consequential assessment information is missing? How would you obtain it, and how might different findings change your recommendation?'
};

function normalize(a){if(!a || typeof a!=='object')throw Error('Invalid assignment file.');const clean={};for(const k of ['title','objective','scenario','resources','complicate','calibrate'])clean[k]=String(a[k]??'').slice(0,15000);if(!clean.title.trim()||!clean.objective.trim()||!clean.scenario.trim())throw Error('Assignment must include title, objective, and scenario.');return clean;}
function encode(data){const bytes=new TextEncoder().encode(JSON.stringify(data));let binary='';for(let i=0;i<bytes.length;i++)binary+=String.fromCharCode(bytes[i]);return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function decode(s){const b64=s.replace(/-/g,'+').replace(/_/g,'/');const binary=atob(b64);const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}

function getLink(a){const url=new URL($('studentSiteUrl').value.trim());if(url.protocol!=='https:'&&url.protocol!=='http:')throw Error('Enter a valid student website URL.');url.hash='a='+encode(a);return url.href;}
function fromForm(){return normalize({title:$('title').value,objective:$('objective').value,scenario:$('scenario').value,resources:$('resources').value,complicate:$('complicatePrompt').value,calibrate:$('calibratePrompt').value});}
function fillForm(a){for(const [k,id] of Object.entries({title:'title',objective:'objective',scenario:'scenario',resources:'resources',complicate:'complicatePrompt',calibrate:'calibratePrompt'}))$(id).value=a[k]||'';}

function download(name,contents,type){const url=URL.createObjectURL(new Blob([contents],{type}));const link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function slug(s){return (s||'assignment').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,45)||'assignment';}
$('example').addEventListener('click',()=>fillForm(example));
$('facultyForm').addEventListener('submit',e=>{e.preventDefault();try{const a=fromForm();$('shareLink').value=getLink(a);$('linkPanel').hidden=false;const n=$('shareLink').value.length;$('linkWarning').textContent=n>3500?'This link is long ('+n+' characters) and may not work in all systems. Use the downloadable assignment file instead.':'Link ready ('+n+' characters). Test the link before distributing it.';}catch(err){alert(err.message);}});
$('copyLink').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('shareLink').value);$('linkWarning').textContent='Link copied. Test it before distributing.';}catch(e){$('shareLink').select();$('linkWarning').textContent='Select and copy the link manually.';}});
$('downloadAssignment').addEventListener('click',()=>{try{const a=fromForm();download(slug(a.title)+'-assignment.json',JSON.stringify({format:'vcr-workspace-assignment',version:1,assignment:a},null,2),'application/json');}catch(e){alert(e.message);}});
$('facultyPreview').addEventListener('click',()=>{try{window.open(getLink(fromForm()),'_blank','noopener,noreferrer');}catch(e){alert(e.message);}});


// Optional AI scenario prompt: copies instructions only; no external AI call.
function makeScenarioPrompt(){
  const objective=$('objective').value.trim() || '[INSERT LEARNING OBJECTIVE]';
  const topic=$('aiTopic').value.trim() || '[INSERT CLINICAL TOPIC]';
  const level=$('aiLevel').value;
  const prior=$('aiPrior').value.trim() || '[OPTIONAL: CONCEPTS ALREADY TAUGHT]';
  return `Create a realistic, one-paragraph clinical scenario (75–150 words) for a graduate speech-language pathology learning assignment using Visible Clinical Reasoning (VCR), an instructional design framework developed by Rebecca L. Jones, EdD, CCC-SLP. VCR supports learning; it is not a competency assessment.

Clinical topic: ${topic}
Learning objective: ${objective}
Learner readiness: ${level}
Relevant concepts already taught: ${prior}

Scenario requirements:
1. Present a realistic clinical situation aligned with the learning objective. Include enough case-specific information to investigate and justify a defensible clinical decision (COMMIT).
2. Include a meaningful challenge, conflicting detail, or plausible competing approach that invites reconsideration (COMPLICATE). The challenge may instead be introduced in a separate assignment prompt.
3. Leave consequential information unknown so students can identify what they need to investigate (CALIBRATE). Students may also identify a gap in their own clinical knowledge.
4. Match the learner's readiness, avoid unnecessary details and artificial dilemmas, and do not require an unsafe recommendation.
5. Do not invent citations, research findings, or guidelines.

Output only the clinical scenario paragraph, followed by a separate brief INSTRUCTOR-ONLY verification note identifying any clinical details requiring review. Do not generate student CCC instructions or an answer key. The instructor will verify and edit the scenario before use.`;
}
$('copyScenarioPrompt').addEventListener('click', async () => {
  const prompt=makeScenarioPrompt();
  const status=$('scenarioPromptStatus');
  try {
    await navigator.clipboard.writeText(prompt);
    status.textContent='Prompt copied. Paste it into your preferred AI tool, then review and paste the resulting clinical paragraph into the Clinical Scenario box above.';
  } catch(err) {
    status.textContent='Automatic copying was blocked. Select and copy the prompt in the box below.';
    let box=$('scenarioPromptFallback');
    if(!box){box=document.createElement('textarea');box.id='scenarioPromptFallback';box.rows=9;box.readOnly=true;status.after(box);}
    box.value=prompt;box.focus();box.select();
  }
});
