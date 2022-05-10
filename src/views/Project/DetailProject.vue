<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
    <div style="direction: rtl; background-color:#1976D2;border-radius: 10px">
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
        <v-form style="margin-top: 20px">
          <div style="margin: 0 auto; direction: rtl">
            <v-row style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 3px;">
              جزییات پروژه
            </v-row>
            <br>
            <div class="title-en">
              <div
                  style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Project Detail
              </div>
            </div>
            <hr style="display: block; width: 100%"/>
            <br>
            <v-card
                color="#385F73"
                dark
                style="width: 50%; margin: 0 auto"
            >
              <v-card-title>
                {{ form.name }}
              </v-card-title>

              <v-card-subtitle>توضیحات : {{ form.description }}</v-card-subtitle>
            </v-card>
            <v-container v-if="step.name"
                         style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 2px;  border-radius: 5px;padding: 30px">
              <div class="title-en-sec">
                <v-row style="direction: rtl;padding: 10px; color: #1976D2">
                  مرحله و جزییات آن
                </v-row>
                <br>
                <div
                    style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                  step and detail
                </div>
              </div>
              <hr style="display: block; width: 100%;"/>
              <br>
              <v-stepper v-model="iterate">
                <v-stepper-header style="height: auto; background-color: whitesmoke; color: #1976D2">
                  <template v-for="(v,n) in steps">
                    <v-stepper-step
                        :key="`${n}-step`"
                        :complete="false"
                        :step="n + 1"
                        editable
                        edit-icon="fa fa-check"
                        color="#1976D2"
                    >
                      {{ v.name }}
                    </v-stepper-step>

                    <v-divider
                        v-if="n !== steps.length - 1"
                        :key="n"
                    ></v-divider>
                  </template>
                </v-stepper-header>

                <v-stepper-items style="background-color: whitesmoke">
                  <v-stepper-content
                      v-for="(step,n) in steps"
                      :key="`${n}-content`"
                      :step="n + 1"
                  >
                    <v-card
                        class="mb-12"
                        color="#1976D2"
                        dark
                        style="margin: 0 auto;min-height: 150px"
                    >
                      <v-card-title class="text-h6">
                        <v-row>
                          <v-col lg="12" xl="12" md="12" sm="12" xs="12">
                            {{ step.name }}
                          </v-col>
                        </v-row>
                      </v-card-title>

                      <v-card-subtitle>
                        {{ step.description }}
                      </v-card-subtitle>
                    </v-card>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-container>
            <v-container style="direction: ltr">
              <v-timeline
                  :reverse="true"
                  dense
              >
                <v-timeline-item
                    color="red"
                >
                  <v-container
                      style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 2px; border-radius: 5px;padding: 30px">
                    <div class="title-en-sec">
                      <v-row style="direction: rtl;padding: 10px;color: #1976D2">
                        مشخصات نیازمندی
                      </v-row>
                      <br>
                      <div
                          style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                        requirement
                      </div>
                    </div>
                    <hr style="display: block; width: 100%;"/>
                    <br>
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
                          عنوان: {{ requirement.title }}
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
                          آدرس: {{ requirement.address }}
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
                          توضیحات: {{ requirement.description }}
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
                          دسته بندی: {{ requirement.category ? requirement.category.name : '' }}
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
                              استان: {{ requirement.province }}
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
                              شهر: {{ requirement.county }}
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
                              مرکز: {{ requirement.city }}
                            </v-card-text>
                          </v-col>
                        </v-row>
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
                            <v-expansion-panel-header style="background-color: #d6d6d6;">مستندات
                            </v-expansion-panel-header>
                            <v-expansion-panel-content style="background-color: #d6d6d6">
                              <v-img style="margin: 0 auto" v-if="requirement.thumbnail" title="مستندات"
                                     :src="requirement.thumbnail" width="700px"
                                     height="300px"
                                     alt="مستندات"/>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>

                      </v-col>
                    </v-row>

                  </v-container>
                </v-timeline-item>
                <v-timeline-item color="#1976D2" v-for="(service, key) in services" v-bind:key="key">
                  <v-container
                      style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 2px; border-radius: 5px;padding: 30px">
                    <div class="title-en-sec">
                      <v-row style="direction: rtl;padding: 10px;color: #1976D2">
                        مشخصات سرویس
                      </v-row>
                      <br>
                      <div
                          style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                        service
                      </div>
                    </div>
                    <hr style="display: block; width: 100%;"/>
                    <br>
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
                            <v-expansion-panel-header style="background-color: #d6d6d6;">مستندات
                            </v-expansion-panel-header>
                            <v-expansion-panel-content style="background-color: #d6d6d6">
                              <v-img style="margin: 0 auto" v-if="service.thumbnail" title="مستندات"
                                     :src="service.thumbnail" width="700px"
                                     height="300px"
                                     alt="مستندات"/>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>

                      </v-col>
                    </v-row>
                  </v-container>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </div>
        </v-form>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions} from "vuex";

var defaultForm = {
  description: '',
  name: '.',
  timeout: '',
  requireProducts: [{}],
};

export default {
  name: "DetailProject",
  props: {
    project_id: {default: null},
    service_id: {default: null},
    requirement_id: {default: null},
  },
  components: {},
  data() {
    return {
      show: false,
      form: {...defaultForm},
      services: [],
      requirement: {default: null},
      steps: {default: null},
      step: {default: null},
      provinces: [],
      stepDialog: false,
      iterate: 1,
      lastDateTime: {default: null},
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'پروژه های من',
          disabled: false,
          routeName: "ListProjectsUser",
          icon: "fa fa-wrench"
        },
        {
          text: 'جزییات پروژه',
          disabled: true,
          routeName: "ManageProject",
          icon: "fa fa-wrench"
        },
      ],
    }
  },
  methods: {
    ...mapActions("project", ['storeProject', 'showProject', 'updateProject']),
    ...mapActions("service", ['showService']),
    ...mapActions("requirement", ['showRequirement']),
    ...mapActions("step", ['loadStepList']),
    addRequireProducts() {
      this.form.requireProducts.push({});
    },
    removeRequireProducts(index) {
      this.form.requireProducts.splice(index, 1);
    },
  },
  async created() {
    if (this.project_id) {
      this.form = await this.showProject(this.project_id);
      this.lastDateTime = this.form.timeout;
      this.steps = await this.loadStepList(this.project_id);
      this.services = this.form.services;
      this.requirement = this.form.requirement;
      this.step = this.form.step;
      this.iterate = this.step.sort;
    } else {
      if (this.service_id) {
        this.services[0] = await this.showService(this.service_id)
      }
      if (this.requirement_id) {
        this.requirement = await this.showRequirement(this.requirement_id)
      }
    }
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

.title-en-sec {
  letter-spacing: 5px;
  font-size: 12px;
  white-space: nowrap;
  text-transform: uppercase;
  color: #55706D;
  display: block;
  padding-bottom: 15px;
}
</style>
