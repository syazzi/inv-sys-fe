<template>
  <div class="dashboard container">
    <div id="homeView">
      <h1 class="black--text text-center">Dashboard</h1>

      <v-container class="my-5">
        <HomepageTable
          @addTable="addTable"
          :items="items"
          :stocks="filteredStocks"
          :subHeaders="subHeaders"
          :headers="headers"
          :expandedRow="expandedRow"
          @edit="edit"
        />
      </v-container>
    </div>
    <v-container class="d-flex justify-end">
      <v-btn top depressed @click="exportToPdf">Export to pdf</v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import HomepageTable from "../components/TableComp.vue";
import html2pdf from "html2pdf.js";
import apiService from "../service/api.service";
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
      expandedRow: null,
      dialog: false,
      username: "",
    };
  },
  methods: {
    async getStocks() {
      axios
        .get("http://localhost:3000/api/v1/stocks")
        .then((res) => {
          this.stocks = res.data.data;
        })
        .catch((res) => console.log(res));
    },
    async getItems() {
      axios
        .get("http://localhost:3000/api/v1/items")
        .then((res) => {
          this.items = res.data;
        })
        .catch((res) => console.log(res));
    },
    addTable(item, index) {
      this.expandedRow = this.expandedRow === index ? null : index;
      this.filteredStocks = this.stocks.filter(
        (data) => data.attributes.item_id == item.id
      );
    },
    async edit(values) {
      await apiService
        .patch("/api/v1/stocks/" + values.id, {
          arrival_date: values.arrival_date,
          location: values.location,
          description: values.description,
          image_url: values.image_url,
          username: this.username,
        })
        .then((res) => {
          this.getStocks();
          this.getItems();
          window.location.reload();
        })
        .catch((res) => console.log(res));
    },
    exportToPdf() {
      html2pdf(document.getElementById("homeView"), {
        margin: 1,
        filename: "stock_table.pdf",
      });
    },
  },
  mounted() {
    const user = $cookies.get("userData");
    if (user) {
      this.username = user.first_name;
      this.getStocks();
    }
    this.getItems();
  },
};
</script>
