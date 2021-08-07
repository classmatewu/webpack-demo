<template>
  <div class="test">
    {{`hello vue ${test}`}}
  </div>
</template>

<script>

export default {
  name: 'Test',
  data() {
    return {
      test: "yyds"
    }
  },
  components: {},
  props: {},
  emits: {},
  setup(props) {},
}
</script>

<style lang='scss' module>
  .test {
    background-color: antiquewhite;
  }
</style>
