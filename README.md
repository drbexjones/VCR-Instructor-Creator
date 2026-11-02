# VCR Instructor Assignment Creator

**Visible Clinical Reasoning (VCR)**  
Developed by **Rebecca L. Jones, EdD, CCC-SLP**  
Associate Professor and Director of Clinical Education  
Oklahoma Baptist University

## About This Tool

The VCR Instructor Assignment Creator is a free, browser-based educational tool that allows faculty to create clinical learning assignments using the Visible Clinical Reasoning (VCR) instructional design framework.

VCR is designed to encourage students to investigate clinical problems, reconsider decisions, and identify meaningful uncertainty. It is intended to support learning and the development of clinical reasoning, not to independently assess or verify clinical competency.

The tool works with the separate VCR Student Learning Workspace, where students complete written responses to instructor-created scenarios.

## The VCR Framework

VCR organizes written clinical learning activities into three components:

**Commit — What would you do, and why?**  
Students investigate a clinical problem, make a defensible decision, and explain their rationale using relevant clinical concepts, case information, and available resources.

**Complicate — What challenges your decision?**  
Students examine a competing approach or case-specific challenge, reconsider their initial recommendation, and explain whether they would maintain, modify, or change it.

**Calibrate — What do you still need to know?**  
Students identify consequential missing patient information or a gap in their own clinical knowledge, describe how they would investigate it, and explain how the findings could influence their decisions.

## How Instructors Use the Tool

1. Enter an assignment title and specific learning objective.
2. Write or paste a realistic clinical scenario, typically one paragraph of approximately 75–150 words.
3. Ensure the scenario provides enough information for a defensible decision, presents or allows exploration of a meaningful challenge, and leaves room for consequential uncertainty.
4. Specify permitted learning resources and expectations for AI use.
5. Customize the Complicate and Calibrate prompts if needed.
6. Generate a scenario-specific student assignment link.
7. Share that link with students through the learning management system.

Faculty may develop their own clinical scenarios. Using an AI tool to generate scenarios is optional.

## Student Learning Workspace

The VCR Student Learning Workspace is a separate website where students can:

- Read the clinical scenario and learning objective.
- Complete Commit, Complicate, and Calibrate responses.
- Save and export their work for submission through Canvas or another learning management system.
- Revisit their responses and revise their work following instructor feedback.

The student website does not contain a link to the instructor assignment creator.

## Feedback and Revision

VCR encourages a learning-centered approach to feedback and grading.

Each CCC component may be evaluated using:

| Designation | Score | Description |
|---|---|---|
| Complete | 2 | Meaningfully addresses the component with relevant explanation and rationale. |
| Revise | 1 | Addresses the component but requires further investigation, clarification, or reconsideration. |
| Incomplete | 0 | Omits the component or does not meaningfully address the task. |

Students whose initial submission scores below 6/6 are expected to revise components that did not receive a Complete designation. The revised submission determines the assignment grade.

Suggested final grade conversion:

- **5–6 points:** 100% of the assignment's allotted points.
- **4 points:** 80% of the assignment's allotted points.
- **0–3 points:** Additional remediation required; unsuccessful remediation results in no assignment credit.

This is a suggested instructional protocol, not an automated grading feature of the website. Faculty implement feedback, scoring, and grading through their learning management system.

Written assignment scores should not be interpreted as verification of independent clinical reasoning or competency. Those outcomes require appropriately designed assessments.

## GitHub Pages Setup

To publish the Instructor Assignment Creator:

1. Create a public GitHub repository named `VCR-Instructor-Creator`.
2. Upload `index.html`, `instructor.js`, `styles.css`, and any supporting files to the repository root.
3. Navigate to **Settings → Pages**.
4. Select **Deploy from a branch**, then choose `main` and `/(root)`.
5. Publish the separate student website and enter its URL in the **Student workspace URL** field.
6. Generate and test an assignment link before sharing it with students.

Default student workspace address:

https://drbexjones.github.io/VCR-Student-Workspace/

## Privacy and Technical Limitations

The Instructor Assignment Creator and Student Learning Workspace are publicly accessible websites. They do not provide password-protected instructor or student accounts.

Assignment links encode clinical scenarios and instructions in the URL. Do not include protected patient information, confidential student information, or other sensitive data.

Student responses are not automatically collected by the instructor website. Students must export and submit their work through the designated learning management system.

Very long clinical scenarios may exceed practical URL length limits. The tool provides a downloadable assignment file as an alternative.

## Attribution and Scholarly Use

The Visible Clinical Reasoning (VCR) framework was developed by Rebecca L. Jones, EdD, CCC-SLP.

Educators are encouraged to use the framework and accompanying tools to design learning-centered clinical assignments. When referencing VCR in scholarly presentations, publications, or professional development materials, please acknowledge its developer.

**Suggested attribution:**  
Jones, R. L. (2026). *Visible Clinical Reasoning (VCR): Commit, Complicate, Calibrate* [Instructional design framework].

**Tool attribution:**  
Jones, R. L. (2026). *VCR Instructor Assignment Creator* [Web application]. https://drbexjones.github.io/VCR-Instructor-Creator/

## License

Refer to the repository's `LICENSE` file for the terms governing reuse and redistribution of the software. Access to the hosted tool does not, by itself, establish restrictions on reuse of source code distributed under an open-source license.
