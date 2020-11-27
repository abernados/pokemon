<template>
  <div class="logo">
    <img
      alt="Swipebit logo"
      src="@/assets/images/apps.png"
      class="mx-auto"
      :height="size"
    >
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    size: String,
  },
};
</script>

<style>
</style>