<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header" :wrap="false">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view/>
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="#0">欢迎关注程序员 Da 的日常！</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>



<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout{

}

.header{
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

.content{
  margin-bottom: 16px;
  padding: 20px;
}

.footer{
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

</style>