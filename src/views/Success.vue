<template>
  <section class="flex h-screen">
    <div class="flex items-center o-page o-box bg-white w-full place-content-center">
      <div class="px-4 py-2 m-2">
        <img
          src="@/assets/images/welcome.svg"
          class="mx-auto w-3/4 h-64"
        >
        <div class="text-blue-dark font-bold">
          <h2 class="text-6xl">Welcome!</h2>
          <p class="text-2xl">You have been successfully logged in.</p>
        </div>
         <div class="c-field my-8">
          <p>
            <router-link
              to="/login"
              class="font-bold c-button v--warning v--outline"
            >
              Logout
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
