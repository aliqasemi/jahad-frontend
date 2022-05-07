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
            <v-row v-if="template_id"
                   style="direction: rtl;margin-top: 10px;color:  #1565C0;  letter-spacing: 3px;">
              ویرایش قالب
            </v-row>
            <v-row v-else style="direction: rtl;margin-top: 10px;color:  #1565C0;  letter-spacing: 3px;">
              افزودن قالب
            </v-row>
            <br>
            <div class="title-en">
              <div v-if="template_id"
                   style="position: absolute;text-align: left; background-color: #1565C0; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Edit Template
              </div>
              <div v-else
                   style="position: absolute;text-align: left; background-color: #1565C0; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Add Template
              </div>
            </div>
            <hr style="display: block; width: 100%"/>
            <v-row>
              <v-col lg="10" style="margin: 20px auto">
                <v-text-field style="text-align: right; width: 50%" label="نام قالب" v-model="form.name"
                              reverse></v-text-field>
                <message-template v-model="form.template" :variables="variables" :service-variables="serviceVariables"
                                  :requirement-variables="requirementVariables"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn v-if="template_id"
                       style="font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: #1565C0;color: white"
                       type="submit">
                  ویرایش قالب
                </v-btn>
                <v-btn v-else
                       style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: #1565C0;color: white"
                       type="submit">
                  اضافه کردن قالب
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
import MessageTemplate from "@/components/MessageTemplate/MessageTemplate";

var defaultForm = {
  name: '',
  template: '',
};

export default {
  name: "Add",
  props: {
    template_id: {default: null},
  },
  components: {
    MessageTemplate
  },
  data() {
    return {
      show: false,
      form: {...defaultForm},
      serviceVariables: null,
      requirementVariables: null,
      variables: null,
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'قالب ها',
          disabled: false,
          routeName: "ListTemplates",
          icon: "fa fa-wrench"
        },
        {
          text: 'قالب پیامک',
          disabled: true,
          routeName: "AddTemplate",
          icon: "fa fa-wrench"
        },
      ],
    }
  },
  methods: {
    ...mapActions("template", ['storeTemplate', 'showTemplate', 'updateTemplate']),
    async registerRequest() {
      if (this.template_id) {
        let response = await this.updateTemplate({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/templates");
        }
      } else {
        let response = await this.storeTemplate({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/templates");
        }
      }
    }
  },
  async created() {
    if (this.template_id) {
      this.form = await this.showTemplate(this.template_id);
      this.serviceVariables = this.form.serviceVariables;
      this.requirementVariables = this.form.requirementVariables;
      this.variables = this.form.variables;
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
</style>
