<script src="../../abstraction/repository/AuthenticationRepository.js"></script>
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
        <v-form @submit.prevent="registerRequest" style="margin-top: 20px">
          <div style="margin: 0 auto; direction: rtl">
            <v-row v-if="project_id"
                   style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 3px;">
              مدیریت پروژه
            </v-row>
            <v-row v-else style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 3px;">
              افزودن پروژه
            </v-row>
            <br>
            <div class="title-en">
              <div v-if="project_id"
                   style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Manage project
              </div>
              <div v-else
                   style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Add project
              </div>
            </div>
            <hr style="display: block; width: 100%"/>
            <br>
            <!--            <v-container v-if="step.name"-->
            <!--                         style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 2px; background-color: white; border-radius: 5px;padding: 30px">-->
            <!--              <div class="title-en-sec">-->
            <!--                <v-row style="direction: rtl;padding: 10px">-->
            <!--                  مرحله و مدیریت آن-->
            <!--                </v-row>-->
            <!--                <br>-->
            <!--                <div-->
            <!--                    style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">-->
            <!--                  manage step-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <hr style="display: block; width: 100%;"/>-->
            <!--              <br>-->
            <!--              <router-link :to="{name:'ListSteps', params:{project_id: project_id}}"-->
            <!--                           style="text-decoration: none;color:black;padding: 5px">-->
            <!--                <v-tooltip top>-->
            <!--                  <template v-slot:activator="{ on , attrs}">-->
            <!--                    <v-btn-->
            <!--                        slot="activator"-->
            <!--                        style="width: 100%;margin: 10px"-->
            <!--                        v-bind="attrs"-->
            <!--                        v-on="on"-->
            <!--                    >-->
            <!--                      <v-icon>"fa fa-cog</v-icon>-->
            <!--                    </v-btn>-->
            <!--                  </template>-->
            <!--                  <span>مدیریت مراحل پروژه</span>-->
            <!--                </v-tooltip>-->
            <!--              </router-link>-->
            <!--              <v-tooltip top>-->
            <!--                <template v-slot:activator="{ on , attrs}">-->
            <!--                  <v-btn-->
            <!--                      slot="activator"-->
            <!--                      style="width: 100%;margin: 10px"-->
            <!--                      v-bind="attrs"-->
            <!--                      v-on="on"-->
            <!--                      @click.native="stepDialog = true"-->
            <!--                  >-->
            <!--                    <v-card-actions>-->
            <!--                      {{ step.name }}-->
            <!--                    </v-card-actions>-->
            <!--                  </v-btn>-->
            <!--                </template>-->
            <!--                <span>مدیریت مرحله</span>-->
            <!--              </v-tooltip>-->
            <!--              <step-modal :steps="steps" v-model="stepDialog" @action="changeStepProject"/>-->

            <!--            </v-container>-->
            <v-card
                color="#385F73"
                dark
                style="width: 50%; margin: 0 auto"
                v-if="project_id == null && requirement.project"
            >
              <v-card-title>
                {{ requirement.project.name }}
              </v-card-title>

              <v-card-subtitle>توضیحات : {{ requirement.project.description }}</v-card-subtitle>
            </v-card>
            <v-container
                v-else
                style="direction: rtl;margin-top: 10px;  letter-spacing: 2px; border-radius: 5px;padding: 30px">
              <v-row>
                <v-col xl="7" lg="7" md="7" sm="12" xs="12" style="margin: 0 auto">
                  <v-text-field style="text-align: right" label="نام پروژه" v-model="form.name"
                                reverse></v-text-field>
                </v-col>
                <v-col xl="7" lg="7" md="7" sm="12" xs="12" style="margin: 0 auto">
                  <v-textarea style="text-align: right" aria-level="2" label="توضیحات" v-model="form.description"
                              reverse></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-if="step.name"
                         style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 2px;  border-radius: 5px;padding: 30px">
              <div class="title-en-sec">
                <v-row style="direction: rtl;padding: 10px; color: #1976D2">
                  مرحله و مدیریت آن
                </v-row>
                <br>
                <div
                    style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                  manage step
                </div>
              </div>
              <hr style="display: block; width: 100%;"/>
              <br>
              <v-stepper v-model="iterate">
                <v-stepper-header style="height: auto; background-color: whitesmoke; color: #1976D2">
                  <template v-for="(v,n) in steps">
                    <v-stepper-step
                        :key="`${n}-step`"
                        :complete="iterate > n"
                        :step="n + 1"
                        editable
                        edit-icon="fa fa-check"
                        color="#1976D2"
                        @click="nextStep(n, v.id)"
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
                      <v-card-text style="text-align: left;">
                        <v-tooltip top>
                          <template v-slot:activator="{ on,attrs }">
                            <v-btn
                                :color="step.send_sms ? 'blue' :'red'"
                                fab
                                x-small
                                dark
                                v-bind="attrs"
                                v-on="on"
                            >
                              <v-icon>fa-envelope-open-o</v-icon>
                            </v-btn>
                          </template>
                          <span>وضعیت سرویس پیامکی</span>
                        </v-tooltip>
                      </v-card-text>
                    </v-card>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
              <v-row>
                <router-link style="margin: 0 auto; text-decoration: none"
                             :to="{name:'ListSteps', params:{project_id: project_id}}">
                  <v-btn
                      color="rgba(13,75,118,1)"
                      style="color: white;background-color: #1976D2"
                  >
                    مراحل و مدیریت آن
                  </v-btn>
                </router-link>
              </v-row>
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
                            <v-expansion-panel-header style="background-color: #d6d6d6;">مستندات</v-expansion-panel-header>
                            <v-expansion-panel-content style="background-color: #d6d6d6">
                              <v-img style="margin: 0 auto" v-if="requirement.thumbnail" title="مستندات" :src="requirement.thumbnail" width="700px"
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
                            <v-expansion-panel-header style="background-color: #d6d6d6;">مستندات</v-expansion-panel-header>
                            <v-expansion-panel-content style="background-color: #d6d6d6">
                              <v-img style="margin: 0 auto" v-if="service.thumbnail" title="مستندات" :src="service.thumbnail" width="700px"
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
            <v-container
                style="direction: rtl;margin-top: 10px;color: #1976D2;  letter-spacing: 2px; border-radius: 5px;padding: 30px">
              <div class="title-en-sec">
                <v-row style="direction: rtl;padding: 10px;color: #1976D2">
                  مدیریت محصولات مورد نیاز
                </v-row>
                <br>
                <div
                    style="position: absolute;text-align: left; background-color:#1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                  manage require product
                </div>
              </div>
              <hr style="display: block; width: 100%;"/>
              <br>

              <v-slide-y-transition group>
                <div v-for="(requireProduct, i) in form.requireProducts" :key="i">
                  <require-product-row-duplicator
                      v-model="form.requireProducts[i]"
                      @removeRequireProduct="removeRequireProducts(i)"
                  />
                </div>
              </v-slide-y-transition>
              <v-row>
                <v-btn
                    @click="addRequireProducts"
                    style="background-color: #1976D2; border-radius: 10px; text-align: center;padding: 5px;margin: 15px auto; width: 70%;">
                  <v-icon style="margin: 0 auto" dark>fa fa-plus</v-icon>
                </v-btn>
              </v-row>
            </v-container>
            <v-row>
              <v-col>
                <v-btn v-if="project_id"
                       style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color:#1976D2;color: white; margin: 5px"
                       type="submit">
                  ثبت تغییرات پروژه
                </v-btn>
                <v-btn v-else
                       style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color:#1976D2;color: white; margin: 5px"
                       type="submit">
                  ایجاد پروژه
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-form>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions} from "vuex";
// import StepModal from "@/components/GeneralComponent/StepModal";
import RequireProductRowDuplicator from "@/components/RequireProduct/RequireProductRowDuplicator";

var defaultForm = {
  description: 'پروژه ..',
  name: 'پروژه ..',
  requireProducts: [{}],
};

export default {
  name: "Manage",
  props: {
    project_id: {default: null},
    service_id: {default: null},
    requirement_id: {default: null},
  },
  components: {RequireProductRowDuplicator},
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
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'پروژه ها',
          disabled: false,
          routeName: "ListProjects",
          icon: "fa fa-wrench"
        },
        {
          text: 'مدیریت پروژه',
          disabled: true,
          routeName: "ManageProject",
          icon: "fa fa-wrench"
        },
      ],
    }
  },
  methods: {
    ...mapActions("project", ['storeProject', 'showProject', 'updateProject', 'changeStep']),
    ...mapActions("service", ['showService']),
    ...mapActions("requirement", ['showRequirement']),
    ...mapActions("step", ['loadStepList']),
    async nextStep(n, step_id) {
      if (n !== this.steps.length) {
        this.iterate += 1;
      }
      Object.assign(this.form, {step_id: step_id});
      Object.assign(this.form, {project_id: this.project_id});
      let response = await this.changeStep({data: this.form});
      this.step = response.step;
    },
    async registerRequest() {
      if (this.project_id) {
        let response = await this.updateProject({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/projects");
        }
      } else {
        let services = [{
          id: this.service_id
        }]
        Object.assign(this.form, {services: services})
        Object.assign(this.form, {requirement_id: this.requirement_id})
        let response = await this.storeProject({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/projects");
        }
      }
    },
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
