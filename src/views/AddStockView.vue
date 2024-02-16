<template>
  <v-container class="AddStock">
    <h1 class="text-center">Add Stock</h1>
    <v-form @submit.prevent="handleSubmit" id="add-stock-form">
      <v-layout row wrap>
        <v-flex xs12 md6 class="pa-1">
          <v-select
            :items="items.map((item) => item.attributes)"
            v-model="item"
            item-value="name"
            item-text="name"
            label="Item"
            @change="itemChange"
            required
          />
        </v-flex>
        <v-flex xs12 md6 class="pa-1">
          <v-select v-model="category" :label="category" readonly></v-select>
        </v-flex>
        <v-flex xs12 md6 class="pa-1">
          <v-select
            :items="departments.map((item) => item.attributes)"
            v-model="department"
            item-text="name"
            item-value="id"
            label="Department"
            @change="departmentChange"
            required
          />
        </v-flex>
        <v-flex xs12 md3 class="pa-1">
          <v-menu
            v-model="menuA"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="purchaseDate"
                label="Purchase Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="purchaseDate"
              @input="menuA = false"
              no-title
              scrollable
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 md3 class="pa-1">
          <v-menu
            v-model="menuB"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="arrivalDate"
                label="Arrival Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="arrivalDate"
              @input="menuB = false"
              no-title
              scrollable
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 md6 class="pa-1">
          <v-select
            v-model="vendor"
            :items="vendors.map(item => item.attributes)"
            item-text="name"
            item-value="id"
            label="Vendor"
            required
          ></v-select>
        </v-flex>
        <v-flex xs12 md3 class="pa-1">
          <v-text-field
            type="number"
            v-model="quantity"
            label="Quantity"
            value="1"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md3 class="pa-1">
          <v-text-field
            v-model="price"
            type="number"
            label="Price per Unit"
            value="1"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 md6 class="pa-1">
          <v-file-input chips label="Insert Image"></v-file-input>
        </v-flex>
        <v-flex xs12 md6 class="pa-1">
          <v-textarea solo name="input-7-4" label="Descriptions"></v-textarea>
        </v-flex>
        <v-flex align-self-center class="mb-6 text-center">
          <v-btn
            rounded
            class="pa-5"
            color="primary"
            type="submit"
            form="add-stock-form"
            >Save</v-btn
          >
        </v-flex>
      </v-layout>
    </v-form>
    <DialogComp :dialog="itemDialog" :name="item" @changeDialog="close" />
    <DialogComp
      :dialog="departmentDialog"
      :name="department"
      @changeDialog="close"
    />
    <DialogComp :dialog="vendorDialog" :name="vendor" @changeDialog="close" />
  </v-container>
</template>

<script>
import axios from "axios";
import DialogComp from "../components/DialogComp.vue";
export default {
  components: { DialogComp },
  data() {
    return {
      item: null,
      department: null,
      category: null,
      purchaseDate: null,
      arrivalDate: null,
      vendor: null,
      quantity: null,
      price: null,

      itemDialog: false,
      departmentDialog: false,
      vendorDialog: false,

      items: [],
      departments: [],
      vendors: [],
      menuA: false,
      menuB: false,
    };
  },
  methods: {
    handleSubmit() {
      try {
        const stock = {
          item: this.item,
          category: this.category,
          department: this.department,
          purchase_date: this.purchaseDate,
          arrival_date: this.arrivalDate,
          vendor: this.vendor,
          quantity: this.quantity,
          price: this.price,
        };
        console.log(stock);
        return stock;
      } catch (err) {
        console.log(err);
      }
    },
    itemChange() {
      if (this.item == "Add Item") {
        this.itemDialog = true;
      }
      this.category = this.items.map((item) => {
        if (item.attributes.name == this.item) {
          return item.attributes.category;
        }
      });
    },
    close() {
      this.itemDialog = false;
      this.departmentDialog = false;
      this.vendorDialog = false;
      this.item = null;
      this.department = null;
      this.vendor = null;
    },
    departmentChange() {
      if (this.department == "Add Department") {
        this.departmentDialog = true;
      }
    },
    vendorChange() {
      if (this.item == "Add Vendors") {
        this.vendorDialog = true;
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/items")
      .then((res) => {
        this.items = res.data.data;
        this.items.push({ attributes: { name: "Add Item" } });

      })
      .catch((res) => console.log(res));

    axios
      .get("http://localhost:3000/api/v1/departments")
      .then((res) => {
        this.departments = res.data.data;
        this.departments.push({ attributes: { name: "Add Department" } });
      })
      .catch((res) => console.log(res));

    axios
      .get("http://localhost:3000/api/v1/vendors")
      .then((res) => {
        this.vendors = res.data.data;
        this.vendors.push({ attributes: { name: "Add Vendors" } });
      })
      .catch((res) => console.log(res));
  },
};
</script>

<style></style>
