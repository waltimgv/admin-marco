<template>
  <div id="index-choose">
    <index-auth v-if="user" />
    <index-guest v-else />
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import IndexGuest from './IndexGuest';
  import IndexAuth from './IndexAuth';

  export default {
    name: 'Index',
    components: {IndexGuest, IndexAuth},
    computed: {
      ...mapState(['user']),
    }
  }
</script>

<style scoped>

</style>