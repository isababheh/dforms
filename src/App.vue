<template>
  <div id="app">
    <div class="fm-header">
      <div class="fm-title" @click="handleHome">Home</div>

      <div class="fm-link">
        <div class="action-item">
          <el-dropdown @command="handleLangCommand">
            <span class="el-dropdown-link">
              Language <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="en-US">English</el-dropdown-item>
              <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
              <el-dropdown-item command="ar-JO">العربية</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="fm-container"><router-view /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui';

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

export default {
  name: 'app',

  methods: {
    handleHome() {
      const lang = this.$route.params.lang || 'en-US';
      this.$router.push({ path: `/${lang}/` });
    },

    handleCreateForm() {
      window.location.href = window.location.href + "/create-form";
    },

    handleLangCommand(command) {
      this.$router.replace({ name: this.$route.name, params: { lang: command } });
      
     window.location.reload();
    }
  }
}
</script>

<style lang="scss">
.fm-header {
  height: 50px;
  box-shadow: 0 2px 10px rgba(70, 160, 252, 0.6);
  padding: 0 10px;
  background-image: linear-gradient(to right, #1278f6, #00b4aa);
  position: relative;
  display: flex;
  justify-content: space-between;

  .fm-title {
    display: inline-block;
    line-height: 50px;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    opacity: 0.8;
    margin-left: 6px;
    cursor: pointer;
  }

  .fm-link {
    height: 50px;
    float: right;

    .action-item {
      display: inline-block;
      margin-left: 15px;

      .el-dropdown-link {
        cursor: pointer;
        color: #fff;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

.fm-container {
  height: calc(100% - 50px);
}

*,
:after,
:before {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}
.fm-link{
  margin-top: 16px;
}
</style>
