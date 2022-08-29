<script>
  import { categories } from "$lib/scripts/categories";
  import "../style.css";
  import Header from "$lib/layouts/header/Header.svelte";
  import Footer from "$lib/layouts/footer/Footer.svelte";

  export let data;

  $categories = data.data;
</script>

<Header />
<main>
  <slot />
</main>
<Footer />
