# Deno + SvelteKit Application

A full-stack web application using Deno and SvelteKit, featuring:
- **GitHub PR Analysis**: Compare your current pull request activity against previous periods
- **Dinosaur Database**: Browse and learn about dinosaurs (tutorial example)

This project showcases modern web development practices with TypeScript, server-side rendering, and API routes.

## Make it your own!

You can deploy your own version of this svelte app to Deno Deploy immediately.
Just click the button to clone and deploy.

[![Deploy on Deno](https://deno.com/button)](https://app.deno.com/new?clone=https://github.com/denoland/tutorial-with-svelte)


## Tech Stack

- **Runtime**: [Deno](https://deno.com/)
- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Adapter**: Deno SvelteKit Adapter

## Project Structure

```text
tutorial-with-svelte/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte          # Global layout
│   │   ├── +page.svelte            # Homepage - dinosaur list
│   │   ├── +page.ts                # Homepage data loader
│   │   ├── [dinosaur]/             # Dynamic route for individual dinosaurs
│   │   │   ├── +page.svelte        # Dinosaur detail page
│   │   │   └── +page.ts            # Dinosaur data loader
│   │   └── api/
│   │       ├── data.json           # Dinosaur database (3000+ entries)
│   │       └── dinosaurs/
│   │           └── +server.js      # API endpoint for dinosaur data
│   ├── app.css                     # Global styles
│   ├── app.html                    # HTML template
│   └── lib/
├── static/                         # Static assets
├── deno.json                       # Deno configuration
├── package.json                    # NPM scripts for Vite
├── svelte.config.js               # SvelteKit configuration
└── vite.config.ts                 # Vite configuration
```

## Getting Started

### Installation & Setup

1. Clone or download this project and install dependencies

```bash
git clone https://github.com/denoland/tutorial-with-svelte.git
cd tutorial-with-svelte
deno install
```

2. Run the dev server

```bash
deno run dev
```

3. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

## Available Scripts

```bash
# Start development server
deno run dev

# Build for production
deno run build

# Preview production build
deno run preview
```

## Features

### 1. GitHub PR Analysis (`/github-stats`)

Analyze your GitHub pull request activity with comprehensive statistics:

- **Current Period Analysis**: Last 6 months of PR activity
- **Previous Period Comparison**: Compare against 6-12 months ago
- **Key Metrics**:
  - PRs per month (rate calculation)
  - Total PRs created
  - Merge rate percentage
  - Open, merged, and closed PR counts
  - Rate change comparison with percentage

**How to use:**
1. Generate a GitHub Personal Access Token at https://github.com/settings/tokens
   - Required scopes: `repo` and `user`
2. Enter your GitHub username and token on the `/github-stats` page
3. Click "Analyze PRs" to fetch and compare your statistics

**Note**: Your token is only used client-side and sent directly to the GitHub API. It's not stored on any server.

### 2. Dinosaur Database (`/[dinosaur]`)

A tutorial example demonstrating SvelteKit features:
- Dynamic routes with parameter handling
- API endpoints serving JSON data
- Server-side data loading

## How It Works

### GitHub PR Analysis

- **API Integration**: Uses GitHub's Search API to fetch pull requests
- **Date Range Calculation**: Automatically calculates current (0-6 months) and previous (6-12 months) periods
- **Statistics Engine**: Processes PR data to calculate rates, percentages, and comparisons
- **Client-side Rendering**: Interactive Svelte 5 components with modern runes syntax

### Dinosaur App

- Homepage loads dinosaur data from API endpoint
- Dynamic routes match dinosaur names in URLs
- Server-side data fetching with SvelteKit's load functions
