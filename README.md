# Datyrix - Real-time Data Dashboard

Datyrix is a stunning, high-performance real-time data orchestration dashboard featuring dynamic theming, responsive widgets (Weather, Crypto, AQI, World Clock), and a complete mock API management system.

## Features
- **Real-time Data Integration**: Live feeds for Crypto, Weather, Time, and Air Quality (mocked/API driven).
- **Dynamic Theming Engine**: Personalize your interface with light/dark/midnight modes and custom neon accent colors that dynamically update the entire UI's glowing effects.
- **Responsive Layout**: Seamlessly shape-shifts from ultra-wide monitors down to a touch-friendly mobile interface with a native bottom tab bar navigation.
- **Secure Authentication**: Backend integrated with Supabase for robust user management and protected routes.

## Local Development Setup

To get this project running locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/datyrix.git
cd datyrix
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Supabase)
This project uses Supabase for authentication. You will need to create your own Supabase project and provide the keys locally.

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. In your Supabase dashboard, go to project settings and find your `URL` and `anon public key`.
3. Create a `.env` file in the root of your local `datyrix` project folder.
4. Copy the contents of `.env_example` into your new `.env` file and insert your keys:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

*Note: Your `.env` file is safely ignored by git and will never be pushed to your public repository.*

### 4. Run the Development Server
```bash
npm run dev
```

Open your browser to `http://localhost:5175/` to see the application running.

## Deployment
When building for production (e.g., GitHub Pages, Vercel, Netlify), ensure you add your Supabase Environment Variables to your host's deployment settings.

```bash
npm run build
```

## Built With
- **React.js** (Vite + HashRouter)
- **Tailwind CSS v4**
- **Framer Motion** (Animations)
- **Chart.js**
- **Supabase** (Auth Backend)
