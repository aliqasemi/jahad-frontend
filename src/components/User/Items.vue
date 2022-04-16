<template>
  <div>
    <filter-user></filter-user>
    <div style="margin-top: 20px;">
      <v-progress-linear
          v-if="getLoading"
          color="black accent-4"
          indeterminate
          rounded
          height="10"
          style="margin: 10px;"
      ></v-progress-linear>
    </div>
    <v-row style="margin-top: 5px">
      <item :item="step" v-for="(step , key) in getListOfUsers" :index="key" v-bind:key="key"/>
    </v-row>
    <div class="text-center" style="direction: ltr;margin-top: 20px">
      <v-pagination
          v-model="page"
          :length="getPageNumber"
          :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Item from "../User/Item";
import {mapActions, mapGetters, mapMutations} from "vuex";
import FilterUser from "@/components/User/Filter";

export default {
  name: "items",
  components: {Item, FilterUser},
  props: {},
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
    }
  },
  computed: {
    ...mapGetters("user", ['getListOfUsers', 'getLoading', 'getPageNumber'])
  },
  methods: {
    ...mapActions("user", ['loadUsersList']),
    ...mapMutations("user", ['SET_USER_PAGINATION', 'SET_PAGE_NUMBER']),
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
