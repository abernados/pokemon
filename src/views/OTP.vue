<template>
  <section class="flex h-screen bg-white">
    <div class="flex items-center lg:w-1/2 o-page o-box bg-blue-light">
      <div class="flex-1 text-center px-4 py-2 m-2">
        <img
          src="@/assets/images/phone-sent.svg"
          class="mx-auto w-3/4"
        >
      </div>
    </div>
    <div class="lg:w-1/2 w-full h-full text-left py-40 px-16">
      <header class="o-box__header border-none pt-0">
        <div class="flex pb-6">
          <logo class="w-1/2" size="300"/>
        </div>
        <h1 class="mb-0 text-4xl font-bold">
          Verify your email
        </h1>
        <p class="mb-0 text-md">
          Please check your email to get the verification code.
        </p>
      </header>

      <div class="o-box__body border-none pt-2">
        <form class="mb-4" @submit.prevent="submit()" >
          <div class="c-field"  :class="{ 'text-red-600': $v.code.$error }">
            <label
              class="c-field__label float-left"
            >Verification Code</label>
            <input
              class="c-field__input"
              :class="{ 'border-red-600 border-2': $v.code.$error }"
              type="text"
              name="code"
              v-model="code"
            >
              <ul v-if="$v.$error" class="flex mt-1">
                <li
                  class="text-red-600 mb-2 text-xs"
                  v-if="!$v.code.required"
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
            <span v-else>Verify</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { required } from "vuelidate/lib/validators";
import axios from "axios";

export default Vue.extend({
  name: "ForgotPassword",
   data(){
    return{
      code: null,
      loading:false,
      token: null,
    }
  },
  validations: {
    code: { required },
  },
   methods: {
     goToLogin(){
        this.loading = false
        window.location.replace("/");
     },
    async submit(){
      try {
        /* eslint-disable  */
      this.loading = true
      this.$v.$touch();
      axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token');

        await axios
          .post(`https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/verify`, {
            token: this.code,
            via: 'email',
          })
          .then((response) => {
            let toast = (Vue as any).toasted.show(response.data.message,{
              duration: 1500,
              position: "top-right",
              type: "success",
              singleton: true,
              onComplete: this.goToLogin,
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
      } catch ({ error }) {
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
    },
  }
});
</script>
