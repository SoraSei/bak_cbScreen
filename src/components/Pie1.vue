<template>
  <div class="pie_01">
    <div class="box_title">{{ name }}</div>
    <div :id=cid class="chart"></div>
  </div>
</template>

<script>
import G2 from '@antv/g2'
export default {
  data () {
    return { tmp: [], chart: {} }
  },
  props: { name: String, data: Array, colors: Array, cid: String },
  methods: {
  },
  created () {
    let sum = 0
    for (let i in this.data) {
      sum += this.data[i].val
      this.tmp[i] = this.data[i]
    }
    for (let i in this.tmp) {
      this.tmp[i].per = Number((this.tmp[i].val / sum).toFixed(2))
      this.tmp[i].perStr = (this.tmp[i].val / sum * 100).toFixed(0) + '%'
    }
  },
  mounted () {
    this.chart = new G2.Chart({ container: this.cid })
    this.chart.source(this.tmp)
    this.chart.coord('theta')
    this.chart.tooltip({ showTitle: false })
    this.chart.legend({
      position: 'bottom',
      itemGap: 20,
      marker: 'square',
      textStyle: { fill: '#fff', fontSize: 25 }
    })
    this.chart.intervalStack().position('per').color('item', this.colors).style({ lineWidth: 3, stroke: '#fff' })
      .label('perStr', { offset: -80, autoRotate: false, textStyle: { fill: '#fff', fontSize: 50, fontWeight: 'bold', textAlign: 'center' } })
      .tooltip(false)
    this.chart.render()
  }
}
</script>

<style lang="less" scoped>
.pie_01 { display: inline-block; text-align: left;
  .box_title { margin-bottom: .25em }
  .chart { background-color: rgba(0,0,0,0)!important }
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
