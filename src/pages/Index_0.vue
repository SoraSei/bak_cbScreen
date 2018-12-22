<template>
  <div style="height:100%;">
    <div class="top_title"><img src="../assets/pic_logo.png"/>爱康云智慧健康管理系统</div>
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
            <pie1 class="pie1" :data=pie1 :colors=colors :name=pies[0]></pie1>
            <pie1 class="pie1" :data=pie2 :colors=colors :name=pies[1]></pie1>
            <pie1 class="pie1" :data=pie3 :colors=colors :name=pies[2]></pie1>
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
          <div>
            <div class="list1" v-for="(item, i) in list1" :key=i>
              <span>{{ item.time }}</span><span>{{ item.name }}</span><span>{{ item.type }}</span><span>{{ item.val }}</span>
            </div>
          </div>
          <img src="../assets/pic_btn.png" @click="dialog2 = true" />
          <div class="box_title">新世界百货社区值班人</div>
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
      <col1 class="box_bg" :data=line1 :colors=colors :name=lines[0] :date=linedate></col1><col1 class="box_bg" :data=line2 :colors=colors :name=lines[1] :date=linedate></col1><line1 class="box_bg" :data=line3 :colors=colors :name=lines[2] :date=linedate></line1><line2 class="box_bg" :data=line4 :colors=colors :name=lines[3] :date=linedate></line2>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model=dialog1 class="dialog1" hide-on-blur>111</x-dialog>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model=dialog2 class="dialog2" hide-on-blur>
        <div v-for="(item, i) in sos" :key=i>
          <div>
            <span>{{ i }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.val }}次/分</span>
            <span>{{ item.name }}</span>
            <span>{{ item.add }}</span>
            <span>{{ item.time }}</span>
            <span>{{ item.state }}</span>
          </div>
        </div>
      </x-dialog>
    </div>
    <div class="br"></div>
  </div>
</template>

<script>
import title1 from '../components/Title1'
import pie1 from '../components/Pie1_0'
import col1 from '../components/Col1_0'
import line1 from '../components/Line1_0'
import line2 from '../components/Line2_0'
export default {
  components: { title1, pie1, col1, line1, line2 },
  data () {
    return {
      title1: [
        { name: '管理总人数', val: 321, after: '人' },
        { name: '医护总人数', val: 23, after: '人' },
        { name: '监测总次数', val: 3421, after: '人/次' },
        { name: '总帮助人次', val: 389, after: '人/次' }
      ],
      dialog1: false,
      dialog2: false,
      colors: [ '#36a2eb', '#ffcd56', '#ff6383', '#4fc0fa' ],
      pies: [ '年龄分布图', '性别分布图', '在线人数图' ],
      pie1: [
        { item: '75岁及以上', val: 101 },
        { item: '55-65岁及以上', val: 121 },
        { item: '56-75岁及以上', val: 79 }
      ],
      pie2: [{ item: '男', val: 158 }, { item: '女', val: 124 }],
      pie3: [{ item: '在线', val: 148 }, { item: '离线', val: 43 }],
      lines: [ '血压监测', '血糖监测', '心率监测', '运动监测' ],
      linedate: '2018.12.10-2018.12.16',
      line1: [
        { x: '周一', type: '正常', y: 162 },
        { x: '周二', type: '正常', y: 188 },
        { x: '周三', type: '正常', y: 201 },
        { x: '周四', type: '正常', y: 233 },
        { x: '周五', type: '正常', y: 212 },
        { x: '周六', type: '正常', y: 189 },
        { x: '周日', type: '正常', y: 205 },
        { x: '周一', type: '异常', y: 38 },
        { x: '周二', type: '异常', y: 42 },
        { x: '周三', type: '异常', y: 59 },
        { x: '周四', type: '异常', y: 27 },
        { x: '周五', type: '异常', y: 48 },
        { x: '周六', type: '异常', y: 11 },
        { x: '周日', type: '异常', y: 39 }
      ],
      line2: [
        { x: '周一', type: '正常', y: 162 },
        { x: '周二', type: '正常', y: 188 },
        { x: '周三', type: '正常', y: 201 },
        { x: '周四', type: '正常', y: 233 },
        { x: '周五', type: '正常', y: 212 },
        { x: '周六', type: '正常', y: 189 },
        { x: '周日', type: '正常', y: 205 },
        { x: '周一', type: '异常', y: 38 },
        { x: '周二', type: '异常', y: 42 },
        { x: '周三', type: '异常', y: 59 },
        { x: '周四', type: '异常', y: 27 },
        { x: '周五', type: '异常', y: 48 },
        { x: '周六', type: '异常', y: 11 },
        { x: '周日', type: '异常', y: 39 }
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
        { time: '12:00', name: '李金哲', type: '血压', val: '130/78mmHg' }
      ],
      list2: [
        { img: require('../assets/pic_woman_1.png'), name: '李金哲', type: '在班', tel: '172-3874-7745' },
        { img: require('../assets/pic_woman_2.png'), name: '李金哲', type: '在班', tel: '172-3874-7745' }
      ],
      sos: [
        { name: '李金哲', val: 130, add: '新世界百货小区', tel: '172-3874-7745', time: '2018.07.09 17:27', state: '已解决' },
        { name: '李金哲', val: 130, add: '新世界百货小区', tel: '172-3874-7745', time: '2018.07.09 17:27', state: '未解决' }
      ]
    }
  },
  methods: {
    test () {
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.top_title { background-image: url(../assets/bg_title.png); background-size: 100% 100%; background-repeat: no-repeat; width: 100%; height: 12%; line-height: 2.75; text-align: center; color: @akcolor_02; font-size: 2em;
  img { width: 1.5em; height: 1.5em; margin-right: .5em; vertical-align: -.3em }
}
.br { height: 2%; width: 100% }
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
      .list1 { font-size: .5em; margin: .5em 0;
        span{ display: inline-block;
          &:nth-child(1) { width: 20% }
          &:nth-child(2) { width: 20% }
          &:nth-child(3) { width: 30% }
          &:nth-child(4) { width: 30% }
        }
      }
      .list2 { font-size: 0.5em; margin: 1em 0;
        img { display: inline-block; vertical-align: top; margin-right: .5em; height: 3.5em }
        img+div { display: inline-block; }
      }
    }
  }
}
.main2 { margin: 0 2%; width: 96%; height: 34%;
  .box_bg { width: 23.875%!important; margin-right: 1.5%; height: 100%;
    &:last-child { margin-right: 0 }
  }
}
</style>
