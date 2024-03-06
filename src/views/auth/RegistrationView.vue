<template>
  <v-container>
    <RegisterFormComp @register="signUp" />
  </v-container>
</template>

<script>
import RegisterFormComp from "../../components/auth/RegisterFormComp.vue";
import axios from "axios";
import apiService from "../../service/api.service";
export default {
  components: {
    RegisterFormComp,
  },
  methods: {
    async signUp(values) {
      await apiService
        .create("/auth", {
          first_name: values.firstname,
          last_name: values.lastname,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        })
        .then((res) => {
          console.log(res);
          this.$router.push({ name: 'login'});
          window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    },
  },
};
</script>

<style></style>
