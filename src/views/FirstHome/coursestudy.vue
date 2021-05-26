<template>
  <el-container style="height: 100%;">
    <el-aside width="125px" >
      <!--      <div>-->
      <el-menu mode="vertical" style="height: 100%">
        <el-menu-item key="1" >
          <!--            <el-icon type="mail" />-->
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 学术研究一</span>
        </el-menu-item>
        <el-menu-item key="2">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 学术研究二</span>
        </el-menu-item>
        <el-menu-item key="3">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 学术研究三</span>
        </el-menu-item>
        <el-menu-item key="4">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 学术研究四</span>

        </el-menu-item>

        <el-menu-item key="5">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 学术研究五</span>

        </el-menu-item>
        <el-menu-item key="6">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 学术研究六</span>

        </el-menu-item>
        <el-menu-item key="7">
          <!--            <i class="el-icon-menu"></i>-->
          <span slot="title"> 学术研究七</span>

        </el-menu-item>
      </el-menu>
      <!--      </div>-->
    </el-aside>
    <!--    <el-container>-->
    <!--      <el-header>Header</el-header>-->
    <el-main>
      <div v-if="this.$router.currentRoute.path === '/introduce'">详细信息请点击左侧学术研究栏</div>
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