<template>
  <div>
    <!--    <v-progress-linear-->
    <!--        v-if="getTemplateLoading"-->
    <!--        color="black accent-4"-->
    <!--        indeterminate-->
    <!--        rounded-->
    <!--        height="10"-->
    <!--        style="margin: 10px"-->
    <!--    ></v-progress-linear>-->
    <!--    <v-row style="margin-top: 5px" v-else>-->
    <!--      <item :item="template" v-for="(template , key) in getListTemplate" :index="key" v-bind:key="key"/>-->
    <!--    </v-row>-->
    <template-filter/>
    <v-data-table
        :headers="headers"
        :items="getListTemplate"
        :loading="getTemplateLoading"
        class="elevation-1"
        loading-text="در حال پردازش اطلاعات... لطفا صبر کنید"
        hide-default-footer
    >
      <template v-slot:item.actions="{item}">
        <router-link :to="{name:'EditTemplate',  params: { template_id: item.id },}"
                     style="text-decoration: none; margin: 5px"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on ,attrs}">
              <v-btn
                  style="background-color: #eeeeee"
                  slot="activator"
                  v-bind="attrs"
                  v-on="on"
                  fab
                  small
              >
                <v-icon style="color: darkgreen" dark>fa-cog</v-icon>
              </v-btn>

            </template>
            <span>تنظیمات</span>
          </v-tooltip>
        </router-link>
        <v-tooltip top style="margin: 5px" v-if="item.canDelete">
          <template v-slot:activator="{ on , attrs}">
            <v-btn
                style="background-color: #eeeeee"
                slot="activator"
                v-bind="attrs"
                v-on="on"
                fab
                small
                @click.native="deleteDialog = true"
            >
              <v-icon style="color: red" dark>fa-trash</v-icon>
            </v-btn>
          </template>
          <span>حذف</span>
          <delete-modal v-model="deleteDialog" @action="deleteService(item.id)"/>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p>
          قالب ثبت شده ای وجود ندارد
        </p>
      </template>
    </v-data-table>
  </div>
</template>

<script>
// import Item from "../MessageTemplate/Item";
import TemplateFilter from "../MessageTemplate/Filter";
import DeleteModal from "../GeneralComponent/deleteModal";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "items",
  components: {DeleteModal, TemplateFilter},
  data() {
    return {
      deleteDialog: false,
      headers: [
        {
          text: 'نام', value: 'name', class: "blue darken-1 white--text", align: 'center',
          divider: true,
        },
        {text: 'عملیات', value: 'actions', sortable: false, class: "blue darken-1 white--text", align: 'center',},
      ],
    }
  },
  computed: {
    ...mapGetters("template", ['getListTemplate', 'getTemplateLoading'])
  },
  methods: {
    ...mapActions("template", ['loadTemplateList']),
    ...mapMutations("template", ['SET_TEMPLATE_FILTER'])
  },
  async created() {
    this.SET_TEMPLATE_FILTER({});
    await this.loadTemplateList();
  }
}
</script>

<style scoped>

</style>
