<template>
  <div>
    <!--    <v-progress-linear-->
    <!--        v-if="getRequirementLoading"-->
    <!--        color="black accent-4"-->
    <!--        indeterminate-->
    <!--        rounded-->
    <!--        height="10"-->
    <!--        style="margin: 10px"-->
    <!--    ></v-progress-linear>-->
    <!--    <div v-else v-for="(requirement , key) in getListRequirement" v-bind:key="key">-->
    <!--      <item :item="requirement" :index="key"/>-->
    <!--    </div>-->
    <requirement-filter/>
    <v-data-table
        :headers="headers"
        :items="getListRequirement"
        :loading="getRequirementLoading"
        class="elevation-1"
        loading-text="در حال پردازش اطلاعات... لطفا صبر کنید"
        hide-default-footer
    >
      <template v-slot:item.actions="{item}">
        <router-link :to="{name:'AttachByRequirement',  params: { requirement_id: item.id },}"
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
            <span>سرویس های ارایه شده</span>
          </v-tooltip>
        </router-link>
        <router-link :to="{name:'EditRequirement',  params: { requirement_id: item.id },}"
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
          <delete-modal v-model="deleteDialog" @action="deleteRequirement(item.id)"/>
        </v-tooltip>
      </template>
      <template v-slot:item.user="{item}">
        {{ item.user.firstname }} {{ item.user.lastname }}
      </template>
      <template v-slot:item.category="{item}">
        {{ item.category.name }}
      </template>
      <template v-slot:no-data>
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p>
          نیازمندی ثبت شده ای وجود ندارد
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
// import Item from "../Requirement/Item";
import RequirementFilter from "../Requirement/Filter";
import {mapActions, mapGetters, mapMutations} from "vuex";
import DeleteModal from "@/components/GeneralComponent/deleteModal";

export default {
  name: "items",
  components: {DeleteModal, RequirementFilter},
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      pageNumber: 1,
      deleteDialog: false,
      headers: [
        {
          text: 'عنوان نیازمندی', value: 'title', class: "blue lighten-3", align: 'center',
          divider: true,
        },
        {text: 'نام کاربر', value: 'user', class: "blue lighten-3", align: 'center'},
        {text: 'شهر', value: 'city', class: "blue lighten-3", align: 'center'},
        {text: 'دسته بندی', value: 'category', class: "blue lighten-3", align: 'center',},
        {text: 'عملیات', value: 'actions', sortable: false, class: "blue lighten-3", align: 'center',},
      ],
    }
  },
  computed: {
    ...mapGetters("requirement", ['getListRequirement', 'getRequirementLoading', 'getPageNumber']),
    ...mapGetters("user", ['getAuthorizeUser'])
  },
  methods: {
    ...mapActions("requirement", ['loadRequirementList', 'removeRequirement']),
    ...mapMutations("requirement", ['SET_REQUIREMENT_PAGINATION', 'SET_PAGE_NUMBER', 'SET_REQUIREMENT_FILTER']),
    async deleteRequirement(id) {
      let response;
      response = await this.removeRequirement(id);
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
        this.SET_REQUIREMENT_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage})
        await this.loadRequirementList()
      },
    },
  },
  async created() {
    this.SET_REQUIREMENT_FILTER({});
    let response = await this.loadRequirementList();
    this.SET_PAGE_NUMBER(response.pagination.pageCount);
  }
}
</script>

<style scoped>

</style>
