<script>
  import { home } from "$lib/scripts/home";
  import Quote from "$lib/components/Quote.svelte";
</script>

<section
  style:background-image="url(https://cms.sghomedecor.lv{$home.background.url})"
>
  <div class="container">
    <h1>{$home.title}</h1>
  </div>
  <div class="quotes">
    {#each $home.quotes as quote}
      <Quote text={quote.text} />
    {/each}
  </div>
</section>

<style>
  section {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container {
    margin-top: auto;
  }

  h1 {
    text-align: center;
  }
  .quotes {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    margin-top: auto;
    width: 100%;
    background: var(--secondary);
  }
</style>
