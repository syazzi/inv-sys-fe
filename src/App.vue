<template>
  <v-app>
    <NavBar :isloggedIn="isloggedIn"/>

    <div class="grey lighten-4">
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: { NavBar },
  data: () => ({
    isloggedIn: false
  }),
  methods: {
    
  },
  created() {
    const authData = $cookies.get('userData')
    if(authData){
      this.isloggedIn = true 
    }
      console.log(this.isloggedIn);
    // return this.isloggedIn = false
  },
};
</script>
