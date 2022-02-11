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
  </div>
</template>

<script>
import Item from "../Product/Item";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "items",
  components: {Item},
  props: {
    product_id: {default: null},
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters("product", ['getListProduct', 'getProductLoading'])
  },
  methods: {
    ...mapActions("product", ['loadProductList']),
  },
  async created() {
    await this.loadProductList(this.product_id);
  }
}
</script>

<style scoped>

</style>
