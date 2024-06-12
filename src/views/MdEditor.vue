<template>
  <Editor :value="value" :plugins="plugins" @change="handleChange" />
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Editor, Viewer } from '@bytemd/vue-next'


interface Props{
  value: string,
  handleChange:(v:string) => void
}

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  handleChange: () => {},
})

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
]

</script>


<style scoped>

</style>