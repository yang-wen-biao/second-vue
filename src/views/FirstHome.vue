<template>
  <el-container>
<!--    <el-header  class="home-header">-->
    <div class="home-header">
      <div class="login-location" style="margin-top: 15px;">
        <el-dropdown trigger="click" @command="login">
          <span class="login-style">登录</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login">登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <img class="image-style" src="~@/assets/logo.png" height="41" width=auto >
      <h1 class="div-style">数据结构精品课程</h1>

      <el-carousel class="roll-style">
        <el-carousel-item class="rolling-image-style">
          <img src="../assets/1.png">
        </el-carousel-item>
        <el-carousel-item class="rolling-image-style">
          <img src="../assets/2.png">
        </el-carousel-item>
        <el-carousel-item class="rolling-image-style">
          <img src="../assets/3.png">
        </el-carousel-item>
        <el-carousel-item class="rolling-image-style">
          <img src="../assets/4.png">
        </el-carousel-item>
      </el-carousel>

      <div style="margin-left: 800px;margin-right: 380px;margin-bottom: 15px;margin-top: 0px">
        <el-input placeholder="请输入内容" v-model="inputstring" >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <div class="button-location">
<!--        <el-row >-->
          <el-button  style="width:80px" @click="currents('/first')">首页</el-button>
          <el-button  style="margin-right:0px;" @click="currents('/introduce')">课程介绍</el-button>
          <el-button  style="margin-right:0px;"@click="currents('/team')">教学团队</el-button>
          <el-button  style="margin-right:0px;"@click="currents('/CourseDevelopment')">课程建设</el-button>
          <el-button  style="margin-right:0px;"@click="currents('/courseresource')">课程资源</el-button>
          <el-button  style="margin-right:0px;"@click="currents('/console')">问题与答题</el-button>
          <el-button  style="margin-right:0px;"@click="currents('/coursestudy')">课程研究</el-button>
<!--        </el-row>-->
      </div>
      <el-aside style="margin-top: 110px;margin-left: 0px">
        <div>
          <gonggao></gonggao>
        </div>

      </el-aside>
    </div>
<!--    </el-header>-->
    <el-main class="view-styles">
<!--      <component :is=current ></component>-->
      <div v-if="this.$router.currentRoute.path === '/'">数据结构精品课程</div>
      <router-view></router-view>
    </el-main>

    <el-footer class="footer-styles">
      <div>地址：重庆    邮编：406213</div>
      <div >项目参与者：ywb</div>
      <div >联系电话：909090</div>
    </el-footer>

  </el-container>

</template>
<script>

import hello_world from "@/views/FirstHome/First";
import test from "@/views/FirstHome/introduce";
import gonggao from "@/views/FirstHome/First/gonggao";

export default {
  name: "FirstHome",
  components: {hello_world,test,gonggao},

  data(){
    const that = this;
    return{
      current:'test',
      inputstring:'',

      imgIndex: 1,
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        //循环,而不是每次都突然回到第一个
        loop: true,
        //设定初始化时slide的索引，加载页面时显示的第几个，从0开始
        initialSlide: 0,
        //自动播放
        autoplay: {
          /*切换轮播图片的时间，即上次切换成功后到再次需要切换的时间*/
          delay: 1500,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 false触摸后不再点击继续轮播，true触摸后不再点击不轮播，停在最后一次页面*/
          disableOnInteraction: false
        },
        //滑动速度，时间单位，越小越快，与上面 delay 区别，speed是完成切换所需时间，delay是切换成功后停留多长时间再切换
        speed: 800,
        //滑动方向
        direction: "horizontal",
        //小手掌抓取滑动
        grabCursor: true,
        on: {
          //滑动之后回调函数
          slideChangeTransitionStart: function() {
            /* realIndex为滚动到当前的slide索引值 */
            that.imgIndex= this.realIndex - 1;
          },
        },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      },
      banner: []


    }
  },
  methods:{
    login(){
      this.$router.push('/login');
    },
    currents(current){
      this.$router.push(current);
    },

    skip_out_page(v) {
      window.location.href = v
    },
    get_data() {
      this.$http.get('test').then(res => {
        if(res.data.code == '0000'){
          this.banner = res.data.img_info
        }
      });
    }


  },

  mounted() {
    this.get_data()
  },

}
</script>

<style scoped>
  .home-header {
    background-color: rgb(7, 4, 56);
    position: relative;
    height: 950px;
    /*line-height: 60px;*/
  }
  .image-style{
    /*background-color: #0e6ddc;*/
    max-width:25%;
    height: auto;
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .roll-style{

    /*background-color: #0e6ddc;*/
    max-width: 100%;
    width: 1400px;
    height: 600px;
    margin-left: 50px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .rolling-image-style{
    /*background-color: #0e6ddc;*/
    /*position: absolute;*/
    /*max-width: 50%;*/
    /*height: 300px;*/
    max-width: 100%;
    width: 1200px;
    height: 550px;
    margin-left: 100px;
    margin-top: 10px;
  }
  .div-style{
    color: rgb(248, 249, 250);
    font-size: 20px;
    font-family: 华文楷体;
    width: 170px;
    background-color: #a52a2a;
    margin-top: 0px;
    margin-left: 200px;
  }
  .login-location{
    /*position: absolute;*/
    margin-left: 1320px;
    margin-top: 15px;
  }
  .login-style {
    cursor: pointer;
    color: #a52a2a;
    font-size: 25px;
    /*background-color: black;*/
  }
  .button-location{
    margin-top: 10px;
    margin-left: 400px;
    font-size: 0px;
    position:absolute;
    bottom: 10px;
    /*width: 0px;*/
    margin-bottom: 10px;
  }
  .view-styles{
    margin-left: 300px;
    margin-right: 300px;
    background-color: rgba(239, 244, 246, 0.95);
    height: 420px;
    /*display: flex;*/
    /*margin-left: 10px;*/
  }
  .footer-styles{
    /*display: flex;*/
    background-color: rgb(7, 4, 56);
    /*position: absolute;*/
    /*bottom: 100px;*/
    text-align: center;
    /*margin-bottom: 0px;*/
    /*height: 300px;*/
    /*line-height: 0px;*/
  }
  .footer-aside-styles{
    /*display: flex;*/
    background-color: #17807DBA;
    position: absolute;
    /*bottom: 100px;*/
    text-align: center;
    /*margin-bottom: 0px;*/
    width: 100px;
    height: 420px;
    /*line-height: 0px;*/
  }
</style>

<!--<style lang="scss">-->
<!--.swiper-wrap{-->
<!--  width: 100%;-->
<!--  height: 210px;-->
<!--  background-color: #fff;-->
<!--}-->
<!--.swiper-pagination{-->
<!--  background: #fff;-->
<!--}-->
<!--.swiper-pagination-bullet{-->
<!--  background: #ccc;-->
<!--  width: 10px;-->
<!--  height: 10px;-->
<!--  opacity: 1;-->
<!--}-->
<!--.swiper-pagination-bullet-active{-->
<!--  background: #00C293;-->
<!--}-->
<!--</style>-->