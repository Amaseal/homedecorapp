<script>
  import { home } from "$lib/scripts/home";
  import Hero from "$lib/layouts/hero/Hero.svelte";
  import About from "$lib/layouts/about/About.svelte";
  import Categories from "$lib/layouts/categories/Categories.svelte";
  import Contact from "../lib/layouts/contact/Contact.svelte";

  export let data;

  $home = data.data;
  $: console.log($home);
</script>

<svelte:head>
  <title>SGHome decor</title>
</svelte:head>

<Hero />
<About />
<Categories />
<Contact />
