<script lang="ts">
  import type { PRComparison } from '$lib/github';

  let username = $state('');
  let token = $state('');
  let loading = $state(false);
  let error = $state('');
  let analysis = $state<PRComparison | null>(null);

  async function loadStats() {
    if (!username.trim()) {
      error = 'Please enter a GitHub username';
      return;
    }
    if (!token.trim()) {
      error = 'Please enter a GitHub token';
      return;
    }

    loading = true;
    error = '';
    analysis = null;

    try {
      const params = new URLSearchParams({
        username: username.trim(),
        token: token.trim()
      });

      const response = await fetch(`/api/github/stats?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch stats');
      }

      analysis = await response.json();

      // Save username to localStorage for convenience
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('github_username', username.trim());
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error loading stats:', err);
    } finally {
      loading = false;
    }
  }

  // Load saved username on mount
  $effect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedUsername = localStorage.getItem('github_username');
      if (savedUsername) {
        username = savedUsername;
      }
    }
  });

  function getChangeColor(change: number): string {
    if (change > 0) return 'green';
    if (change < 0) return 'red';
    return 'gray';
  }

  function getChangeIcon(change: number): string {
    if (change > 0) return '📈';
    if (change < 0) return '📉';
    return '➡️';
  }
</script>

<main>
  <h1>GitHub PR Analysis</h1>
  <p class="subtitle">Compare your current pull request rate against your previous 6-month period.</p>

  <div class="config-section">
    <div class="input-group">
      <label for="username">GitHub Username:</label>
      <input
        id="username"
        type="text"
        bind:value={username}
        placeholder="octocat"
        disabled={loading}
      />
    </div>

    <div class="input-group">
      <label for="token">GitHub Token:</label>
      <input
        id="token"
        type="password"
        bind:value={token}
        placeholder="ghp_..."
        disabled={loading}
      />
      <small>
        <a href="https://github.com/settings/tokens" target="_blank" rel="noopener">
          Generate a token
        </a>
        (needs 'repo' and 'user' scopes)
      </small>
    </div>

    <button onclick={loadStats} disabled={loading} class="btn-primary">
      {loading ? 'Loading...' : 'Analyze PRs'}
    </button>
  </div>

  {#if error}
    <div class="error-message">
      <strong>Error:</strong> {error}
    </div>
  {/if}

  {#if analysis}
    <div class="results">
      <h2>Results for @{username}</h2>

      <div class="comparison-section">
        <h3>PR Rate Comparison</h3>
        <div class="stats-grid">
          <div class="stat-card current">
            <h4>Current Period</h4>
            <p class="period">{analysis.current.startDate} to {analysis.current.endDate}</p>
            <p class="big-number">{analysis.current.prsPerMonth}</p>
            <p class="label">PRs per month</p>
            <div class="details">
              <p><strong>{analysis.current.totalPRs}</strong> total PRs</p>
              <p><strong>{analysis.current.mergedPRs}</strong> merged ({analysis.current.mergeRate}%)</p>
              <p><strong>{analysis.current.closedPRs}</strong> closed without merge</p>
              <p><strong>{analysis.current.openPRs}</strong> still open</p>
            </div>
          </div>

          <div class="stat-card previous">
            <h4>Previous Period</h4>
            <p class="period">{analysis.previous.startDate} to {analysis.previous.endDate}</p>
            <p class="big-number">{analysis.previous.prsPerMonth}</p>
            <p class="label">PRs per month</p>
            <div class="details">
              <p><strong>{analysis.previous.totalPRs}</strong> total PRs</p>
              <p><strong>{analysis.previous.mergedPRs}</strong> merged ({analysis.previous.mergeRate}%)</p>
              <p><strong>{analysis.previous.closedPRs}</strong> closed without merge</p>
              <p><strong>{analysis.previous.openPRs}</strong> still open</p>
            </div>
          </div>
        </div>

        <div class="change-card" style="color: {getChangeColor(analysis.rateChange)}">
          <p class="change-icon">{getChangeIcon(analysis.rateChange)}</p>
          <p class="change-value">
            {analysis.rateChange > 0 ? '+' : ''}{analysis.rateChange} PRs/month
          </p>
          <p class="change-percent">
            ({analysis.rateChangePercent > 0 ? '+' : ''}{analysis.rateChangePercent}% change)
          </p>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .config-section {
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #0070f3;
  }

  input:disabled {
    background: #e5e5e5;
    cursor: not-allowed;
  }

  small {
    display: block;
    margin-top: 0.5rem;
    color: #666;
  }

  small a {
    color: #0070f3;
  }

  .error-message {
    background: #fee;
    border: 2px solid #f00;
    color: #c00;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
  }

  .results {
    margin-top: 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .stat-card {
    background: white;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
  }

  .stat-card.current {
    border-color: #0070f3;
  }

  .stat-card.previous {
    border-color: #666;
  }

  .stat-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
  }

  .period {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .big-number {
    font-size: 3rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
    color: #0070f3;
  }

  .stat-card.previous .big-number {
    color: #666;
  }

  .label {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .details {
    border-top: 1px solid #eee;
    padding-top: 1rem;
  }

  .details p {
    margin: 0.5rem 0;
  }

  .change-card {
    background: white;
    border: 2px solid currentColor;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    margin-top: 2rem;
  }

  .change-icon {
    font-size: 3rem;
    margin: 0;
  }

  .change-value {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem 0;
  }

  .change-percent {
    font-size: 1.5rem;
    margin: 0;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
