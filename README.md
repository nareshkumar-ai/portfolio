# Naresh Kumar - Personal Developer Portfolio

A modern, high-performance, dark-mode personal portfolio website for **Naresh Kumar**, positioning him as a **Java Full Stack Developer / Software Developer with strong competencies in Software Testing and AI/ML**.

---

## 🌟 Key Highlights

- **Dark Modern Developer Aesthetic**: Futuristic glassmorphism, glowing gradients, clean developer typography (JetBrains Mono & Plus Jakarta Sans).
- **Responsive & Accessible**: Seamless across Ultra-Wide monitors, standard laptops, tablets, and smartphones.
- **Zero Build Dependencies**: Pure HTML5, modern CSS3, and vanilla ES6+ JavaScript. No npm install or heavy build steps needed—runs right out of the box!
- **Recruiter-Focused & Honest**: Accurate representation of fresher skills, academic achievements from AMET University, and real machine learning/testing competencies without fake percentages or invented work history.

---

## 📁 Project File Structure

```
├── index.html                 # Semantic HTML5 markup, OpenGraph metadata, all sections
├── css/
│   └── style.css              # Design tokens, CSS variables, glassmorphism, responsive queries
├── js/
│   └── app.js                 # Smooth scroll, active nav spy, architecture inspector, form validation
├── assets/
│   └── resume/                # Directory for your resume PDF
│       └── README.txt         # Resume placement instructions
└── README.md                  # Customization & deployment guide
```

---

## 🚀 How to Run Locally

1. **Direct Browser Launch**:
   - Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Firefox, or Safari.

2. **Or via Live Server (VS Code / Antigravity)**:
   - If using VS Code or any static server extension, right click `index.html` and select **Open with Live Server**.

---

## 🛠️ Easy Customization Steps

### 1. Adding Your Resume PDF
- Place your PDF resume in the `assets/resume/` folder with the file name:
  `Naresh_Kumar_Resume.pdf`
- Both the header **Resume** button and hero/banner **Download Resume** buttons will automatically link to and download this file.

### 2. Updating Your Social Profiles & Email
Open `index.html` and search for:
- `mailto:naresh.developer@example.com` ➔ Replace with your actual email address.
- `https://github.com` ➔ Replace with your actual GitHub profile link.
- `https://linkedin.com` ➔ Replace with your actual LinkedIn profile link.

### 3. Replacing Project Repositories
In `index.html` under `<section id="projects">`:
- Update the `<a href="https://github.com">` links on each project card to point directly to your specific GitHub repositories.
- You can also update the **Full Stack Java Application** card with your specific project details (e.g., student management system, e-commerce backend, patient portal, etc.) whenever ready.

---

## 🌐 Free Deployment Options

### Option 1: GitHub Pages (Recommended)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** ➔ **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your website will be live at `https://<your-username>.github.io/`.

### Option 2: Netlify
1. Go to [Netlify.com](https://www.netlify.com/) and drag and drop this entire folder onto the Netlify dashboard.
2. It will deploy instantly with an SSL-secured live URL.

### Option 3: Vercel
1. Run `npx vercel` or connect your GitHub repository in the Vercel dashboard.
