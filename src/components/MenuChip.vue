<template>
  <div class="d-inline-block">
    <v-chip
      v-if="is_free"
      class="ma-2"
      color="green"
      text-color="white"
    >
      Gratuito
    </v-chip>
    <v-chip
      v-else
      class="ma-2"
      color="red"
      text-color="white"
    >
      Pago
    </v-chip>
  </div>
</template>

<script>
  export default {
    name: 'MenuChip',
    props: {
      is_free: {
        type: Boolean,
        required: true
      },
    }
  }
</script>

<style scoped>

</style>