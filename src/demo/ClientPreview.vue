<template>
  <div>
    <el-container>
      <el-main>
        <div class="form-prev">
          <!-- Step progress bar -->
          <el-steps v-if="showStepsComponents" :active="currentStep - 1" finish-status="success">
            <el-step
              v-for="(step, index) in stepsLength"
              :key="index"
              :title="'Step ' + (index + 1)"
              :description="step.description || ''">
            </el-step>
          </el-steps>
          <generate-form v-if="jsonData" :data="jsonData" :currentStep="currentStep" ref="generateForm">
          </generate-form>

          <div v-if="showStepsComponents">
            <el-button type="button" size="medium"  @click="handleBack($event)">Back</el-button>
          <el-button type="button" size="medium"  @click="handleNext($event)">{{currentStep == stepsLength ? 'Submit':'Next'}}</el-button>
          </div>

        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { db, getDoc, doc, addDoc } from '../firebase.js';
import GenerateForm from '../components/GenerateForm.vue';

export default {
  data() {
    return {
      currentStep: 1,
      stepsLength:0,
      showStepsComponents:false,
      jsonData: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          dir: 'ltr'
        }
      },
      editData: {},
      remoteFuncs: {

      },

    }
  },
  components: {
    GenerateForm,
  },
  methods: {
    handleNext(){
      this.currentStep = this.currentStep + 1;
      if(this.currentStep == this.stepsLength+1){
        alert('Submitted')
        window.location.href = "/"
      }
    },
    handleBack(){
      if(this.currentStep == 1){
        return
      }
      this.currentStep = this.currentStep - 1;
    },
    hasStepNumber() {
      return this.jsonData.list.some(item => item.options && item.options.hasOwnProperty('stepNumber'));
    }

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
          console.log("this.jsonData",this.jsonData)
          this.stepsLength = this.jsonData.list.length;

          // Check if stepNumber key exists in any options
             if (this.hasStepNumber()) {
            this.showStepsComponents = true;
          } else {
            this.showStepsComponents = false;
          }

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