# M&M Reifenservice Web Application

A modern React-based web application for M&M Reifenservice (tire service) in Essen, Germany.

## Features

- 🚗 Fast tire service booking system
- 📱 Responsive design with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 🛣️ Multi-page routing with React Router
- 🎨 Modern UI/UX components

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ahm8dd/WebApp_Kunde.git
cd WebApp_Kunde
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
├── Components/          # Reusable React components
├── Pages/              # Page components for routing
├── Entities/           # Data models and schemas
├── Layout.jsx          # Main layout component
├── App.jsx             # App router and setup
├── main.jsx            # React DOM entry point
├── index.html          # HTML entry point
├── index.css           # Global styles
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite build configuration
└── package.json        # Dependencies
```

## Technologies

- **React 18** - UI library
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
