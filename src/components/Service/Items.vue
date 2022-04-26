<template>
  <div>
    <!--    <v-progress-linear-->
    <!--        v-if="getServiceLoading"-->
    <!--        color="black accent-4"-->
    <!--        indeterminate-->
    <!--        rounded-->
    <!--        height="10"-->
    <!--        style="margin: 10px"-->
    <!--    ></v-progress-linear>-->
    <!--    <div v-else v-for="(service , key) in getListService" v-bind:key="key">-->
    <!--      <item :item="service" :index="key"/>-->
    <!--    </div>-->

    <service-filter/>
    <v-data-table
        :headers="headers"
        :items="getListService"
        :loading="getServiceLoading"
        class="elevation-1"
        loading-text="در حال پردازش اطلاعات... لطفا صبر کنید"
        hide-default-footer
    >
      <template v-slot:item.actions="{item}">
        <router-link :to="{name:'AttachByService',  params: { service_id: item.id },}"
                     style="text-decoration: none; margin: 5px"
                     v-if="getAuthorizeUser === 'admin' || getAuthorizeUser === 'superAdmin'"
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
                <v-icon style="color: darkgreen" dark>fa-paperclip</v-icon>
              </v-btn>

            </template>
            <span>نیازمندی های ارایه شده</span>
          </v-tooltip>
        </router-link>
        <router-link :to="{name:'EditService',  params: { service_id: item.id },}"
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
            <span>ویرایش</span>
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
      <template v-slot:item.user="{item}">
        <span v-if="item.user">{{ item.user.firstname }} {{ item.user.lastname }}</span>
        <span v-else style="color: brown">کابر وجود ندارد</span>
      </template>
      <template v-slot:item.category="{item}">
        {{ item.category.name }}
      </template>
      <template v-slot:no-data>
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p>
          خدمت ثبت شده ای وجود ندارد
        </p>
      </template>
    </v-data-table>
    <div class="text-center" style="direction: ltr">
      <v-pagination
          v-model="page"
          :length="getPageNumber"
          :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
//import Item from "../Service/Item";
import ServiceFilter from "../Service/Filter";
import {mapActions, mapGetters, mapMutations} from "vuex";
import DeleteModal from "../GeneralComponent/deleteModal";

export default {
  name: "items",
  components: {ServiceFilter, DeleteModal},
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      headers: [
        {
          text: 'عنوان خدمت', value: 'title', class: "blue lighten-3", align: 'center',
          divider: true,
        },
        {text: 'نام کاربر', value: 'user', class: "blue lighten-3", align: 'center'},
        {text: 'شهر', value: 'city', class: "blue lighten-3", align: 'center'},
        {text: 'دسته بندی', value: 'category', class: "blue lighten-3", align: 'center',},
        {text: 'عملیات', value: 'actions', sortable: false, class: "blue lighten-3", align: 'center',},
      ],
      deleteDialog: false
    }
  },
  computed: {
    ...mapGetters("service", ['getListService', 'getServiceLoading', 'getPageNumber']),
    ...mapGetters("user", ['getAuthorizeUser'])
  },
  methods: {
    ...mapActions("service", ['loadServiceList', 'removeService']),
    ...mapMutations("service", ['SET_SERVICE_PAGINATION', 'SET_PAGE_NUMBER', 'SET_SERVICE_FILTER']),
    async deleteService(id) {
      let response;
      response = await this.removeService(id);
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
        this.SET_SERVICE_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage})
        await this.loadServiceList();
      },
    },
  },
  async created() {
    this.SET_SERVICE_FILTER({});
    let response = await this.loadServiceList();
    this.SET_PAGE_NUMBER(response.pagination.pageCount);
  }
}
</script>

<style scoped lang="sass">

</style>
