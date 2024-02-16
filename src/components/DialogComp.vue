<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ name }}</span>
        </v-card-title>
        <v-card-text>
          <div v-if="name == 'Add Item'">
            <ItemDialog />
          </div>
          <div v-else-if="name == 'Add Department'">
            <DepartmentDialog/>
          </div>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save"> Close </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
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
  methods: {
    save() {
      this.$emit("changeDialog");
    },
  },
};
</script>
