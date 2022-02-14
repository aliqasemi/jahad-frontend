<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
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
    <v-form @submit.prevent="registerRequest" style="margin-top: 20px">
      <div style="margin: 0 auto; direction: rtl">
        <v-row style="direction: rtl;">
          اضافه کردن مرحله
        </v-row>
        <br>
        <hr style="display: block; width: 75%"/>
        <v-row>
          <v-col lg="6" style="margin: 0 auto">
            <v-text-field style="text-align: right" label="نام مرحله" v-model="form.name"
                          reverse></v-text-field>
            <v-textarea style="text-align: right" label="توضیحات" v-model="form.description"
                        reverse></v-textarea>
            <v-switch
                style="text-align: left;direction: ltr"
                v-model="form.send_sms"
                inset
                label="فعالیت سرویس پیامک"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="6" v-if="form.send_sms">
            <template-search v-model="form.template_id"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn v-if="step_id" type="submit">
              ویرایش مرحله
            </v-btn>
            <v-btn v-else type="submit">
              اضافه کردن مرحله
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import TemplateSearch from "@/components/MessageTemplate/TemplateSearch";

var defaultForm = {
  name: null,
  description: null,
  send_sms: 0,
  template_id: null,
};

export default {
  name: "Add",
  props: {
    step_id: {default: null},
    project_id: {default: null}
  },
  components: {TemplateSearch},
  data() {
    return {
      form: {...defaultForm},
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'مرحله ها',
          disabled: false,
          routeName: "ListSteps",
          icon: "fa fa-wrench"
        },
        {
          text: 'مرحله',
          disabled: true,
          routeName: "AddStep",
          icon: "fa fa-wrench"
        },
      ],
    }
  },
  methods: {
    ...mapActions("step", ['storeStep', 'showStep', 'updateStep']),
    async registerRequest() {
      Object.assign(this.form, {project_id: this.project_id})
      if (this.step_id) {
        let response = await this.updateStep({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/steps");
        }
      } else {
        let response = await this.storeStep({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/steps");
        }
      }
    }
  },
  async created() {
    if (this.step_id) {
      this.form = await this.showStep(this.step_id)
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
