<template>
  <div>
    <v-form
      class="custom-form sign-in-form"
      autocomplete="off"
      @submit.prevent="submitLogin(username, password)"
    >
      <h2 class="authTitle normalText--text">Sign in</h2>
      <v-text-field
        v-model="username"
        :disabled="logingIn"
        type="email"
        class="custom-auth-textfield"
        name="email"
        label="Email"
        filled
        rounded
      ></v-text-field>
      <v-text-field
        v-model="password"
        :disabled="logingIn"
        type="password"
        class="custom-auth-textfield"
        name="password"
        label="Password"
        autocomplete="on"
        filled
        rounded
      ></v-text-field>
      <v-alert
        v-show="alertError && !logingIn"
        v-model="alertError"
        class="custom-auth-textfield"
        type="error"
        dense
        dismissible
        text
        transition="scroll-y-transition"
      >
        {{ error }}
      </v-alert>
      <v-btn
        class="py-6 px-12 white--text"
        type="submit"
        color="#5995fd"
        :loading="logingIn"
        :disabled="logingIn || username === '' || password === ''"
        rounded
        depressed
      >
        Login
        <template v-slot:loader>
          <span>Logging in</span>
          <v-progress-circular
            class="ml-2"
            indeterminate
            color="secondary"
            :size="15"
            :width="2"
          ></v-progress-circular>
        </template>
      </v-btn>
      <p class="social-text">Forgot Password?</p>
      <div class="social-media">
        <!-- <v-btn class="mx-2" color="dark" outlined fab depressed>
          <v-icon>mdi-facebook</v-icon>
        </v-btn> -->
        <v-btn
          class="mx-2"
          color="dark"
          outlined
          fab
          depressed
          @click="$refs.forgotPassDialog.open()"
        >
          <v-icon>mdi-lock-question</v-icon>
        </v-btn>
        <!-- <v-btn class="mx-2" color="dark" outlined fab depressed>
          <v-icon>mdi-google</v-icon>
        </v-btn> -->
      </div>
    </v-form>
    <forgotPassDialog ref="forgotPassDialog" />
  </div>
</template>

<script>
import forgotPassDialog from '@/components/setting/forgotPass'
export default {
  layout: 'auth',
  components: {
    forgotPassDialog,
  },
  data() {
    return {
      username: '',
      password: '',
      logingIn: false,
      alertError: false,
      error: '',
    }
  },
  validate({ store }) {
    if (store.state.auth.loggedIn) return false
    else return true
  },
  methods: {
    // login methods
    async submitLogin(user, pass) {
      this.logingIn = true
      try {
        const loginData = {
          email: user,
          password: pass,
        }
        await this.$auth.loginWith('local', {
          data: loginData,
        })
      } catch (error) {
        // show error
        this.alertError = true
        this.error = error.response.data
      }
      setTimeout(() => {
        this.logingIn = false
      }, 500)
    },
  },
}
</script>
