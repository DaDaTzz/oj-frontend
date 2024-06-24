<template>
  <div id="manageQuestionView">
    <h2>管理题目</h2>
    <a-table :columns="columns" :data="dataList" @page-change="onPageChange" :pagination="{pageSize:searchParams.pageSize, total:total, current:searchParams.current, showTotal:true,}">
      <template #optional="{ record }">
        <a-button type="primary" @click="doUpdate(record)">修改</a-button>
        <a-button status="danger" @click="doDelete(record)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import {deleteQuestionUsingPost, listQuestionByPageUsingPost} from "@/api/questionController";
import message from "@arco-design/web-vue/es/message";
import Question = API.Question;
import {useRouter} from "vue-router";

const dataList = ref()
const total = ref(0)
const searchParams = ref({
  pageSize:10,
  current: 1,
})

const loadData = async () => {
  const res = await listQuestionByPageUsingPost(searchParams.value)
  if (res.data.code === 0){
    dataList.value = res.data.data.records;
    total.value = res.data.data.total
  }else{
    message.error('数据加载失败，' + res.data.message)
  }
}

onMounted(() =>{
  loadData();
})


const columns = [{
  title: 'id',
  dataIndex: 'id',
}, {
  title: '标题',
  dataIndex: 'title',
}, {
  title: '内容',
  dataIndex: 'content',
}, {
  title: '标签',
  dataIndex: 'tags',
},
  {
    title: '答案',
    dataIndex: 'answer',
  },{
    title: '提交数',
    dataIndex: 'submitNum',
  },{
    title: '通过数',
    dataIndex: 'acceptedNum',
  },{
    title: '判题配置',
    dataIndex: 'judgeConfig',
  },{
    title: '判题用例',
    dataIndex: 'judgeCase',
  },{
    title: '用户id',
    dataIndex: 'userId',
  },{
    title: '创建时间',
    dataIndex: 'createTime',
  },{
  title: '操作',
  slotName: 'optional'
}];

const router = useRouter()

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query:{
      id:question.id
    },
  })
}

const doDelete = async (question: Question) => {
  const res = await deleteQuestionUsingPost({
    id:question.id
  })
  if(res.data.code === 0){
    message.success('删除成功')
    loadData()
  }else{
    message.error('删除失败，' + res.data.message)
  }
}

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  }
}

watchEffect(() => {
  loadData();
})

</script>

<style scoped>
#manageQuestionView {
}
</style>
