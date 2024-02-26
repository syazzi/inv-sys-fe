<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit</span>
          <v-btn icon class="ml-auto" @click="closeDialog">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid fill-height>
            <div>Item: {{ data.item_name }} | &nbsp;</div>
            <div>Quantity: {{ data.quantity }} | &nbsp;</div>
            <div>Vendor: {{ data.vendor_name }}</div>
          </v-container>
          <v-form @submit.prevent="submit">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="location"
                    label="Location"
                  ></v-text-field>
                  <v-text-field
                    v-model="image_url"
                    label="Image"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-textarea
                    v-model="description"
                    solo
                    name="input-7-4"
                    label="Descriptions"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    v-model="menuA"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="arrival_date"
                        label="Arrival Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="arrival_date"
                      @input="menuA = false"
                      no-title
                      scrollable
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="9">
                  <small>*indicates required field</small>
                </v-col>
                <v-col cols="3">
                  <v-btn
                    block
                    depressed
                    color="primary"
                    class="ml-auto"
                    type="submit"
                  >
                    submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["dialog", "data"],
  data() {
    return {
      location: "",
      description: "",
      image_url: "",
      arrival_date: this.data.arrival_date,
      menuA: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("changeDialog");
      this.location = "";
      this.image_url = "";
      this.description = "";
      this.arrival_date = "";
    },
    submit() {
      const values = {
        id: this.data.id,
        arrival_date: this.arrival_date,
        location: this.location,
        description: this.description,
        image_url: this.image_url
      }
      this.$emit("submitEdit", values)
      this.arrival_date = this.data.arrival_date
      this.image_url = "";
      this.description = "";
      this.location = "";
    },
  },
};
</script>

<style></style>
