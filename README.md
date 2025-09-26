# GitHub API Markdown Content

## Overview
**GitHub API Markdown Content** is a web application that allows users to **create, edit, and manage Markdown content directly on GitHub repositories** using the GitHub API. The project focuses on providing a smooth user experience for content management while handling complex state management, folder structures, and publishing workflows.

---

## Features

- **Create GitHub Folder:** Dynamically create folders in your GitHub repository.
- **Markdown File Creation:** Generate new Markdown files (`.md`) with custom content.
- **Edit & Update:** Edit existing Markdown files and update content in real-time.
- **Publish to GitHub:** Push newly created or updated files directly to your repository.
- **State Management:** Efficiently manage UI and API state using React/Redux Toolkit or Context API.
- **Error Handling:** Comprehensive error handling for API failures or conflicts.
- **User Authentication:** OAuth integration with GitHub to securely access repositories.

---

## Challenges Solved

1. **State Management:**  
   Managing the state of multiple Markdown files, folders, and API responses while keeping the UI responsive and consistent.

2. **Folder & File Management via API:**  
   GitHub API requires careful handling of paths, commits, and SHA hashes when creating or updating files.  

3. **Content Updates & Conflict Resolution:**  
   Handling edits without overwriting existing changes and resolving potential merge conflicts programmatically.

4. **Dynamic Publishing:**  
   Automating file creation and updates directly to GitHub repositories without using the web interface.

---

## Tech Stack

- **Frontend Framework:** [React](https://reactjs.org/) / [Next.js](https://nextjs.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) or React Context API
- **API:** [GitHub REST API](https://docs.github.com/en/rest)
- **Styling:** TailwindCSS / CSS Modules
- **Authentication:** GitHub OAuth

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/github-api-markdown-content.git
   cd github-api-markdown-content
