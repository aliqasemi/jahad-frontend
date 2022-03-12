<template>
  <div>
    <v-progress-linear
        v-if="getAttachProductLoading"
        color="black accent-4"
        indeterminate
        rounded
        height="10"
        style="margin: 10px"
    ></v-progress-linear>
    <v-row style="margin: 20px" v-for="(requireProduct,key) in requireProducts" :key="key" v-else>
      <v-row style="background-color: #AED6D1; border-radius: 5px;">
        <v-row class="item">
          <v-col lg="2" style="background-color: #b1b1b1; border-radius: 5px;">
            <v-col lg="12" style="font-weight: bolder">
              {{ key + 1 }} نیازمندی پروژه
            </v-col>
            <v-col lg="4">
              {{ requireProduct.name }}
            </v-col>
            <v-col lg="4">
              {{ requireProduct.description }}
            </v-col>
            <v-col lg="12">
              تعداد : {{ requireProduct.number }}
            </v-col>
          </v-col>
          <v-col lg="1" style="background-color: #AED6D1;">
            <v-icon style="transform: rotate(180deg);margin-top:140px;margin-right: 15px" size="75">
              fa fa-random
            </v-icon>
          </v-col>
          <v-col lg="3" v-for="(product,index) in requireProduct.productRequireProduct"
                 style="background-color: #96989a; border-radius: 5px;margin: 10px" :key="index">
            <v-text-field label="تعداد محصول از این شعبه" reverse type="number" v-model="product.number"/>
            <v-textarea label="توضیحات محصول از این شعبه" reverse type="number" v-model="product.description"/>
            <product-search v-model="product.product.id" style="border-radius: 5px; margin: 5px"/>
            <branch-search v-model="product.branch.id" style="border-radius: 5px; margin: 5px"/>
            <v-btn @click="deleteDialog = true"
                   style="width: 75%; margin: 0 auto;background-color: red; color: #eeeeee;display: block">
              <v-icon>fa fa-trash</v-icon>
            </v-btn>
            <delete-modal v-model="deleteDialog" @action="deleteProduct(key, index, product.id)"/>
          </v-col>
          <v-btn @click="addProduct(key)" lg="1"
                 style="background-color: bisque;border-radius: 10px; margin: 10px; height: 420px">
            <v-icon style="transform: rotate(180deg);" size="75">
              fa fa-plus
            </v-icon>
          </v-btn>
          <v-btn @click="attachProducts(requireProduct)" lg="1"
                 style="background-color: darkcyan;border-radius: 10px; margin: 10px; height: 420px">
            <v-icon size="75">
              fa fa-check-square
            </v-icon>
          </v-btn>
        </v-row>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import BranchSearch from "@/components/Branch/BranchSearch";
import ProductSearch from "@/components/Product/ProductSearch";
import DeleteModal from "@/components/GeneralComponent/deleteModal";

export default {
  name: "items",
  components: {DeleteModal, ProductSearch, BranchSearch},
  props: {
    project_id: {default: null},
  },
  data() {
    return {
      deleteDialog: false,
      requireProducts: {default: []}
    }
  },
  computed: {
    ...mapGetters("attachProduct", ['getAttachProductLoading']),
  },
  methods: {
    ...mapActions("attachProduct", ['loadRequireProduct', 'attachProduct', 'deleteRequireProductProduct']),
    addProduct(key) {
      this.requireProducts[key].productRequireProduct.push({
        id: 0,
        description: null,
        branch: {id: null},
        number: null,
        product: {id: null},
      })
    },
    async deleteProduct(key, index, id) {
      if (id !== 0) {
        let response = await this.deleteRequireProductProduct(id);
        if (!(response instanceof Error)) {
          this.requireProducts[key].productRequireProduct.splice(index, 1);
        }
      }
      else {
        this.requireProducts[key].productRequireProduct.splice(index, 1);
      }
      this.deleteDialog = false;
    },
    async attachProducts(requireProduct) {
      await this.attachProduct({data: requireProduct, requireProductId: requireProduct.id})
    }
  },
  async created() {
    this.requireProducts = await this.loadRequireProduct(this.project_id);
  }
}
</script>

<style scoped>
.item {
  border: 2px inset darkseagreen;
  border-radius: 5px;
  margin: 5px;
  background-color: rgba(46, 201, 189, 0.2);
}

.item:hover {
  transition: 900ms;
  border: 2px inset black;
}
</style>
