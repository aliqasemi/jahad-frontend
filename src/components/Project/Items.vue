<template>
  <div>
    <!--    <v-progress-linear-->
    <!--        v-if="getProjectLoading"-->
    <!--        color="black accent-4"-->
    <!--        indeterminate-->
    <!--        rounded-->
    <!--        height="10"-->
    <!--        style="margin: 10px"-->
    <!--    ></v-progress-linear>-->
    <!--    <v-row style="margin-top: 5px" v-else>-->
    <!--      <item :item="project" v-for="(project , key) in getListProject" :index="key" v-bind:key="key"/>-->
    <!--    </v-row>-->

    <service-filter/>
    <v-data-table
        :headers="headers"
        :items="getListProject"
        :loading="getProjectLoading"
        class="elevation-1"
        loading-text="در حال پردازش اطلاعات... لطفا صبر کنید"
        hide-default-footer
    >
      <template v-slot:item.actions="{item}">
        <router-link :to="{name:'ManageProject',  params: { project_id: item.id },}"
                     style="text-decoration: none;margin: 5px">
          <v-tooltip top>
            <template v-slot:activator="{ on,attrs }">
              <v-btn
                  style="background-color: #eeeeee"
                  slot="activator"
                  v-bind="attrs"
                  v-on="on"
                  fab
                  small
              >
                <v-icon style="color: darkcyan" dark>fa-edit</v-icon>
              </v-btn>
            </template>
            <span>مدیریت</span>
          </v-tooltip>
        </router-link>
        <v-tooltip top style="margin: 5px">
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
      <template v-slot:item.requirement="{item}">
        {{ item.requirement.title }}
      </template>
      <template v-slot:item.services="{item}">
        <div class="pa-2 ma-1 rounded-pill blue darken-1 white--text"
             style="background-color: #90caf9; font-size: 12px;width: fit-content; display: inline-block"
             v-for="(service,key) in item.services"
             v-bind:key="key">
          {{ service.title }}
        </div>
      </template>
      <template v-slot:item.step="{item}">
        <v-timeline style="direction: ltr">
          <v-timeline-item small color="blue">
            {{ item.step.name }}
          </v-timeline-item>
        </v-timeline>
      </template>
      <template v-slot:no-data>
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p>
          پروژه ثبت شده ای وجود ندارد
        </p>
      </template>
    </v-data-table>
    <div class="text-center" style="direction: ltr">
      <v-pagination
          v-model="page"
          :length="getPageNumber"
          :total-visible="7"
          color="blue darken-2"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
// import Item from "../Project/Item";
import {mapActions, mapGetters, mapMutations} from "vuex";
import DeleteModal from "../GeneralComponent/deleteModal";
import ServiceFilter from "../Project/Filter";

export default {
  name: "items",
  components: {ServiceFilter, DeleteModal},
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      headers: [
        {
          text: 'نام', value: 'name', class: "blue darken-1 white--text", align: 'center',
          divider: true,
        },
        {text: 'نیازمندی', value: 'requirement', class: "blue darken-1 white--text", align: 'center'},
        {text: 'سرویس ها', value: 'services', class: "blue darken-1 white--text", align: 'center'},
        {text: 'مرحله', value: 'step', class: "blue darken-1 white--text", align: 'center'},
        {text: 'عملیات', value: 'actions', sortable: false, class: "blue darken-1 white--text", align: 'center'},
      ],
      deleteDialog: false
    }
  },
  computed: {
    ...mapGetters("project", ['getListProject', 'getProjectLoading', 'getPageNumber']),
    ...mapGetters("user", ['getAuthorizeUser'])
  },
  methods: {
    ...mapActions("project", ['loadProjectList', 'removeProject']),
    ...mapMutations("project", ['SET_PROJECT_PAGINATION', 'SET_PAGE_NUMBER', 'SET_PROJECT_FILTER']),
    async deleteProject(id) {
      let response;
      response = await this.removeProject(id);
      if (!(response instanceof Error)) {
        this.deleteDialog = false;
      }
    },
  },
  watch: {
    page: {
      deep: true,
      immediate: true,
      async handler() {
        this.SET_PROJECT_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage});
        await this.loadProjectList();
      },
    },
  },
  async created() {
    this.SET_PROJECT_FILTER({});
    let response = await this.loadProjectList();
    this.SET_PAGE_NUMBER(response.pagination.pageCount);
  }
}
</script>

<style scoped>

</style>
