<template>
  <v-container fluid>
    <v-card class="overflow-hidden" min-height="400">
      <v-app-bar flat color="white">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        left
        absolute
        temporary
        dark
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            v-model="group"
            active-class="deep-white--text text--accent-4"
          >
            <router-link :to="item.to" v-for="item in menu" :key="item.to">
              <v-list-item>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-card-text>
        <router-view/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'Admin',
    data() {
      return {
        drawer: false,
        group: null,
        menu: [
          {
            title: 'Início',
            to: '/',
          },
          {
            title: 'Planos',
            to: '/plans',
          },
          {
            title: 'Usuários',
            to: '/users',
          },
          {
            title: 'Menus',
            to: '/menus',
          },
          {
            title: 'Submenus',
            to: '/submenus',
          }
        ]
      }
    },
    watch: {
      group() {
        this.drawer = false
      },
    },
  }
</script>

<style scoped>

</style>