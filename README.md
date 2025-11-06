# 🦄 Unicorn Tutorial with Svelte

An interactive, magical web application showcasing unicorns and their powers! Built with Deno, SvelteKit, and TypeScript.

## ✨ Make it your own!

You can deploy your own version of this app to Deno Deploy immediately.
Just click the button to clone and deploy.

[![Deploy on Deno](https://deno.com/button)](https://app.deno.com/new?clone=https://github.com/denoland/tutorial-with-svelte)

## 🌈 Features

### Interactive Unicorn Experience

Explore the magical world of unicorns with:

- **Magic Level Meter**: Build up magic by interacting with unicorns!
- **Unicorn Counter**: Summon as many unicorns as you want and watch the counter grow
- **Unicorn Gallery**: Meet 5 unique unicorns, each with their own:
  - Special name
  - Unique color
  - Magical power
  - Beautiful emoji representation
- **Visual Effects**: Sparkles and animations bring the magic to life
- **Unicorn Facts**: Learn interesting things about these legendary creatures

### How to Use

1. **Summon Unicorns**
   - Click the "🦄 Summon Unicorn" button to increase your unicorn count
   - Watch your magic level increase with each unicorn!

2. **Explore the Gallery**
   - Click on any unicorn card to learn about their special powers
   - Each unicorn has unique abilities like Healing, Joy, Wisdom, Dreams, and Energy

3. **Build Your Magic**
   - Every interaction increases your magic level
   - Sparkles appear when magic is gained!

4. **Reset When Ready**
   - Use the "🔄 Reset Magic" button to start fresh

## 💻 Tech Stack

- **Runtime**: [Deno](https://deno.com/) / Node.js
- **Framework**: [SvelteKit](https://kit.svelte.dev/)
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI**: Svelte 5 with modern runes syntax

## 📁 Project Structure

```text
tutorial-with-svelte/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte         # Global layout
│   │   └── +page.svelte           # Main unicorn page
│   ├── app.css                    # Global styles
│   └── app.html                   # HTML template
├── static/                        # Static assets
├── deno.json                      # Deno configuration
├── package.json                   # NPM scripts
├── svelte.config.js              # SvelteKit configuration
└── vite.config.ts                # Vite configuration
```

## 🚀 Getting Started

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

Then open http://localhost:5173 to see the magical unicorn world!

## 🎨 How It Works

### Svelte 5 Runes

The application uses Svelte 5's modern runes syntax:
- `$state` for reactive state management
- Interactive buttons and click handlers
- Conditional rendering with `{#if}` blocks
- List rendering with `{#each}` blocks
- CSS animations for magical effects

### State Management

The app maintains several pieces of state:
- **unicornCount**: Tracks how many unicorns have been summoned
- **selectedUnicorn**: The currently selected unicorn from the gallery
- **magicLevel**: A meter showing accumulated magic (0-100%)
- **showSparkles**: Controls the sparkle animation visibility

### Styling

Beautiful, responsive design with:
- Gradient backgrounds (pink to purple theme)
- Smooth animations and transitions
- Card-based layout for unicorn gallery
- Interactive hover effects
- Responsive grid layouts

## 🎓 Learning Objectives

This tutorial demonstrates:
1. **Svelte 5 Basics**: Modern component syntax with runes
2. **State Management**: Using `$state` for reactivity
3. **Event Handling**: Button clicks and user interactions
4. **Conditional Rendering**: Showing/hiding UI elements
5. **List Rendering**: Displaying arrays of data
6. **TypeScript**: Type-safe interfaces and props
7. **CSS Styling**: Modern layouts with Grid and Flexbox
8. **Animations**: CSS transitions and keyframe animations

## 🌟 Contributing

Feel free to add more unicorns, powers, or magical features! Open issues or submit pull requests.

## 📝 License

MIT
