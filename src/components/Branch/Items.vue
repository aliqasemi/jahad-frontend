<template>
  <div>
    <!--    <v-progress-linear-->
    <!--        v-if="getBranchLoading"-->
    <!--        color="black accent-4"-->
    <!--        indeterminate-->
    <!--        rounded-->
    <!--        height="10"-->
    <!--        style="margin: 10px"-->
    <!--    ></v-progress-linear>-->
    <!--    <div v-else v-for="(branch , key) in getListBranch" v-bind:key="key">-->
    <!--      <item :item="branch" :index="key"/>-->
    <!--    </div>-->
    <branch-filter/>
    <v-data-table
        :headers="headers"
        :items="getListBranch"
        :loading="getBranchLoading"
        class="elevation-1"
        loading-text="در حال پردازش اطلاعات... لطفا صبر کنید"
        hide-default-footer
    >
      <template v-slot:item.city="{item}">
        {{ item.city.name }}
      </template>
      <template v-slot:item.actions="{item}">
        <router-link :to="{name:'EditBranch',  params: { branch_id: item.id },}"
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
                <v-icon style="color: darkgreen" dark>fa-paperclip</v-icon>
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
          <delete-modal v-model="deleteDialog" @action="deleteBranch(item.id)"/>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p>
          شعبه ثبت شده ای وجود ندارد
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
// import Item from "../Branch/Item";
import BranchFilter from "../Branch/Filter";
import {mapActions, mapGetters, mapMutations} from "vuex";
import DeleteModal from "../GeneralComponent/deleteModal";

export default {
  name: "items",
  components: {BranchFilter, DeleteModal},
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      headers: [
        {
          text: 'عنوان خدمت', value: 'name', class: "blue lighten-3", align: 'center',
          divider: true,
        },
        {text: 'شهر', value: 'city', class: "blue lighten-3", align: 'center'},
        {text: 'شماره تلفن', value: 'cell_number', class: "blue lighten-3", align: 'center'},
        {text: 'عملیات', value: 'actions', sortable: false, class: "blue lighten-3", align: 'center',},
      ],
      deleteDialog: false
    }
  },
  computed: {
    ...mapGetters("branch", ['getListBranch', 'getBranchLoading', 'getPageNumber'])
  },
  methods: {
    ...mapActions("branch", ['loadBranchList', 'removeBranch']),
    ...mapMutations("branch", ['SET_BRANCH_PAGINATION']),
    async deleteBranch(id) {
      let response;
      response = await this.removeBranch(id);
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
        this.SET_BRANCH_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage})
        await this.loadBranchList();
      },
    },
  },
  async created() {
    let response = await this.loadBranchList();
    this.pageNumber = response.pagination.pageCount;
  }
}
</script>

<style scoped>

</style>
