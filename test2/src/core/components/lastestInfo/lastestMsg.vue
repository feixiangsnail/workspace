<template>
    <div class='contentBox'>
        <div v-if="lastestMsgBox">
            <!-- 消息列表 -->
            <el-table :data="lastestMsg" class="yoMemTable restrictFont" border @row-click="getDetail">
                <el-table-column prop="gbkContent" label="内容"></el-table-column>
                <el-table-column prop="createDateTime" label="日期" width="180"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="yoPaging">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage"
                               :page-sizes="[10, 20, 50, 100]" :page-size="perval" layout="total, sizes, prev, pager, next, jumper"
                               :total="countMsg">
                </el-pagination>
            </div>
        </div>
        <!--消息详情-->
        <detail-msg :detail='detail' :detailConten='detailConten' :detailDate='detailDate' :backUp='backUp'></detail-msg>
    </div>
</template>
<script>
import * as types from '@s/store/shareApi/type.js'
import detailMsg from '@/components/detailMsg/detailMsg'
import headerNav from '@/components/layout/headerNav'
export default {
  data () {
    return {
      selectedPersonMsg: [], // 选中的个人信息条目
      perval: 10, // 每页显示条数
      curPage: 1, // 当前页码
      lastestMsg: [], //  消息内容
      lastestMsgBox: true, // 默认显示消息列表
      detailDate: '', // 消息详情时间
      detailConten: '', // 消息详情内容
      detail: false, // 默认消息详情不显示
      countMsg: 0 // 最新消息总条数
    }
  },
  components: {
    headerNav,
    detailMsg
  },
  mounted () {
    this.initLastestMsg()
  },
  methods: {
    initLastestMsg () {
      this.$store.dispatch(types.INITLASTESTMSG, { currentPage: this.curPage, pageSize: this.perval, msgType: 'hotNews' }).then(res => {
        this.lastestMsg = res.data.messageList
        this.countMsg = res.data.count
      })
    },
    // 改变每页显示多少条
    handleSizeChange (val) {
      this.perval = val
      this.initLastestMsg()
    },
    // 跳转当前页码
    handleCurrentChange (val) {
      this.curPage = val
      this.initLastestMsg()
    },
    // 获取消息列表内容
    getDetail (row) {
      this.lastestMsgBox = false
      this.detail = true
      this.detailDate = row.createDateTime
      this.detailConten = row.gbkContent
    },
    // 返回上一级
    backUp () {
      this.lastestMsgBox = true
      this.detail = false
      this.initLastestMsg()
    }
  }
}
</script>
