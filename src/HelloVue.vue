<template>
  <div class="test">
    {{`hello vue ${test}`}}
  </div>
</template>

<script>
export default {
  name: 'HelloVue',
  data() {
    return {
      test: "yyds"
    }
  },
}
</script>

<style lang='scss' scoped>
  .test {
    background-color: rgb(123, 123, 212);
  }
</style>
