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
