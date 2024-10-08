<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="extraMargin">
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

          <div style="margin-bottom: 20px">Number of services: {{ tableData.length }}</div>
          <el-row :gutter="20">
            <el-col :span="8" class="my-col" v-if="previewVisible" v-for="form in tableData" :key="form.id"
              :data="JSON.parse(form.content)">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <div class="card-title">{{ JSON.parse(form.content).config.serviceName }}</div>
                  <span style="font-size: 12px; color: #ccc;">( {{ form.id }} )</span>

                </div>
                <div class="text item">
                  <div class="card-desctiption">{{ JSON.parse(form.content).config.serviceDescription }}</div>
                  <el-button link type="primary" size="medium" @click="handleClick(form.id)">
                    Start service
                  </el-button>
                  <el-button link class="btn-secondary" type="default" size="medium" @click="helpDialogVisible = true">
                    Service details
                  </el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>

    <cus-dialog :visible="helpDialogVisible" @on-close="helpDialogVisible = false" width="500px" form :action="false">
      <h1 class="form-info-title">Service Information</h1>
      <p>This is a help dialog to show how to use a certian sercvice This is a help dialog to show how to use a certian
        sercvice This is a help dialog to show how to use a certian sercvice This is a help dialog to show how to use a
        certian sercvice </p>
    </cus-dialog>

    <div class="spinner" v-if="spinnerVisible">
      <img src="@/assets/spinner.png" width="20" height="20" class="rotate">
      <div style="font-size: 12px;">Loading ...</div>
    </div>
  </div>
</template>

<script>
import { db, collection, getDocs, doc, deleteDoc } from '../firebase';
import GenerateForm from '../components/GenerateForm.vue';
import CusDialog from '../components/CusDialog';

export default {
  data() {
    return {
      spinnerVisible: false,
      helpDialogVisible: false,
      tableData: [],
      loading: false,
      previewVisible: true,
      widgetModels: {},
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
      },
    };
  },
  components: {
    GenerateForm,
    CusDialog,
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    async fetchTableData() {
      try {
        this.spinnerVisible = true;
        const collections = ['texts'];
        let allData = [];

        for (const coll of collections) {
          const querySnapshot = await getDocs(collection(db, coll));
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          allData = [...allData, ...data];
        }

        // Sort the data based on the timestamp field (newest first)
        this.tableData = allData
          .filter(item => item.timestamp) // Ensure timestamp exists
          .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds); // Sort in descending order

          this.spinnerVisible = false;
        console.log(allData);
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
      }
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const day = date.getDate().toString().padStart(2, '0'); // Format day
      const month = monthNames[date.getMonth()]; // Get month name
      const year = date.getFullYear(); // Get full year

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0'); // Format minutes
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours.toString().padStart(2, '0') : '12'; // Hour '0' should be '12'

      return `${day}. ${month} ${year} ${hours}:${minutes} ${ampm}`; // Format as "DD. Month YYYY HH:mm AM/PM"
    },
    handleCreateForm() {
      const lang = this.$route.params.lang || 'en-US';
      this.$router.push(`/${lang}/create-form`);
    },
    handleClick(id) {
      const lang = this.$route.params.lang || 'en-US';
      this.$router.push({ path: `/${lang}/clientpreview`, query: { id } });
    },
  },
};
</script>
<style scoped>
.extraMargin {
  margin-right: 60px;
  margin-left: 60px;
}

.el-card {
  height: 210px;
}

.card-title {
  font-weight: 600;
  height: 36px;
  overflow: hidden;
}

.card-desctiption {
  margin-bottom: 10px;
  height: 36px;
  overflow: hidden;
}

.my-col {
  margin-bottom: 20px;
}
</style>

<style>
.el-button--primary {
  transition: .3s;
  background-color: #209a93 !important;
  border-color: #209a93 !important;
}

.el-button--primary:focus,
.el-button--primary:hover {
  background: #1c827d !important;
  border-color: #209a93 !important;
}

.btn-secondary {
  transition: .3s;
  background-color: #615768 !important;
  color: #fff !important;
}

.btn-secondary:hover {
  background-color: #453d4b !important;
  color: #fff !important;
}
</style>

<style lang="scss">
.container-header {
  margin-bottom: 40px;
  margin-top: 20px;
}

.services-filter {
  display: flex;
  background-color: #209a93;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  gap: 20px;
  margin-bottom: 10px;

  div {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

.services-search {
  background-color: #615767;
  padding: 25px;
  border-radius: 4px;

  input {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 5px;
  }
}

.spinner {
  display: flex;
  position: fixed;
  background-color: #ffffff59;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.rotate {
  display: inline-block;
  /* Ensure it behaves like an inline element */
  animation: rotation 1.5s linear infinite;
  /* Adjust duration as needed */
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>