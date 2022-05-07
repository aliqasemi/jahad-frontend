<template>
  <div style="background-color: #eeeeea; min-height: 1200px">
    <v-subheader style="text-align: right;direction: rtl; background-color: #1F7087; color: #eeeeea">
      <v-icon color="white" style="left: 5px">fa fa-cogs</v-icon>
      سامانه جهاد سازندگی
    </v-subheader>
    <v-row>
      <v-col xl="6" lg="6" md="6" sm="12" xs="12" style="padding-top: 20px;direction: rtl">
        <v-img style="border-radius: 10px" height="600px" width="450px" :src="require('@/images/jahad.jpg')">
        </v-img>
      </v-col>
      <v-col xl="6" lg="6" md="6" sm="12" xs="12">
        <v-form @submit.prevent="forgotPassRequest" style="padding-top: 20px" v-if="!confirm && show">
          <v-row style="margin: 0 auto; width: 60%">
            <v-col style="margin: 0 auto"
                   cols="12"
            >
              <v-text-field
                  v-model="phoneNumber"
                  label="شماره تلفن"
                  required
                  reverse
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="text-align: center">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <v-btn type="submit" color="success" elevation="2" block>
                تایید
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <transition name="loader-transition">
          <v-form @submit.prevent="confirmPassRequest" style="padding-top: 20px" v-if="confirm">
            <v-row style="margin: 0 auto;text-align: right; direction: rtl">
              <v-col style="margin: 0 auto;text-align: center"
                    lg="4" xl="5" md="12" sm="12" xs="12"
              >
                <v-text-field
                    v-model="code"
                    label="کد تایید"
                    reverse
                    required
                ></v-text-field>
                <br>
                کد تایید را در یافت نکرده اید؟
                <br>
                <v-btn color="warning" style="margin-top: 10px" @click="forgotPassRequestRepeat">کلیک کنید</v-btn>
              </v-col>
            </v-row>
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
                <v-btn type="submit" color="primary" elevation="2" block>
                  تایید
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </transition>
      </v-col>
    </v-row>
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
    confirm: false,
    password: null,
    password_confirmation: null,
    visiblePass: false,
    visibleRepPass: false,
    code: null,
  }),
  methods: {
    ...mapActions("user", ['confirmForgotPassword', 'verifyForgotPassword']),
    async forgotPassRequest() {
      const body = {
        phoneNumber: this.phoneNumber,
      };
      let response = await this.confirmForgotPassword({formData: body});

      if (!(response instanceof Error)) {
        this.confirm = true;
      }
    },
    async forgotPassRequestRepeat() {
      const body = {
        phoneNumber: this.phoneNumber,
      };
      await this.confirmForgotPassword({formData: body});
    },
    async confirmPassRequest() {
      const body = {
        phoneNumber: this.phoneNumber,
        password: this.password,
        password_confirmation: this.password_confirmation,
        code: this.code,
      };

      let response = await this.verifyForgotPassword({formData: body});

      if (!(response instanceof Error)) {
        await this.$router.replace("/");
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

.login {
  animation: pulse 5s infinite;
  margin-top: 20px;
  width: 50%;
  background: linear-gradient(30deg, #b1b1b1, cadetblue);
  border-radius: 20px;
}
</style>
