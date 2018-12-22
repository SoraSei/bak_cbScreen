<template>
  <div class="pie_01">
    <div class="box_title">{{ name }}</div>
    <v-chart class="chart" prevent-render @on-render=pie1Chart></v-chart>
    <div class="legend">
      <div v-for="(item, i) in tmp" :key=i><div :class="{ 'color_1': i === 0, 'color_2': i === 1, 'color_3': i === 2, 'color_4': i === 3 }"></div>{{ item.item }}：<span>{{ item.val }} 人（{{ item.per }}）</span></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { tmp: [] }
  },
  props: { name: String, data: Array, colors: Array, cid: String },
  methods: {
    pie1Chart ({ chart }) {
      chart.source(this.data)
      chart.coord('polar', { transposed: true, radius: 1 })
      chart.axis(false)
      chart.legend(false)
      chart.interval().position('a*val').color('item', this.colors).adjust('stack').style({ lineWidth: 5, stroke: '#fff' })
      chart.render()
    }
  },
  created () {
    let sum = 0
    for (let i in this.data) {
      sum += this.data[i].val
      this.tmp[i] = this.data[i]
    }
    for (let i in this.tmp) this.tmp[i].per = (this.tmp[i].val / sum * 100).toFixed(0) + '%'
  }
}
</script>

<style lang="less" scoped>
.pie_01 { display: inline-block; text-align: left;
  .box_title { margin-bottom: .25em }
  .chart { background-color: rgba(0,0,0,0)!important; margin: 0 -25% }
  .legend { font-size: .4em; color: @akcolor_02; text-align: center; margin-top: .25em;
    div[class*=color_] { width: 2em; height: 1em; display: inline-block; margin-right: .5em }
    div.color_1 { background-color: @akcolor_05 }
    div.color_2 { background-color: @akcolor_06 }
    div.color_3 { background-color: @akcolor_07 }
    div.color_4 { background-color: @akcolor_08 }
    span { color: @akcolor_03 }
  }
}
</style>
