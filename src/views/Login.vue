<template>
  <section class="Login flex h-screen bg-white">
    <div class="bg-black bg-opacity-25"></div>
    <div class="flex items-center lg:w-1/2 o-page o-box bg-blue-light">
      <div class="flex-1 text-center px-4 py-2 m-2">
        <img
          src="@/assets/images/secure_login.svg"
          class="mx-auto w-3/4"
        >
      </div>
    </div>
    <div class="lg:w-1/2 w-full h-full p-16">
      <header class="o-box__header text-left border-none pt-0">
        <div class="flex pb-6">
          <logo class="w-1/2" size="300"/>
        </div>
        <h1 class="mb-0 text-4xl font-bold">
          Welcome Back!
        </h1>
        <p class="mb-0 text-md">
          To keep connected with us, please login using your username and password.
        </p>
      </header>

      <div class="o-box__body border-none pt-0">
        <form class="my-4" @submit.prevent="submit()" >
          <div class="c-field" :class="{ 'text-red-600': $v.username.$error }">
            <label
              class="c-field__label float-left"
            >Username</label>
            <input
              class="c-field__input"
              :class="{ 'border-red-600 border-2': $v.username.$error }"
              type="text"
              name="username"
              v-model="username"
            >
             <ul v-if="$v.$error" class="flex mt-1">
                <li
                  class="text-red-600 mb-2 text-xs"
                  v-if="!$v.username.required"
                >
                  <strong>This field is required</strong>
                </li>
              </ul>
          </div>

          <div class="c-field mt-4" :class="{ 'text-red-600': $v.password.$error }">
            <label
              class="c-field__label float-left"
            >Password</label>
              <input
                type="password"
                name="password"
                v-model="password"
                class="c-field__input"
               :class="{ 'border-red-600 border-2': $v.password.$error }"
              >
              <ul v-if="$v.$error" class="flex mt-1">
                <li
                  class="text-red-600 mb-2 text-xs"
                  v-if="!$v.password.required"
                >
                  <strong>This field is required</strong>
                </li>
              </ul>
          </div>
          <button
            type="submit"
            :disabled="$v.$invalid"
            class="c-button block w-full mt-6"
            :class="{ 'v--disabled': $v.$invalid }"
          >
            <font-awesome-icon v-if="loading" :icon="['fas', 'circle-notch']" class="mr-2 animate-spin" size="lg"/>
            <span v-else>Sign in</span>
          </button>
        </form>
        <div class="c-field my-4 text-left">
          <p>
            Dont have an account yet?
            <router-link
              to="/register"
              class="text-yellow-dark font-bold"
            >
              Register here.
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import axios from "axios";

export default Vue.extend({
  name: "Login",
  data(){
    return{
      username: null,
      password:null,
      loading:false,
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
   methods: {
     goToSuccess(){
        this.loading = false
        window.location.replace("/success");
     },
    async submit(){

      try {
        /* eslint-disable  */
      this.loading = true
      this.$v.$touch();
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        await axios
          .post(`https://api.baseplate.appetiserdev.tech/api/v1/auth/login`, {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem('access_token', response.data.data.access_token);
            let toast = (Vue as any).toasted.show('Well done! You have successfully logged in to this website',{
              duration: 1500,
              position: "top-right",
              type: "success",
              singleton: true,
              onComplete: this.goToSuccess,
              closeOnSwipe:true,
           	 theme: "toasted-primary", 
            });
          })
          .catch((error) => {
            this.loading = false
            let toast = (Vue as any).toasted.show(error.response.data.message,{
              duration: 3000,
              position: "top-right",
              type: "error",
              singleton: true,
              closeOnSwipe:true,
              theme: "toasted-primary", 
            });
          });
      } catch ( error ) {
          this.loading = false
          let toast = (Vue as any).toasted.show(error.response.data.message,{
              duration: 3000,
              position: "top-right",
              type: "error",
              singleton: true,
              closeOnSwipe:true,
              theme: "toasted-primary", 
            });
      }
    }
  }
  
});
</script>
