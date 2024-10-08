<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div style="width: 100%; text-align: right;">
          <el-button link type="primary" style="margin-left: auto; margin-bottom: 20px;" size="large"
            @click="handleCreateForm">
            Create form
          </el-button>
        </div>
        <el-table :data="tableData" style="width: 100%; margin: auto;">
          <el-table-column prop="id" label="ID" width="auto" />
          <el-table-column label="Service name" width="auto">
        <template slot-scope="{ row }">
          {{ getServiceName(row.content) }}
        </template>
      </el-table-column>
          <el-table-column label="Timestamp" width="400">
            <template slot-scope="{ row }">
              {{ formatTimestamp(row.timestamp) }} <!-- Use timestamp for formatting -->
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template slot="default" slot-scope="{ row }">
              <el-button link type="primary" size="small" @click="handleClick(row.id)">
                View / Edit
              </el-button>
              <el-button link type="danger" size="small" @click="handleDelete(row.id)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <div class="spinner" v-if="spinnerVisible">
      <img src="@/assets/spinner.png" width="20" height="20" class="rotate">
      <div style="font-size: 12px;">Loading ...</div>
    </div>


  </div>
</template>

<script>
import { db, collection, getDocs, doc, deleteDoc } from '../firebase';

export default {
  data() {
    return {
      tableData: [],
      spinnerVisible: false,
    };
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    getServiceName(content) {
      try {
        const parsedContent = JSON.parse(content);
        return parsedContent.config.serviceName || 'N/A'; // Return the service name or 'N/A' if not found
      } catch (error) {
        console.error('Error parsing content:', error);
        return 'N/A';
      }
    },
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
      this.$router.push({ path: `/${lang}/create-form`, query: { id } });
    },
    async handleDelete(id) {
      const confirmDelete = confirm('Are you sure you want to delete this item?');
      if (confirmDelete) {
        this.spinnerVisible = true;
        try {
          const docRef = doc(db, 'texts', id);
          console.log(`Attempting to delete document with ID: ${id}`);
          await deleteDoc(docRef);
          this.tableData = this.tableData.filter((item) => item.id !== id);
          console.log(`Document with ID ${id} deleted successfully`);
        } catch (error) {
          console.error('Error deleting document: ', error);
          alert('Failed to delete document. Please try again.');
        } finally {
          this.spinnerVisible = false;
        }
      }
    },
  },
};
</script>
