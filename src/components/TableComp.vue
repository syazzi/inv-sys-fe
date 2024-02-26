<template>
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
                      <v-btn class="ma-2" text icon color="blue lighten-2">
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
</template>

<script>
export default {
  props: ["items", "headers", "expandedRow", "subHeaders", "stocks"],
};
</script>

<style></style>
