<template>
  <v-layout style="text-align: right;direction: rtl;max-height: 50px;margin: 10px;padding: 10px">
    <v-container style="margin: 5px; padding: 5px;">
      <v-icon @click.stop="drawer = !drawer">fa fa-bars</v-icon>
    </v-container>

    <v-navigation-drawer v-model="drawer" app temporary right width="420" class="navigation">
      <v-list class="pa-1">
        <v-row style="text-align: end;" class="ma-0">
          <v-col lg="9" class="flex-justified-right">
            <div class="Title" style="text-align: right">
              <div class="Name Fa">{{ authUser.firstname + ' ' + authUser.lastname }}</div>
              <div class="Role Fa">مدیریت</div>
            </div>
          </v-col>
          <v-col lg="3" class="flex-justified-left">
            <a class="LogOut">
              <v-tooltip bottom color="black" transition="slide-x-transition">
                <template v-slot:activator="{ on }">
                  <v-btn small @click.native.stop="logoutRequest" slot="activator" outlined fab
                         color="black"
                         dark v-on="on">
                    <v-icon dark>fa fa-power-off</v-icon>
                  </v-btn>
                </template>
                <span>خروج از حساب کاربری</span>
              </v-tooltip>
            </a>
          </v-col>
        </v-row>
      </v-list>
      <v-list>
        <v-list-item
            v-if="getAuthorizeUser !== 'user'"
            link
            :to="{name:'ListCategories'}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>دسته بندی ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            link
            :to="{name:'ListServices'}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>خدمت ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            link
            :to="{name:'ListRequirements'}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>نیازمندی ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-if="getAuthorizeUser !== 'user'"
            link
            :to="{name:'ListSteps', params: {project_id: 0}}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>مراحل</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-if="getAuthorizeUser !== 'user'"
            link
            :to="{name:'ListProjects'}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>پروژه ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-if="getAuthorizeUser !== 'user'"
            link
            :to="{name:'ListProducts'}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>محصولات</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-if="getAuthorizeUser !== 'user' && getAuthorizeUser !== 'admin'"
            link
            :to="{name:'ListTemplates'}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>قالب ها</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-if="getAuthorizeUser !== 'user'"
            link
            :to="{name:'ListBranches'}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>شعب</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            v-if="getAuthorizeUser !== 'user'"
            link
            :to="{name:'AttachProduct', params: {project_id: 0}}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>اعطای محصول برای پروژه از انبار</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            link
            :to="{name:'ResetPassword'}"
        >
          <v-list-item-icon>
            <v-icon>fa-list-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>تغییر رمز</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
            link
            v-if="getAuthorizeUser !== 'user' && getAuthorizeUser !== 'admin'"
            :to="{name:'ListUsers'}"
        >
          <v-list-item-icon>
            <v-icon>fa-users</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-right: 5px">
            <v-list-item-title>مدیریت کاربران</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Navigation",
  data() {
    return {
      fav: true,
      menu: true,
      message: false,
      hints: true,
      drawer: false,
      user: {name: ""},
      Items: [],
    }
  },
  computed: {
    authUser() {
      return JSON.parse(localStorage.getItem('user'))
    },
    ...mapGetters("user", ['getAuthorizeUser'])
  },
  methods: {
    ...mapActions("user", ['logout']),
    async logoutRequest() {
      let response = await this.logout();

      if (!(response instanceof Error)) {
        await this.$router.replace("/login");
      }
    }
  }
};

</script>
<style>
.Header .Menu {
  position: absolute;
  right: 20px;
  top: 20px;
}

.navigation {
  animation: pulse 5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #b1b1b1;
  }
  50% {
    background-color: #eeeeee;
  }
  100% {
    background-color: #d6d6d6;
  }
}
</style>
