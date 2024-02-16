<template>
  <v-app>
    <NavBar />

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
    //
  }),
};
</script>
