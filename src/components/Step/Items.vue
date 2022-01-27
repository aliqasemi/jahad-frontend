<template>
  <div>
    <v-progress-linear
        v-if="getServiceLoading"
        color="black accent-4"
        indeterminate
        rounded
        height="10"
        style="margin: 10px"
    ></v-progress-linear>
    <div v-else v-for="(step , key) in getListService">
      <item :item="step" :index="key"/>
    </div>
  </div>
</template>

<script>
import Item from "../Step/Item";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "items",
  components: {Item},
  data() {
    return {}
  },
  computed: {
    ...mapGetters("service", ['getListService', 'getServiceLoading'])
  },
  methods: {
    ...mapActions("service", ['loadServiceList']),
    ...mapMutations("service", ['SET_SERVICE_PAGINATION'])
  },
  watch: {
    page: {
      deep: true,
      immediate: true,
      async handler() {
        this.SET_SERVICE_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage})
        await this.loadServiceList()
      },
    },
  },
  async created() {
    let response = await this.loadServiceList();
    this.pageNumber = response.pagination.pageCount
  }
}
</script>

<style scoped>

</style>
