<template>
  <el-container style="height: 100%;">
    <el-aside width="150px" >
      <el-menu mode="vertical" style="height: 100%" @select="menuClick">
        <el-menu-item :index="item.name" v-for="(item,index) in navList" :key="index">{{item.navItem}}</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div v-if="this.$router.currentRoute.path ==='/team'">
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

      <router-view></router-view>

    </el-main>
  </el-container>
</template>

<script>
import gonggao from "@/views/FirstHome/First/gonggao";
import kecheng from "@/views/FirstHome/First/kecheng";
import resource from "@/views/FirstHome/First/resource";
export default {
  name: "team",
  components:{gonggao,kecheng,resource},
  data() {
    return {
      navList:[
        {name:'/Team/team1',navItem:'团队介绍'},
        {name:'',navItem:'团队简介'},
        {name:'/team/teacher1',navItem:'团队安排'},
        {name:'',navItem:'任课大纲'},
        {name:'',navItem:'授课理念'},
      ] }
  },
  methods: {
    menuClick(index) {
      this.$router.push(index);
    },
  },
}
</script>

<style scoped>

</style>