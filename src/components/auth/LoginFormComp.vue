<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-text-field
      v-model="email"
      label="Email"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      :rules="passwordRules"
      required
    ></v-text-field>
    <v-btn type="submit" color="primary">Login</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const values = {
          email: this.email,
          password: this.password
        }
        this.$emit("signIn", values)
      }
    },
  },
};
</script>

<style></style>
