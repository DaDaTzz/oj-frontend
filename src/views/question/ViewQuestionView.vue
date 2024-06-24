<template>
  <div id="viewQuestionsView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions title="判题条件" :column="{xs:1, md:2, lg:3}">
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig?.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig?.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig?.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''"/>
              <template #extra>
                <a-space wrap>
                  <a-tag v-for="(tag, index) of question.tags" :key="index" color="green" >{{ tag }}</a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment'" title="评论">
            评论区
          </a-tab-pane>
          <a-tab-pane key="answer" title="题解">
            题解
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="title" label="编程语言">
            <a-select v-model="form.language" :style="{width:'320px'}" placeholder="选择编程语言 ...">
              <a-option>java</a-option>
              <a-option>go</a-option>
              <a-option>cpp</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor :value="form.code" :language="form.language" :handle-change="changeCode"/>
        <a-divider size="0"/>
        <a-button @click="doSubmit" type="primary" style="min-width: 200px">提交代码</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref,withDefaults, defineProps} from 'vue';
import {
  getQuestionVoByIdUsingGet,
} from "@/api/questionController";
import message from "@arco-design/web-vue/es/message";
import QuestionVO = API.QuestionVO;
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {doQuestionSubmitUsingPost} from "@/api/questionSubmitController";
import QuestionSubmitAddRequest = API.QuestionSubmitAddRequest;

const question = ref<QuestionVO>()

interface Props{
  id:string,
}
const props = withDefaults(defineProps<Props>(), {
  id:() => ''
})

const loadData = async () => {
  const res = await getQuestionVoByIdUsingGet({
    id:props.id as any,
  })
  if (res.data.code === 0){
    question.value = res.data.data;
  }else{
    message.error('数据加载失败，' + res.data.message)
  }
}

onMounted(() =>{
  loadData();
})

const changeCode = (value: string) => {
  form.value.code = value;
}

const form = ref<QuestionSubmitAddRequest>({
  language:'java',
  code:'',
  questionId:props.id as any,
})

/**
 * 提交代码
 */
const doSubmit = async () => {
  const res = await doQuestionSubmitUsingPost(form.value)
  if (res.data.code === 0){
    message.success('提交成功')
  }else {
    message.error('提交失败，' + res.data.message)
  }

}
</script>

<style scoped>
#viewQuestionsView {
  max-width:1400px;
  margin:0 auto;
}
</style>
