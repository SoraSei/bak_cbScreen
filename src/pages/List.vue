<template>
  <div style="height:100%;">
    <div class="top_title"><img src="../assets/pic_alldata.png"/>全部用户资料<router-link to="/" class="left3"><img src="../assets/pic_back.png"/>返回</router-link></div>
    <div class="br"></div>
    <div class="main1"><listitem1 class="list1" v-for="(item, i) in list1" :key=i :name=item.name :sex=item.sex :age=item.age :tel=item.tel :address=item.address :val1=item.val1 :val2=item.val2 :val3=item.val3 :val4=item.val4 @click.native="$router.push('/detail?patientId='+item.patientId)"></listitem1></div>
    <div class="br"></div>
    <div class="br"></div>
    <div class="pages">
      <span v-if="page.cur > 1" @click=prePage>上一页</span><span v-if="page.cur > 2" @click=changePage(1)>1</span><span v-if="page.cur > 3" @click=changePage(2)>2</span><span v-if="page.cur > 4" class="point">...</span><span v-if="page.cur > 1" @click=prePage>{{ page.cur - 1 }}</span><span class="act">{{ page.cur }}</span><span v-if="page.cur < page.total" @click=nextPage>{{ page.cur + 1 }}</span><span v-if="page.cur < (page.total - 3)" class="point">...</span><span v-if="page.cur < (page.total - 2)" @click=changePage(page.total-1)>{{ page.total - 1 }}</span><span v-if="page.cur < (page.total - 1)" @click=changePage(page.total)>{{ page.total }}</span><span v-if="page.cur < page.total" @click=nextPage>下一页</span> 共{{ page.total }}页 到 <input v-model.number=pageinput type="tel" maxlength="2"> 页 <span @click=changePage(pageinput)>确定</span>
    </div>
    <div class="br"></div>
  </div>
</template>

<script>
import listitem1 from '../components/ListItem1'
export default {
  components: { listitem1 },
  data () {
    return {
      list1: [
        { name: '测试', sex: '测试', age: 50, tel: '测试', address: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', val1: 50, val2: 50, val3: '50 / 100', val4: 50 },
        { name: '测试', sex: '测试', age: 50, tel: '测试', address: '测试', val1: 50, val2: 50, val3: '50 / 100', val4: 50 },
        { name: '测试', sex: '测试', age: 50, tel: '测试', address: '', val1: 50, val2: 50, val3: '50 / 100', val4: 50 },
        { name: '测试', sex: '测试', age: 50, tel: '测试', address: '测试', val1: 50, val2: 50, val3: '50 / 100', val4: 50 },
        { name: '测试', sex: '测试', age: 50, tel: '测试', address: '测试', val1: 50, val2: 50, val3: '50 / 100', val4: 50 },
        { name: '测试', sex: '测试', age: 50, tel: '测试', address: '测试', val1: 50, val2: 50, val3: '50 / 100', val4: 50 }
      ],
      pageinput: '',
      page: { cur: 1, total: 1 }
    }
  },
  methods: {
    changePage (page) {
      if (page >= 1 && page <= this.page.total) {
        this.ajaxform('/chronic/cbScreenData/patientList', { pageNum: page }).then(res => {
          if (res.retcode === '0000') {
            this.page.cur = page
            this.list1 = res.body.list
          }
        })
      } else this.$vux.toast.text('无效页面', 'middle')
    },
    prePage () {
      this.ajaxform('/chronic/cbScreenData/patientList', { pageNum: this.page.cur - 1 }).then(res => {
        if (res.retcode === '0000') {
          this.page.cur--
          this.list1 = res.body.list
        }
      })
    },
    nextPage () {
      this.ajaxform('/chronic/cbScreenData/patientList', { pageNum: this.page.cur + 1 }).then(res => {
        if (res.retcode === '0000') {
          this.page.cur++
          this.list1 = res.body.list
        }
      })
    }
  },
  created () {
    this.ajaxform('/chronic/cbScreenData/patientList').then(res => {
      if (res.retcode === '0000') {
        this.page.total = res.body.pages
        this.list1 = res.body.list
      }
    })
  },
  watch: {
    pageinput: {
      handler (newVal, oldVal) {
        if (newVal !== '' && isNaN(Number(newVal))) this.pageinput = oldVal
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main1 { margin: 0 2%; width: 96%; height: 75% }
.pages { margin: 0 2%; width: 96%; height: 5%; line-height: 7%; text-align: center; color: @akcolor_03;
  span { border: 1px solid @akcolor_03; padding: .2em 1em; margin: 0 .1em }
  span.act { background-color: @akcolor_03; color: @akcolor_01 }
  span.point { border: none; vertical-align: .3em }
  input { width: 3em; color: @akcolor_03; text-align: center; line-height: 2.1em; vertical-align: .2em; background-color: rgba(0,0,0,0); border: 1px solid @akcolor_03 }
}
</style>
