import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import firstHome from "@/views/FirstHome";
import first from "@/views/FirstHome/First";
import introduce from "@/views/FirstHome/introduce";

import team from "@/views/FirstHome/team";
import CourseDevelopment from "@/views/FirstHome/CourseDevelopment";
import courseresource from "@/views/FirstHome/courseresource";
import console from "@/views/FirstHome/console";
import coursestudy from "@/views/FirstHome/coursestudy";

import team1 from "@/views/FirstHome/Team/team1";
import description from "@/views/FirstHome/course/description";
import arrange from "@/views/FirstHome/course/arrange";
import outline from "@/views/FirstHome/course/outline";
import notion from "@/views/FirstHome/course/notion";
import teacher1 from "@/views/FirstHome/TeacherResource/teacher1";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path:'/',
    name: 'FirstHome',
    component: firstHome,
    hidden: true,
    children:[
      {
        path:'first',
        name:'first',
        component: first,
        hidden:true,
      },
      {
        path:'introduce',
        name:'introduce',
        component: introduce,
        hidden:true,
      },
      {
        path: 'team',
        name: 'team',
        component: team,
        hidden: true,
      },
      {
        path: 'CourseDevelopment',
        name: 'CourseDevelopment',
        component: CourseDevelopment,
        hidden: true,
      },
      {
        path: 'courseresource',
        name:'courseresource',
        component: courseresource,
        hidden: true,
      },
      {
        path: 'console',
        name: 'console',
        component: console,
        hidden: true,
      },
      {
        path: 'coursestudy',
        name: 'coursestudy',
        component: coursestudy,
        hidden: true,
      },
      {
        path: 'Team',
        name: 'Team',
        component: team,
        hidden: true,
        children:[
          {
            path:'team1',
            name:'team1',
            component:team1,
            hidden:true
          },
          {
            path: 'teacher1',
            name: 'teacher1',
            component: teacher1,
            hidden: true,
          }
        ]
      },
      {
        path:'course',
        name: 'course',
        component: introduce,
        hidden: true,
        children: [
          {
            path: 'description',
            name:'description',
            component: description,
            hidden: true,
          },
          {
            path: 'arrange',
            name: 'arrange',
            component: arrange,
            hidden: true,
          },
          {
            path: 'outline',
            name: 'outline',
            component: outline,
            hidden: true,
          },
          {
            path: 'notion',
            name: 'notion',
            component: notion,
            hidden: true,
          }
        ]
      }
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes,
})

export default router
