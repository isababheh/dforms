import Vue from 'vue';
import Router from 'vue-router';

import Home from '../demo/Home.vue';
import LanguageView from './LanguageView.vue';
import Admin from '../demo/Admin.vue';
import Landingpage from '../demo/Landingpage.vue';
import Clientpage from '../demo/Clientpage.vue';
import ClientPreview from '../demo/ClientPreview.vue';

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
          path: '',
          name: 'index',
          component: Landingpage
        },
        {
          path: 'admin', // This defines the base path (e.g., /en-US or /zh-CN)
          name: 'index',
          component: Admin
        },
        {
          path: 'create-form', // This will now map to /:lang/create-form
          name: 'createForm',
          component: Home
        },
        {
          path: 'client', 
          name: 'Clientpage',
          component: Clientpage
        },
        {
          path: 'clientpreview', 
          name: 'Clientpreview',
          component: ClientPreview
        },
      ]
    }
  ]
});
