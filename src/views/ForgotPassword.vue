<template>
  <div style="background-color: #55706D; height: 1000px">
    <v-form @submit.prevent="forgotPassRequest" style="padding-top: 20px" v-if="!confirm">
      <v-container class="login">
        <v-row style="margin: 0 auto">
          <v-col style="margin: 0 auto"
                 cols="12"
                 md="4"
          >
            <v-text-field
                v-model="phoneNumber"
                label="شماره تلفن"
                required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row style="text-align: center">
          <v-col style="margin: 0 auto"
                 cols="12"
                 md="4"
          >
            <v-btn type="submit" elevation="2" block>
              تایید
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-form @submit.prevent="confirmPassRequest" style="padding-top: 20px" v-else>
      <v-container class="login">
        <v-row style="margin: 0 auto;text-align: right; direction: rtl">
          <v-col style="margin: 0 auto"
                 cols="12"
                 md="4"
          >
            <v-text-field
                v-model="code"
                label="کد تایید"
                reverse
                required
            ></v-text-field>
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
            <v-btn type="submit" elevation="2" block>
              تایید
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: 'ForgotPassword',
  components: {},
  data: () => ({
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
  }
}
</script>
<style>
.login {
  animation: pulse 5s infinite;
  margin-top: 20px;
  width: 50%;
  background: linear-gradient(30deg, #b1b1b1, cadetblue);
  border-radius: 20px;
}
</style>
