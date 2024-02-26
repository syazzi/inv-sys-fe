<template>
  <div class="dashboard container">
    <h1 class="black--text text-center">Dashboard</h1>

    <v-container class="my-5">
      <HomepageTable @addTable="addTable" :items="items" :stocks="filteredStocks" :subHeaders="subHeaders" :headers="headers" :expandedRow="expandedRow"/>
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
        { title: "Item", key: "name" },
        { title: "Categories", key: "category" },
        { title: "Current Stock", key: "current_stock" },
        { title: "Ordered Stock", key: "ordered_stock" },
      ],
      subHeaders: [
        { title: "Department", key: "department_name" },
        { title: "Serial No", key: "serial_no" },
        { title: "Location", key: "location" },
        { title: "Status", key: "status" },
        { title: "Purchase Date", key: "purchase_date" },
        { title: "Price($)", key: "price_per_unit" },
      ],
      stocks: [],
      filteredStocks: [],
      items: [],
      expandedRow: null
    };
  },
  methods: {
    addTable(item, index){
      this.expandedRow = this.expandedRow === index ? null : index;
      this.filteredStocks = this.stocks.filter(data => data.attributes.item_id == item.id)
    }
  },
  mounted() {
    axios
    .get('http://localhost:3000/api/v1/stocks')
    .then(res => {
      this.stocks = res.data.data
      })
    .catch(res => console.log(res))

    axios
    .get('http://localhost:3000/api/v1/items')
    .then(res => {
      this.items = res.data
      })
    .catch(res => console.log(res))
  },
};
</script>
