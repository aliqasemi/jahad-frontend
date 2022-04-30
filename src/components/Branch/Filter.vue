<template>
  <v-row
      style="background-color: #1E88E5; border-radius: 10px 10px 0 0; margin: 0 auto; border-bottom: inset lightslategray">
    <v-col lg="3" xl="3" md="6" sm="12" xs="12">
      <v-text-field color="white" label="نام شعبه" reverse v-model="filter.name"></v-text-field>
    </v-col>
    <v-col lg="3" xl="3" md="6" sm="12" xs="12">
      <v-text-field color="white" label="شهر" reverse v-model="filter.city"></v-text-field>
    </v-col>
    <v-col lg="3" xl="3" md="6" sm="12" xs="12">
      <v-text-field color="white" label="شماره تلفن" reverse v-model="filter.cell_number"></v-text-field>
    </v-col>
    <v-col lg="2" xl="2" md="2" sm="12" xs="12" style="margin: auto;text-align: center">
      <v-tooltip top style="margin: 5px">
        <template v-slot:activator="{ on , attrs}">
          <v-btn
              style="background-color: lavenderblush; margin: 0 auto"
              @click="search"
              fab
              small
              v-bind="attrs"
              v-on="on"
          >
            <v-icon style="color: darkcyan" dark>fa-search</v-icon>
          </v-btn>
        </template>
        <span>اعمال فیلتر</span>
      </v-tooltip>
      <v-tooltip top style="margin: 5px">
        <template v-slot:activator="{ on , attrs}">
          <v-btn
              style="background-color: lavenderblush;margin-right: 10px"
              @click="searchClearFilter"
              fab
              small
              v-bind="attrs"
              v-on="on"
          >
            <v-icon style="color: darkred" dark>fa-close</v-icon>
          </v-btn>
        </template>
        <span>حذف فیلتر</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions} from "vuex";
import {mapMutations} from "vuex/dist/vuex.esm.browser";

export default {
  name: "Filter",
  data() {
    return {
      filter: {
        name: null,
        city: null,
        cell_number: null,
      },
      page: 1,
      itemsPerPage: 10,
    }
  },
  methods: {
    ...mapActions("branch", ['loadBranchList']),
    ...mapMutations("branch", ['SET_BRANCH_FILTER', 'SET_PAGE_NUMBER', 'SET_BRANCH_PAGINATION']),
    async search() {
      this.SET_BRANCH_FILTER(this.filter);
      this.SET_BRANCH_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage});
      let response = await this.loadBranchList();
      this.SET_PAGE_NUMBER(response.pagination.pageCount);
    },
    async searchClearFilter() {
      this.filter = {
        title: null,
        firstname: null,
        lastname: null,
        category: null,
        city: null,
      };
      this.SET_BRANCH_FILTER(this.filter);
      this.SET_BRANCH_PAGINATION({page: 1, itemsPerPage: 10});
      let response = await this.loadBranchList();
      this.SET_PAGE_NUMBER(response.pagination.pageCount);
    }
  },
}
</script>

<style scoped>

</style>