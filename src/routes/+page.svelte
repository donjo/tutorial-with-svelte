<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let dinosaurs = data.dinosaurs;
</script>

<main>
  <h1>Welcome to the App</h1>

  <div class="app-links">
    <div class="app-card">
      <h2>GitHub PR Analysis</h2>
      <p>Analyze your GitHub pull request activity and compare your current rate against previous periods.</p>
      <a href="/github-stats" class="btn-primary">View GitHub Stats</a>
    </div>

    <div class="app-card">
      <h2>🦕 Dinosaur App</h2>
      <p>Click on a dinosaur below to learn more.</p>
      <div class="dinosaur-links">
        {#each dinosaurs as dinosaur (dinosaur.name)}
          <a href="/{dinosaur.name.toLowerCase()}" class="btn-secondary">
            {dinosaur.name}
          </a>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  .app-links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .app-card {
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    border: 2px solid #ddd;
  }

  .app-card h2 {
    margin-top: 0;
  }

  .dinosaur-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .btn-secondary {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #666;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .btn-secondary:hover {
    background: #444;
  }
</style>
