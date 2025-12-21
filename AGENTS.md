# Agent Instructions for Portfolio Project

## Overview
Photography portfolio: architectural and urban photography transformed into immersive visual experience. Built with pure HTML, CSS, and vanilla JavaScript. Dark minimalist theme with responsive design.

## Tech Stack
- HTML5 (semantic markup)
- CSS3 (custom properties, animations, responsive)
- Vanilla JavaScript (Intersection Observer, DOM manipulation)
- No build tools

## Project Context
Live photography portfolio showcasing architectural photography. Self-contained project with all assets included. Focuses on visual storytelling through grid layout, hover effects, and smooth transitions.

## Local Deployment
Open `index.html` directly in browser or:
```bash
python -m http.server 8000
# Open http://localhost:8000
```

## Key Features
- Minimalist dark theme (#000000 background)
- Responsive grid gallery with hover effects
- Smooth transitions and animations
- Image optimization with lazy loading
- Mobile-first responsive design
- Semantic HTML & accessibility

## File Structure
```
portfolio/
├── index.html
├── README.md
├── assets/
│   ├── css/styles.css
│   ├── js/script.js
│   ├── fonts/
│   └── media/pics/
```

## Design System
- **Primary Background**: #000000
- **Secondary Elements**: #0A0A0A
- **Text**: #FFFFFF
- **Accent Gradients**: Subtle blue, yellow, pink
- **Typography**: Helvetica Neue, Arial, sans-serif

## Boundaries

### ✅ Always Do
- Pull before committing changes
- Implement exactly what's requested
- Test locally before pushing
- Document changes clearly

### ⚠️ Ask First
- Modifying color scheme
- Changing layout structure
- Adding new sections

### 🚫 Never Do
- Commit API keys or secrets
- Modify design system without approval
- Break responsive design

## Agent Behavior
- Always pull before committing changes
- Don't invent features—implement exactly what's requested
- Ask for clarification when requirements are ambiguous
- Keep solutions minimal and focused
- Work within this project folder only (project isolation)
