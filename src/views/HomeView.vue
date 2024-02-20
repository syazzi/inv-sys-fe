<template>
  <div class="dashboard container">
    <h1 class="black--text text-center">Dashboard</h1>

    <v-container class="my-5">
      <HomepageTable @addTable="addTable" :items="items" :headers="headers" />
    </v-container>
  </div>
</template>

<script>
import axios from "axios"
import HomepageTable from "../components/TableComp.vue";
export default {
  name: "Home",
  components: { HomepageTable },
  data() {
    return {
      headers: [
        { title: "Item", key: "item_name" },
        { title: "Categories", key: "item_category" },
        { title: "Department", key: "department_name" },
        { title: "Current Stock", key: "current_stock" },
        { title: "Ordered Stock", key: "quantity" },
      ],
      items: [],
    };
  },
  methods: {
    addTable(item){
      console.log(item);
    }
  },
  mounted() {
    axios
    .get('http://localhost:3000/api/v1/stocks')
    .then(res => {
      this.items = res.data.data
      })
    .catch(res => console.log(res))
  },
};
</script>
