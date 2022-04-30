<template>
  <div>
    <filter-user></filter-user>
    <!--    <div style="margin-top: 20px;">-->
    <!--      <v-progress-linear-->
    <!--          v-if="getLoading"-->
    <!--          color="black accent-4"-->
    <!--          indeterminate-->
    <!--          rounded-->
    <!--          height="10"-->
    <!--          style="margin: 10px;"-->
    <!--      ></v-progress-linear>-->
    <!--    </div>-->
    <!--    <v-row style="margin-top: 5px">-->
    <!--      <item :item="step" v-for="(step , key) in getListOfUsers" :index="key" v-bind:key="key"/>-->
    <!--    </v-row>-->
    <v-data-table
        :headers="headers"
        :items="getListOfUsers"
        :loading="getLoading"
        class="elevation-1"
        loading-text="در حال پردازش اطلاعات... لطفا صبر کنید"
        hide-default-footer
    >
      <template v-slot:item.actions="{item}">
        <router-link :to="{name:'EditUser',  params: { user_id: item.id },}"
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
      </template>
      <template v-slot:item.role="{item}">
        <v-btn  depressed v-if="item.role === 'user'"
               @click="roleDialog = true;userId= item.id">
          عادی
        </v-btn>
        <v-btn depressed v-else-if="item.role === 'admin'"
               @click="roleDialog = true;userId= item.id">
          مدیر
        </v-btn>
        <v-btn depressed v-else-if="item.role === 'superAdmin'"
               @click="roleDialog = true; userId= item.id">
          ادمین
        </v-btn>
        <choose-modal v-model="roleDialog" @action="assignRoleUser"
        />
      </template>
      <template v-slot:item.active="{item}">
        <v-tooltip top>
          <template v-slot:activator="{ on , attrs}">
            <v-btn
                style="background-color: #eeeeee"
                slot="activator"
                v-bind="attrs"
                v-on="on"
                fab
                small
                @click.native="activeDialog = true"
            >
              <v-icon v-if="item.active" style="color: blue" dark>fa-toggle-on</v-icon>
              <v-icon v-else style="color: black" dark>fa-toggle-off</v-icon>
            </v-btn>
          </template>
          <span v-if="item.active">غیر فعال کردن</span>
          <span v-else>فعال کردن</span>
          <delete-modal v-if="item.active" label="آیا از غیر فعال کردن این کاربر اطمینان دارید؟" v-model="activeDialog"
                        @action="activeUser(item)"/>
          <delete-modal v-else label="آیا از فعال کردن این کاربر اطمینان دارید؟" v-model="activeDialog"
                        @action="activeUser(item)"/>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p>
          کاربر ثبت شده ای وجود ندارد
        </p>
      </template>
    </v-data-table>
    <div class="text-center" style="direction: ltr;margin-top: 20px">
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
// import Item from "../User/Item";
import {mapActions, mapGetters, mapMutations} from "vuex";
import FilterUser from "@/components/User/Filter";
import DeleteModal from "../GeneralComponent/deleteModal";
import ChooseModal from "../GeneralComponent/chooseModal";

export default {
  name: "items",
  components: {FilterUser, DeleteModal, ChooseModal},
  props: {},
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      activeDialog: false,
      roleDialog: false,
      userId: {default: null},
      headers: [
        {
          text: 'نام', value: 'firstname', class: "blue darken-1 white--text", align: 'center',
          divider: true,
        },
        {text: 'نام خانوادگی', value: 'lastname', class: "blue darken-1 white--text", align: 'center'},
        {text: 'سطح دسترسی', value: 'role', class: "blue darken-1 white--text", align: 'center',},
        {text: 'شماره تلفن', value: 'phoneNumber', class: "blue darken-1 white--text", align: 'center',},
        {text: 'فعال/غیرفعال', value: 'active', class: "blue darken-1 white--text", align: 'center',},
        {text: 'عملیات', value: 'actions', sortable: false, class: "blue darken-1 white--text", align: 'center',},
      ],
    }
  },
  computed: {
    ...mapGetters("user", ['getListOfUsers', 'getLoading', 'getPageNumber'])
  },
  methods: {
    ...mapActions("user", ['loadUsersList', 'active', 'assignRole']),
    ...mapMutations("user", ['SET_USER_PAGINATION', 'SET_PAGE_NUMBER']),
    async assignRoleUser(value) {
      let response;
      response = await this.assignRole({role: value, userId: this.userId});
      if (!(response instanceof Error)) {
        this.roleDialog = false;
      }
    },
    async activeUser(item) {
      let response;
      response = await this.active({
        data: !item.active,
        userId: item.id
      });
      if (!(response instanceof Error)) {
        this.activeDialog = false;
      }
    },
  },
  watch: {
    page: {
      deep: true,
      immediate: true,
      async handler() {
        this.SET_USER_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage});
        await this.loadUsersList();
      },
    },
  },
  async created() {
    let response = await this.loadUsersList();
    this.SET_PAGE_NUMBER(response.pagination.pageCount);
  }
}
</script>

<style scoped>

</style>
