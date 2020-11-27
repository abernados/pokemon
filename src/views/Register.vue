<template>
  <section class="Login flex h-screen bg-white">
    <div class="flex items-center lg:w-1/2 o-page o-box bg-blue-light">
      <div class="flex-1 text-center px-4 py-2 m-2">
        <img
          src="@/assets/images/account.svg"
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
          Create your free account
        </h1>
        <p class="mb-0 text-md">
          Please use your active email address and contact number to verify your account.
        </p>
      </header>

      <div class="o-box__body border-none pt-0">
        <form @submit.prevent="submit()" class="mb-4">
            <div class="c-field" 
              :class="{
                'text-red-600': $v.name.$error,
              }">
              <label
                class="c-field__label float-left"
              >Full Name</label>
              <input
                class="c-field__input"
                :class="{
                  'border-red-600 border-2': $v.name.$error,
                }"
                type="text"
                name="name"
                v-model="name"
              >
               <ul v-if="$v.$error" class="flex mt-1">
                  <li
                    class="text-red-600 mb-2 text-xs"
                    v-if="!$v.name.required"
                  >
                    <strong>This field is required</strong>
                  </li>
                </ul>
            </div>
            <div class="c-field mt-4"
              :class="{
                'text-red-600': $v.email.$error,
              }">
              <label
                class="c-field__label float-left"
              >Email Address</label>
              <input
                class="c-field__input"
                 :class="{
                  'border-red-600 border-2': $v.email.$error,
                }"
                type="email"
                name="email"
                v-model="email"
                placeholder="johndoe@sample.com"
              >
              <ul v-if="$v.$error" class="flex mt-1">
                  <li
                    class="text-red-600 mb-2 text-xs"
                    v-if="!$v.email.required"
                  >
                    <strong>This field is required</strong>
                  </li>
                </ul>
            </div>
          <div class="o-two-columns">
            <div class="c-field mt-4"
              :class="{
                'text-red-600': $v.password.$error,
              }">
              <label
                class="c-field__label float-left"
              >Password</label>
              <div class="c-input-group">
                <input
                  type="password"
                  name="password"
                  v-model="password"
                  class="c-field__input"
                   :class="{
                  'border-red-600 border-2': $v.password.$error,
                }"
                >
                <ul v-if="$v.$error" class="flex mt-1">
                  <li
                    class="text-red-600 mb-2 text-xs"
                    v-if="!$v.password.required"
                  >
                    <strong>This field is required</strong>
                  </li>
                   <li
                    class="text-red-600 mb-2 text-xs"
                    v-else-if="!$v.password.minLength"
                  >
                    <strong>Password must be atleast 8 characters</strong>
                  </li>
                </ul>
              </div>
            </div>
            <div class="c-field mt-4"
              :class="{
                'text-red-600': $v.repeatPassword.$error,
              }">
              <label
                class="c-field__label float-left"
              >Repeat Password</label>
              <div class="c-input-group">
                <input
                  type="password"
                  name="repeatPassword"
                  v-model="repeatPassword"
                  class="c-field__input"
                   :class="{
                  'border-red-600 border-2': $v.repeatPassword.$error,
                }">
                <ul v-if="$v.repeatPassword.$error" class="flex mt-1">
                  <li
                    class="text-red-600 mb-2 text-xs"
                    v-if="!$v.repeatPassword.sameAs"
                  >
                    <strong>Password did not match</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button
            type="submit"
            :disabled="$v.$invalid"
            class="c-button block w-full mt-6"
            :class="{ 'v--disabled': $v.$invalid }"
          >
            <font-awesome-icon v-if="loading" :icon="['fas', 'circle-notch']" class="mr-2 animate-spin" size="lg"/>
            <span v-else>Register</span>
          </button>
        </form>
        <div class="c-field my-4 text-left">
          <p>
            Already have an account yet?
            <router-link
              to="/login"
              class="text-yellow-dark font-bold"
            >
              Sign in here.
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  required,
  email,
  minLength,
  sameAs
} from "vuelidate/lib/validators";
import axios from "axios";
export default Vue.extend({
  name: "Register",
  data(){
    return {
      name: null,
      email: null,
      password: null,
      repeatPassword: null,
      loading:false,
    }
  },
   validations: {
          name: { required },
          email: { required,email },
          password: { required, minLength: minLength(8)},
          repeatPassword: { sameAsPassword: sameAs('password') }
  },
  methods: {
    goToOTP(){
        this.loading = false
        window.location.replace("/otp");
     },
    async submit(){
      try {
        /* eslint-disable  */
      this.loading = true
      this.$v.$touch();
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        await axios
          .post(`https://api.baseplate.appetiserdev.tech/api/v1/auth/register`, {
            full_name: this.name,
            password: this.password,
            password_confirmation: this.repeatPassword,
            email: this.email,
          })
          .then((response) => {
            console.log(response.data.success);
            localStorage.setItem('access_token', response.data.data.access_token);
             let toast = (Vue as any).toasted.show('You have successfully registered an account. Please verify your email.',{
              duration: 2000,
              position: "top-right",
              type: "success",
              singleton: true,
              onComplete: this.goToOTP,
              closeOnSwipe:true,
           	 theme: "toasted-primary", 
            });
          })
          .catch((error) => {
            console.log(error.response.data.message)
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
      } catch (error) {
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
  },
});
</script>
