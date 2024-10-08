<template>
  <div class="common-layout">
    <el-container>
      <el-main>
       <div class="extraMargin">
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
                <el-button link class="btn-secondary" type="default" size="medium" @click="handleClick(form.id)">
                  Service details
                </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
       </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { db, collection, getDocs, doc, deleteDoc } from '../firebase';
import GenerateForm from '../components/GenerateForm.vue';

export default {
  data() {
    return {
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
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    async fetchTableData() {
      try {
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
.extraMargin{
  margin-right: 60px;
  margin-left: 60px;
}
.el-card{
  height: 210px;
}

.card-title{
  font-weight: 600;
  height: 36px;
  overflow: hidden;
}
.card-desctiption{
  margin-bottom: 10px;
  height: 36px;
  overflow: hidden;
}
.my-col {
  margin-bottom: 20px;
}

.el-button--primary {
  transition: .3s;
  background-color: #209a93;
  border-color: #209a93;
}

.el-button--primary:focus,
.el-button--primary:hover {
  background: #1c827d;
  border-color: #209a93;
}
.btn-secondary{
  transition: .3s;
  background-color: #615768;
  color:#fff;
}
.btn-secondary:hover{
  background-color: #453d4b;
  color:#fff;
}
</style>