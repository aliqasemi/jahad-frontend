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
            <router-link :to="{name:item.routeName, params: {project_id:item.props }}"
                         style="text-decoration: none;color:yellow;padding: 5px"
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
            <v-row v-if="step_id"
                   style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
              ویرایش مرحله
            </v-row>
            <v-row v-else style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
              افزودن مرحله
            </v-row>
            <br>
            <div class="title-en">
              <div v-if="step_id"
                   style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
                Edit Services
              </div>
              <div v-else
                   style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
                Add Services
              </div>
            </div>
            <hr style="display: block; width: 100%"/>
            <br>
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
                <v-col>
                  <v-btn v-if="step_id"
                         style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: rgba(13,75,118,0.83);color: white"
                         type="submit">
                    ویرایش مرحله
                  </v-btn>
                  <v-btn v-else
                         style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: rgba(13,75,118,0.83);color: white"
                         type="submit">
                    اضافه کردن مرحله
                  </v-btn>
                </v-col>
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
      show: false,
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
          props: 0,
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
