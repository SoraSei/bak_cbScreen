<template>
  <div class="line_01">
    <div class="box_title">{{ name }}</div>
    <div :id=cid class="chart"></div>
    <div class="after">{{ date }}</div>
  </div>
</template>

<script>
import G2 from '@antv/g2'
export default {
  data () {
    return { chart: {} }
  },
  props: { name: String, data: Array, colors: Array, date: String, cid: String },
  mounted () {
    this.chart = new G2.Chart({ container: this.cid, forceFit: true, height: document.getElementById(this.cid).offsetHeight, padding: [ 40, 20, 40, 50 ] })
    this.chart.source(this.data)
    this.chart.scale('y', { min: 0 })
    this.chart.axis('y', {
      line: { lineWidth: 3, stroke: this.colors[this.colors.length - 1] },
      grid: { lineStyle: { stroke: this.colors[this.colors.length - 1], lineWidth: 1, lineDash: [0, 0] } },
      label: { offset: 15, textStyle: { fontSize: 12, fill: '#fff' } }
    })
    this.chart.axis('x', {
      line: { lineWidth: 3, stroke: this.colors[this.colors.length - 1] },
      label: { offset: 15, textStyle: { fontSize: 12, fill: '#fff' } }
    })
    this.chart.legend({
      position: 'top-right',
      clickable: false,
      textStyle: { fill: '#fff', fontSize: 12 }
    })
    this.chart.guide().text({
      position: ['min', 'max'],
      content: '%',
      style: { fill: '#fff', fontSize: 12 },
      offsetX: -50,
      offsetY: -20
    })
    this.chart.line().position('x*y').color('type', this.colors).size(3)
    this.chart.render()
  }
}
</script>

<style lang="less" scoped>
.line_01 { display: inline-block; width: 25%;
  .box_title { margin-top: 1.5em; margin-left: 1.5em; margin-bottom: .25em }
  .chart { background-color: rgba(0,0,0,0)!important; height: 70%; overflow: hidden }
  .after { font-size: .4em; color: @akcolor_02; text-align: center; margin-top: .25em }
}
</style>
