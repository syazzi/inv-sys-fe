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
    <v-navigation-drawer app v-model="drawer" class="indigo">
      
      <v-list>
        <v-list-item
          v-for="link in links"
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
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { text: "Homepage", icon: "", route: "/" },
        { text: "AddStock", icon: "", route: "/add-stock" },
        { text: "History", icon: "", route: "/history" },
      ],
    };
  },
};
</script>

<style></style>
