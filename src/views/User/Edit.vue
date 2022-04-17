<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
    <div style="direction: rtl; background-color: rgba(13,75,118,0.83);border-radius: 10px">
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
    <div style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
      <v-form @submit.prevent="editRequest"
              style="background-color: #b1b1b1; width: 70%;border-radius: 15px;margin: 0 auto">
        <v-row>
          <v-col style="margin: 0 auto"
                 xl="2" lg="3"
                 md="4"
          >
            <v-text-field
                v-model="form.firstname"
                label="نام"
                required
                reverse
            ></v-text-field>
          </v-col>
          <v-col style="margin: 0 auto"
                 xl="2" lg="3"
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
                 xl="2" lg="3"
                 md="4"
          >
            <v-text-field
                v-model="form.phoneNumber"
                label="شماره تلفن"
                required
                reverse
            ></v-text-field>
          </v-col>
          <v-col style="margin: 0 auto"
                 xl="2" lg="3"
                 md="4"
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
                 xl="2" lg="3"
                 md="4"
          >
            <v-textarea
                v-model="form.address"
                label="آدرس"
                required
                reverse
            ></v-textarea>
          </v-col>
          <v-col
              xl="2" lg="3"
              md="4"
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
                style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: rgba(13,75,118,0.83);color: white; margin: 0 auto;"
                type="submit">
              ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
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
      console.log(response);
      if (!(response instanceof Error)) {
        this.roleDialog = false;
      }
    }
  },
  async created() {
    if (this.user_id) {
      this.form = await this.show(this.user_id);
    }
  }
}
</script>

<style scoped>
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
