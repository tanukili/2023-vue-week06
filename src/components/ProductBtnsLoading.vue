<script>
export default {
  props: ['activedBtn'],
};
</script>

<template>
  <teleport :to="`#showDetailBtn${activedBtn}`">
    <span class="spinner-border spinner-border-sm" role="status"></span>
  </teleport>
  <teleport :to="`#addToCartBtn${activedBtn}`">
    <span class="spinner-border spinner-border-sm" role="status"></span>
  </teleport>
</template>

<style></style>
