<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div style="width: 100%;text-align: right;">
          <el-button link type="default" style="margin-left: auto;" size="large" @click="handleCreateForm">
            Create form
          </el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin: auto;">
          <el-table-column prop="id" label="id" width="600" />
          <el-table-column prop="timestamp.seconds" label="timestamp" width="120" />
          <el-table-column fixed="right" label="Operations" min-width="120">
            <template slot="default" slot-scope="{ row }">
              <el-button link type="primary" size="small" @click="handleClick(row.id)">
                View
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import { db, collection, getDocs } from '../firebase';

export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    async fetchTableData() {
      try {
        // List of collection names you want to fetch data from
        const collections = ['texts'];
        
        // Initialize an array to hold all fetched data
        let allData = [];
        
        for (const coll of collections) {
          const querySnapshot = await getDocs(collection(db, coll));
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          allData = [...allData, ...data];
        }
        
        this.tableData = allData;
        console.log(allData)
      } catch (error) {
        console.error('Error fetching data from Firestore: ', error);
      }
    },
    handleCreateForm() {
    const lang = this.$route.params.lang || 'en-US'; // Get the current language from the route parameters, default to 'en-US'
    this.$router.push(`/${lang}/create-form`); // Redirect to the create-form route within the language context
  },
  handleClick(id) {
    const lang = this.$route.params.lang || 'en-US'; // Get the current language from the route parameters, default to 'en-US'
    this.$router.push({ path: `/${lang}/create-form`, query: { id } }); // Redirect with the id parameter in the query string
  }
  }
};
</script>
