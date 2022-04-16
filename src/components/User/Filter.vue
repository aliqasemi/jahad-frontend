<template>
  <v-row style="background-color: #d6d6d6; border-radius: 10px">
    <v-col lg="2">
      <v-text-field label="نام" reverse v-model="filter.firstname"></v-text-field>
    </v-col>
    <v-col lg="2">
      <v-text-field label="نام خانوادگی" reverse v-model="filter.lastname"></v-text-field>
    </v-col>
    <v-col lg="2">
      <v-text-field label="شماره تلفن" reverse v-model="filter.phoneNumber"></v-text-field>
    </v-col>
    <v-col lg="2">
      <v-text-field label="آدرس" reverse v-model="filter.address"></v-text-field>
    </v-col>
    <v-col lg="2">
      <v-text-field label="نقش" reverse v-model="filter.role"></v-text-field>
    </v-col>
    <v-col lg="2" style="margin: auto;text-align: center">
      <v-btn
          style="background-color: lavenderblush; margin: 0 auto"
          @click="search"
      >
        <v-icon style="color: darkcyan" dark>fa-search</v-icon>
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
        firstname: null,
        lastname: null,
        phoneNumber: null,
        address: null,
        role: null,
      },
      page: 1,
      itemsPerPage: 10,
    }
  },
  methods: {
    ...mapActions("user", ['loadUsersList']),
    ...mapMutations("user", ['SET_USER_FILTER', 'SET_PAGE_NUMBER', 'SET_USER_PAGINATION']),
    async search() {
      this.SET_USER_FILTER(this.filter);
      this.SET_USER_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage});
      let response = await this.loadUsersList();
      this.SET_PAGE_NUMBER(response.pagination.pageCount);
    }
  },
}
</script>

<style scoped>

</style>