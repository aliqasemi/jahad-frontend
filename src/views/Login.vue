<template>
  <div style="background-color: #eeeeea; min-height: 1200px">
    <v-subheader style="text-align: right;direction: rtl; background-color: #1F7087; color: #eeeeea">
      <v-icon color="white" style="left: 5px">fa fa-cogs</v-icon>
      سامانه جهاد سازندگی
    </v-subheader>
    <transition name="loader-transition">
      <v-row>
        <v-col xl="6" lg="6" md="6" sm="12" xs="12" style="padding-top: 20px;direction: rtl">
          <v-img style="border-radius: 10px" height="600px" width="450px" :src="require('@/images/jahad.jpg')">
          </v-img>
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="12" xs="12">
          <v-form v-if="show" @submit.prevent="loginRequest" style="padding-top: 20px">
            <v-container>
              <v-row>
                <v-col xl="6" lg="6" style="margin: 0 auto; border: solid #b1b1b1; border-radius: 10px; padding: 30px; min-height: 590px">
                  <v-row style="margin: 0 auto">
                    <v-col style="margin: 0 auto"
                           cols="10"
                    >
                      <v-text-field
                          v-model="username"
                          label="شماره تلفن"
                          required
                          reverse
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row style="margin: 0 auto">
                    <v-col style="margin: 0 auto"
                           cols="10"
                    >
                      <v-text-field
                          v-model="password"
                          type="password"
                          label="رمز عبور"
                          required
                          reverse
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row style="text-align: center">
                    <v-col style="margin: 0 auto"
                           cols="8"
                    >
                      <v-btn type="submit" block elevation="10" color="success" style="color: #eeeeea">
                        <v-icon style="margin-right: 10px">fa fa-sign-in</v-icon>
                        ورود
                      </v-btn>
                      <router-link :to="{name:'ForgotPassword'}" style="text-decoration: none;">
                        <v-btn style="margin-top: 20px;width: 100%;color: #eeeeea" color="red">
                          <v-icon style="margin-right: 10px">fa fa-meh-o</v-icon>
                          فراموشی رمز عبور
                        </v-btn>
                      </router-link>
                    </v-col>
                  </v-row>
                  <v-row style="text-align: center">
                    <v-col style="margin: 0 auto"
                           cols="8"
                    >
                      <router-link to="register" style="text-decoration: none">
                        <v-btn color="primary" style="color: #eeeeea" type="submit" elevation="5" block>
                          <v-icon style="margin-right: 10px">fa-wpforms</v-icon>
                          ثبت نام
                        </v-btn>
                      </router-link>
                    </v-col>
                  </v-row>
                  <v-row style="text-align: center">
                    <v-col style="margin: 0 auto"
                           cols="8"
                    >
                      <router-link to="/" style="text-decoration: none">
                        <v-btn color="blue-grey" style="color: #eeeeea" type="submit" elevation="2" block>
                          <v-icon style="margin-right: 10px">fa fa-home</v-icon>
                          صفحه اصلی
                        </v-btn>
                      </router-link>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
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
  width: 100%;
  background: linear-gradient(30deg, #b1b1b1, cadetblue);
  border-radius: 20px;
}
</style>
