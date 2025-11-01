# GitHub PR Analysis

A web application to analyze your GitHub pull request activity and compare your current rate against previous periods. Built with Deno, SvelteKit, and TypeScript.

## Make it your own!

You can deploy your own version of this app to Deno Deploy immediately.
Just click the button to clone and deploy.

[![Deploy on Deno](https://deno.com/button)](https://app.deno.com/new?clone=https://github.com/denoland/tutorial-with-svelte)

## Features

### GitHub PR Analysis

Analyze your GitHub pull request activity with comprehensive statistics:

- **Current Period Analysis**: Last 6 months of PR activity
- **Previous Period Comparison**: Compare against 6-12 months ago
- **Key Metrics**:
  - PRs per month (rate calculation)
  - Total PRs created
  - Merge rate percentage
  - Open, merged, and closed PR counts
  - Rate change comparison with percentage
- **Visual Indicators**: Color-coded change indicators showing if your PR rate is increasing or decreasing

### How to Use

1. **Generate a GitHub Personal Access Token**
   - Visit https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Required scopes: `repo` and `user`
   - Copy the generated token

2. **Run the Application**
   ```bash
   npm install
   npm run dev
   ```

3. **Analyze Your Stats**
   - Open http://localhost:5173
   - Enter your GitHub username
   - Enter your GitHub token
   - Click "Analyze PRs"

**Note**: Your token is only used client-side and sent directly to the GitHub API. It's not stored on any server.

## Tech Stack

- **Runtime**: [Deno](https://deno.com/) / Node.js
- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Language**: TypeScript
- **Build Tool**: Vite
- **API**: GitHub REST API

## Project Structure

```text
tutorial-with-svelte/
├── src/
│   ├── lib/
│   │   └── github.ts              # GitHub API service module
│   ├── routes/
│   │   ├── +layout.svelte         # Global layout
│   │   ├── +page.svelte           # Main page - GitHub analysis
│   │   └── api/
│   │       └── github/
│   │           └── stats/
│   │               └── +server.ts # API endpoint for GitHub stats
│   ├── app.css                    # Global styles
│   └── app.html                   # HTML template
├── static/                        # Static assets
├── deno.json                      # Deno configuration
├── package.json                   # NPM scripts
├── svelte.config.js              # SvelteKit configuration
└── vite.config.ts                # Vite configuration
```

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run check
```

## How It Works

### GitHub API Integration

The application uses GitHub's Search API to fetch pull requests:
- Queries PRs authored by the specified user
- Filters by date ranges (current: 0-6 months, previous: 6-12 months ago)
- Handles pagination to fetch all PRs

### Statistics Calculation

The app calculates several metrics:
- **PRs per month**: Total PRs divided by the number of months in the period
- **Merge rate**: Percentage of PRs that were merged
- **Rate change**: Difference in PRs/month between periods
- **Rate change percentage**: Percentage increase/decrease

### Client-side Rendering

Built with Svelte 5's modern runes syntax:
- Reactive state management with `$state`
- Side effects with `$effect`
- Type-safe with TypeScript

## Privacy & Security

- GitHub tokens are used only client-side
- Tokens are sent directly to GitHub's API
- No server-side storage of credentials
- Tokens can be saved in browser localStorage for convenience (optional)

## Contributing

Feel free to open issues or submit pull requests!

## License

MIT
