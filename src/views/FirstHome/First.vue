<template>

  <div>
    <div>
      <gonggao></gonggao>
    </div>
    <div style="display: flex;margin-top: 10px;">
      <div style="width: 49%">
<!--        <p1>lll</p1>-->
        <kecheng></kecheng>
      </div>
      <div style="width: 2%">
      </div>
      <div style="width: 49%">
<!--        <p1> hello</p1>-->
        <resource></resource>
      </div>
    </div>
    <div style="display: flex;margin-top: 10px;">
      <div style="width: 49%">
        <!--        <p1>lll</p1>-->
        <kecheng></kecheng>
      </div>
      <div style="width: 2%">
      </div>
      <div style="width: 49%">
        <!--        <p1> hello</p1>-->
        <resource></resource>
      </div>
    </div>
  </div>
</template>
<script>
import Gonggao from "@/views/FirstHome/First/gonggao";
import Kecheng from "@/views/FirstHome/First/kecheng";
import Resource from "@/views/FirstHome/First/resource";
export default {
  name: 'First',
  components: {Resource, Kecheng, Gonggao},
}
</script>
<style scoped>
</style>