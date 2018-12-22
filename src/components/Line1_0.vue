<template>
  <div class="line_01">
    <div class="box_title">{{ name }}</div>
    <v-chart class="chart" :appendPadding="[ 30, 80 ]" prevent-render @on-render=line1Chart></v-chart>
    <div class="after">{{ date }}</div>
  </div>
</template>

<script>
export default {
  props: { name: String, data: Array, colors: Array, date: String, cid: String },
  methods: {
    line1Chart ({ chart }) {
      chart.source(this.data)
      chart.scale('y', { min: 0 })
      chart.axis('y', {
        line: { lineWidth: 10, stroke: this.colors[this.colors.length - 1] },
        grid: { lineDash: null, lineWidth: 3, stroke: this.colors[this.colors.length - 1] },
        labelOffset: 30,
        label: { fontSize: 50, fill: '#fff' }
      })
      chart.axis('x', {
        line: { lineWidth: 10, stroke: this.colors[this.colors.length - 1] },
        labelOffset: 30,
        label: { fontSize: 50, fill: '#fff' }
      })
      chart.legend('type', {
        nameStyle: { fill: '#fff', fontSize: 50 },
        align: 'right',
        itemWidth: null,
        itemGap: 150,
        wordSpace: 20,
        marker (x, y, r, ctx) {
          ctx.lineWidth = 10
          ctx.strokeStyle = ctx.fillStyle
          ctx.moveTo(x - r - 80, y)
          ctx.lineTo(x + r, y)
          ctx.stroke()
          ctx.fill()
        }
      })
      chart.guide().text({
        position: ['min', 'max'],
        content: '%',
        style: { fill: '#fff', fontSize: 50, textAlign: 'left' },
        offsetX: -100,
        offsetY: -80
      })
      chart.line().position('x*y').color('type', this.colors).size(10)
      chart.render()
    }
  }
}
</script>

<style lang="less" scoped>
.line_01 { display: inline-block; width: 25%;
  .box_title { margin-top: 1.5em; margin-left: 1.5em; margin-bottom: .25em }
  .chart { background-color: rgba(0,0,0,0)!important }
  .after { font-size: .4em; color: @akcolor_02; text-align: center; margin-top: .25em }
}
</style>
