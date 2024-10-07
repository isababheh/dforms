<template>
  <div class="common-layout">
    <el-container>
      <el-main>

        <el-row :gutter="20">
          <el-col :span="6" v-if="previewVisible" v-for="form in tableData" :key="form.id"
          :data="JSON.parse(form.content)">
            <el-card class="box-card" >
              <div slot="header" class="clearfix">
                <span>{{ form.id }}</span>
                <div>Submit a technical issue</div>
                <el-button link type="primary" size="small" @click="handleClick(form.id)">
                Start service
              </el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
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
