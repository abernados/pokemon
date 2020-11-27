<template>
  <div class="bg-white p-8 rounded-lg shadow">
    <a
      :href="url"
      class="o-box"
    >
      <div class="">
        <div class="flex">
          <div>
            <h3 class="text-base mb-0 text-blue">{{ title }}</h3>
            <strong class="font-semibold text-2xl tracking-tight text-blue">{{
              value
            }}</strong>
          </div>
          <div class="ml-auto text-right">
            <!-- <i class="text-9xl text-blue-75" :class="icon"></i> -->
            <font-awesome-icon
              class="text-6xl text-blue-75"
              :icon="icon"
            />
            <!-- <span class="mdi text-9xl text-blue-75" :class="icon"></span> -->
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["title", "value", "icon", "url"],
};
</script>
