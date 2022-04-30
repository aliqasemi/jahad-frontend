<template>
  <div>
    <filter-product/>
    <v-progress-linear
        v-if="getProductLoading"
        color="black accent-4"
        indeterminate
        rounded
        height="10"
        style="margin: 10px"
    ></v-progress-linear>
    <v-row style="margin-top: 5px" v-else>
      <div style="margin: 0 auto;" v-if="getListProduct.length === 0">
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p style="text-align: center">
          محصول ثبت شده ای وجود ندارد
        </p>
      </div>
      <item v-else :item="step" v-for="(step , key) in getListProduct" :index="key" v-bind:key="key"/>
    </v-row>
    <div class="text-center" style="direction: ltr">
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
import Item from "../Product/Item";
import FilterProduct from "../Product/Filter";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "items",
  components: {Item, FilterProduct},
  props: {
    product_id: {default: null},
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 12,
    }
  },
  computed: {
    ...mapGetters("product", ['getListProduct', 'getProductLoading', 'getPageNumber'])
  },
  methods: {
    ...mapActions("product", ['loadProductList']),
    ...mapMutations("product", ['SET_PRODUCT_PAGINATION', 'SET_PAGE_NUMBER', 'SET_PRODUCT_FILTER'])
  },
  async created() {
    this.SET_PRODUCT_FILTER({});
    let response = await this.loadProductList();
    this.SET_PAGE_NUMBER(response.pagination.pageCount);
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
