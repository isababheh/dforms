import Vue from 'vue';
import Router from 'vue-router';

import Home from '../demo/Home.vue';
import LanguageView from './LanguageView.vue';
import HomePage from '../demo/HomePage.vue';

Vue.use(Router);

const language = localStorage.getItem('language') || (navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: `/${language}`
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/:lang',
      name: 'lang',
      component: LanguageView,
      children: [
        {
          path: '', // Corrected from '/' to '' to match the base path of /:lang
          name: 'index',
          component: HomePage
        },
        {
          path: 'create-form', // Corrected to relative path, will be /:lang/home
          name: 'index1',
          component: Home
        }
      ]
    }
  ]
});
