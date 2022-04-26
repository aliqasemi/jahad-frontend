<template>
  <div style="background-color: #55706D; height: 1000px">
    <transition name="loader-transition">
      <v-form v-if="show" @submit.prevent="registerRequest" style="padding-top: 20px">
        <v-container class="register">
          <v-stepper
              v-model="iterative"
              vertical
              tag="span"
              alt-labels
              dark
              non-linear
              class="stepper"
          >
            <v-stepper-step
                :complete="iterative > 1"
                step="1"
            >
              اطلاعات هویتی
            </v-stepper-step>

            <v-stepper-content style="text-align: center;margin-left: 0" step="1">
              <v-card
                  style="background-color: #55706D;margin-bottom: 5px"
              >
                <v-form ref="step1" lazy-validation>
                  <v-row style="margin: auto; text-align: right; direction: rtl;">
                    <v-col style="margin: 0 auto"
                           xl="6" lg="6" md="6" sm="12" xs="12"
                    >
                      <v-text-field
                          v-model="form.firstname"
                          label="نام"
                          required
                          reverse
                          :counter="15"
                          :rules="firstNameRules"
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
                          :counter="20"
                          :rules="lastNameRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
              <v-btn
                  @click="goStep2"
                  color="primary"
              >
                ثبت اطلاعات
              </v-btn>
            </v-stepper-content>

            <v-stepper-step
                :complete="iterative > 2"
                step="2"
            >
              اطلاعات ارتباطی
            </v-stepper-step>

            <v-stepper-content style="text-align: center;margin-left: 0" step="2">
              <v-card
                  style="background-color: #55706D;margin-bottom: 5px"
              >
                <v-form ref="step2" lazy-validation>
                  <v-row style="margin: 0 auto; text-align: right; direction: rtl">
                    <v-col style="margin: 0 auto"
                           xl="6" lg="6" md="6" sm="12" xs="12"
                    >
                      <v-text-field
                          v-model="form.phoneNumber"
                          label="شماره تلفن"
                          required
                          type="number"
                          reverse
                          :rules="phoneNumberRules"
                      ></v-text-field>
                    </v-col>
                    <v-col style="margin: 0 auto"
                           xl="6" lg="6" md="6" sm="12" xs="12"
                    >
                      <v-text-field
                          v-model="form.email"
                          label="ایمیل"
                          required
                          type="email"
                          reverse
                          :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
              <v-btn @click="iterative = 1" color="warning">
                برگشت به مرحله قبل
              </v-btn>
              <br>
              <br>
              <v-btn
                  @click="goStep3"
                  color="primary"
              >
                ثبت اطلاعات
              </v-btn>
            </v-stepper-content>

            <v-stepper-step
                :complete="iterative > 3"
                step="3"
            >
              اطلاعات امنیتی
            </v-stepper-step>

            <v-stepper-content style="text-align: center;margin-left:0;" step="3">
              <v-card
                  style="background-color: #55706D;margin-bottom: 5px"
              >
                <v-form ref="step3" lazy-validation>
                  <v-row style="margin: auto; text-align: right; direction: rtl;">
                    <v-col style="margin: 0 auto"
                           xl="6" lg="6" md="6" sm="12" xs="12"
                    >
                      <v-text-field
                          v-model="form.password"
                          label="رمز عبور"
                          required
                          reverse
                          :rules="passwordRules"
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
                          :rules="repeatPasswordRules"
                          :type="visibleRepPass ? 'text' : 'password'"
                          :append-icon="visibleRepPass ? 'fa fa-eye-slash' : 'fa fa-eye'"
                          @click:append="visibleRepPass = !visibleRepPass"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card>
              <v-btn @click="iterative = 2" style="margin-top: 5px" color="warning">
                برگشت به مرحله قبل
              </v-btn>
              <br>
              <br>
              <v-btn
                  color="primary"
                  type="submit"
              >
                تایید نهایی
              </v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">
              کد تایید
            </v-stepper-step>
            <v-stepper-content style="text-align: center;margin-left:0;" step="4">
              <v-card
                  style="background-color: #55706D;margin: 5px"
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
                      <br>
                      کد تایید را در یافت نکرده اید؟
                      <br>
                      <v-btn @click="confirmRegisterRepeat">کلیک کنید</v-btn>
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
  props: {
    user_id: {default: null},
  },
  data: () => ({
    show: false,
    error: null,
    form: defaultForm,
    confirmForm: defaultConfirmForm,
    visiblePass: false,
    visibleRepPass: false,
    userId: null,
    iterative: 1,
    firstNameRules: [
      v => !!v || 'وارد کردن فیلد نام الزامیست',
      v => (v && v.length <= 15) || 'مقدار فیلد نام حداکثر 15 کاراکتر است',
    ],
    lastNameRules: [
      v => !!v || 'وارد کردن فیلد نام خانوادگی الزامیست',
      v => (v && v.length <= 15) || 'مقدار فیلد نام خانوادگی حداکثر 20 کاراکتر است',
    ],
    emailRules: [
      v => !v || /.+@.+\..+/.test(v) || 'فرمت ایمیل صحیح نیست',
    ],
    phoneNumberRules: [
      v => !!v || 'وارد کردن فیلد تلفن همراه الزامیست',
    ],
    passwordRules: [
      v => !!v || 'وارد کردن فیلد رمز عبور الزامیست',
    ],
  }),
  computed: {
    repeatPasswordRules() {
      return [
        (v) => !!v || 'وارد کردن این فیلد الزامی است',
        (v) => (v && v.length >= 6) || 'حداقل باید 6 کاراکتر وارد شود',
        (v) => (v === this.form.password) || 'رمز عبور وارد شده با رمز فعلی مطابقت ندارد',
      ];
    },
  },
  methods: {
    ...mapActions("user", ['register', 'confirmRegister', 'verifyRegister']),
    async registerRequest() {
      let response = await this.register({formData: this.form});

      if (!(response instanceof Error)) {
        this.userId = response.user.id;
        await this.confirmRegister({userId: this.userId});
        this.iterative = 4;
      } else {
        await this.$router.replace("/register");
      }
    },
    async confirmRegisterRepeat() {
      await this.confirmRegister({userId: this.userId});
    },
    async confirmRegisterRequest() {
      let response = await this.verifyRegister({formData: this.confirmForm, userId: this.userId})
      if (!(response instanceof Error)) {
        await this.$router.replace("/");
      } else {
        await this.$router.replace("/register");
      }
    },
    goStep2() {
      if (this.$refs.step1.validate())
        this.iterative = 2;
    },
    goStep3() {
      if (this.$refs.step2.validate()) {
        this.iterative = 3;
      }
    }
  },
  async created() {
    this.show = await true;
    if (this.user_id) {
      this.iterative = 4;
      this.userId = this.user_id;
      await this.confirmRegister({userId: this.userId});
    }
  }
}
</script>
<style lang="scss">
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

.stepper .v-stepper__content {
  border: 1px none !important;
}
</style>
