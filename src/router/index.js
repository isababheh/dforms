import Vue from 'vue';
import Router from 'vue-router';

import Home from '../demo/Home.vue';
import LanguageView from './LanguageView.vue';
import HomePage from '../demo/HomePage.vue';

Vue.use(Router);

// Get the language from localStorage or use the browser's default language
const language = localStorage.getItem('language') || (navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: `/${language}` // Redirect to language-specific route
    },
    {
      path: '/:lang',
      component: LanguageView,
      children: [
        {
          path: '', // This defines the base path (e.g., /en-US or /zh-CN)
          name: 'index',
          component: HomePage
        },
        {
          path: 'create-form', // This will now map to /:lang/create-form
          name: 'createForm',
          component: Home
        },
        {
          path: 'home', // Adding a route for home (e.g., /:lang/home)
          name: 'home',
          component: HomePage
        }
      ]
    }
  ]
});
