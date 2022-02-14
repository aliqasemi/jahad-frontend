<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
    <div style="direction: rtl; background-color: rgba(13,75,118,0.83);border-radius: 10px">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>fa fa-chevron-left</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
              :disabled="item.disabled"
          >
            <router-link :to="{name:item.routeName}" style="text-decoration: none;color:yellow;padding: 5px"
                         class="bredRoute">
                           <span>
                                <v-icon>{{ item.icon }}</v-icon>  {{ item.text.toUpperCase() }}
                           </span>
            </router-link>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <v-form @submit.prevent="registerRequest" style="margin-top: 20px">
      <div style="margin: 0 auto; direction: rtl">
        <v-row style="direction: rtl;">
          اضافه کردن محصول
        </v-row>
        <br>
        <hr style="display: block; width: 75%"/>
        <v-row>
          <v-col lg="6" style="margin: 0 auto">
            <v-text-field style="text-align: right" label="نام محصول" v-model="form.name"
                          reverse></v-text-field>
          </v-col>
          <v-col lg="6" style="margin: 0 auto">
            <v-text-field style="text-align: right" label="توضیحات" v-model="form.description"
                          reverse></v-text-field>
          </v-col>
          <v-col lg="6" style="margin: 0 auto">
            <v-text-field type="number" style="text-align: right" label="مقدار موجودی" v-model="form.stock"
                          reverse></v-text-field>
          </v-col>
          <v-col lg="6">
            <!--                      :url.sync="form.thumbnail"-->
            <cropper-image
                :crop_data.sync="form.crop_data"
                v-model="form.image"
                :url="form.thumbnail"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn v-if="product_id" type="submit">
              ویرایش محصول
            </v-btn>
            <v-btn v-else type="submit">
              اضافه کردن محصول
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </div>
</template>

<script>
import CropperImage from "../../components/GeneralComponent/CropperImage";
import {mapActions} from "vuex";

var defaultForm = {
  name: '',
  description: '',
  stock: '',
  branch_id: 0,
  crop_data: "",
  image: "",
  thumbnail: "",
};

export default {
  name: "Add",
  props: {
    product_id: {default: null},
  },
  components: {
    CropperImage,
  },
  data() {
    return {
      form: {...defaultForm},
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'محصولات',
          disabled: false,
          routeName: "ListProducts",
          icon: "fa fa-wrench"
        },
        {
          text: 'محصول',
          disabled: true,
          routeName: "AddProduct",
          icon: "fa fa-wrench"
        },
      ],
    }
  },
  methods: {
    ...mapActions("product", ['storeProduct', 'showProduct', 'updateProduct']),
    async registerRequest() {
      if (this.product_id) {
        let response = await this.updateProduct({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/products");
        }
      } else {
        let response = await this.storeProduct({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/products");
        }
      }
    }
  },
  async created() {
    if (this.product_id) {
      this.form = await this.showProduct(this.product_id)
    }
  }
}
</script>

<style scoped>
.bredRoute:hover {
  background-color: cadetblue;
  color: white;
  border-radius: 10px;
  transition: 1s;
}
</style>
