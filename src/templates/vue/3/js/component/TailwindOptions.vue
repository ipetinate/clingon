<script>
export default {
  name: 'ResourceName',
  data() {
    return {
      message: "Hello, I'm a resource auto generated by Clingon CLI!"
    }
  }
}
</script>

<template>
  <div class="component">
    <p class="message">
      {{ message }}
    </p>
  </div>
</template>

<style scoped>
.component {
  @apply flex justify-center items-center;
}

.message {
  @apply text-slate-800;
}
</style>
