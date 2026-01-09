## Faizhadif.me

Static portfolio site (HTML) with Tailwind CSS built locally via Tailwind CLI.

### Requirements
- Node.js (LTS recommended)

### Install
- `npm install`

### Development (auto rebuild)
- `npm run dev`

This watches your HTML files and rebuilds Tailwind into `assets/tailwind.css`.

### Build (for deploy)
- `npm run build`

Important: this project does NOT use Tailwind CDN anymore. Your deployed site must include the generated `assets/tailwind.css` file (commit/push it).
