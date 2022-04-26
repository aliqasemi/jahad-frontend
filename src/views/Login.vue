<template>
  <div style="background-color: #55706D; height: 1000px">
    <transition name="loader-transition">
      <v-form v-if="show" @submit.prevent="loginRequest" style="padding-top: 20px">
        <v-container class="login">
          <v-row style="margin: 0 auto">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <v-text-field
                  v-model="username"
                  label="شماره تلفن"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row style="margin: 0 auto">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <v-text-field
                  v-model="password"
                  type="password"
                  label="رمز عبور"
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
                ورود
              </v-btn>
              <router-link :to="{name:'ForgotPassword'}" style="text-decoration: none">
                <v-btn elevation="2" style="margin-top: 20px">
                  فراموشی رمز عبور
                </v-btn>
              </router-link>

            </v-col>
          </v-row>
          <v-row style="text-align: center">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <router-link to="register" style="text-decoration: none">
                <v-btn type="submit" elevation="2" block>
                  ثبت نام
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
          <v-row style="text-align: center">
            <v-col style="margin: 0 auto"
                   cols="12"
                   md="4"
            >
              <router-link to="/" style="text-decoration: none">
                <v-btn type="submit" elevation="2" block>
                  صفحه اصلی
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

export default {
  name: 'Login',
  components: {},
  data: () => ({
    show: false,
    error: null,
    username: "",
    password: "",
  }),
  methods: {
    ...mapActions("user", ['login']),
    async loginRequest() {
      const body = {
        phoneNumber: this.username,
        password: this.password,
      };
      let response = await this.login(body);
      if (!response.verify && response.verify !== undefined) {
        this.$router.push({
          name: "register",
          params: {user_id: response.user.id}
        });
      } else if (!(response instanceof Error)) {
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
