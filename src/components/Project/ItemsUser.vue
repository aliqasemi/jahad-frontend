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

    <project-filter/>
    <v-data-table
        :headers="headers"
        :items="getListProject"
        :loading="getProjectLoading"
        class="elevation-1"
        loading-text="در حال پردازش اطلاعات... لطفا صبر کنید"
        hide-default-footer
    >
      <template v-slot:item.actions="{item}">
        <router-link :to="{name:'DetailProject',  params: { project_id: item.id },}"
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
            <span>مشاهده جزییات</span>
          </v-tooltip>
        </router-link>
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
import ProjectFilter from "../Project/FilterUser";

export default {
  name: "items",
  components: {ProjectFilter},
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
    ...mapActions("project", ['loadProjectUserList']),
    ...mapMutations("project", ['SET_PROJECT_PAGINATION', 'SET_PAGE_NUMBER', 'SET_PROJECT_FILTER']),
  },
  watch: {
    page: {
      deep: true,
      immediate: true,
      async handler() {
        this.SET_PROJECT_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage});
        await this.loadProjectUserList();
      },
    },
  },
  async created() {
    this.SET_PROJECT_FILTER({});
    let response = await this.loadProjectUserList();
    this.SET_PAGE_NUMBER(response.pagination.pageCount);
  }
}
</script>

<style scoped>

</style>
