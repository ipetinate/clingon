<script>
export default {
  name: 'ResourceName',
  data() {
    return {
      message: "Hello, I'm a resource auto generated by Clingon CLI!"
    }
  },
  props: {},
  methods: {
    greeting() {
      alert(this.message)
    }
  }
}
</script>

<template>
  <div>
    <header>
      <h2>ResourceName</h2>

      <button @click="greeting">Action</button>
    </header>

    <main>
      <p>{{ message }}</p>
    </main>
  </div>
</template>
