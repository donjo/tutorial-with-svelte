<script lang="ts">
  interface Unicorn {
    id: number;
    name: string;
    color: string;
    power: string;
    emoji: string;
  }

  let unicornCount = $state(0);
  let selectedUnicorn = $state<Unicorn | null>(null);
  let magicLevel = $state(0);
  let showSparkles = $state(false);

  const unicorns: Unicorn[] = [
    { id: 1, name: 'Sparkle', color: 'Pink', power: 'Healing', emoji: '🦄' },
    { id: 2, name: 'Rainbow', color: 'Rainbow', power: 'Joy', emoji: '🌈' },
    { id: 3, name: 'Starlight', color: 'Silver', power: 'Wisdom', emoji: '✨' },
    { id: 4, name: 'Luna', color: 'Purple', power: 'Dreams', emoji: '🌙' },
    { id: 5, name: 'Sunshine', color: 'Gold', power: 'Energy', emoji: '☀️' }
  ];

  function addUnicorn() {
    unicornCount += 1;
    magicLevel = Math.min(magicLevel + 10, 100);
    triggerSparkles();
  }

  function selectUnicorn(unicorn: Unicorn) {
    selectedUnicorn = unicorn;
    magicLevel = Math.min(magicLevel + 20, 100);
    triggerSparkles();
  }

  function triggerSparkles() {
    showSparkles = true;
    setTimeout(() => {
      showSparkles = false;
    }, 1000);
  }

  function resetMagic() {
    unicornCount = 0;
    selectedUnicorn = null;
    magicLevel = 0;
  }
</script>

<main>
  <h1>🦄 Welcome to Unicorn Land! 🦄</h1>
  <p class="subtitle">Learn about magical unicorns and their amazing powers!</p>

  <div class="magic-meter">
    <h3>Magic Level: {magicLevel}%</h3>
    <div class="meter">
      <div class="meter-fill" style="width: {magicLevel}%"></div>
    </div>
    {#if showSparkles}
      <div class="sparkles">✨ ✨ ✨ ✨ ✨</div>
    {/if}
  </div>

  <div class="counter-section">
    <h2>Unicorn Counter</h2>
    <div class="counter-display">
      <p class="big-number">{unicornCount}</p>
      <p class="label">Unicorns Summoned</p>
    </div>
    <div class="button-group">
      <button onclick={addUnicorn} class="btn-primary">
        🦄 Summon Unicorn
      </button>
      <button onclick={resetMagic} class="btn-secondary">
        🔄 Reset Magic
      </button>
    </div>
  </div>

  <div class="gallery-section">
    <h2>Unicorn Gallery</h2>
    <p>Click on a unicorn to learn about their special powers!</p>
    
    <div class="unicorn-grid">
      {#each unicorns as unicorn}
        <button 
          class="unicorn-card" 
          class:selected={selectedUnicorn?.id === unicorn.id}
          onclick={() => selectUnicorn(unicorn)}
        >
          <div class="unicorn-emoji">{unicorn.emoji}</div>
          <h3>{unicorn.name}</h3>
          <p class="unicorn-color">{unicorn.color}</p>
        </button>
      {/each}
    </div>

    {#if selectedUnicorn}
      <div class="unicorn-details">
        <h3>✨ {selectedUnicorn.name} ✨</h3>
        <p><strong>Color:</strong> {selectedUnicorn.color}</p>
        <p><strong>Special Power:</strong> {selectedUnicorn.power}</p>
        <p class="detail-emoji">{selectedUnicorn.emoji} {selectedUnicorn.emoji} {selectedUnicorn.emoji}</p>
      </div>
    {/if}
  </div>

  <div class="facts-section">
    <h2>🌟 Unicorn Facts 🌟</h2>
    <div class="facts-grid">
      <div class="fact-card">
        <h4>🦄 Origins</h4>
        <p>Unicorns are legendary creatures that have been part of folklore for thousands of years!</p>
      </div>
      <div class="fact-card">
        <h4>🌈 Rainbow Magic</h4>
        <p>Unicorns are often associated with rainbows and can create them with their magical horns!</p>
      </div>
      <div class="fact-card">
        <h4>✨ Sparkle Power</h4>
        <p>Everything a unicorn touches becomes more magical and sparkly!</p>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #fef9ff 0%, #ffeef8 100%);
    min-height: 100vh;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    text-align: center;
    background: linear-gradient(45deg, #ff69b4, #9370db, #4169e1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #9370db;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 500;
  }

  h2 {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #9370db;
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ff69b4;
  }

  .magic-meter {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 2rem 0;
    box-shadow: 0 4px 6px rgba(147, 112, 219, 0.2);
    text-align: center;
  }

  .magic-meter h3 {
    margin: 0 0 1rem 0;
    color: #9370db;
  }

  .meter {
    background: #f0e6ff;
    border-radius: 20px;
    height: 30px;
    overflow: hidden;
    border: 2px solid #9370db;
  }

  .meter-fill {
    background: linear-gradient(90deg, #ff69b4, #9370db, #4169e1);
    height: 100%;
    transition: width 0.5s ease;
    border-radius: 18px;
  }

  .sparkles {
    margin-top: 1rem;
    font-size: 2rem;
    animation: sparkle 1s ease-in-out;
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  .counter-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    margin: 2rem 0;
    box-shadow: 0 4px 6px rgba(255, 105, 180, 0.2);
    text-align: center;
  }

  .counter-display {
    margin: 1rem 0;
  }

  .big-number {
    font-size: 4rem;
    font-weight: bold;
    margin: 0.5rem 0;
    background: linear-gradient(45deg, #ff69b4, #9370db);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .label {
    color: #666;
    font-size: 1.1rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  .btn-primary {
    background: linear-gradient(45deg, #ff69b4, #9370db);
    color: white;
  }

  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(147, 112, 219, 0.4);
  }

  .btn-secondary {
    background: #f0e6ff;
    color: #9370db;
    border: 2px solid #9370db;
  }

  .btn-secondary:hover {
    background: #e6d9ff;
    transform: scale(1.05);
  }

  .gallery-section {
    margin: 3rem 0;
  }

  .gallery-section > p {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
  }

  .unicorn-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .unicorn-card {
    background: white;
    border: 3px solid #f0e6ff;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .unicorn-card:hover {
    transform: translateY(-5px);
    border-color: #9370db;
    box-shadow: 0 8px 16px rgba(147, 112, 219, 0.3);
  }

  .unicorn-card.selected {
    border-color: #ff69b4;
    background: linear-gradient(135deg, #fff5fb 0%, #f0e6ff 100%);
    box-shadow: 0 8px 16px rgba(255, 105, 180, 0.4);
  }

  .unicorn-emoji {
    font-size: 4rem;
    margin-bottom: 0.5rem;
  }

  .unicorn-card h3 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
    color: #9370db;
  }

  .unicorn-color {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
  }

  .unicorn-details {
    background: white;
    border: 3px solid #ff69b4;
    border-radius: 12px;
    padding: 2rem;
    margin-top: 2rem;
    text-align: center;
    animation: fadeIn 0.5s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .unicorn-details h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .unicorn-details p {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    color: #666;
  }

  .detail-emoji {
    font-size: 2rem;
    margin-top: 1rem;
  }

  .facts-section {
    margin: 3rem 0;
  }

  .facts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .fact-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(147, 112, 219, 0.2);
    transition: transform 0.3s ease;
  }

  .fact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(147, 112, 219, 0.3);
  }

  .fact-card h4 {
    color: #9370db;
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
  }

  .fact-card p {
    color: #666;
    line-height: 1.6;
    margin: 0;
  }
</style>
