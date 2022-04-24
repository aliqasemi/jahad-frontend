<template>
  <div style="background-color: #55706D; height: 1000px">
    <transition name="loader-transition">
      <v-form v-if="show" @submit.prevent="registerRequest" style="padding-top: 20px">
        <v-container class="register">
          <v-stepper
              style=""
              v-model="e6"
              vertical
              tag="span"
              alt-labels
          >
            <v-stepper-step
                :complete="e6 > 1"
                step="1"
            >
               اطلاعات هویتی
            </v-stepper-step>

            <v-stepper-content v-if="!confirm" style="text-align: center" step="1">
              <v-card
                  height="200px"
                  style="background-color: #d6d6d6;margin: 5px"
              >
                <v-row style="margin: auto; text-align: right; direction: rtl;">
                  <v-col style="margin: 0 auto"
                         xl="6" lg="6" md="6" sm="12" xs="12"
                  >
                    <v-text-field
                        v-model="form.firstname"
                        label="نام"
                        required
                        reverse
                    ></v-text-field>
                  </v-col>
                  <v-col style="margin: 0 auto"
                         xl="6" lg="6" md="6" sm="12" xs="12"
                  >
                    <v-text-field
                        v-model="form.lastname"
                        label="نام خانوادگی"
                        required
                        reverse
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <v-btn
                  @click="e6 = 2"
                  color="primary"
              >
                ثبت اطلاعات
              </v-btn>
            </v-stepper-content>

            <v-stepper-step
                :complete="e6 > 2"
                step="2"
            >
              اطلاعات ارتباطی
            </v-stepper-step>

            <v-stepper-content v-if="!confirm" style="text-align: center" step="2">
              <v-card
                  height="200px"
                  style="background-color: #d6d6d6;margin: 5px"
              >
                <v-row style="margin: 0 auto; text-align: right; direction: rtl">
                  <v-col style="margin: 0 auto"
                         xl="6" lg="6" md="6" sm="12" xs="12"
                  >
                    <v-text-field
                        v-model="form.phoneNumber"
                        label="شماره تلفن"
                        required
                        reverse
                    ></v-text-field>
                  </v-col>
                  <v-col style="margin: 0 auto"
                         xl="6" lg="6" md="6" sm="12" xs="12"
                  >
                    <v-text-field
                        v-model="form.email"
                        label="ایمیل"
                        required
                        reverse
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <v-btn @click="e6 = 1" color="warning">
                برگشت به مرحله قبل
              </v-btn>
              <br>
              <br>
              <v-btn
                  @click="e6 = 3"
                  color="primary"
              >
                ثبت اطلاعات
              </v-btn>
            </v-stepper-content>

            <v-stepper-step
                :complete="e6 > 3"
                step="3"
            >
             اطلاعات امنیتی
            </v-stepper-step>

            <v-stepper-content v-if="!confirm"  style="text-align: center" step="3">
              <v-card
                  style="background-color: #d6d6d6;margin: 5px"
                  height="200px"
              >
                <v-row >
                  <v-col style="margin: 0 auto"
                         xl="6" lg="6" md="6" sm="12" xs="12"
                  >
                    <v-text-field
                        v-model="form.password"
                        label="رمز عبور"
                        required
                        reverse
                        :type="visiblePass ? 'text' : 'password'"
                        :append-icon="visiblePass ? 'fa fa-eye-slash' : 'fa fa-eye'"
                        @click:append="visiblePass = !visiblePass"
                    ></v-text-field>
                  </v-col>
                  <v-col style="margin: 0 auto"
                         xl="6" lg="6" md="6" sm="12" xs="12"
                  >
                    <v-text-field
                        v-model="form.password_confirmation"
                        label="تکرار رمز عبور"
                        required
                        reverse
                        :type="visibleRepPass ? 'text' : 'password'"
                        :append-icon="visibleRepPass ? 'fa fa-eye-slash' : 'fa fa-eye'"
                        @click:append="visibleRepPass = !visibleRepPass"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <v-btn @click="e6 = 2" color="warning">
                برگشت به مرحله قبل
              </v-btn>
              <br>
              <br>
              <v-btn
                  color="primary"
                  @click="e6 = 4"
                  type="submit"
              >
                تایید نهایی
              </v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">
              کد تایید
            </v-stepper-step>
            <v-stepper-content  step="4">
              <v-card
              >
                <v-container class="register" style="width: 100%">
                  <v-col style="margin: 0 auto"
                         cols="12"
                         md="4"
                  >
                    <v-form @submit.prevent="confirmRegisterRequest">
                      <v-text-field
                          v-model="confirmForm.confirm"
                          label="کدتایید"
                          required
                          reverse
                      ></v-text-field>
                      <v-btn type="submit" elevation="2" block>
                        تایید کد
                      </v-btn>
                    </v-form>
                  </v-col>
                </v-container>
              </v-card>
            </v-stepper-content>
          </v-stepper>
          <v-row style="text-align: center">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <router-link to="/" style="text-decoration: none">
                <v-btn type="submit" elevation="2" block>
                  بازگشت به صفحه اصلی
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </transition>
  </div>
</template>
<script>
import {mapActions} from "vuex";

let defaultForm = {
  firstname: null,
  lastname: null,
  phoneNumber: null,
  email: null,
  password: null,
  password_confirmation: null,
}

let defaultConfirmForm = {
  confirm: null,
}

export default {
  name: 'Register',
  components: {},
  data: () => ({
    show: false,
    error: null,
    form: defaultForm,
    confirmForm: defaultConfirmForm,
    visiblePass: false,
    visibleRepPass: false,
    confirm: false,
    userId: null,
    e6: 1,
  }),
  methods: {
    ...mapActions("user", ['register', 'confirmRegister', 'verifyRegister']),
    changeRTL () {
      this.$vuetify.rtl = true
    },
    async registerRequest() {
      let response = await this.register({formData: this.form});

      if (!(response instanceof Error)) {

        this.userId = response.user.id;
        await this.confirmRegister({userId: this.userId});
        this.confirm = true;
      } else {
        await this.$router.replace("/register");
      }
    },
    async confirmRegisterRequest() {
      let response = await this.verifyRegister({formData: this.confirmForm, userId: this.userId})
      if (!(response instanceof Error)) {
        await this.$router.replace("/");
      } else {
        await this.$router.replace("/register");
      }
    }
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

.register {
  background: antiquewhite;
  margin-top: 20px;
  width: 50%;
  background: linear-gradient(30deg, #b1b1b1, cadetblue);
  border-radius: 20px;
  direction: rtl;
}

</style>
