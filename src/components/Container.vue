<template>
  <div class="fm-style">
    <el-container class="fm2-container">
      <el-main class="fm2-main">
        <el-container>
          <el-aside width="250px">
            <div class="components-list">
              <template v-if="basicFields.length">
                <div class="widget-cate">{{ $t('fm.components.basic.title') }}</div>
                <draggable tag="ul" :list="basicComponents"
                  v-bind="{ group: { name: 'people', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
                  @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">
                  <template v-for="(item, index) in basicComponents">
                    <li v-if="basicFields.indexOf(item.type) >= 0" class="form-edit-widget-label"
                      :class="{ 'no-put': item.type == 'divider' }" :key="index">
                      <a>
                        <i class="icon iconfont" :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                      </a>
                    </li>
                  </template>
                </draggable>
              </template>
              <template v-if="advanceFields.length">
                <div class="widget-cate">{{ $t('fm.components.advance.title') }}</div>
                <draggable tag="ul" :list="advanceComponents"
                  v-bind="{ group: { name: 'people', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
                  @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">
                  <template v-for="(item, index) in advanceComponents">
                    <li v-if="advanceFields.indexOf(item.type) >= 0" class="form-edit-widget-label"
                      :class="{ 'no-put': item.type == 'table' }" :key="index">
                      <a>
                        <i class="icon iconfont" :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                      </a>
                    </li>
                  </template>
                </draggable>
              </template>


              <template v-if="layoutFields.length">
                <div class="widget-cate">{{ $t('fm.components.layout.title') }}</div>
                <draggable tag="ul" :list="layoutComponents"
                  v-bind="{ group: { name: 'people', pull: 'clone', put: false }, sort: false, ghostClass: 'ghost' }"
                  @end="handleMoveEnd" @start="handleMoveStart" :move="handleMove">
                  <template v-for="(item, index) in layoutComponents">
                    <li v-if="layoutFields.indexOf(item.type) >= 0" class="form-edit-widget-label no-put" :key="index">
                      <a>
                        <i class="icon iconfont" :class="item.icon"></i>
                        <span>{{ item.name }}</span>
                      </a>
                    </li>
                  </template>
                </draggable>
              </template>

            </div>

          </el-aside>
          <el-container class="center-container" direction="vertical">
            <el-alert :title="messageText" type="success" class="fixed" v-if="updatedMessage" show-icon>
            </el-alert>
            <el-header class="btn-bar" style="height: 45px;">
              <slot name="action">

              </slot>
              <el-button type="text" size="medium" icon="el-icon-document" @click="handleSave($event)">Save</el-button>
              <!-- <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">{{$t('fm.actions.import')}}</el-button> -->
              <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">{{
                $t('fm.actions.clear') }}</el-button>
              <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">{{
                $t('fm.actions.preview') }}</el-button>
              <!-- <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">{{$t('fm.actions.json')}}</el-button> -->
              <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document"
                @click="handleGenerateCode">{{
                $t('fm.actions.code') }}</el-button>
            </el-header>
            <el-main :class="{ 'widget-empty': widgetForm.list.length == 0 }">

              <widget-form v-if="!resetJson" ref="widgetForm" :data="widgetForm"
                :select.sync="widgetFormSelect"></widget-form>
            </el-main>

          </el-container>

          <el-aside class="widget-config-container">
            <el-container>
              <el-header height="45px">
                <div class="config-tab" :class="{ active: configTab == 'widget' }"
                  @click="handleConfigSelect('widget')">
                  {{ $t('fm.config.widget.title') }}</div>
                <div class="config-tab" :class="{ active: configTab == 'form' }" @click="handleConfigSelect('form')">
                  {{ $t('fm.config.form.title') }}</div>
              </el-header>
              <el-main class="config-content">
                <widget-config v-show="configTab == 'widget'" :data="widgetFormSelect"></widget-config>
                <form-config v-show="configTab == 'form'" :data="widgetForm.config"></form-config>
              </el-main>
            </el-container>

          </el-aside>

          <cus-dialog :visible="previewVisible" @on-close="previewVisible = false" ref="widgetPreview" width="1000px"
            form>
            <generate-form :edit="formEdit" @on-change="handleDataChange" v-if="previewVisible" :data="widgetForm"
              :value="widgetModels" :remote="remoteFuncs" ref="generateForm">

              <template v-slot:blank="scope">
                Width <el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
                Height <el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
              </template>
            </generate-form>

            <template slot="action">
              <el-button type="primary" @click="handleTest">{{ $t('fm.actions.getData') }}</el-button>
              <el-button @click="formEdit = false" v-if="formEdit">{{ $t('fm.actions.disabledEdit') }}</el-button>
              <el-button @click="formEdit = true" v-else>{{ $t('fm.actions.enabledEdit') }}</el-button>
              <el-button @click="handleReset">{{ $t('fm.actions.reset') }}</el-button>
            </template>
          </cus-dialog>

          <cus-dialog :visible="uploadVisible" @on-close="uploadVisible = false" @on-submit="handleUploadJson"
            ref="uploadJson" width="800px" form>
            <el-alert type="info" :title="$t('fm.description.uploadJsonInfo')"></el-alert>
            <div id="uploadeditor" style="height: 400px;width: 100%;">{{ jsonEg }}</div>
          </cus-dialog>

          <cus-dialog :visible="jsonVisible" @on-close="jsonVisible = false" ref="jsonPreview" width="800px" form>

            <div id="jsoneditor" style="height: 400px;width: 100%;">{{ jsonTemplate }}</div>

            <template slot="action">
              <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">{{
                $t('fm.actions.copyData') }}</el-button>
            </template>
          </cus-dialog>

          <cus-dialog :visible="codeVisible" @on-close="codeVisible = false" ref="codePreview" width="800px" form
            :action="false">
            <!-- <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div> -->
            <el-tabs type="border-card" style="box-shadow: none;" v-model="codeActiveName">
              <el-tab-pane label="Vue Component" name="vue">
                <div id="vuecodeeditor" style="height: 500px; width: 100%;">{{ vueTemplate }}</div>
              </el-tab-pane>
              <el-tab-pane label="HTML" name="html">
                <div id="codeeditor" style="height: 500px; width: 100%;">{{ htmlTemplate }}</div>
              </el-tab-pane>
            </el-tabs>
          </cus-dialog>
          <cus-dialog :visible="infoVisible" @on-close="infoVisible = false" ref="infoPreview" width="460px" form
            :action="false">
            <h1 class="form-info-title">Service Information</h1>
            <form>
              <el-input placeholder="Service Name" class="form-group" v-model="ServiceName"></el-input>
              <span v-if="ServiceNameError" class="error">Please fill the field</span>
              <el-input placeholder="Service Description" class="form-group" v-model="ServiceDescription"></el-input>
              <span v-if="ServiceDescriptionError" class="error">Please fill the field</span>
              <el-button @click="submitInfo" type="primary" size="default" class="form-info-submit">{{
                $t('fm.actions.save')
                }}</el-button>
            </form>

          </cus-dialog>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import { basicComponents, layoutComponents, advanceComponents } from './componentsConfig.js'
import { loadJs, loadCss } from '../util/index.js'
import request from '../util/request.js'
import generateCode from './generateCode.js'
import { db, collection, getDoc, doc, updateDoc, setDoc, addDoc } from '../firebase.js';

export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    generateCode: {
      type: Boolean,
      default: false
    },
    generateJson: {
      type: Boolean,
      default: false
    },
    upload: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text']
    },
    advanceFields: {
      type: Array,
      default: () => ['blank', 'imgupload', 'editor', 'cascader']
    },
    layoutFields: {
      type: Array,
      default: () => ['grid']
    }
  },
  data() {
    return {
      messageText: "",
      updatedMessage: false,
      ServiceName: "",
      ServiceDescription: "",
      ServiceNameError: false,
      ServiceDescriptionError: false,
      basicComponents,
      layoutComponents,
      advanceComponents,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
        },

      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      infoVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        func_test(resolve) {
          setTimeout(() => {
            const options = [
              { id: '1', name: '1111' },
              { id: '2', name: '2222' },
              { id: '3', name: '3333' }
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken(resolve) {
          request.get('http://tools-server.making.link/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback(response, file, fileList) {
          console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      vueTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`,
      codeActiveName: 'vue',
      formEdit: true
    }
  },
  async mounted() {
    try {
      const id = this.$route.query.id;
      const extractedId = id && id.includes('/') ? id.split('/')[0] : id;
      const docRef = doc(db, 'texts', extractedId);  // Specify the collection name and document ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Document data is available in docSnap.data()
        console.log('Document data:', docSnap.data().content);
        try {
          this.setJSON(JSON.parse(docSnap.data().content))
          this.uploadVisible = false
        } catch (e) {
          this.$message.error(e.message)
          this.$refs.uploadJson.end()
        }
        // Handle document data (e.g., navigate to a detailed view page)
        window.location.href = window.location.href + '/create-form?id=' + extractedId;
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }

    this._loadComponents()
  },
  methods: {
    _loadComponents() {
      this.basicComponents = this.basicComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.advanceComponents = this.advanceComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
      this.layoutComponents = this.layoutComponents.map(item => {
        return {
          ...item,
          name: this.$t(`fm.components.fields.${item.type}`)
        }
      })
    },
    handleGoGithub() {
      window.location.href = 'https://github.com/GavinZhuLei/vue-form-making'
    },
    handleConfigSelect(value) {
      this.configTab = value
    },
    handleMoveEnd(evt) {
      console.log('end', evt)
    },
    handleMoveStart({ oldIndex }) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove() {
      return true
    },
    handlePreview() {
      console.log(this.widgetForm)
      this.previewVisible = true
    },
    handleTest() {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e => { })
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleReset() {
      this.$refs.generateForm.reset()
    },
    handleGenerateJson() {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      console.log(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {

        const editor = ace.edit('jsoneditor')
        editor.session.setMode("ace/mode/json")

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success(this.$t('fm.message.copySuccess'))
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    handleSave(event) {
      event.preventDefault();
      console.log(this.widgetForm);
      this.ServiceName=this.widgetForm.config.serviceName;
      this.ServiceDescription=this.widgetForm.config.serviceDescription;
      
      this.infoVisible = true;
      return;

    },
    submitInfo() {

      // Reset errors
      this.ServiceNameError = false;
      this.ServiceDescriptionError = false;

      // Check if serviceName or serviceDescription is empty
      if (!this.ServiceName || !this.ServiceName.trim()) {
        this.ServiceNameError = true;
        return;
      }

      if (!this.ServiceDescription || !this.ServiceDescription.trim()) {
        this.ServiceDescriptionError = true;
        return;
      }

      this.widgetForm.config.serviceName = this.ServiceName;
      this.widgetForm.config.serviceDescription = this.ServiceDescription;
      let json = JSON.stringify(this.widgetForm)
      console.log("this.widgetForm", this.widgetForm)
      const id = this.$route.query.id || null;
      const extractedId = id && id.includes('/') ? id.split('/')[0] : id;
      this.storeText(extractedId, json)
    },
    async storeText(id, json) {
      try {
        // Check if 'id' is null
        if (id === null) {
          // If id is null, use addDoc to create a new document
          const docRef = await addDoc(collection(db, 'texts'), {
            content: json, // Store the text data
            timestamp: new Date() // Optional: Store the current timestamp
          });
          this.updatedMessage = true;
          this.messageText = "Service has been created successfully"
        } else {
          // Reference to the Firestore document with the given ID
          const docRef = doc(db, 'texts', id); // Ensure 'id' is just the document ID

          // Check if the document exists
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            // Document exists, update it
            await updateDoc(docRef, {
              content: json, // Update the text data
              timestamp: new Date(), // Optional: Update the current timestamp
            });
            this.updatedMessage = true;
            this.messageText = "Service has been updated successfully"
          } else {
            // Document does not exist, create a new one
            await setDoc(docRef, {
              content: json, // Store the text data
              timestamp: new Date() // Optional: Store the current timestamp
            });
            this.messageText = "Service has been created successfully"
            this.infoVisible = false;
          }

        }
        this.infoVisible = false
        setTimeout(() => {
          this.updatedMessage = false;
        }, 2000);
        text.value = ''; // Clear the input field

      } catch (e) {
        console.error('Error adding or updating document: ', e);
      }

    }

    ,
    handleGenerateCode() {

      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm), 'html')
      this.vueTemplate = generateCode(JSON.stringify(this.widgetForm), 'vue')
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")

        const vueeditor = ace.edit('vuecodeeditor')
        vueeditor.session.setMode("ace/mode/html")
      })
    },
    handleUpload() {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.uploadEditor.session.setMode("ace/mode/json")
      })
    },
    handleUploadJson() {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    handleClear() {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: ''
        },
      }

      this.widgetFormSelect = {}
    },
    clear() {
      this.handleClear()
    },
    getJSON() {
      return this.widgetForm
    },
    getHtml() {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    setJSON(json) {
      this.widgetForm = json

      if (json.list.length > 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
    handleInput(val) {
      console.log(val)
      this.blank = val
    },
    handleDataChange(field, value, data) {
      console.log(field, value, data)
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log(this.$refs.widgetForm)
      }
    },
    '$i18n.locale': function (val) {
      this._loadComponents()
    }
  }
}
</script>
<style scoped>
.form-group{
  margin: 6px 0px;
}
.form-info-title{
  margin-top: 0px;
}
.form-info-submit{
  width: 100%;
  margin-top: 6px;
}
.error{
  color: red;
  font-size: 10px;
}
.fixed{
  position: fixed;
  top:0;
  width: 100%;
  left: 0;
  height: 50px;
}
</style>