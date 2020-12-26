import {mapState} from 'vuex';

export default {
  data: function () {
    return {
      menu: 0,
      submenu: 0,
      link: null,
      menusChecked: [],
    }
  },
  watch: {
    menu: function () {
      this.submenu = null;
      this.link = null;
    },
    submenu: function () {
      this.link = null;
    },
  },
  computed: {
    ...mapState(['menus', 'user']),
    submenus: function () {
      const submenus = this.menu ? this.menu.submenus : [];
      if (submenus) {
        this.submenu = submenus[0];
      }

      return submenus;
    },
    links: function () {
      const link = this.submenu ? this.submenu.links : [];
      if (link) {
        this.link = link[0];
      }

      return link;
    },
  },
  methods: {
    checkMenusPaid(user, menus) {
      const hasPlanExpired = user.is_plan_expired;
      if (hasPlanExpired) {
        return menus;
      }

      return menus.map(menu => {
        const submenus = menu.submenus.map(submenu => {
          const links = submenu.links.map(link => ({...link, disabled: false}));
          return {
            ...submenu,
            links: links,
            disabled: false,
          };
        });

        return {
          ...menu,
          submenus: submenus,
          disabled: false,
        };
      });
    }
  },
  mounted() {
    this.menusChecked = this.checkMenusPaid(this.user, this.menus);
    this.menu = this.menusChecked[0];
  }
}

