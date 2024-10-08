<template>
  <div>
    <el-container>
      <el-main>
        <div style="max-width: 800px; margin: auto; margin-bottom: 20px;">
          <div>Service: {{ jsonData.config.serviceName }}</div>
          <div style="font-size: 12px; margin-top:6px">{{ jsonData.config.serviceDescription }}</div>
        </div>

        <div class="form-prev">
          <generate-form v-if="jsonData" :data="jsonData" ref="generateForm">
          </generate-form>
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { db, collection, getDoc, doc, addDoc } from '../firebase.js';
import GenerateForm from '../components/GenerateForm.vue';

export default {
  data() {
    return {
      jsonData: null,
      editData: {},
      remoteFuncs: {

      },

    }
  },
  components: {
    GenerateForm,
  },
  methods: {

  },
  async mounted() {
    try {
      let id = this.$route.query.id
      console.log("id", id)
      const docRef = doc(db, 'texts', id);  // Specify the collection name and document ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Document data is available in docSnap.data()
        console.log('Document data:', docSnap.data().content);
        try {
          this.jsonData = JSON.parse(docSnap.data().content);
        } catch (e) {
          this.$message.error(e.message)
          this.$refs.uploadJson.end()
        }

      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  },
}
</script>

<style>
.form-prev {
  max-width: 800px;
  margin: auto;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
}

.form-prev input,
.form-prev textarea,
.form-prev .el-slider__button {
  border-color: #209a93 !important;
}

.form-prev .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #209a93;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #209a93 !important;
  border-color: #209a93 !important;
}

.el-switch.is-checked .el-switch__core {
  border-color: #209a93 !important;
  background-color: #209a93 !important;
}

.el-radio__input.is-checked+.el-radio__label {
  color: #209a93 !important;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #209a93 !important;
  background: #209a93 !important;
}

.form-prev .el-slider__bar {
  background-color: #209a93;
}

.el-color-picker__trigger {
  border-color: #209a93!important;
}

.form-prev .el-select,
.form-prev .el-date-editor.el-input {
  width: 100%;
}
</style>