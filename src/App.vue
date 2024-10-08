<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" rel="stylesheet">

    <div class="fm-header">
      <div style="display: flex; align-items: baseline; gap: 40px">
        <img src="https://tawasul.moe.gov.sa/Content/assets/logos/tawasulLogoColor_1.svg" width="100" />
        <div class="fm-links">
          <div class="fm-title" @click="handleHome">Admin page</div>
          <div class="fm-title" @click="handleHome">Client page</div>
        </div>
      </div>
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
  height: 100px;
  padding: 0 10px;
  background-color: #fff;
  position: relative;
  display: flex;
  padding-right: 100px;
  padding-left: 100px;
  gap: 20px;
  align-items: center;
  justify-content: space-between;

  .fm-links {
    display: flex;
    gap: 20px;
  }

  .fm-title {
    display: inline-block;
    vertical-align: middle;
    color: #209a93;
    font-size: 14px;
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
        color: #209a93;

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
  font-family: 'Play', sans-serif;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}

.fm-link {
  margin-top: 16px;
}
</style>
