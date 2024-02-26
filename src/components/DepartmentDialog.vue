<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field :rules="rules" v-model="name" :label="subName + ' Name*'" required></v-text-field>
        </v-col>
        <v-col cols="9">
          <small>*indicates required field</small>
        </v-col>
        <v-col cols="3">
          <v-btn block depressed color="primary" class="ml-auto" type="submit"> submit </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: ["subName"],
  data() {
    return {
      name: '',
      rules: [
        v => !!v || "required"
      ]
    };
  },
  methods: {
    submit(){
      const values = {
        name: this.name,
      }
      this.$emit("modalSubmit", values)
    }
  },
};
</script>
