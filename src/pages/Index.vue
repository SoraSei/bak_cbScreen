<template>
  <div style="height:100%;">
    <div class="top_title"><img src="../assets/pic_logo.png"/>爱康智慧养老管理系统<router-link to="/list" class="right3">查看全部用户信息 ></router-link></div>
    <div class="br"></div>
    <div class="main1">
      <div class="left1">
        <div class="top box_bg">
          <div class="br"></div>
          <title1 class="title1" v-for="(item, i) in title1" :key=i :name=item.name :val=item.val :after=item.after></title1>
        </div>
        <div class="br"></div>
        <div class="main">
          <div class="left2 box_bg">
            <div class="br"></div>
            <pie1 class="pie1" :data=pie1 :colors=colors :name=pies[0] cid="pie1" ref="pie1"></pie1>
            <pie1 class="pie1" :data=pie2 :colors=colors :name=pies[1] cid="pie2" ref="pie2"></pie1>
            <pie1 class="pie1" :data=pie3 :colors=colors :name=pies[2] cid="pie3" ref="pie3"></pie1>
          </div><div class="right2 box_bg">
            <div class="br"></div>
            <div class="c">
              <div class="box_title">赤壁地图</div>
              <img src="../assets/pic_map.gif"/>
            </div>
          </div>
        </div>
      </div><div class="right1 box_bg">
        <div class="br"></div>
        <div class="c">
          <div class="box_title">实时监测数据</div>
          <div class="c1">
            <div class="list1" v-for="(item, i) in list1" :key=i>
              <span>{{ item.time }}</span><span>{{ item.name }}</span><span>{{ item.type }}</span><span>{{ item.val }}</span>
            </div>
          </div>
          <div style="position:relative">
            <img :src=btnimg1 class="btn" ref="sosnew" @click=showDialog2 />
            <div class="afterimg1" v-if="soswait === 0">暂无</div>
            <div class="afterimg2" v-else-if="soswait !== 0">{{ soswait }} 条</div>
          </div>
          <div class="box_title">爱康智慧养老中心值班人</div>
          <div class="list2" v-for="(item, i) in list2" :key=i>
            <img :src="item.img"/>
            <div>
              <span>{{ item.name }}</span>
              <span>( {{ item.type }} )</span>
              <div>联系方式：{{ item.tel }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="br"></div>
    <div class="main2">
      <col1 class="box_bg" :data=line1 :colors=colors :name=lines[0] :date=linedate cid="col1" ref="line1"></col1><col1 class="box_bg" :data=line2 :colors=colors :name=lines[1] :date=linedate cid="col2" ref="line2"></col1><line1 class="box_bg" :data=line3 :colors=colors :name=lines[2] :date=linedate cid="line1" ref="line3"></line1><line2 class="box_bg" :data=line4 :colors=colors :name=lines[3] :date=linedate cid="line2" ref="line4"></line2>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model=dialog1 class="dialog1" hide-on-blur @on-hide=closeDialog1>
        <div class="box_bg">
          <img class="close" src="../assets/pic_btn_close.png" @click="dialog1 = false"/>
          <img class="title2" src="../assets/pic_sos.png"/>
          <div><span>求助人：</span><span>{{ sosnew.name }}</span></div>
          <div><span>脉率：</span><span>{{ sosnew.val }}次/分</span></div>
          <div><span>地址：</span><span>{{ sosnew.add }}</span></div>
          <div><span>紧急联系人：</span><span>{{ sosnew.tel }}</span></div>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model=dialog2 class="dialog2" hide-on-blur>
        <div class="box_bg">
          <img class="close" src="../assets/pic_btn_close.png" @click="dialog2 = false"/>
          <img class="title2" src="../assets/pic_sos.png"/>
          <div class="list3_top">
            <span></span><span>求助人</span><span>脉率</span><span>地址</span><span>紧急联系人</span><span>发送时间</span><span></span>
          </div>
          <div class="list3" v-for="(item, i) in sos" :key=i>
            <span>{{ i + 1 }}</span><span>{{ item.name }}</span><span>{{ item.val }}次/分</span><span>{{ item.add }}</span><span>{{ item.tel }}</span><span>{{ item.time }}</span><span v-if="item.state === 1" @click=changeState(item.id)>未解决</span><span class="act" v-else-if="item.state === 0">已解决</span>
          </div>
        </div>
      </x-dialog>
    </div>
    <div class="br"></div>
  </div>
</template>

<script>
import title1 from '../components/Title1'
import pie1 from '../components/Pie1'
import col1 from '../components/Col1'
import line1 from '../components/Line1'
import line2 from '../components/Line2'
import { dateFormat } from 'vux'
let now = dateFormat(new Date(), 'YYYY.MM.DD')
let beforeWeek = dateFormat(new Date().getTime() - 6 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
let piePlus = function (arr) {
  let sum = 0
  let tmp = []
  for (let i in arr) {
    sum += arr[i].val
    tmp[i] = arr[i]
  }
  for (let i in tmp) {
    tmp[i].per = Number((tmp[i].val / sum).toFixed(2))
    tmp[i].perStr = (tmp[i].val / sum * 100).toFixed(0) + '%'
  }
  return tmp
}
export default {
  components: { title1, pie1, col1, line1, line2 },
  data () {
    return {
      socket: {},
      title1: [
        { name: '管理总人数', val: 1012, after: '人' },
        { name: '医护总人数', val: 99, after: '人' },
        { name: '监测总次数', val: 1194, after: '人/次' },
        { name: '总帮助人次', val: 168, after: '人/次' }
      ],
      dialog1: false,
      dialog2: false,
      btnimg1: require('../assets/pic_btn.png'),
      btnimg2: require('../assets/pic_btn_act.gif'),
      colors: [ '#36a2eb', '#ffcd56', '#ff6383', '#4bc0c0', '#4fc0fa' ],
      pies: [ '年龄分布图', '性别分布图', '在线人数图' ],
      pie1: [
        { item: '55岁及以下', val: 56 },
        { item: '56-65岁及以上', val: 121 },
        { item: '56-75岁及以上', val: 79 },
        { item: '76岁及以上', val: 101 }
      ],
      pie2: [{ item: '男', val: 379 }, { item: '女', val: 632 }],
      pie3: [{ item: '在线', val: 148 }, { item: '离线', val: 43 }],
      lines: [ '血压监测', '血糖监测', '心率监测', '运动监测' ],
      linedate: beforeWeek + ' - ' + now,
      line1: [
        { x: '周一', type: '异常', y: 38 },
        { x: '周二', type: '异常', y: 42 },
        { x: '周三', type: '异常', y: 59 },
        { x: '周四', type: '异常', y: 27 },
        { x: '周五', type: '异常', y: 48 },
        { x: '周六', type: '异常', y: 11 },
        { x: '周日', type: '异常', y: 39 },
        { x: '周一', type: '正常', y: null },
        { x: '周二', type: '正常', y: 188 },
        { x: '周三', type: '正常', y: 201 },
        { x: '周四', type: '正常', y: 233 },
        { x: '周五', type: '正常', y: 212 },
        { x: '周六', type: '正常', y: 189 },
        { x: '周日', type: '正常', y: 205 }
      ],
      line2: [
        { x: '周一', type: '异常', y: 38 },
        { x: '周二', type: '异常', y: 42 },
        { x: '周三', type: '异常', y: 59 },
        { x: '周四', type: '异常', y: 27 },
        { x: '周五', type: '异常', y: 48 },
        { x: '周六', type: '异常', y: 11 },
        { x: '周日', type: '异常', y: 39 },
        { x: '周一', type: '正常', y: 162 },
        { x: '周二', type: '正常', y: 188 },
        { x: '周三', type: '正常', y: 201 },
        { x: '周四', type: '正常', y: 233 },
        { x: '周五', type: '正常', y: 212 },
        { x: '周六', type: '正常', y: 189 },
        { x: '周日', type: '正常', y: 205 }
      ],
      line3: [
        { x: '周一', type: '正常', y: 262 },
        { x: '周二', type: '正常', y: 288 },
        { x: '周三', type: '正常', y: 271 },
        { x: '周四', type: '正常', y: 253 },
        { x: '周五', type: '正常', y: 262 },
        { x: '周六', type: '正常', y: 289 },
        { x: '周日', type: '正常', y: 245 },
        { x: '周一', type: '异常', y: 38 },
        { x: '周二', type: '异常', y: 12 },
        { x: '周三', type: '异常', y: 29 },
        { x: '周四', type: '异常', y: 47 },
        { x: '周五', type: '异常', y: 38 },
        { x: '周六', type: '异常', y: 11 },
        { x: '周日', type: '异常', y: 55 }
      ],
      line4: [
        { x: '周一', type: '55-65岁', y: 4888 },
        { x: '周一', type: '66-75岁', y: 3620 },
        { x: '周一', type: '76岁及以上', y: 2621 },
        { x: '周二', type: '55-65岁', y: 5688 },
        { x: '周二', type: '66-75岁', y: 4320 },
        { x: '周二', type: '76岁及以上', y: 3121 },
        { x: '周三', type: '55-65岁', y: 5888 },
        { x: '周三', type: '66-75岁', y: 4620 },
        { x: '周三', type: '76岁及以上', y: 3621 },
        { x: '周四', type: '55-65岁', y: 6211 },
        { x: '周四', type: '66-75岁', y: 5121 },
        { x: '周四', type: '76岁及以上', y: 3481 },
        { x: '周五', type: '55-65岁', y: 5998 },
        { x: '周五', type: '66-75岁', y: 4620 },
        { x: '周五', type: '76岁及以上', y: 2621 },
        { x: '周六', type: '55-65岁', y: 5868 },
        { x: '周六', type: '66-75岁', y: 4620 },
        { x: '周六', type: '76岁及以上', y: 3427 },
        { x: '周日', type: '55-65岁', y: 6081 },
        { x: '周日', type: '66-75岁', y: 4920 },
        { x: '周日', type: '76岁及以上', y: 3991 }
      ],
      lists: [ '实时监测数据', '新世界百货社区值班人' ],
      list1: [
        { time: '12:00', name: '李金哲', type: '血压', val: '130/78mmHg' },
        { time: '12:00', name: '李金哲', type: '心率', val: '78次/分' },
        { time: '12:00', name: '李金哲', type: '空腹血糖', val: '6.5mol/l' },
        { time: '12:00', name: '李金哲', type: '餐后2小时血糖', val: '6.5mol/l' },
        { time: '12:00', name: '李金哲', type: '血压', val: '130/78mmHg' },
        { time: '12:00', name: '李金哲', type: '血压', val: '130/78mmHg' },
        { time: '12:00', name: '李金哲', type: '空腹血糖', val: '6.5mol/l' },
        { time: '12:00', name: '李金哲', type: '餐后2小时血糖', val: '6.5mol/l' },
        { time: '12:00', name: '李金哲', type: '血压', val: '130/78mmHg' },
        { time: '12:00', name: '李金哲', type: '血压', val: '130/78mmHg' }
      ],
      list2: [
        { img: require('../assets/pic_woman_1.png'), name: '汪方', type: '在班', tel: '13277159293' },
        { img: require('../assets/pic_woman_2.png'), name: '黄丹', type: '在班', tel: '15271303299' }
      ],
      sos: [
        { name: '李金哲', val: 130, add: '新世界百货小区', tel: '17238747745', time: '2018.07.09 17:27', state: 0 },
        { name: '李金哲', val: 130, add: '新世界百货小区', tel: '17238747745', time: '2018.07.09 17:27', state: 0 },
        { name: '李金哲', val: 130, add: '新世界百货小区', tel: '17238747745', time: '2018.07.09 17:27', state: 0 },
        { name: '李金哲', val: 130, add: '新世界百货小区', tel: '17238747745', time: '2018.07.09 17:27', state: 0 },
        { name: '李金哲', val: 130, add: '新世界百货小区', tel: '17238747745', time: '2018.07.09 17:27', state: 1 }
      ],
      sosnew: { name: '李金哲', val: 130, add: '新世界百货小区', tel: '17238747745', time: '2018.07.09 17:27', state: 1 },
      soswait: 0
    }
  },
  methods: {
    changeState (id) {
      this.ajaxform('/chronic/cbScreenData/doHandleSOS', { id: id }).then(res => {
        if (res.retcode === '0000') {
          console.log('修改状态')
          this.ajaxform('/chronic/cbScreenData/selectSOSList').then(res => {
            if (res.retcode === '0000') {
              console.log('sos列表')
              this.sos = []
              this.sos = res.body
              for (let i in this.sos) this.sos[i].time = dateFormat(this.sos[i].time, 'YYYY.MM.DD HH:mm')
            }
          })
          this.ajaxform('/chronic/cbScreenData/selectSOSDataCount').then(res => {
            if (res.retcode === '0000') {
              console.log('总帮助人次')
              this.soswait = res.body.unhandleCount
              if (this.soswait !== 0) this.$refs.sosnew.src = this.btnimg2
              else this.$refs.sosnew.src = this.btnimg1
              this.title1[3].val = res.body.handledCount
            }
          })
        }
      })
    },
    showDialog2 () {
      this.dialog2 = true
      this.ajaxform('/chronic/cbScreenData/selectSOSList').then(res => {
        if (res.retcode === '0000') {
          console.log('sos列表')
          this.sos = []
          this.sos = res.body
          for (let i in this.sos) this.sos[i].time = dateFormat(this.sos[i].time, 'YYYY.MM.DD HH:mm')
        }
      })
    },
    closeDialog1 () {
      let that = this.$refs.sosnew
      let pic = this.btnimg1
      let timer1 = setInterval(function () {
        that.src = pic
        clearInterval(timer1)
      }, 5000)
    },
    sOpen () { console.log('connect success!') },
    sError (e) { console.log('error: ' + e) },
    sMessage (evt) {
      console.log('server says: ' + evt.data)
      // document.getElementById('serverMsg').innerHTML = evt.data
      this.$refs.sosnew.src = this.btnimg2
      this.soswait += 1
      this.title1[3].val += 1
      let data = eval('(' + evt.data + ')')
      this.sosnew = data
      this.dialog1 = true
    },
    sClose (e) { console.log('connect closed:' + e.code) },
    Send () { this.socket.send('send message!') },
    Close () { this.socket.close() }
  },
  created () {
    this.ajaxform('/chronic/cbScreenData/getNettyWebSocketServer').then(res => {
      if (res.retcode === '0000') {
        try {
          this.socket = new WebSocket(res.body)
        } catch (e) {
          console.log('error')
          return
        }
        this.socket.onopen = this.sOpen
        this.socket.onerror = this.sError
        this.socket.onmessage = this.sMessage
        this.socket.onclose = this.sClose
      }
    })
    /*
    try {
      this.socket = new WebSocket('ws://192.168.1.103:8331/ws')
    } catch (e) {
      console.log('error')
      return
    }
    this.socket.onopen = this.sOpen
    this.socket.onerror = this.sError
    this.socket.onmessage = this.sMessage
    this.socket.onclose = this.sClose
    */
    this.ajaxform('/chronic/cbScreenData/cbmonitorData').then(res => {
      if (res.retcode === '0000') {
        console.log('实时监测')
        this.list1 = []
        this.list1 = res.body
      }
    })
    this.ajaxform('/chronic/cbScreenData/selectSOSDataCount').then(res => {
      if (res.retcode === '0000') {
        console.log('总帮助人次')
        this.soswait = res.body.unhandleCount
        if (this.soswait !== 0) this.$refs.sosnew.src = this.btnimg2
        else this.$refs.sosnew.src = this.btnimg1
        this.title1[3].val = res.body.handledCount
      }
    })
    this.ajaxform('/chronic/cbScreenData/totalMonitorTimes').then(res => {
      if (res.retcode === '0000') {
        console.log('监测总次数')
        this.title1[2].val = res.body
      }
    })
    this.ajaxform('/chronic/cbScreenData/selectPatientCount').then(res => {
      if (res.retcode === '0000') {
        console.log('管理总人数')
        this.title1[0].val = res.body
      }
    })
    this.ajaxform('/chronic/cbScreenData/selectPatientAgeStat').then(res => {
      if (res.retcode === '0000') {
        console.log('年龄分布图')
        this.pie1 = []
        this.pie1 = res.body
        this.$refs.pie1.chart.changeData(piePlus(this.pie1))
      }
    })
    this.ajaxform('/chronic/cbScreenData/selectPatientSexStat').then(res => {
      if (res.retcode === '0000') {
        console.log('性别分布图')
        this.pie2 = []
        this.pie2 = res.body
        this.$refs.pie2.chart.changeData(piePlus(this.pie2))
      }
    })
    this.ajaxform('/chronic/cbScreenData/selectOnlineStat').then(res => {
      if (res.retcode === '0000') {
        console.log('在线人数图')
        this.pie3 = []
        this.pie3 = res.body
        this.$refs.pie3.chart.changeData(piePlus(this.pie3))
      }
    })
    this.ajaxform('/chronic/cbScreenData/bloodPressureW').then(res => {
      if (res.retcode === '0000') {
        console.log('血压')
        this.line1 = []
        this.line1 = res.body
        this.$refs.line1.chart.changeData(this.line1)
      }
    })
    this.ajaxform('/chronic/cbScreenData/bloodSugarW').then(res => {
      if (res.retcode === '0000') {
        console.log('血糖')
        this.line2 = []
        this.line2 = res.body
        this.$refs.line2.chart.changeData(this.line2)
      }
    })
    this.ajaxform('/chronic/cbScreenData/heartReateW').then(res => {
      if (res.retcode === '0000') {
        console.log('心率')
        this.line3 = []
        this.line3 = res.body
        this.$refs.line3.chart.changeData(this.line3)
      }
    })
    this.ajaxform('/chronic/cbScreenData/sportStepW').then(res => {
      if (res.retcode === '0000') {
        console.log('运动')
        this.line4 = []
        this.line4 = res.body
        this.$refs.line4.chart.changeData(this.line4)
      }
    })
  },
  mounted () {
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(function () {
        location.reload()
      }, 10000)
    }
  },
  beforeDestory () {
    clearInterval(this.timer)
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.main1 { margin: 0 2%; width: 96%; height: 48%;
  .left1 { width: 74.2%; height: 100%; margin-right: 1.6%; vertical-align: top; display: inline-block;
    .br { height: 4% }
    .top { height: 23%; text-align: center;
      .br { height: 15% }
      .title1 { width: 20%; height: 70%; padding: 0 2%; border-right: .2em solid @akcolor_03;
        &:last-child { border-right: none }
      }
    }
    .main { height: 73%;
      .left2 { width: 68.2%; height: 100%; margin-right: 1.6%; vertical-align: top; text-align: center; display: inline-block;
        .br { height: 6% }
        .pie1 { width: 30%; height: 88%; vertical-align: top; }
      }
      .right2 { width: 30.2%; height: 100%; vertical-align: top; display: inline-block;
        .br { height: 6% }
        .c { width: 90%; height: 88%; margin: 0 5%;
          img { max-width: 100%; max-height: 90%; display: flex; margin: 0 auto }
        }
      }
    }
  }
  .right1 { width: 24.2%; height: 100%; vertical-align: top; display: inline-block;
    .br { height: 6% }
    .c { width: 90%; height: 88%; margin: 0 5%; color: @akcolor_03;
      .c1 { height: 45%; overflow-y: auto; overflow-x: hidden;
        .list1 { font-size: .5em; margin: .5em 0;
          span{ display: inline-block; vertical-align: middle;
            &:nth-child(1) { width: 20% }
            &:nth-child(2) { width: 20% }
            &:nth-child(3) { width: 30% }
            &:nth-child(4) { width: 30% }
          }
        }
      }
      .btn { width: 90%; margin: .5em 5% 0 5% }
      .afterimg1 { color: @akcolor_09; font-weight: bold; position: absolute; right: 4.5em; top: 50%; transform: translate(0,-50%) }
      .afterimg2 { color: @akcolor_02; font-weight: bold; position: absolute; right: 4.5em; top: 50%; transform: translate(0,-50%) }
      .list2 { font-size: 0.5em; margin: 1em 0;
        img { display: inline-block; vertical-align: top; margin-right: .5em; height: 3.5em }
        img+div { display: inline-block }
      }
    }
  }
}
.main2 { margin: 0 2%; width: 96%; height: 34%;
  .box_bg { width: 23.875%!important; margin-right: 1.5%; height: 100%;
    &:last-child { margin-right: 0 }
  }
}
.dialog1 .box_bg { background-color: @akcolor_01; padding: 2.5em 1em; color: @akcolor_02;
  .close { height: .75em; position: absolute; top: 1.5em; right: 1.5em }
  .title2 { height: 3em; margin-bottom: 1em }
  div span { display: inline-block; vertical-align: middle;
    &:nth-child(1) { width: 50%; text-align: right; }
    &:nth-child(2) { width: 50%; text-align: left; }
  }
}
.dialog2 .box_bg { background-color: @akcolor_01; padding: 2.5em 1em; color: @akcolor_02; overflow-y: auto;
  .close { height: .75em; position: absolute; top: 1.5em; right: 1.5em }
  .title2 { height: 2em; margin-bottom: .5em }
  .list3_top { margin: .5em 0; color: @akcolor_03;
    span{ display: inline-block; vertical-align: middle;
      &:nth-child(1) { width: 5% }
      &:nth-child(2) { width: 10% }
      &:nth-child(3) { width: 10% }
      &:nth-child(4) { width: 25% }
      &:nth-child(5) { width: 15% }
      &:nth-child(6) { width: 20% }
      &:nth-child(7) { width: 15% }
    }
  }
  .list3 { margin: .5em 0;
    span{ display: inline-block; vertical-align: middle;
      &:nth-child(1) { width: 5%; color: @akcolor_03 }
      &:nth-child(2) { width: 10% }
      &:nth-child(3) { width: 10% }
      &:nth-child(4) { width: 25% }
      &:nth-child(5) { width: 15% }
      &:nth-child(6) { width: 20% }
      &:nth-child(7) { width: 10%; background-color: @akcolor_11; border: 1px solid @akcolor_10 }
    }
    span.act { display: inline-block; color: @akcolor_09; border-color: @akcolor_09 }
  }
}
</style>
