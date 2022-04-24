<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl"
       v-if="getAuthorizeUser === 'superAdmin' || getAuthorizeUser === 'admin'">
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
    <transition name="loader-transition">
      <div v-if="show" style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
        <v-row style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
          خدمت
        </v-row>
        <br>
        <div class="title-en">
          <div
              style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
            service
          </div>
        </div>
        <hr style="display: block; width: 100%"/>
        <br>
        <v-container>
          <v-row
              style="margin: 5px; background-color: #d6d6d6;border-radius: 5px; color: black">
            <v-col
                xl="3"
                lg="3"
                md="6"
                sm="12"
                xs="12"
            >
              <v-card-text>
                عنوان: {{ service.title }}
              </v-card-text>
            </v-col>
            <v-col
                xl="9"
                lg="9"
                md="12"
                sm="12"
                xs="12"
            >
              <v-card-text>
                آدرس: {{ service.address }}
              </v-card-text>
            </v-col>
            <v-col
                xl="6"
                lg="6"
                md="12"
                sm="12"
                xs="12"
            >
              <v-card-text>
                توضیحات: {{ service.description }}
              </v-card-text>

            </v-col>
            <v-col
                xl="6"
                lg="6"
                md="6"
                sm="12"
                xs="12"
            >
              <v-card-text>
                دسته بندی: {{ service.category ? service.category.name : '' }}
              </v-card-text>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    xs="12"
                >
                  <v-card-text>
                    استان: {{ service.province }}
                  </v-card-text>
                </v-col>

                <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    xs="12"
                >
                  <v-card-text>
                    شهر: {{ service.county }}
                  </v-card-text>
                </v-col>

                <v-col
                    xl="4"
                    lg="4"
                    md="4"
                    sm="12"
                    xs="12"
                >
                  <v-card-text>
                    مرکز: {{ service.city }}
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-col xl="12"
                     lg="12"
                     md="12"
                     sm="12"
                     xs="12" v-if="service.available_province">
                <v-card-text>
                  شهر های در دسترس:
                </v-card-text>
                <v-card-actions style="padding: 10px">
                  <span style="padding: 5px;background-color: #96989a;border-radius: 10px;margin: 5px"
                        v-for="(available,key) in service.available_province" v-bind:key="key">
                    {{ available.name }}
                </span>
                </v-card-actions>
              </v-col>
            </v-col>
            <v-col
                xl="12"
                lg="12"
                md="12"
                sm="12"
                xs="12"
            >
              <v-expansion-panels style="direction: ltr; background-color: #d6d6d6">
                <v-expansion-panel style="background-color: #d6d6d6">
                  <v-expansion-panel-header style="background-color: #d6d6d6;">مستندات</v-expansion-panel-header>
                  <v-expansion-panel-content style="background-color: #d6d6d6">
                    <v-img style="margin: 0 auto" v-if="service.thumbnail" title="مستندات" :src="service.thumbnail"
                           width="700px"
                           height="300px"
                           alt="مستندات"/>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>

        <div v-if="attachment" style="background-color: whitesmoke; padding: 15px; border-radius: 10px">
          <v-row style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
            نیازمندی پیشنهاد شده
          </v-row>
          <br>
          <div class="title-en">
            <div
                style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
              requirements recommend
            </div>
          </div>
          <hr style="display: block; width: 100%"/>
          <br>
          <Items :service_id="service_id"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Items from "../../components/AttachServiceRequirement/AttachByService/Items";

export default {
  name: "AttachByService",
  components: {Items},
  props: {
    service_id: null,
    attachment: {default: true},
  },
  data() {
    return {
      show: false,
      service: {default: null},
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'خدمت ها',
          disabled: false,
          routeName: "ListServices",
          icon: "fa fa-wrench"
        },
        {
          text: 'نیازمندی پیشنهاد شده',
          disabled: true,
          routeName: "AttachByService",
          icon: "fa fa-paperclip"
        },
      ],
    }
  },
  computed: {
    ...mapGetters("user", ['getAuthorizeUser'])
  },
  methods: {
    ...mapActions('service', ['showService'])
  },
  async created() {
    this.service = await this.showService(this.service_id);
    this.show = await true;
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
