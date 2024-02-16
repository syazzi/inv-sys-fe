<template>
  <div class="historyView container">
    <h1 class="text-center black--text">History</h1>

    <v-container class="my-5">
      <HistoryTable :items="items" :headers="headers"/>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios';
import HistoryTable from '../components/TableComp.vue'
export default {
  components: {HistoryTable},
  data() {
    return {
      headers: [
        { title: "item", key: "item_name" },
        { title: "SerialNo", key: "serialNo" },
        { title: "Quantity", key: "quantity" },
        { title: "Purchase date", key: "purchase_date" },
        { title: "Received Date", key: "arrival_date" },
        { title: "Status", key: "status" },
        { title: "Location", key: "location" },
        { title: "Editted By", key: "editted_by" },
        { title: "Remarks", key: "description" },
      ],
      items: [
        
      ],
    };
  },
  mounted() {
    axios
    .get('http://localhost:3000/api/v1/stocks')
    .then(res => {
      this.items = res.data.data
      console.log(this.items);
      })
    .catch(res => console.log(res))
  },
};
</script>
