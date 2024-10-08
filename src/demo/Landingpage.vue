<template>
  <div class="containera">
    <div class="container-header">
      <div class="services-filter">
        <div>All</div>
        <div>General Services</div>
        <div>Teacher Services</div>
        <div>Parent Services</div>
        <div> Services</div>
      </div>

      <div class="services-search">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    <div class="cards-container">



      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ $t('global.adminPage') }}</span>
        </div>
        <div class="text item" style="margin-bottom: 20px;">
          In this module you can create the form wizard and set the form elements
        </div>
        <el-button link type="primary" size="medium" @click="handleClick('admin')">
          Create the services
        </el-button>
        <el-button link class="btn-secondary" type="default" size="medium" @click="helpDialogVisible = true">
          Get help
        </el-button>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ $t('global.clientPage') }}</span>
        </div>
        <div class="text item" style="margin-bottom: 20px;">
          In this module you can view the services and start using them as a user
        </div>
        <el-button link type="primary" size="medium" @click="handleClick('client')">
          Preview/Use the services
        </el-button>
        <el-button link class="btn-secondary" type="default" size="medium" @click="helpDialogVisible = true">
          Get help
        </el-button>

      </el-card>
    </div>


    <cus-dialog :visible="helpDialogVisible" @on-close="helpDialogVisible = false" width="500px" form :action="false">
      <h1 class="form-info-title">Service Information</h1>
      <p>This is a help dialog to show how to use a certian sercvice This is a help dialog to show how to use a certian
        sercvice This is a help dialog to show how to use a certian sercvice This is a help dialog to show how to use a
        certian sercvice </p>
    </cus-dialog>
  </div>
</template>

<script>
import CusDialog from '../components/CusDialog';

export default {
  components: {
    CusDialog,
  },
  data() {
    return {
      jsonData: { "list": [{ "type": "input", "icon": "icon-input", "options": { "width": "100%", "defaultValue": "", "required": false, "dataType": "string", "pattern": "", "placeholder": "", "disabled": false, "maxlength": -1, "showWordLimit": false, "remoteFunc": "func_1703670296000_5958" }, "name": "单行文本", "key": "1703670296000_5958", "model": "text1", "rules": [{ "type": "string", "message": "单行文本格式不正确" }] }, { "type": "textarea", "icon": "icon-diy-com-textarea", "options": { "width": "100%", "defaultValue": "", "required": false, "disabled": false, "pattern": "", "placeholder": "", "maxlength": -1, "showWordLimit": false, "remoteFunc": "func_1703670297000_59193" }, "name": "多行文本", "key": "1703670297000_59193", "model": "text2", "rules": [] }, { "type": "grid", "icon": "icon-grid-", "columns": [{ "span": 12, "list": [{ "type": "input", "icon": "icon-input", "options": { "width": "100%", "defaultValue": "", "required": false, "dataType": "string", "pattern": "", "placeholder": "", "disabled": false, "maxlength": -1, "showWordLimit": false, "remoteFunc": "func_1703670313000_76172" }, "name": "单行文本", "key": "1703670313000_76172", "model": "text3", "rules": [{ "type": "string", "message": "单行文本格式不正确" }] }] }, { "span": 12, "list": [{ "type": "textarea", "icon": "icon-diy-com-textarea", "options": { "width": "100%", "defaultValue": "", "required": false, "disabled": false, "pattern": "", "placeholder": "", "maxlength": -1, "showWordLimit": false, "remoteFunc": "func_1703670319000_99680" }, "name": "多行文本", "key": "1703670319000_99680", "model": "text4", "rules": [] }] }], "options": { "gutter": 0, "justify": "start", "align": "top", "remoteFunc": "func_1703670311000_73193" }, "name": "栅格布局", "key": "1703670311000_73193", "model": "grid_1703670311000_73193", "rules": [] }, { "type": "editor", "icon": "icon-fuwenbenkuang", "options": { "defaultValue": "", "width": "", "disabled": false, "remoteFunc": "func_1703670323000_64646" }, "name": "编辑器", "key": "1703670323000_64646", "model": "editor", "rules": [] }], "config": { "labelWidth": 100, "labelPosition": "right", "size": "small" } },
      editData: {},
      remoteFuncs: {

      },
      helpDialogVisible: false,
    }
  },
  methods: {
    handleClick(page) {
      const lang = this.$route.params.lang || 'en-US';
      this.$router.push({ path: `/${lang}/${page}` });
    },
    handleDisabled() {
      this.$refs.generateForm.disabled(['text4', 'editor'], true)
    },

    handleEnabled() {
      this.$refs.generateForm.disabled('editor', false)
    }
  }
}
</script>
<style lang="css" scoped>
.containera {
  margin: auto;
  margin-top: 40px;
  max-width: 900px;
}

.cards-container {
  display: flex;
  gap: 20px;
}

/* .box-card {
  width: 400px;
} */
</style>