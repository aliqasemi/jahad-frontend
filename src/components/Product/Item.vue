<template>
  <v-col lg="3" xl="3" md="6">
    <v-card
        color="#1E88E5"
        theme="dark"
        style="color: whitesmoke"
    >
      <div class="d-flex flex-no-wrap justify-space-between item">
        <div>
          <v-card-title>
            {{ item.name }}
          </v-card-title>

          <v-card-subtitle v-if="item.stock_sum">موجودی:{{ item.stock_sum }}</v-card-subtitle>
          <v-card-subtitle v-else>موجودی:{{ 0 }}</v-card-subtitle>

          <v-card-actions>
            <router-link :to="{name:'EditProduct',  params: { product_id: item.id },}" style="text-decoration: none;margin: 5px">
              <v-tooltip top>

                <template v-slot:activator="{ on,attrs }">
                  <v-btn
                      style="background-color: lavenderblush"
                      slot="activator"
                      v-bind="attrs"
                      v-on="on"
                      fab
                      small
                  >
                    <v-icon style="color: darkcyan" dark>fa-cog</v-icon>
                  </v-btn>

                </template>
                <span>تنظیمات</span>
              </v-tooltip>
            </router-link>
            <v-tooltip top>
              <template v-slot:activator="{ on , attrs}">
                <v-btn
                    style="background-color: lavenderblush"
                    slot="activator"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    small
                    @click.native="deleteDialog = true"
                >
                  <v-icon style="color: red" dark>fa-trash</v-icon>
                </v-btn>
              </template>
              <span>حذف</span>
            </v-tooltip>
          </v-card-actions>
        </div>

        <v-avatar
            class="ma-3"
            size="125"
            rounded="0"
        >
          <v-img v-if="item.thumbnail" :src="item.thumbnail" style="border-radius: 5px"></v-img>
          <v-img v-else src="http://localhost:8000/images/insertPhoto.png" style="border-radius: 5px"></v-img>
        </v-avatar>
      </div>
    </v-card>
    <delete-modal v-model="deleteDialog" @action="deleteProduct(item.id)"/>
  </v-col>
</template>

<script>
import DeleteModal from "../GeneralComponent/deleteModal";
import {mapActions} from "vuex";

export default {
  name: "Item",
  props: {
    item: {default: null},
    index: {default: 0},
  },
  components: {
    DeleteModal
  },
  data() {
    return {
      deleteDialog: false
    }
  },
  methods: {
    ...mapActions("product", ['removeProduct']),
    async deleteProduct(id) {
      let response;
      response = await this.removeProduct(id);
      if (!(response instanceof Error)) {
        this.deleteDialog = false;
      }
    },
  }
}
</script>

<style scoped>
.item {
  transition: 900ms;
}

.item:hover {
  background-color: #b1b1b1;
  color: black;
}

.angle:hover {
  background-color: #55706D;
}
</style>
