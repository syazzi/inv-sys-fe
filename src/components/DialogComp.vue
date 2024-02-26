<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ name }}</span>
          <v-btn icon class="ml-auto" @click="closeDialog">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div v-if="name == 'Add Item'">
            <ItemDialog @modalSubmit="handleModalSubmit"/>
          </div>
          <div v-else-if="name == 'Add Department'">
            <DepartmentDialog :subName="department" @modalSubmit="handleModalSubmit"/>
          </div>
          <div v-else-if="name == 'Add Vendor'">
            <DepartmentDialog :subName="vendor" @modalSubmit="handleModalSubmit"/>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import DepartmentDialog from "./DepartmentDialog.vue";
import ItemDialog from "./ItemDialog.vue";
export default {
  components: { ItemDialog, DepartmentDialog },
  props: ["dialog", "name"],
  data() {
    return {
      department: 'Department',
      vendor: 'Vendor'
    }
  },
  methods: {
    closeDialog() {
      this.$emit("changeDialog");
    },
    handleModalSubmit(values){
      this.$emit("modalSubmit", values)
    }
  },
};
</script>
