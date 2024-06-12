<template>
  <div class="home">
    主页
    <MdEditor :value="value" :handleChange="onChange"/>
    <CodeEditor />
  </div>
</template>

<script setup lang="ts">

import {defineComponent, ref} from "vue";
import MdEditor from "@/views/MdEditor.vue";
import CodeEditor from "@/views/user/CodeEditor.vue";

defineComponent({
  components: {MdEditor}
})

const value = ref('')
const onChange = (v: string) => {
  value.value = v
}


</script>
