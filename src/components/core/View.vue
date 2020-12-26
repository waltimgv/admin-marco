<template>
  <v-main>
    <router-view :key="key"/>
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',
    computed: {
      key() {
        const fullPath = this.$route.fullPath;
        return fullPath.replace(this.$route.hash, '');
      }
    }
  }
</script>
