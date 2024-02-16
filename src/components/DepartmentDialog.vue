<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field :label="name + ' Name*'" required></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    // props: ["name"],
    data() {
        return {
            name: 'Department'
        }
    },
}
</script>