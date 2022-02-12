<template>
  <div>
    <v-progress-linear
        v-if="getBranchLoading"
        color="black accent-4"
        indeterminate
        rounded
        height="10"
        style="margin: 10px"
    ></v-progress-linear>
    <div v-else v-for="(branch , key) in getListBranch" v-bind:key="key">
      <item :item="branch" :index="key"/>
    </div>
    <div class="text-center" style="direction: ltr">
      <v-pagination
          v-model="page"
          :length="pageNumber"
          :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Item from "../Branch/Item";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "items",
  components: {Item},
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      pageNumber: 1,
    }
  },
  computed: {
    ...mapGetters("branch", ['getListBranch', 'getBranchLoading'])
  },
  methods: {
    ...mapActions("branch", ['loadBranchList']),
    ...mapMutations("branch", ['SET_BRANCH_PAGINATION'])
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
