<template>
  <nav>
    <v-app-bar class="grey darken-2" flat app>
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Inventory System</span>
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" class="indigo place-self-center">
      <v-list>
        <v-list-item router to="/">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text"> Home </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="isloggedIn">
        <v-list-item
          v-for="link in links_login"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-list-item v-if="isloggedIn" to="#">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              <v-btn @click="logout"> logout </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="isloggedIn == false">
        <v-list-item router to="/login">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  props: ["isloggedIn"],
  data() {
    return {
      drawer: false,
      links_logout: [{ text: "login", icon: "", route: "/login" }],
      links_login: [
        { text: "AddStock", icon: "", route: "/add-stock" },
        { text: "History", icon: "", route: "/history" },
      ],
    };
  },
  methods: {
    logout() {
      // console.log("logout");
      $cookies.remove("userData");
      window.location.reload();
    },
  },
};
</script>

<style></style>
