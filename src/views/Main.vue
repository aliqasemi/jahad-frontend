<template>
  <transition name="loader-transition">
    <div v-if="show" style="width: 85%;margin: 0 auto; direction: rtl; ">
      <div v-if="getLoginStatus"
           style="direction: rtl; width: 100%; margin: 0 auto; background-color:#1976D2;border-radius: 10px">
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
                                <v-icon>fa fa-home</v-icon>  {{ item.text.toUpperCase() }}
                           </span>
              </router-link>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </div>
      <div v-else>
        <div style="background-color: #55706D; height: 1200px">
          <transition name="loader-transition">
            <v-row>
              <v-col xl="6" lg="6" md="6" sm="12" xs="12">
                <v-card
                    style="text-align: center; width: 70%;margin: 20% auto;background-color: #8DCCC4"
                >
                  <v-card-title style="display: block"> سامانه جهاد</v-card-title>
                  <v-card-subtitle>سامانه جهاد سازندگی</v-card-subtitle>
                  <v-card-actions>
                    <router-link to="/login" style="margin: 0 auto;text-decoration: none">
                      <v-btn outlined
                             rounded
                             text
                      >ورود
                      </v-btn>
                    </router-link>
                    <router-link to="/register" style="margin: 0 auto; text-decoration: none">
                      <v-btn
                          outlined
                          rounded
                          text
                      >ثبت نام
                      </v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col xl="6" lg="6" md="6" sm="12" xs="12" style="padding-top: 20px">
                <v-img style="border-radius: 10px" height="600px" width="450px" :src="require('@/images/jahad.jpg')">
                </v-img>
              </v-col>
            </v-row>
          </transition>
        </div>
      </div>
      <v-row v-if="getLoginStatus" style="padding: 20px;width: 100%;margin: 0 auto">
        <v-col xl="3" lg="3" md="4" sm="12" xs="12" style="border-radius: 20px">
          <v-list class="pa-1" style="background-color: #1976D2;color:white;border-radius: 20px">
            <v-row class="ma-0">
              <v-col lg="3" class="flex-justified-left">
                <a class="LogOut">
                  <v-tooltip bottom color="black" transition="slide-x-transition">
                    <template v-slot:activator="{ on }">
                      <v-btn small @click.native.stop="logoutRequest" slot="activator" outlined fab
                             color="white"
                             dark v-on="on">
                        <v-icon dark>fa fa-power-off</v-icon>
                      </v-btn>
                    </template>
                    <span>خروج از حساب کاربری</span>
                  </v-tooltip>
                </a>
              </v-col>
              <v-col lg="9" class="flex-justified-right">
                <div class="Title" style="text-align: right">
                  <div class="Name Fa">{{ authUser.firstname + ' ' + authUser.lastname }}</div>
                  <div class="Role Fa">مدیریت</div>
                </div>
              </v-col>
            </v-row>
          </v-list>
          <br>
          <v-list style="background-color: #1976D2;border-radius: 20px;">
            <v-list-item
                v-if="getAuthorizeUser !== 'user'"
                link
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
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
                class="list-item white--text"
                :to="{name:'ListUsers'}"
                v-if="getAuthorizeUser !== 'user' && getAuthorizeUser !== 'admin'"
            >
              <v-list-item-icon>
                <v-icon>fa-users</v-icon>
              </v-list-item-icon>

              <v-list-item-content style="margin-right: 5px">
                <v-list-item-title>مدیریت کاربران</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col xl="9" lg="9" md="8" sm="12" xs="12" style="margin-top: 15px">
          <v-row>
            <v-col lg="6" xl="6" md="12" sm="12" xs="12" style="margin-bottom: 20px">
              <router-link :to="{name:'ListServices'}" style="text-decoration: none;color: black">
                <v-row class="flex-justified-space-between title-big">
                  <div>
                    <div>
                      <div class="title-fa"> خدمات</div>
                      <div class="title-en En Bold warning--text">
                        <div style="position: absolute;text-align: left"> services</div>
                      </div>
                    </div>
                  </div>
                  <v-row style="direction: ltr; margin: auto;width: 100%">
                    <v-col lg="6">
                      <v-icon size="75px" color="warning" style="text-align: left">
                        fa fa-cog
                      </v-icon>
                    </v-col>
                    <v-col lg="6">
                      <v-row style="margin: auto">
                        <v-sparkline
                            style="margin: auto"
                            :value="serviceChartValue"
                            :gradient="gradient"
                            :smooth="radius || false"
                            :padding="padding"
                            :line-width="width"
                            :stroke-linecap="lineCap"
                            :gradient-direction="gradientDirection"
                            :fill="fill"
                            :type="type"
                            :auto-line-width="autoLineWidth"
                            auto-draw
                        ></v-sparkline>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row>
              </router-link>
            </v-col>
            <v-col lg="6" xl="6" md="12" sm="12" xs="12" style="margin-bottom: 20px">
              <router-link :to="{name:'ListRequirements'}" style="text-decoration: none;color: black">
                <v-row class="flex-justified-space-between title-big">
                  <div>
                    <div class="texts">
                      <div class="title-fa"> نیازمندی ها</div>
                      <div class="title-en warning--text">
                        <div style="position: absolute;text-align: left">Requirement</div>
                      </div>
                    </div>
                  </div>
                  <v-row style="direction: ltr; margin: auto;width: 100%">
                    <v-col lg="6">
                      <v-icon size="75px" color="warning" style="text-align: left">
                        fa fa-hand-paper-o
                      </v-icon>
                    </v-col>
                    <v-col lg="6">
                      <v-row style="margin: auto">
                        <v-sparkline
                            style="margin: auto"
                            :value="requirementChartValue"
                            :gradient="gradient"
                            :smooth="radius || false"
                            :padding="padding"
                            :line-width="width"
                            :stroke-linecap="lineCap"
                            :gradient-direction="gradientDirection"
                            :fill="fill"
                            :type="type"
                            :auto-line-width="autoLineWidth"
                            auto-draw
                        ></v-sparkline>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row>
              </router-link>
            </v-col>
            <v-col lg="6" xl="6" md="12" sm="12" xs="12" style="margin-bottom: 20px" v-if="getAuthorizeUser !== 'user'">
              <router-link :to="{name:'ListProjects'}" style="text-decoration: none;color: black">
                <v-row class="flex-justified-space-between title-big">
                  <div>
                    <div>
                      <div class="title-fa"> پروژه ها</div>
                      <div class="title-en warning--text">
                        <div style="position: absolute;text-align: left"> Project</div>
                      </div>
                    </div>
                  </div>
                  <v-row style="direction: ltr; margin: auto;width: 100%">
                    <v-col lg="6">
                      <v-icon size="75px" color="warning" style="text-align: left">
                        fa fa-hand-paper-o
                      </v-icon>
                    </v-col>
                    <v-col lg="6">
                      <v-row style="margin: auto">
                        <v-sparkline
                            style="margin: auto"
                            :value="projectChartValue"
                            :gradient="gradient"
                            :smooth="radius || false"
                            :padding="padding"
                            :line-width="width"
                            :stroke-linecap="lineCap"
                            :gradient-direction="gradientDirection"
                            :fill="fill"
                            :type="type"
                            :auto-line-width="autoLineWidth"
                            auto-draw
                        ></v-sparkline>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row>
              </router-link>
            </v-col>
            <v-col lg="6" xl="6" md="12" sm="12" xs="12" style="margin-bottom: 20px" v-if="getAuthorizeUser !== 'user'">
              <router-link :to="{name:'ListProducts'}" style="text-decoration: none;color: black">
                <v-row class="flex-justified-space-between title-big">
                  <div>
                    <div>
                      <div class="title-fa"> محصولات و موجودی</div>
                      <div class="title-en warning--text">
                        <div style="position: absolute;text-align: left">Product</div>
                      </div>
                    </div>
                  </div>
                  <v-row style="direction: ltr; margin: auto;width: 100%">
                    <v-col lg="6">
                      <v-icon size="75px" color="warning" style="text-align: left">
                        fa fa-cogs
                      </v-icon>
                    </v-col>
                    <v-col lg="6">
                      <v-row style="margin: auto">
                        <v-sparkline
                            style="margin: auto"
                            :value="productChartValue"
                            :gradient="gradient"
                            :smooth="radius || false"
                            :padding="padding"
                            :line-width="width"
                            :stroke-linecap="lineCap"
                            :gradient-direction="gradientDirection"
                            :fill="fill"
                            :type="type"
                            :auto-line-width="autoLineWidth"
                            auto-draw
                        ></v-sparkline>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-row>
              </router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import MainRepository from "@/abstraction/repository/MainRepository";

let repository = new MainRepository();

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
  name: "Main",
  data() {
    return {
      width: 5,
      radius: 100,
      padding: 1,
      lineCap: 'round',
      gradient: gradients[5],
      serviceChartValue: [],
      projectChartValue: [],
      requirementChartValue: [],
      productChartValue: [],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      show: false,
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
      ],
    }
  },
  computed: {
    ...mapGetters("user", ['getLoginStatus', 'getAuthorizeUser']),
    authUser() {
      return JSON.parse(localStorage.getItem('user'))
    },
  },
  methods: {
    ...mapActions("user", ['logout']),
    async logoutRequest() {
      let response = await this.logout();

      if (!(response instanceof Error)) {
        await this.$router.replace("/login");
      }
    }
  },
  async created() {
    this.show = await true;
    let response = await repository.getInfo();
    this.productChartValue = response.product;
    this.projectChartValue = response.project;
    this.serviceChartValue = response.service;
    this.requirementChartValue = response.requirement;
  }
}
</script>

<style scoped type="scss">
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

.title-big {
  border: 5px inset transparent;
  background: #eeeeea;
  color: #1E88E5;
  border-radius: 20px;
  padding: 15px 30px;
  overflow: hidden;
  width: 100%;
  height: 300px;
  transition: all 1.2s,
  box-shadow 0.3s 1.5s;
  text-indent: 23px;
  font-weight: bold;
}

.title-big:hover {
  text-indent: 0;
  background: #eeeeee;
  width: 100%;
  box-shadow: 3px 3px 2px rgba(black, 0.15);
}


.title-big .title-fa {
  font-size: 50px;
}

.title-big .desc {
  font-weight: normal;
  opacity: 0;
}

.title-big .title-en {
  letter-spacing: 3px;
  font-size: 20px;
  padding-bottom: 10px;
  white-space: nowrap;
  text-transform: uppercase;
}

.title-big .title-en .text {
  position: absolute;
  left: 0px;
  bottom: 0px;
}

.back-icon-sm i {
  display: none;
  font-size: 25px;
}

.list-item {
  border-radius: 20px;
  padding: 5px;
  margin: 5px;
}
</style>
