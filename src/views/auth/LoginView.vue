<template>
  <v-container>
    <LoginFormComp @signIn="signIn"/>
  </v-container>
</template>

<script>
import LoginFormComp from "../../components/auth/LoginFormComp.vue";
import apiService from "../../service/api.service";
export default {
    components: {
        LoginFormComp
    },
    methods: {
      async signIn(values){
        await apiService.create('/auth/sign_in', {email: values.email, password: values.password})
      .then(res => {
        console.log($cookies);
        $cookies.set('userData', res.data.data)
        $cookies.set('userAuth', res.headers)
        this.$router.push('/')
        // window.location.reload()
      })
      .catch(err => {
        console.log(err);
      })
      }
    },
}
</script>

<style>

</style>