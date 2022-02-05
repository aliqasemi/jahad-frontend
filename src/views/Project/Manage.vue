<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
    <div style="direction: rtl; background-color: aliceblue;border-radius: 10px">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>fa fa-chevron-left</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
              :disabled="item.disabled"
          >
            <router-link :to="{name:item.routeName}" style="text-decoration: none;color:black;padding: 5px"
                         class="bredRoute">
                           <span>
                                <v-icon>{{ item.icon }}</v-icon>  {{ item.text.toUpperCase() }}
                           </span>
            </router-link>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <v-form @submit.prevent="registerRequest" style="margin-top: 20px">
      <div style="margin: 0 auto; direction: rtl">
        <v-row style="direction: rtl;">
          مدیریت پروژه
        </v-row>
        <br>
        <hr style="display: block; width: 75%"/>
        <v-container v-if="step.name">
          <v-row style="direction: rtl;padding: 10px">
            مرحله و مدیریت آن
          </v-row>
          <br>
          <hr style="display: block; width: 50%;"/>
          <router-link :to="{name:'ListSteps', params:{project_id: project_id}}"
                       style="text-decoration: none;color:black;padding: 5px">
            <v-tooltip top>
              <template v-slot:activator="{ on , attrs}">
                <v-btn
                    slot="activator"
                    style="width: 100%;margin: 10px"
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>"fa fa-cog</v-icon>
                </v-btn>
              </template>
              <span>مدیریت مراحل پروژه</span>
            </v-tooltip>
          </router-link>
          <v-tooltip top>
            <template v-slot:activator="{ on , attrs}">
              <v-btn
                  slot="activator"
                  style="width: 100%;margin: 10px"
                  v-bind="attrs"
                  v-on="on"
                  @click.native="stepDialog = true"
              >
                <v-card-actions>
                  {{ step.name }}
                </v-card-actions>
              </v-btn>
            </template>
            <span>مدیریت مرحله</span>
          </v-tooltip>
          <step-modal :steps="steps" v-model="stepDialog" @action="changeStepProject"/>
        </v-container>
        <v-container>
          <v-row style="direction: rtl; padding: 10px">
            مشخصات نیازمندی
          </v-row>
          <br>
          <hr style="display: block; width: 50%"/>
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                عنوان:
              </v-card-text>
              <v-card-text>
                {{ requirement.title }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                توضیحات:
              </v-card-text>
              <v-card-text>
                {{ requirement.description }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                آدرس:
              </v-card-text>
              <v-card-text>
                {{ requirement.address }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                دسته بندی:
              </v-card-text>
              <v-card-text>
                {{ requirement.category ? requirement.category.name : '' }}
              </v-card-text>
            </v-col>

            <v-col
            >
              <v-card-text>
                مستندات:
              </v-card-text>
              <v-img v-if="requirement.thumbnail" :src="requirement.thumbnail" width="700px" height="300px"
                     alt="مستندات"/>
              <v-card-text v-else>
                ندارد
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                استان:
              </v-card-text>
              <v-card-text>
                {{ requirement.province }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                شهر:
              </v-card-text>
              <v-card-text>
                {{ requirement.county }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                مرکز:
              </v-card-text>
              <v-card-text>
                {{ requirement.city }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row style="direction: rtl;padding: 10px">
            مشخصات سرویس ها
          </v-row>
          <br>
          <hr style="display: block; width: 50%;"/>
          <v-row v-for="(service, key) in services" v-bind:key="key">
            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                عنوان:
              </v-card-text>
              <v-card-text>
                {{ service.title }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                توضیحات:
              </v-card-text>
              <v-card-text>
                {{ service.description }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                آدرس:
              </v-card-text>
              <v-card-text>
                {{ service.address }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                دسته بندی:
              </v-card-text>
              <v-card-text>
                {{ service.category ? service.category.name : '' }}
              </v-card-text>
            </v-col>

            <v-col
            >
              <v-card-text>
                مستندات:
              </v-card-text>
              <v-img v-if="service.thumbnail" :src="service.thumbnail" width="700px" height="300px" alt="مستندات"/>
              <v-card-text v-else>
                ندارد
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                استان:
              </v-card-text>
              <v-card-text>
                {{ service.province }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                شهر:
              </v-card-text>
              <v-card-text>
                {{ service.county }}
              </v-card-text>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-card-text>
                مرکز:
              </v-card-text>
              <v-card-text>
                {{ service.city }}
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4" v-if="service.available_province">
              <v-card-text>
                شهر های در دسترس:
              </v-card-text>
              <div v-for="(available,key) in service.available_province" v-bind:key="key">
                <v-card-text>
                  {{ key + 1 }}: {{ available.name }}
                </v-card-text>
              </div>
            </v-col>
            <hr style="display: block; width: 75%" v-if="key != services.length - 1"/>
          </v-row>
        </v-container>
        <v-row>
          <v-col lg="6" style="margin: 0 auto">
            <v-textarea style="text-align: right" label="توضیحات" v-model="form.description"
                        reverse></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn v-if="project_id" type="submit">
              ثبت تغییرات پروژه
            </v-btn>
            <v-btn v-else type="submit">
              ایجاد پروژه
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import StepModal from "@/components/GeneralComponent/StepModal";

var defaultForm = {
  description: null,
};

export default {
  name: "Manage",
  props: {
    project_id: {default: null},
    service_id: {default: null},
    requirement_id: {default: null},
  },
  components: {StepModal},
  data() {
    return {
      form: {...defaultForm},
      services: [],
      requirement: {default: null},
      steps: {default: null},
      step: {default: null},
      provinces: [],
      stepDialog: false,
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
    async changeStepProject(value) {
      Object.assign(this.form, {step_id: value.step_id});
      Object.assign(this.form, {project_id: this.project_id});
      let response = await this.changeStep({data: this.form});
      this.step = response.step;
    }
  },
  async created() {
    if (this.project_id) {
      this.form = await this.showProject(this.project_id);
      this.steps = await this.loadStepList(this.project_id);
      this.services = this.form.services;
      this.requirement = this.form.requirement;
      this.step = this.form.step;
    } else {
      if (this.service_id) {
        this.services[0] = await this.showService(this.service_id)
      }
      if (this.requirement_id) {
        this.requirement = await this.showRequirement(this.requirement_id)
      }
    }
  }
}
</script>

<style scoped>
.bredRoute:hover {
  background-color: cadetblue;
  color: white;
  border-radius: 10px;
  transition: 1s;
}
</style>
