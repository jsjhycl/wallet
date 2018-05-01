<template>
  <select class="foundLiInput" v-model="wallet.type">
    <option v-for="item in dataSources">{{item}}</option>
  </select>
</template>

<script>
    export default {
      name: "Select",
      props: ["dataSources"]
    }
</script>

<style scoped>

</style>
