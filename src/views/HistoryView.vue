<template>
  <v-row align="center">
    <v-container id="historyTable">
      <h1 class="text-center black--text">History</h1>
      <v-container class="">
        <HistoryTable
          :items="items"
          :headers="headers"
          :expandedRow="expandedRow"
        />
      </v-container>
    </v-container>
    <v-container class="d-flex justify-end">
      <v-btn top depressed @click="exportToPdf">Export to pdf</v-btn>
    </v-container>
  </v-row>
</template>
<script>
import html2pdf from "html2pdf.js";
import axios from "axios";
import HistoryTable from "../components/TableComp.vue";
export default {
  components: { HistoryTable },
  data() {
    return {
      headers: [
        { title: "item", key: "item_name" },
        { title: "SerialNo", key: "serial_no" },
        { title: "Quantity", key: "quantity" },
        { title: "Purchase date", key: "purchase_date" },
        { title: "Received Date", key: "arrival_date" },
        { title: "Status", key: "status" },
        { title: "Location", key: "location" },
        { title: "Editted By", key: "editted_by" },
        { title: "Remarks", key: "description" },
      ],
      items: [],
      expandedRow: null,
    };
  },
  methods: {
    exportToPdf() {
      html2pdf(document.getElementById("historyTable"), {
        margin: 1,
        filename: "historyTabel.pdf",
      });
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/stocks")
      .then((res) => {
        this.items = res.data;
      })
      .catch((res) => console.log(res));
  },
};
</script>
