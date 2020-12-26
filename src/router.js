import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import vuetifyToast from 'vuetify-toast';
import store from './store';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'hash',
  routes: [
    {
      name: 'Administrador',
      path: '/',
      component: () => import('./views/Index'),
      children: [
        {
          name: 'Usuários',
          path: 'users',
          component: () => import('./views/User/Index'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Editar Usuário',
          path: 'users/:id/edit',
          component: () => import('./views/User/Edit'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Planos',
          path: 'plans',
          component: () => import('./views/Plan/Index'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Editar Plano',
          path: 'plans/:id/edit',
          component: () => import('./views/Plan/Edit'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Adicionar Planos',
          path: 'plans/add',
          component: () => import('./views/Plan/Add'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Menus',
          path: 'menus',
          component: () => import('./views/Menu/Index'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Adicionar Menu',
          path: 'menus/add',
          component: () => import('./views/Menu/Add'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Editar Menu',
          path: 'menus/:id/edit',
          component: () => import('./views/Menu/Edit'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Visualizar Menu',
          path: 'menus/:id',
          component: () => import('./views/Menu/View'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Submenus',
          path: 'submenus',
          component: () => import('./views/Submenu/Index'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Adicionar Submenu',
          path: 'submenus/add',
          component: () => import('./views/Submenu/Add'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Editar Submenu',
          path: 'submenus/:id/edit',
          component: () => import('./views/Submenu/Edit'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          name: 'Visualizar Submenu',
          path: 'submenus/:id',
          component: () => import('./views/Submenu/View'),
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
      ]
    },
    {
      path: "*",
      redirect: '/'
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt_token') == null) {
      return next({
        path: '/',
        params: {nextUrl: to.fullPath}
      })
    }

    let user = store.state.user;
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (user.is_admin) {
        return next();
      }

      return next('/');
    }

    if (to.matched.some(record => record.meta.requiresPlan)) {
      if (user.is_plan_expired) {
        vuetifyToast.error('Você precisa de um plano valido para acessar essa página.');
        return next('/price');
      }

      return next();
    }
  }

  next();
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
