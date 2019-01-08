<template>
  <div class="listitem_01">
    <div class="br"></div>
    <div class="box_bg">
      <div class="line_1">{{ name }}<span>{{ age }}岁</span><span>{{ sex }}</span></div>
      <div class="line_2">联系方式：{{ tel }}</div>
      <div class="line_2 address" v-if="address">{{ address }}</div>
      <div class="line_2 address" v-else>暂无地址</div>
      <div class="line_2">
        <span v-show="val1">心率 {{ val1 }} 次/分</span><span v-show="val2">步数 {{ val2 }}</span><span v-show="val3">血压 {{ val3 }}</span><span v-show="val4">血糖 {{ val4 }} mmol/L</span>
      </div>
    </div>
    <div class="br"></div>
  </div>
</template>

<script>
export default {
  props: { name: String, sex: String, age: Number, tel: String, address: String, val1: Number, val2: Number, val3: String, val4: Number }
}
</script>

<style lang="less" scoped>
.listitem_01 { display: inline-block; width: 25%; height: 50%; vertical-align: top;
  .br { height: 4% }
  .box_bg { height: 92%; margin: 0 5%; width: 90%;
    .line_1 { font-weight: bold; font-size: 1.25em; color: @akcolor_02; margin: 0 10%; padding: 2em 0 .6em 0;
      span { font-weight: normal; font-size: .8em; color: @akcolor_03; margin-left: 1em; float: right }
    }
    .line_2 { color: @akcolor_03; border-top: 1px solid @akcolor_04; margin: 0 10% .6em 10%; padding-top: .6em;
      span { display: inline-block; width: 50% }
    }
    .address { height: 3.2em; overflow: hidden }
  }
}
</style>
