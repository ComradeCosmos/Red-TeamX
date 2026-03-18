<div align="center">

# 🔴 redteamX

**The elite cybersecurity collective of PDEU (Pandit Deendayal Energy University).**

![Next JS](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SQLite](https://img.shields.io/badge/SQLite%203-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-%2300C7B7.svg?style=for-the-badge&logo=netlify&logoColor=white)

</div>

## 🌐 About redteamX

**redteamX** is the premier student-led cybersecurity club at **Pandit Deendayal Energy University (PDEU)**. We are a collective of ethical hackers, security researchers, and cyber enthusiasts dedicated to offensive security, penetration testing, and red-teaming methodologies. Our mission is to cultivate a robust cybersecurity culture by providing hands-on experience in vulnerability assessment, exploit development, and secure coding practices. 

This repository houses the source code for our official web portal—a digital manifestation of our club's ethos. It transcends a mere informational site by integrating an interactive, terminal-based user experience that immerses visitors in a simulated cyber environment from the moment they load the page.

## ✨ Core Features

- **Virtual File System (VFS) Terminal**: A fully interactive terminal component embedded on the homepage. Users can navigate a simulated directory structure and execute commands, bridging the gap between a standard website and a command-line interface.
- **Advanced Cyberpunk Aesthetics**: A sleek dark-mode UI with pulsing neon accents (`#ff2020`), dynamic glowing SVG geometry, and continuous background animations that react to user engagement.
- **Custom Hardware Cursor**: A bespoke, see-through cursor implemented with precision CSS blend modes (`mix-blend-mode: difference`) to ensure it never obscures critical text while maintaining a high-tech feel.
- **Persistent Data Store**: A robust SQLite backend handling data transactions and state persistence seamlessly across user sessions.
- **Dynamic Loading Sequences**: Custom `Loader` components that mimic authentic terminal cold-boot sequences, setting the tone before the main interface is revealed.
- **Responsive & Accessible Design**: Engineered to provide a flawless, high-performance experience across both desktop and mobile platforms.

## 🛠 Comprehensive Tech Stack

This project is built using a modern, performance-focused stack tailored for the React ecosystem:

### Core Framework & UI
- **[Next.js](https://nextjs.org/) (v16.1.6)**: Utilizing the App Router paradigm for robust server-side rendering, routing, and API handling.
- **[React](https://react.dev/) & [React DOM](https://react.dev/) (v19.2.3)**: The foundational library for building our component-driven user interface.

### Database & Data Persistence
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (v12.8.0)**: A high-performance, synchronous SQLite3 wrapper for Node.js. It powers our fast, localized database operations (`data.db`) directly on the server without the overhead of an external database connection.

### Styling & Typography
- **Vanilla CSS3 (Global & Modules)**: Extensive use of custom CSS properties (`var(--font-mono)`), advanced animations (`@keyframes`), and structural layouts (`flexbox`, `grid`) to achieve our bespoke cyberpunk design without relying on heavy UI frameworks.
- **[next/font/google](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)**: Automatic font optimization and loading for our custom stack:
  - `DM Mono`: For technical phrasing and terminal outputs.
  - `Inter`: For highly legible, primary sans-serif content.
  - `VT323`: For retro, pixel-art aesthetic headers and stylistic terminal inputs.

### Deployment & Tooling
- **[Netlify Plugin for Next.js](https://www.npmjs.com/package/@netlify/plugin-nextjs) (v5.15.9)**: Ensures seamless deployment and optimal caching behavior on the Netlify edge network.
- **[ESLint](https://eslint.org/) (v9) & eslint-config-next**: Strict code linting and standard enforcement to maintain a clean and secure codebase.
- **Yarn/npm**: Package management.

## 🚀 Getting Started

Follow these instructions to set up a local development environment.

### 1. Requirements
Ensure you have **Node.js** (v18 or higher recommended) installed on your system.

### 2. Clone & Install Dependencies
Clone the repository and install the required npm packages:
```bash
git clone https://github.com/your-org/redteamx_website.git
cd redteamx_website
npm install
```

### 3. Environment Variables
Create a local environment file by copying the provided example:
```bash
cp .env.example .env.local
```
*(Populate `.env.local` with any necessary development credentials.)*

### 4. Run the Development Server
Start Next.js in development mode:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) in your browser. The application supports Hot Module Replacement (HMR) and will auto-update as you edit files in the `src/` directory.

## 📂 Project Structure

```text
redteamx_website/
├── src/
│   ├── app/              # Next.js App Router (page.js, layout.js)
│   ├── components/       # Reusable UI components (Terminal, Navbar, Loader)
│   └── globals.css       # Core stylesheets and CSS variables
├── public/               # Static assets (images, raw SVGs)
├── .env.example          # Environment variable template
├── data.db               # Local SQLite database file
├── next.config.mjs       # Next.js configuration and environment setup
└── package.json          # Project dependencies and npm scripts
```

## 🔒 Security Practices

As a cybersecurity collective, we take secure coding seriously. All form submissions, API routes, and terminal inputs are strictly validated and sanitized to prevent XSS, SQL injection, and other common attack vectors.

**Vulnerability Reporting**: If you discover a vulnerability in our application, please report it to our team immediately through our designated contact channels. Please do not test active exploits against our production environment.

## 🤝 Contributing

We encourage contributions from redteamX members and the broader open-source community!
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/NewModule`).
3. Commit your changes (`git commit -m 'Add NewModule logic'`).
4. Push to the branch (`git push origin feature/NewModule`).
5. Open a Pull Request detailing your enhancements.

---

<div align="center">
  <i>"Ready to hack?"</i><br>
  Designed and developed by the <b>redteamX</b> collective.
</div>
