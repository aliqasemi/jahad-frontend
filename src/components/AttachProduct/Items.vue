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
    <v-row style="margin: 30px;min-height: 430px;" v-for="(requireProduct,key) in requireProducts" :key="key" v-else>
      <v-row style="background-color: #eeeeea; border-radius: 10px;">
        <v-row class="item">
          <v-col lg="2" xl="2" style="border-radius: 5px;text-align: center;margin-top: 90px">
            <v-col lg="12" style="font-weight: bolder;text-align: center;width: 20%;margin: 0 auto">
              <p class="-bold" style="background-color: #F4511E;color: white; border-radius: 100%">{{ key + 1 }}</p>
            </v-col>
            <v-list-item two-line>
              <v-list-item-content style="background-color: #1E88E5;color:white;border-radius: 10px">
                <v-list-item-title style="font-size: 35px">{{ requireProduct.name }}</v-list-item-title>
                <v-list-item-subtitle style="font-size: 20px;color: white">{{ requireProduct.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-col lg="12">
              <p style="background-color: #F57C00; color: #eeeeee; border-radius: 10px">
                تعداد : {{ requireProduct.number }}
              </p>
            </v-col>
          </v-col>
          <v-col lg="1" xl="1" style="text-align: center">
            <v-icon color="success" style="transform: rotate(180deg);margin-top:160px;text-align: center" size="75">
              fa fa-random
            </v-icon>
          </v-col>
          <v-slide-x-reverse-transition group style="display: contents">
            <v-col lg="3" xl="2" md="4" v-for="(product,index) in requireProduct.productRequireProduct"
                   style="background-color: #d6d6d6; border-radius: 5px;margin: 10px" :key="index">
              <v-text-field label="تعداد محصول از این شعبه" reverse type="number" v-model="product.number"/>
              <v-textarea label="توضیحات محصول از این شعبه" reverse type="number" v-model="product.description"/>
              <product-search v-model="product.product.id" style="border-radius: 5px; margin: 5px"/>
              <branch-search v-model="product.branch.id" style="border-radius: 5px; margin: 5px"/>
              <v-btn @click="deleteDialog = true"
                     style="width: 75%; margin: 0 auto;background-color: #D50000; color: #eeeeee;display: block">
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
              <delete-modal v-model="deleteDialog" @action="deleteProduct(key, index, product.id)"/>
            </v-col>
          </v-slide-x-reverse-transition>
          <v-btn @click="addProduct(key)" lg="1"
                 style="background-color: #FB8C00;border-radius: 10px; margin: 10px; height: 420px">
            <v-icon color="primary" style="transform: rotate(180deg);" size="75">
              fa fa-plus
            </v-icon>
          </v-btn>
          <v-btn @click="attachProducts(requireProduct)" lg="1"
                 style="background-color: #1E88E5;border-radius: 10px; margin: 10px; height: 420px">
            <v-icon color="warning" size="75">
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
      } else {
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
  margin: 5px;
  transition: 1s all;
}

.item:hover {
  background-color: #d6d6d6;
  border-radius: 10px;
}
</style>
