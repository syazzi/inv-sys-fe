<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="firstName"
          label="First Name*"
          required
          :rules="nameRules"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="lastName"
          label="Last Name"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-text-field
      v-model="email"
      label="Email*"
      required
      :rules="emailRules"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password*"
      type="password"
      required
      :rules="passwordRules"
    ></v-text-field>
    <v-text-field v-model="confirmPassword" label="Confirm Password*" type="password" required :rules="confirmPasswordRules"></v-text-field>
    <div class="font-light text-xs mb-2">* is required</div>
    <v-btn type="submit" color="primary">Register</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm Password is required',
        v => v === this.password || 'Passwords must match',
      ]
    };
  },
  methods: {
    submit(){
        if(this.$refs.form.validate()){
            const values = {
                firstname: this.firstName,
                lastname: this.lastName,
                email: this.email,
                password: this.password,
                password_confirmation: this.confirmPassword
            }
            this.$emit("register", values)
        }
    }
  },
};
</script>

<style></style>
