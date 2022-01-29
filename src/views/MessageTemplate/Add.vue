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
          اضافه کردن قالب پیامکی
        </v-row>
        <br>
        <hr style="display: block; width: 75%"/>
        <v-row>
          <v-col lg="6" style="margin: 0 auto">
            <v-text-field style="text-align: right" label="نام قالب" v-model="form.name"
                          reverse></v-text-field>
            <message-template v-model="form.template"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn v-if="template_id" type="submit">
              ویرایش قالب
            </v-btn>
            <v-btn v-else type="submit">
              اضافه کردن قالب
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
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
      form: {...defaultForm},
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
      this.form = await this.showTemplate(this.template_id)
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
