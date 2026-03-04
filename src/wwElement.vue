<template>
  <div class="tokban-modal-wrapper">
    <span>{{ content?.title || 'Confirmation Modal' }}</span>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: Object, required: true },
  },
};
</script>

<style scoped>
.tokban-modal-wrapper {
  padding: 12px;
  font-family: sans-serif;
}
</style>
