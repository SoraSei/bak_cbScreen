<template>
  <div style="height:100%;">
    <div class="top_title"><img src="../assets/pic_count.png"/>用户信息统计<router-link to="/list" class="left3"><img src="../assets/pic_back.png"/>返回</router-link></div>
    <div class="br"></div>
    <div class="main1" v-if="patient.name">{{ patient.name }}<span v-if="patient.sex">{{ patient.sex }}</span><span v-if="patient.age">{{ patient.age }}岁</span><span v-if="patient.tel">联系方式：{{ patient.tel }}</span><span v-if="patient.address">{{ patient.address }}</span></div>
    <div class="main2">
      <div class="box_bg">
        <div class="box_title">心率</div>
        <div class="tabs">
          <span v-for="(item, i) in hearttab" :key=i @click="heartpage = i" :class="{ act: i === heartpage }">{{ item }}</span>
        </div>
        <div class="aftertabs">
          <div v-show="heartpage === 0">
            <div class="time"><span @click=preHeartTime1><</span><span>{{ hearttime1 }}</span><span @click=nextHeartTime1>></span></div>
            <line3 :data=heartday cid="heart1" ref="heart1"></line3>
          </div>
          <div v-show="heartpage === 1">
            <div class="time"><span @click=preHeartTime2><</span><span>{{ hearttime21 }} - {{ hearttime22 }}</span><span @click=nextHeartTime2>></span></div>
            <col2 :data=heartweek cid="heart2" ref="heart2"></col2>
          </div>
          <div v-show="heartpage === 2">
            <div class="time"><span @click=preHeartTime3><</span><span>{{ hearttime3 }}</span><span @click=nextHeartTime3>></span></div>
            <col2 :data=heartmonth cid="heart3" ref="heart3"></col2>
          </div>
        </div>
      </div><div class="box_bg">
        <div class="box_title">步数</div>
        <div class="tabs">
          <span v-for="(item, i) in steptab" :key=i @click="steppage = i" :class="{ act: i === steppage }">{{ item }}</span>
        </div>
        <div class="aftertabs">
          <div v-show="steppage === 0">
            <div class="time"><span @click=preStepTime1><</span><span>{{ steptime1 }}</span><span @click=nextStepTime1>></span></div>
            <div class="label"><div>{{ stepday.now }}</div>目标步数<br>{{ stepday.total }}</div>
            <pie2 :data=stepdayper cid="step1" ref="step1"></pie2>
          </div>
          <div v-show="steppage === 1">
            <div class="time"><span @click=preStepTime2><</span><span>{{ steptime21 }} - {{ steptime22 }}</span><span @click=nextStepTime2>></span></div>
            <col3 :data=stepweek cid="step2" ref="step2"></col3>
          </div>
          <div v-show="steppage === 2">
            <div class="time"><span @click=preStepTime3><</span><span>{{ steptime3 }}</span><span @click=nextStepTime3>></span></div>
            <col3 :data=stepmonth cid="step3" ref="step3"></col3>
          </div>
        </div>
      </div>
    </div>
    <div class="br"></div>
    <div class="main3">
      <div class="box_bg">
        <div class="box_title">血压（mmHg）</div>
        <div style="height:75%;">
          <div class="left1 lv">
            <div v-for="(item, i) in pressurelv" :key=i>
              <div :class="'color'+i">{{ item.txt }}</div>
              <div>收缩：{{ item.val2 }}</div>
              <div>舒张：{{ item.val1 }}</div>
            </div>
          </div><div v-if="pressureshow" class="center1 main4">
          <div class="line_1">{{ pressureshow.time }}</div>
          <div class="left4">
            <div class="line_2">舒张压（次/分）</div>
            <div class="line_3">{{ pressureshow.sz }}</div>
          </div><div class="right4">
            <div class="line_2">收缩压（次/分）</div>
            <div class="line_3">{{ pressureshow.ss }}</div>
          </div>
          <div class="line_4" v-for="(item, i) in pressurelv" :key=i v-if="item.txt === pressureshow.result" :class="'color'+i">{{ pressureshow.result }}</div>
          </div><div v-else class="center1 main4">暂无数据</div><div class="right1 list">
            <div>全部数据</div>
            <div class="list1">
              <div class="list1item" v-for="(item, i) in pressurelist" :key=i @click=pressurelistchange(i) :class="{ act: item.isAct }">
                <span>{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div><div class="box_bg">
        <div class="box_title">血糖（mmol/L）</div>
        <div style="height:75%;">
          <div class="left2 lv">
            <div v-for="(item, i) in sugarlv" :key=i>
              <div :class="'color'+i">{{ item.txt }}</div>
              <div v-if="item.val1">空腹：{{ item.val1 }}</div>
              <div v-if="item.val2">餐后2小时：{{ item.val2 }}</div>
            </div>
          </div><div v-if="sugarshow" class="center2 main4">
            <div class="line_1">{{ sugarshow.time }}</div>
            <div class="line_2">{{ sugarshow.type }}</div>
            <div class="line_3">{{ sugarshow.val }}</div>
            <div class="line_4" v-for="(item, i) in sugarlv" :key=i v-if="item.txt === sugarshow.result" :class="'color'+i">{{ sugarshow.result }}</div>
          </div><div v-else class="center1 main4">暂无数据</div><div class="right2 list">
            <div>全部数据</div>
            <div class="list1">
              <div class="list1item" v-for="(item, i) in sugarlist" :key=i @click=sugarlistchange(i) :class="{ act: item.isAct }">
                <span>{{ item.time }}</span><span v-if="item.type === '空腹血糖'">空腹</span><span v-else-if="item.type === '餐后2小时血糖'">餐后</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="br"></div>
  </div>
</template>

<script>
import { dateFormat } from 'vux'
import line3 from '../components/Line3'
import pie2 from '../components/Pie2'
import col2 from '../components/Col2'
import col3 from '../components/Col3'
let mon = (d) => dateFormat(d.getTime() - (d.getDay() - 1) * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
let sun = (d) => dateFormat(d.getTime() - (d.getDay() - 7) * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
let piedata2pre = function (data) {
  let tmp = [ { item: '已完成', per: 0, perStr: '0%' }, { item: '未完成', per: 0, perStr: '0%' } ]
  tmp[0].per = Number((data.now / data.total).toFixed(2))
  tmp[1].per = Number(((data.total - data.now) / data.total).toFixed(2))
  tmp[0].perStr = (data.now / data.total * 100).toFixed(0) + '%'
  tmp[1].perStr = ((data.total - data.now) / data.total * 100).toFixed(0) + '%'
  return tmp
}
export default {
  components: { line3, pie2, col2, col3 },
  data () {
    return {
      patient: { name: '测试', sex: '测试', age: 50, tel: '测试', address: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试' },
      hearttab: [ '日', '周', '月' ],
      steptab: [ '日', '周', '月' ],
      heartpage: 0,
      steppage: 0,
      hearttime1: dateFormat(new Date(), 'YYYY.MM.DD'),
      hearttime21: mon(new Date()),
      hearttime22: sun(new Date()),
      hearttime3: dateFormat(new Date(), 'YYYY.MM'),
      steptime1: dateFormat(new Date(), 'YYYY.MM.DD'),
      steptime21: mon(new Date()),
      steptime22: sun(new Date()),
      steptime3: dateFormat(new Date(), 'YYYY.MM'),
      heartday: [
        { x: '00:00', y: null, type: '心率' },
        { x: '01:03', y: 800, type: '心率' },
        { x: '01:05', y: 500, type: '心率' },
        { x: '14:01', y: 800, type: '心率' },
        { x: '24:00', y: 800, type: '心率' }
      ],
      heartweek: [
        { x: '周一', y: [76, 100], type: '心率' },
        { x: '周二', y: [56, 108], type: '心率' },
        { x: '周三', y: [38, 129], type: '心率' },
        { x: '周四', y: [58, 155], type: '心率' },
        { x: '周五', y: null, type: '心率' },
        { x: '周六', y: [23, 99], type: '心率' },
        { x: '周日', y: [18, 56], type: '心率' }
      ],
      heartmonth: [
        { x: 1, y: [76, 100], type: '心率' },
        { x: 2, y: [56, 108], type: '心率' },
        { x: 3, y: [38, 129], type: '心率' },
        { x: 4, y: [58, 155], type: '心率' },
        { x: 31, y: [18, 56], type: '心率' }
      ],
      stepday: { now: 6000, total: 7000 },
      stepdayper: [
        { item: '已完成', per: 0.25, perStr: '25%' },
        { item: '未完成', per: 0.75, perStr: '75%' }
      ],
      stepweek: [
        { x: '周一', y: 380, type: '步数' },
        { x: '周二', y: 800, type: '步数' },
        { x: '周三', y: 800, type: '步数' },
        { x: '周四', y: 800, type: '步数' },
        { x: '周五', y: null, type: '步数' },
        { x: '周六', y: 800, type: '步数' },
        { x: '周日', y: 800, type: '步数' }
      ],
      stepmonth: [
        { x: 1, y: 380, type: '步数' },
        { x: 2, y: 800, type: '步数' },
        { x: 3, y: 1800, type: '步数' },
        { x: 7, y: 800, type: '步数' },
        { x: 10, y: null, type: '步数' },
        { x: 31, y: 800, type: '步数' }
      ],
      pressurelv: [
        { txt: '正常血压', val2: '<=140', val1: '<=90' },
        { txt: '轻度高血压', val2: '141~160', val1: '91~100' },
        { txt: '中度高血压', val2: '161~180', val1: '101~110' },
        { txt: '严重高血压', val2: '>180', val1: '>110' }
      ],
      pressurelv1: [ 140, 160, 180 ],
      pressurelv2: [ 90, 100, 110 ],
      sugarlv: [
        { txt: '正常血糖', val1: '<6.1', val2: '<7.8' },
        { txt: '空腹血糖受损(IFG)', val1: '6.1~6.9', val2: null },
        { txt: '糖耐量减低(IGT)', val1: null, val2: '7.8~11.0' },
        { txt: '糖尿病', val1: '>=7.0', val2: '>=11.1' }
      ],
      sugarlv1: [ 6.1, 7 ],
      sugarlv2: [ 7.8, 11.1 ],
      pressureshow: { time: '2018.07.09 17:27', sz: 80, ss: 130, result: '中度高血压' },
      sugarshow: { time: '2018.07.09 17:27', val: 6.8, type: '空腹血糖', result: '空腹血糖受损(IFG)' },
      pressurelist: [
        { time: '2018.07.09 17:27', sz: 80, ss: 130, result: '轻度高血压' },
        { time: '2018.07.09 17:27', sz: 80, ss: 130, result: '正常血压' }
      ],
      sugarlist: [
        { time: '2018.07.09 17:27', type: '空腹血糖', val: 3, result: '正常血糖' },
        { time: '2018.07.09 17:27', type: '餐后血糖', val: 6.8, result: '糖尿病' }
      ]
    }
  },
  methods: {
    preHeartTime1 () {
      this.hearttime1 = dateFormat(new Date(this.hearttime1).getTime() - 1 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      let paramday = {
        patientId: this.$route.query.patientId,
        selDay: this.hearttime1
      }
      this.ajaxform('/chronic/cbScreenData/heartDay', paramday).then(res => {
        if (res.retcode === '0000') {
          this.heartday = res.body
          for(let i in this.heartday) this.heartday[i].type = '心率'
          this.$refs.heart1.chart.changeData(this.heartday)
        }
      })
    },
    preHeartTime2 () {
      this.hearttime21 = dateFormat(new Date(this.hearttime21).getTime() - 7 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      this.hearttime22 = dateFormat(new Date(this.hearttime22).getTime() - 7 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      let paramweek = {
        patientId: this.$route.query.patientId,
        startDate: this.hearttime21,
        endDate: this.hearttime22
      }
      this.ajaxform('/chronic/cbScreenData/heartWeek', paramweek).then(res => {
        if (res.retcode === '0000') {
          this.heartweek = res.body
          for(let i in this.heartweek) this.heartweek[i].type = '心率'
          this.$refs.heart2.chart.changeData(this.heartweek)
        }
      })
    },
    preHeartTime3 () {
      let year = new Date(this.hearttime3).getFullYear()
      let month = new Date(this.hearttime3).getMonth()
      if (month !== 0) this.hearttime3 = year + '.' + month
      else this.hearttime3 = (year - 1) + '.12'
      let parammonth = {
        patientId: this.$route.query.patientId,
        selMonth: dateFormat(this.hearttime3, 'YYYY.MM')
      }
      this.ajaxform('/chronic/cbScreenData/heartMonth', parammonth).then(res => {
        if (res.retcode === '0000') {
          this.heartmonth = res.body
          for(let i in this.heartmonth) this.heartmonth[i].type = '心率'
          this.$refs.heart3.chart.changeData(this.heartmonth)
        }
      })
    },
    nextHeartTime1 () {
      this.hearttime1 = dateFormat(new Date(this.hearttime1).getTime() + 1 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      let paramday = {
        patientId: this.$route.query.patientId,
        selDay: this.hearttime1
      }
      this.ajaxform('/chronic/cbScreenData/heartDay', paramday).then(res => {
        if (res.retcode === '0000') {
          this.heartday = res.body
          for(let i in this.heartday) this.heartday[i].type = '心率'
          this.$refs.heart1.chart.changeData(this.heartday)
        }
      })
    },
    nextHeartTime2 () {
      this.hearttime21 = dateFormat(new Date(this.hearttime21).getTime() + 7 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      this.hearttime22 = dateFormat(new Date(this.hearttime22).getTime() + 7 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      let paramweek = {
        patientId: this.$route.query.patientId,
        startDate: this.hearttime21,
        endDate: this.hearttime22
      }
      this.ajaxform('/chronic/cbScreenData/heartWeek', paramweek).then(res => {
        if (res.retcode === '0000') {
          this.heartweek = res.body
          for(let i in this.heartweek) this.heartweek[i].type = '心率'
          this.$refs.heart2.chart.changeData(this.heartweek)
        }
      })
    },
    nextHeartTime3 () {
      let year = new Date(this.hearttime3).getFullYear()
      let month = new Date(this.hearttime3).getMonth()
      if (month !== 11) this.hearttime3 = year + '.' + (month + 2)
      else this.hearttime3 = (year + 1) + '.1'
      let parammonth = {
        patientId: this.$route.query.patientId,
        selMonth: dateFormat(this.hearttime3, 'YYYY.MM')
      }
      this.ajaxform('/chronic/cbScreenData/heartMonth', parammonth).then(res => {
        if (res.retcode === '0000') {
          this.heartmonth = res.body
          for(let i in this.heartmonth) this.heartmonth[i].type = '心率'
          this.$refs.heart3.chart.changeData(this.heartmonth)
        }
      })
    },
    preStepTime1 () {
      this.steptime1 = dateFormat(new Date(this.steptime1).getTime() - 1 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      let paramday = {
        patientId: this.$route.query.patientId,
        selDay: this.steptime1
      }
      this.ajaxform('/chronic/cbScreenData/stepDay', paramday).then(res => {
        if (res.retcode === '0000') {
          this.stepday = res.body[0]
          if (this.stepday.total > 0) {
            this.stepdayper = piedata2pre(this.stepday)
            this.$refs.step1.chart.changeData(this.stepdayper)
          }
        }
      })
    },
    preStepTime2 () {
      this.steptime21 = dateFormat(new Date(this.steptime21).getTime() - 7 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      this.steptime22 = dateFormat(new Date(this.steptime22).getTime() - 7 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      let paramweek = {
        patientId: this.$route.query.patientId,
        startDate: this.steptime21,
        endDate: this.steptime22
      }
      this.ajaxform('/chronic/cbScreenData/stepWeek', paramweek).then(res => {
        if (res.retcode === '0000') {
          this.stepweek = res.body
          for(let i in this.stepweek) this.stepweek[i].type = '步数'
          this.$refs.step2.chart.changeData(this.stepweek)
        }
      })
    },
    preStepTime3 () {
      let year = new Date(this.steptime3).getFullYear()
      let month = new Date(this.steptime3).getMonth()
      if (month !== 0) this.steptime3 = year + '.' + month
      else this.steptime3 = (year - 1) + '.12'
      let parammonth = {
        patientId: this.$route.query.patientId,
        selMonth: dateFormat(this.steptime3, 'YYYY.MM')
      }
      this.ajaxform('/chronic/cbScreenData/stepMonth', parammonth).then(res => {
        if (res.retcode === '0000') {
          this.stepmonth = res.body
          for(let i in this.stepmonth) this.stepmonth[i].type = '步数'
          this.$refs.step3.chart.changeData(this.stepmonth)
        }
      })
    },
    nextStepTime1 () {
      this.steptime1 = dateFormat(new Date(this.steptime1).getTime() + 1 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      let paramday = {
        patientId: this.$route.query.patientId,
        selDay: this.steptime1
      }
      this.ajaxform('/chronic/cbScreenData/stepDay', paramday).then(res => {
        if (res.retcode === '0000') {
          this.stepday = res.body[0]
          if (this.stepday.total > 0) {
            this.stepdayper = piedata2pre(this.stepday)
            this.$refs.step1.chart.changeData(this.stepdayper)
          }
        }
      })
    },
    nextStepTime2 () {
      this.steptime21 = dateFormat(new Date(this.steptime21).getTime() + 7 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      this.steptime22 = dateFormat(new Date(this.steptime22).getTime() + 7 * 24 * 60 * 60 * 1000, 'YYYY.MM.DD')
      let paramweek = {
        patientId: this.$route.query.patientId,
        startDate: this.steptime21,
        endDate: this.steptime22
      }
      this.ajaxform('/chronic/cbScreenData/stepWeek', paramweek).then(res => {
        if (res.retcode === '0000') {
          this.stepweek = res.body
          for(let i in this.stepweek) this.stepweek[i].type = '步数'
          this.$refs.step2.chart.changeData(this.stepweek)
        }
      })
    },
    nextStepTime3 () {
      let year = new Date(this.steptime3).getFullYear()
      let month = new Date(this.steptime3).getMonth()
      if (month !== 11) this.steptime3 = year + '.' + (month + 2)
      else this.steptime3 = (year + 1) + '.1'
      let parammonth = {
        patientId: this.$route.query.patientId,
        selMonth: dateFormat(this.steptime3, 'YYYY.MM')
      }
      this.ajaxform('/chronic/cbScreenData/stepMonth', parammonth).then(res => {
        if (res.retcode === '0000') {
          this.stepmonth = res.body
          for(let i in this.stepmonth) this.stepmonth[i].type = '步数'
          this.$refs.step3.chart.changeData(this.stepmonth)
        }
      })
    },
    pressurelistchange (index) {
      this.pressureshow.time = this.pressurelist[index].time
      this.pressureshow.sz = this.pressurelist[index].sz
      this.pressureshow.ss = this.pressurelist[index].ss
      this.pressureshow.result = this.pressurelist[index].result
      for (let i in this.pressurelist) this.pressurelist[i].isAct = false
      this.pressurelist[index].isAct = true
    },
    sugarlistchange (index) {
      this.sugarshow.time = this.sugarlist[index].time
      this.sugarshow.type = this.sugarlist[index].type
      this.sugarshow.val = this.sugarlist[index].val
      this.sugarshow.result = this.sugarlist[index].result
      for (let i in this.sugarlist) this.sugarlist[i].isAct = false
      this.sugarlist[index].isAct = true
    }
  },
  created () {
    this.ajaxform('/chronic/cbScreenData/patientInfo', this.$route.query).then(res => {
      if (res.retcode === '0000') this.patient = res.body
    })
    this.ajaxform('/chronic/cbScreenData/pressureAll', this.$route.query).then(res => {
      if (res.retcode === '0000') {
        this.pressurelist = res.body
        this.pressureshow = this.pressurelist[0]
      }
    })
    this.ajaxform('/chronic/cbScreenData/sugarAll', this.$route.query).then(res => {
      if (res.retcode === '0000') {
        this.sugarlist = res.body
        this.sugarshow = this.sugarlist[0]
      }
    })
    let paramday = {
      patientId: this.$route.query.patientId,
      selDay: dateFormat(new Date(), 'YYYY.MM.DD')
    }
    this.ajaxform('/chronic/cbScreenData/heartDay', paramday).then(res => {
      if (res.retcode === '0000') {
        this.heartday = res.body
        for(let i in this.heartday) this.heartday[i].type = '心率'
        this.$refs.heart1.chart.changeData(this.heartday)
      }
    })
    this.ajaxform('/chronic/cbScreenData/stepDay', paramday).then(res => {
      if (res.retcode === '0000') {
        this.stepday = res.body[0]
        if (this.stepday.total > 0) {
          this.stepdayper = piedata2pre(this.stepday)
          this.$refs.step1.chart.changeData(this.stepdayper)
        }
      }
    })
    let paramweek = {
      patientId: this.$route.query.patientId,
      startDate: mon(new Date()),
      endDate: sun(new Date())
    }
    this.ajaxform('/chronic/cbScreenData/heartWeek', paramweek).then(res => {
      if (res.retcode === '0000') {
        this.heartweek = res.body
        for(let i in this.heartweek) this.heartweek[i].type = '心率'
        this.$refs.heart2.chart.changeData(this.heartweek)
      }
    })
    this.ajaxform('/chronic/cbScreenData/stepWeek', paramweek).then(res => {
      if (res.retcode === '0000') {
        this.stepweek = res.body
        for(let i in this.stepweek) this.stepweek[i].type = '步数'
        this.$refs.step2.chart.changeData(this.stepweek)
      }
    })
    let parammonth = {
      patientId: this.$route.query.patientId,
      selMonth: dateFormat(new Date(), 'YYYY.MM')
    }
    this.ajaxform('/chronic/cbScreenData/heartMonth', parammonth).then(res => {
      if (res.retcode === '0000') {
        this.heartmonth = res.body
        for(let i in this.heartmonth) this.heartmonth[i].type = '心率'
        this.$refs.heart3.chart.changeData(this.heartmonth)
      }
    })
    this.ajaxform('/chronic/cbScreenData/stepMonth', parammonth).then(res => {
      if (res.retcode === '0000') {
        this.stepmonth = res.body
        for(let i in this.stepmonth) this.stepmonth[i].type = '步数'
        this.$refs.step3.chart.changeData(this.stepmonth)
      }
    })
  },
  mounted () {
    this.$refs.heart1.chart.changeSize(document.getElementsByClassName('aftertabs')[0].offsetWidth, document.getElementsByClassName('aftertabs')[0].offsetHeight)
    this.$refs.heart2.chart.changeSize(document.getElementsByClassName('aftertabs')[0].offsetWidth, document.getElementsByClassName('aftertabs')[0].offsetHeight)
    this.$refs.heart3.chart.changeSize(document.getElementsByClassName('aftertabs')[0].offsetWidth, document.getElementsByClassName('aftertabs')[0].offsetHeight)
    this.$refs.step1.chart.changeSize(document.getElementsByClassName('aftertabs')[1].offsetWidth, document.getElementsByClassName('aftertabs')[1].offsetHeight)
    this.$refs.step2.chart.changeSize(document.getElementsByClassName('aftertabs')[1].offsetWidth, document.getElementsByClassName('aftertabs')[1].offsetHeight)
    this.$refs.step3.chart.changeSize(document.getElementsByClassName('aftertabs')[1].offsetWidth, document.getElementsByClassName('aftertabs')[1].offsetHeight)
  }
}
</script>

<style lang="less" scoped>
.main1 { margin: 0 2%; width: 96%; height: 6%; color: @akcolor_02; text-align: center; font-size: 1.25em; font-weight: bold;
  span { color: @akcolor_03; font-size: .8em; font-weight: normal; margin-left: 2em }
}
.main2 { margin: 0 2%; width: 96%; height: 36%;
  .box_bg { display: inline-block; vertical-align: top; position: relative; margin: 0 .5%; width: 49%; height: 100%;
    .box_title { margin-top: 1.5em; margin-left: 1.5em; margin-bottom: .25em }
    .tabs { color: @akcolor_03; position: absolute; z-index: 3; top: 1.5em; right: 1.5em;
      span { border: 1px solid @akcolor_03; font-size: .5em; padding: .1em 1.2em; margin: 0 .5em }
      span.act { background-color: @akcolor_03; color: @akcolor_01 }
    }
    .aftertabs { position: absolute; z-index: 2; top: 1.5em; right: 1.5em; left: 1.5em; bottom: 1.5em;
      .time { position: absolute; z-index: 3; top: .5em; color: @akcolor_02; width: 100%; text-align: center;
        span { display: inline-block; margin: 0 1em }
      }
      .label { position: absolute; z-index: 3; bottom: 5em; color: @akcolor_03; width: 100%; text-align: center }
      .label>div:first-child { font-size: 3em }
    }
  }
}
.main3 { margin: 0 2%; width: 96%; height: 40%;
  .box_bg { display: inline-block; vertical-align: top; text-align: center; margin: 0 .5%; width: 49%; height: 100%;
    .box_title { text-align: left; margin-top: 1.5em; margin-left: 1.5em; margin-bottom: 1.5em }
    .left1, .left2 { display: inline-block; vertical-align: top; width: 20% }
    .center1, .center2 { display: inline-block; vertical-align: top; width: 45%; border-right: 1px solid @akcolor_04; border-left: 1px solid @akcolor_04 }
    .right1, .right2 { display: inline-block; vertical-align: top; width: 25% }
    .lv { color: @akcolor_10; text-align: left; font-size: .8em }
    .lv>div { margin-bottom: 1.2em }
    .main4 { height: 100%; color: @akcolor_02;
      .left4, .right4 { display: inline-block; vertical-align: top; width: 45% }
      .line_1 { margin: 1.5em 0 }
      .line_2 { color: @akcolor_10 }
      .line_3 { font-size: 4em; margin: .2em 0 }
      .line_4 { margin-bottom: 1.5em }
    }
    .list { height: 100%; margin-left: 1.5em; font-size: .8em;
      .list1 { color: @akcolor_10; height: 85%; overflow-y: auto; text-align: center;
        .list1item { line-height: 2.5em; border: 1px solid rgba(0,0,0,0);
          span+span { margin-left: 1em }
        }
        .list1item.act { color: @akcolor_03; border: 1px solid @akcolor_03 }
      }
    }
    .list>div:first-child { text-align: left; color: @akcolor_02; margin-bottom: 1em }
    .color0 { color: @akcolor_03 }
    .color1 { color: @akcolor_12 }
    .color2 { color: @akcolor_13 }
    .color3 { color: @akcolor_14 }
  }
}
</style>
