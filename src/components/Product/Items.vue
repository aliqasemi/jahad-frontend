<template>
  <div>
    <v-progress-linear
        v-if="getProductLoading"
        color="black accent-4"
        indeterminate
        rounded
        height="10"
        style="margin: 10px"
    ></v-progress-linear>
    <v-row style="margin-top: 5px" v-else>
      <item :item="step" v-for="(step , key) in getListProduct" :index="key" v-bind:key="key"/>
    </v-row>
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
import Item from "../Product/Item";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "items",
  components: {Item},
  props: {
    product_id: {default: null},
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      pageNumber: 1,
    }
  },
  computed: {
    ...mapGetters("product", ['getListProduct', 'getProductLoading'])
  },
  methods: {
    ...mapActions("product", ['loadProductList']),
    ...mapMutations("product", ['SET_PRODUCT_PAGINATION'])
  },
  async created() {
    let response = await this.loadProductList();
    this.pageNumber = response.pagination.pageCount
  },
  watch: {
    page: {
      deep: true,
      immediate: true,
      async handler() {
        this.SET_PRODUCT_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage})
        await this.loadProductList()
      },
    },
  },
}
</script>

<style scoped>

</style>
