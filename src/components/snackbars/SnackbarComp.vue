<template>
  <v-snackbar
      v-model="snackbar.show"
      :timeout="timeout"
      top
    >
      {{ snackbar.message }}
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            timeout: 2000,
        }
    },
}
</script>

<style>

</style>