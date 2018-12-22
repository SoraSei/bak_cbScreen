<template>
  <div class="title_01">
    <div class="line_1">{{ name }}</div>
    <div class="line_2">{{ val }}<span>{{ after }}</span></div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    val: Number,
    after: String
  }
}
</script>

<style lang="less" scoped>
.title_01 { display: inline-block; text-align: left;
  .line_1 { font-size: 1em; color: @akcolor_02 }
  .line_2 { font-weight: bold; font-size: 2em; color: @akcolor_03; position: relative;
    span { font-size: .4em; position: absolute; right: .25em; bottom: .5em }
  }
}
</style>
