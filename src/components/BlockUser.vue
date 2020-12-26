<template>
  <div class="d-inline-block">
    <v-chip
      v-if="blocked"
      class="ma-2"
      color="red"
      :disabled="disabled"
      text-color="white"
      @click="block"
    >
      Bloqueado
    </v-chip>
    <v-chip
      v-else-if="blocked === false"
      class="ma-2"
      color="green"
      :disabled="disabled"
      text-color="white"
      @click="block"
    >
      Desbloqueado
    </v-chip>
  </div>
</template>

<script>
  import {block} from '../services/userService';

  export default {
    name: 'BlockUser',
    props: {
      user: {
        type: Object,
        required: true
      },
    },
    data: function () {
      return {
        disabled: false,
        blocked: this.user.is_blocked
      }
    },
    methods: {
      block() {
        this.disabled = true;
        block(this.user.id)
          .then(response => response.data)
          .then(data => this.blocked = data)
          .catch(error => console.error(error))
          .finally(() => this.disabled = false);
      }
    }
  }
</script>

<style scoped>

</style>