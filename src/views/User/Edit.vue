<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
    <div style="direction: rtl; background-color: #1976D2;border-radius: 10px">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>fa fa-chevron-left</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
              :disabled="item.disabled"
          >
            <router-link :to="{name:item.routeName}" style="text-decoration: none;color:yellow;padding: 5px"
                         class="bredRoute">
                           <span>
                                <v-icon>{{ item.icon }}</v-icon>  {{ item.text.toUpperCase() }}
                           </span>
            </router-link>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <transition name="loader-transition">
      <div v-if="showTransition" style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
        <v-form @submit.prevent="editRequest"
        >
          <v-row
              style="direction: rtl;margin-top: 10px;color:  #1976D2;  letter-spacing: 3px;">
            اطلاعات کاربر
          </v-row>
          <br>
          <div class="title-en">
            <div
                style="position: absolute;text-align: left; background-color: #1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
              User Information
            </div>
          </div>
          <hr style="display: block; width: 100%"/>
          <br>
          <v-row>
            <v-col style="margin: 0 auto"
                   xl="4" lg="4"
                   md="6" sm="6" xs="12"
            >
              <v-text-field
                  v-model="form.firstname"
                  label="نام"
                  required
                  reverse
              ></v-text-field>
            </v-col>
            <v-col style="margin: 0 auto"
                   xl="4" lg="4"
                   md="6" sm="6" xs="12"
            >
              <v-text-field
                  v-model="form.lastname"
                  label="نام خانوادگی"
                  required
                  reverse
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="margin: 0 auto"
                   xl="4" lg="4"
                   md="6" sm="6" xs="12"
            >
              <v-text-field
                  v-model="form.phoneNumber"
                  label="شماره تلفن"
                  required
                  reverse
              ></v-text-field>
            </v-col>
            <v-col style="margin: 0 auto"
                   xl="4" lg="4"
                   md="6" sm="6" xs="12"
            >
              <v-text-field
                  v-model="form.email"
                  label="ایمیل"
                  required
                  reverse
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="margin: 0 auto"
                   xl="4" lg="4"
                   md="6" sm="6" xs="12"
            >
              <v-textarea
                  v-model="form.address"
                  label="آدرس"
                  required
                  reverse
              ></v-textarea>
            </v-col>
            <v-col
                xl="4" lg="4"
                md="6" sm="6" xs="12"
                style="margin: 0 auto"
            >
              <v-select
                  v-model="form.role"
                  :items="roles"
                  menu-props="auto"
                  label="Select"
                  prepend-icon="fa fa-cogs"
                  single-line
                  style="direction: rtl; text-align: right"
              ></v-select>
              <v-switch
                  v-model="form.active"
                  inset
                  reverse
                  style="direction: ltr"
                  label=":فعال بودن کاربر"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="text-align: center">
              <v-btn
                  style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: #1976D2;color: white; margin: 0 auto;"
                  type="submit">
                ویرایش
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </transition>
  </div>
</template>

<script>

import {mapActions} from "vuex";

var defaultForm = {
  firstname: null,
  lastname: null,
  phoneNumber: null,
  email: null,
  address: null,
  role: null,
  active: null,
};

export default {
  name: "Add",
  props: {
    user_id: {default: null},
  },
  components: {},
  data() {
    return {
      showTransition: false,
      form: {...defaultForm},
      activeDialog: false,
      roleDialog: false,
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'کابران',
          disabled: false,
          routeName: "ListUsers",
          icon: "fa fa-users"
        },
        {
          text: 'کاربر',
          disabled: true,
          routeName: "EditUser",
          icon: "fa fa-user"
        },
      ],
      roles: [
        {
          icon: 'fa fa-users',
          text: 'کاربر معمولی',
          value: 'user'
        },
        {
          icon: 'fa fa-cog',
          text: 'مدیر',
          value: 'admin'
        },
        {
          icon: 'fa fa-cogs',
          text: 'مدیر کل',
          value: 'superAdmin'
        },
      ],
    }
  },
  methods: {
    ...mapActions("user", ['show', 'update', 'active', 'assignRole']),
    async editRequest() {
      let response = await this.update({data: this.form, userId: this.user_id});
      if (!(response instanceof Error)) {
        await this.$router.replace("/users");
      }
    },
    async activeUser(id) {
      let response;
      response = await this.active({
        data: !this.item.active,
        userId: id
      });
      if (!(response instanceof Error)) {
        this.activeDialog = false;
      }
    },
    async assignRoleUser(value) {
      let response;
      response = await this.assignRole({role: value, userId: this.item.id});
      if (!(response instanceof Error)) {
        this.roleDialog = false;
      }
    }
  },
  async created() {
    if (this.user_id) {
      this.form = await this.show(this.user_id);
    }
    this.showTransition = await true;
  }
}
</script>

<style scoped>
.loader-transition-enter-active {
  transition: all .8s ease;
}

.loader-transition-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.loader-transition-enter, .loader-transition-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.bredRoute:hover {
  background-color: cadetblue;
  color: white;
  border-radius: 10px;
  transition: 1s;
}

.title-en {
  letter-spacing: 5px;
  font-size: 10px;
  white-space: nowrap;
  text-transform: uppercase;
  color: #55706D;
  display: block;
  padding-bottom: 15px;
}
</style>
