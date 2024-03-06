<template>
  <v-container class="AddStock" id="addStock">
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
          <v-select :label="category" readonly></v-select>
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
            :items="vendors.map((item) => item.attributes)"
            item-text="name"
            item-value="id"
            label="Vendor"
            @change="vendorChange"
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
          <div class="pt-3">
            <v-text-field label="Location" v-model="location"></v-text-field>
          </div>
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
    <DialogComp
      :dialog="itemDialog"
      :name="item"
      @changeDialog="close"
      @modalSubmit="handleItemSubmit"
    />
    <DialogComp
      :dialog="departmentDialog"
      :name="department"
      @changeDialog="close"
      @modalSubmit="handleDepartmentSubmit"
    />
    <DialogComp
      :dialog="vendorDialog"
      :name="vendor"
      @changeDialog="close"
      @modalSubmit="handleVendorSubmit"
    />
  </v-container>
</template>

<script>
import axios from "axios";
import DialogComp from "../components/DialogComp.vue";
import apiService from '../service/api.service';
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
      quantity: 1,
      price: null,
      itemDialog: false,
      departmentDialog: false,
      vendorDialog: false,
      description: "",
      image_url: "",
      location: "",
      username: "",
      items: [],
      departments: [],
      vendors: [],
      menuA: false,
      menuB: false,
    };
  },
  methods: {
    getItems() {
      axios
        .get("http://localhost:3000/api/v1/items")
        .then((res) => {
          this.items = res.data.data;
          this.items.push({ attributes: { name: "Add Item" } });
        })
        .catch((res) => console.log(res));
    },
    getDepartments() {
      axios
        .get("http://localhost:3000/api/v1/departments")
        .then((res) => {
          this.departments = res.data.data;
          this.departments.push({ attributes: { name: "Add Department" } });
        })
        .catch((res) => console.log(res));
    },

    getVendors() {
      axios
        .get("http://localhost:3000/api/v1/vendors")
        .then((res) => {
          this.vendors = res.data.data;
          this.vendors.push({ attributes: { name: "Add Vendor" } });
        })
        .catch((res) => console.log(res));
    },
    async handleSubmit() {
      const headersData = localStorage.getItem('authHeaders')
      const item_id = parseInt(
        this.items
          .filter((item) => item.attributes.name == this.item)
          .map((item) => item.id)
      );
      const department_id = parseInt(
        this.departments
          .filter((item) => item.attributes.name == this.department)
          .map((item) => item.id)
      );
      const vendor_id = parseInt(
        this.vendors
          .filter((item) => item.attributes.name == this.vendor)
          .map((item) => item.id)
      );

      await apiService
        .create("/api/v1/stocks", {
          item_id: item_id,
          department_id: department_id,
          purchase_date: this.purchaseDate,
          arrival_date: this.arrivalDate,
          vendor_id: vendor_id,
          quantity: this.quantity,
          price_per_unit: this.price,
          image_url: this.image_url,
          description: this.description,
          location: this.location,
          username: this.username
        }
        )
        .then((res) => console.log("Success"))
        .catch((res) => console.log(res));
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
      if (this.vendor == "Add Vendor") {
        this.vendorDialog = true;
      }
    },
    handleItemSubmit(values) {
      axios
        .post("http://localhost:3000/api/v1/items", {
          name: values.name,
          category: values.category,
        })
        .then((response) => {
          this.getItems();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      this.itemDialog = false;
    },
    handleDepartmentSubmit(values) {
      axios
        .post("http://localhost:3000/api/v1/departments", {
          name: values.name,
        })
        .then((response) => {
          this.getDepartments();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      this.departmentDialog = false;
      this.department = "";
    },
    handleVendorSubmit(values) {
      axios
        .post("http://localhost:3000/api/v1/vendors", {
          name: values.name,
        })
        .then((response) => {
          this.getVendors();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      this.vendorDialog = false;
    },
  },
  mounted() {
    const user = $cookies.get('userData')
    this.username = user.first_name
    this.getItems();
    this.getDepartments();
    this.getVendors();
  },
};
</script>

<style></style>
