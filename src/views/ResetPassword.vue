<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl;font-size: 20px;">
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
      <div v-if="show" style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
        <v-row
            style="direction: rtl;margin-top: 10px;color:  #1565C0;  letter-spacing: 3px;">
          تغییر رمز عبور
        </v-row>
        <br>
        <div class="title-en">
          <div
              style="position: absolute;text-align: left; background-color: #1565C0; color: #eeeeee; border-radius: 10px;padding: 7px;">
            Change Password
          </div>
        </div>
        <hr style="display: block; width: 100%"/>
        <v-form @submit.prevent="resetPassRequest" style="padding-top: 20px">
          <v-row style="margin: 0 auto;text-align: right; direction: rtl">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <v-text-field
                  v-model="password"
                  label="رمز عبور"
                  required
                  reverse
                  :type="visiblePass ? 'text' : 'password'"
                  :append-icon="visiblePass ? 'fa fa-eye-slash' : 'fa fa-eye'"
                  @click:append="visiblePass = !visiblePass"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row style="margin: 0 auto;text-align: right; direction: rtl">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <v-text-field
                  v-model="password_confirmation"
                  label="تکرار رمز عبور"
                  required
                  reverse
                  :type="visibleRepPass ? 'text' : 'password'"
                  :append-icon="visibleRepPass ? 'fa fa-eye-slash' : 'fa fa-eye'"
                  @click:append="visibleRepPass = !visibleRepPass"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row style="text-align: center">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <v-btn
                  color="blue darken-2"
                  style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;color: white"
                  type="submit" elevation="2" block>
                تایید
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

export default {
  name: 'ForgotPassword',
  components: {},
  data: () => ({
    show: false,
    error: null,
    phoneNumber: null,
    password: null,
    password_confirmation: null,
    visiblePass: false,
    visibleRepPass: false,
    items: [
      {
        text: 'صفحه اصلی',
        disabled: false,
        routeName: "Main",
        icon: "fa fa-home"
      },
      {
        text: 'تغییر رمز',
        disabled: true,
        routeName: "ًResetPassword",
        icon: "fa fa-eye"
      },
    ]
  }),
  methods: {
    ...mapActions("user", ['resetPassword']),
    async resetPassRequest() {
      const body = {
        password: this.password,
        password_confirmation: this.password_confirmation,
      };
      let response = await this.resetPassword({formData: body});

      if (!(response instanceof Error)) {
        this.confirm = true;
      }
    },
  },
  async created() {
    this.show = await true;
  }
}
</script>
<style>
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
