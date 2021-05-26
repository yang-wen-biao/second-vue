<template>
  <el-container style="height: 100%;">
    <el-aside width="125px" >
      <!--      <div>-->
      <el-menu mode="vertical" style="height: 100%">
        <el-menu-item key="1" >
          <!--            <el-icon type="mail" />-->
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 课程资源一</span>
        </el-menu-item>
        <el-menu-item key="2">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 课程资源二</span>
        </el-menu-item>
        <el-menu-item key="3">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 课程资源三</span>
        </el-menu-item>
        <el-menu-item key="4">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 课程资源四</span>
        </el-menu-item>

      </el-menu>
      <!--      </div>-->
    </el-aside>
    <!--    <el-container>-->
    <!--      <el-header>Header</el-header>-->
    <el-main>
      <div v-if="this.$router.currentRoute.path === '/introduce'">详细信息请点击左侧课程资源栏</div>
      <router-view></router-view>
    </el-main>

    <!--    </el-container>-->
  </el-container>
</template>

<script>
export default {
  name: "test",
}
</script>

<style scoped>

</style>