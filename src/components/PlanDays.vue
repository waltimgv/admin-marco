<template>
  <div class="d-inline-block">
    <v-chip
      v-if="user.is_plan_expired"
      class="ma-2"
      color="red"
      text-color="white"
    >
      Expirado
    </v-chip>
    <v-chip
      v-else-if="user.is_admin"
      class="ma-2"
      color="green"
      text-color="white"
    >
      Permanente
    </v-chip>
    <v-chip
      v-else
      class="ma-2"
      color="secondary"
    >
      {{ user.plan_days }} dias
    </v-chip>
  </div>
</template>

<script>
  export default {
    name: 'PlanDays',
    props: {
      user: {
        type: Object,
        required: true
      },
    }
  }
</script>

<style scoped>

</style>