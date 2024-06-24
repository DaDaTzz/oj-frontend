<template>
  <div id="questionsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="题目名称">
        <a-input v-model="searchParams.title" placeholder="请输入题目名称" style="min-width: 240px"/>
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table :columns="columns" :data="dataList" @page-change="onPageChange" :pagination="{pageSize:searchParams.pageSize, total:total, current:searchParams.current, showTotal:true,}">
      <template #optional="{ record }">
        <a-button type="primary" @click="toQuestionPage(record)">做题</a-button>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green" >{{ tag }}</a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{ `${record.submitNum ? record.acceptedNum / record.submitNum : '0'}% (${record.acceptedNum}/${record.submitNum})` }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import moment from "moment";
import {
  listQuestionVoByPageUsingPost
} from "@/api/questionController";
import message from "@arco-design/web-vue/es/message";
import Question = API.Question;
import {useRouter} from "vue-router";

const dataList = ref()
const total = ref(0)
const searchParams = ref({
  title:'',
  tags:[],
  pageSize:10,
  current: 1,
})

const loadData = async () => {
  const res = await listQuestionVoByPageUsingPost(searchParams.value)
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



const columns = [
  {
  title: '题号',
  dataIndex: 'id',
},
  {
    title: '题目名称',
    dataIndex: 'title',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slotName: 'tags'
  },
  {
    title: '通过率',
    slotName: 'acceptedRate'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    slotName: 'createTime'
  },
  {
    slotName: 'optional'
  }
];

const router = useRouter()

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  })
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

/**
 * 确认搜索
 */
const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  }
}

</script>

<style scoped>
#questionsView {
  max-width:1280px;
  margin:0 auto;
}
</style>
