<template>
  <v-container>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="text-center subtitle-2 font-weight-bold"
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="$emit('addTable', item, index)"
            v-for="(item, index) in items.data"
            :key="index"
            class="text-center subtitle-1"
          >
            <td v-for="(header, index) in headers" :key="index">
              {{ item.attributes[header.key] }}
            </td>
          </tr>
          <tr v-if="expandedRow !== null">
            <td :colspan="headers.length">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th
                        class="text-center subtitle-2 font-weight-bold"
                        v-for="(subHeader, index) in subHeaders"
                        :key="index"
                      >
                        {{ subHeader.title }}
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(stock, index) in stocks"
                      :key="index"
                      class="text-center subtitle-1"
                    >
                      <td v-for="(subHeader, index) in subHeaders" :key="index">
                        {{ stock.attributes[subHeader.key] }}
                      </td>
                      <td>
                        <v-btn @click="openModel(stock)" class="ma-2" text icon color="blue lighten-2">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <EditModalVue :dialog="dialog" @changeDialog="close" :data="data" @submitEdit="editSubmit"/>
  </v-container>
</template>

<script>
import EditModalVue from "./EditModal.vue";
export default {
  components: { EditModalVue },
  props: ["items", "headers", "expandedRow", "subHeaders", "stocks"],
  data() {
    return {
      dialog: false,
      data: {}
    };
  },
  methods: {
    close(){
      this.dialog = false
      this.data = {}
    },
      async openModel(value) {
      this.dialog = true;
      this.data = {
        id: value.id,
        arrival_date: value.attributes.arrival_date,
        purchase_date: value.attributes.purchase_date,
        description: value.attributes.description,
        image_url: value.attributes.image_url,
        item_name: value.attributes.item_name,
        location: value.attributes.location,
        price_per_unit: value.attributes.price_per_unit,
        quantity: value.attributes.quantity,
        vendor_name: value.attributes.vendor_name,
      }

    },
    async editSubmit(values){
      this.$emit("edit", values)
    }
  },
};
</script>

<style></style>
