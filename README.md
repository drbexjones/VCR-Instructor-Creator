# VCR Instructor Assignment Creator

Faculty-only interface (public website, but **not linked from the student site**). Generates links to a separate student-only VCR Learning Workspace.

## Publish
1. Create a public GitHub repository named `VCR-Instructor-Creator`.
2. Upload the files in this folder to the repository root.
3. Settings → Pages → Deploy from a branch → main → /(root).
4. Publish the student website separately, then enter its actual URL in the **Student workspace URL** field.
5. Create an assignment, generate the link, test it, and share **only the student link** in Canvas.

Default student URL is `https://drbexjones.github.io/VCR-Student-Workspace/`; change it if you use a different repository name.

**Important:** These are separate public websites, not a secure faculty login. Students who discover the instructor site's URL can access it. This separation hides the instructor link from the student interface, but is not access control. Do not include protected patient or student data.

The link encodes the scenario and instructions in the URL. For very long scenarios, use the downloadable JSON assignment file.

Visible Clinical Reasoning framework developed by Rebecca L. Jones, EdD, CCC-SLP, Oklahoma Baptist University.
