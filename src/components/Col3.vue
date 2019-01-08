<template>
  <div class="col_01">
    <div :id=cid class="chart"></div>
  </div>
</template>

<script>
import G2 from '@antv/g2'
export default {
  data () {
    return { colors: [ '#fff', 'rgba(71,141,222,.5)', '#4fc0fa' ], chart: {} }
  },
  props: { data: Array, cid: String },
  mounted () {
    this.chart = new G2.Chart({ container: this.cid, padding: [ 70, 10, 25, 40 ] })
    this.chart.source(this.data)
    this.chart.scale('y', { tickCount: 10, min: 0 })
    this.chart.axis('y', {
      line: { lineWidth: 2, stroke: this.colors[1] },
      grid: { lineStyle: { stroke: this.colors[1], lineWidth: 1, lineDash: [0, 0] } },
      label: { offset: 15, textStyle: { fontSize: 12, fill: this.colors[0] } }
    })
    this.chart.axis('x', {
      line: { lineWidth: 2, stroke: this.colors[1] },
      label: { offset: 15, textStyle: { fontSize: 12, fill: this.colors[0] } }
    })
    this.chart.intervalStack().position('x*y').size(10)
    this.chart.render()
  }
}
</script>

<style lang="less" scoped>
.col_01 {
  .chart { background-color: rgba(0,0,0,0)!important }
}
</style>
