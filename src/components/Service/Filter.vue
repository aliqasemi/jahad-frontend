<template>
  <v-row
      style="background-color: #90caf9; border-radius: 10px 10px 0 0; margin: 0 auto; border-bottom: inset lightslategray">
    <v-col lg="3" xl="3" md="6" sm="12" xs="12">
      <v-text-field label="عنوان خدمت" reverse v-model="filter.title"></v-text-field>
    </v-col>
    <v-col lg="2" xl="2" md="6" sm="12" xs="12">
      <v-text-field label="نام خدمت دهنده" reverse v-model="filter.firstname"></v-text-field>
    </v-col>
    <v-col lg="2" xl="2" md="6" sm="12" xs="12">
      <v-text-field label="نام خانوادگی خدمت دهنده" reverse v-model="filter.lastname"></v-text-field>
    </v-col>
    <v-col lg="2" xl="2" md="6" sm="12" xs="12">
      <v-text-field label="دسته بندی" reverse v-model="filter.category"></v-text-field>
    </v-col>
    <v-col lg="1" xl="2" md="6" sm="12" xs="12">
      <v-text-field label="شهر" reverse v-model="filter.city"></v-text-field>
    </v-col>
    <v-col lg="2" xl="2" md="2" sm="12" xs="12" style="margin: auto;text-align: center">
      <v-btn
          style="background-color: lavenderblush; margin: 0 auto"
          @click="search"
      >
        <v-icon style="color: darkcyan" dark>fa-search</v-icon>
      </v-btn>
      <v-btn
          style="background-color: lavenderblush;margin-right: 10px"
          @click="searchClearFilter"
      >
        <v-icon style="color: darkred" dark>fa-close</v-icon>
      </v-btn>
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
        title: null,
        firstname: null,
        lastname: null,
        category: null,
        city: null,
      },
      page: 1,
      itemsPerPage: 10,
    }
  },
  methods: {
    ...mapActions("service", ['loadServiceList']),
    ...mapMutations("service", ['SET_SERVICE_FILTER', 'SET_PAGE_NUMBER', 'SET_SERVICE_PAGINATION']),
    async search() {
      this.SET_SERVICE_FILTER(this.filter);
      this.SET_SERVICE_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage});
      let response = await this.loadServiceList();
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
      this.SET_SERVICE_FILTER(this.filter);
      this.SET_SERVICE_PAGINATION({page: 1, itemsPerPage: 10});
      let response = await this.loadServiceList();
      this.SET_PAGE_NUMBER(response.pagination.pageCount);
    }
  },
}
</script>

<style scoped>

</style>