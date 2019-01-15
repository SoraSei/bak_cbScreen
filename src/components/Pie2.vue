<template>
  <div class="pie_01">
    <div :id=cid class="chart"></div>
  </div>
</template>

<script>
import G2 from '@antv/g2'
export default {
  data () {
    return { colors: [ '#4fc0fa', 'rgba(71,141,222,.5)' ], chart: {} }
  },
  props: { data: Array, cid: String },
  methods: {

  },
  mounted () {
    this.chart = new G2.Chart({ container: this.cid, padding: [ 50, 0, 0, 0 ] })
    this.chart.source(this.data)
    this.chart.coord('theta', { radius: 1, innerRadius: 0.8 })
    this.chart.tooltip({ showTitle: false })
    this.chart.intervalStack().position('per').color('item', this.colors)
      .tooltip(false)
    this.chart.render()
  }
}
</script>

<style lang="less" scoped>
.pie_01 {
  .chart { background-color: rgba(0,0,0,0)!important }
}
</style>
