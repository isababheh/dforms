<template>
  <div>
    <el-container>
      <el-main>
      <generate-form v-if="jsonData" :data="jsonData" ref="generateForm">
      </generate-form>
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