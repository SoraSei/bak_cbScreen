<template>
  <div style="height:100%;">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import 'theme.less';

body { background-color: @akcolor_01 }
html, body { height: 100%; width: 100% }
</style>
