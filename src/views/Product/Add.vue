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
    <div style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
      <v-form @submit.prevent="registerRequest" style="margin-top: 20px">
        <div style="margin: 0 auto; direction: rtl">
          <v-row v-if="product_id"
                 style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
            ویرایش محصول
          </v-row>
          <v-row v-else style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
            افزودن محصول
          </v-row>
          <br>
          <div class="title-en">
            <div v-if="product_id"
                 style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
              Edit Product
            </div>
            <div v-else
                 style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
              Add Product
            </div>
          </div>
          <hr style="display: block; width: 100%"/>
          <br>
          <v-row>
            <v-col lg="6" style="margin: 0 auto">
              <v-text-field style="text-align: right" label="نام محصول" v-model="form.name"
                            reverse></v-text-field>
            </v-col>
            <v-col lg="6" style="margin: 0 auto">
              <v-text-field style="text-align: right" label="توضیحات" v-model="form.description"
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
            <v-col lg="6" style="margin: 0 auto">
              <div style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
                <v-row style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
                  مدیریت شعب
                </v-row>
                <br>
                <div class="title-en">
                  <div
                      style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
                    Branches manage
                  </div>
                </div>
                <hr style="display: block; width: 100%"/>
                <br>
              </div>
              <div v-for="(branch, i) in form.branches" :key="i">
                <branch-row-duplicator
                    v-model="form.branches[i]"
                    @removeBranch="deleteBranch(i)"
                />
              </div>
              <v-btn
                  @click="addBranches"
                  style="background-color: cadetblue; border-radius: 10px; text-align: center;padding: 5px;margin: 5px auto; width: 100%;">
                <v-icon style="margin: 0 auto" dark>fa fa-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn v-if="product_id"
                     style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: rgba(13,75,118,0.83);color: white"
                     type="submit">
                ویرایش محصول
              </v-btn>
              <v-btn v-else
                     style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: rgba(13,75,118,0.83);color: white"
                     type="submit">
                اضافه کردن محصول
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import CropperImage from "../../components/GeneralComponent/CropperImage";
import branchRowDuplicator from "@/components/Branch/BranchRowDuplicator";
import {mapActions} from "vuex";

var defaultForm = {
  name: '',
  description: '',
  stock: '',
  branch_id: 0,
  crop_data: "",
  image: "",
  thumbnail: "",
  branches: [{}],
};

export default {
  name: "Add",
  props: {
    product_id: {default: null},
  },
  components: {
    CropperImage,
    branchRowDuplicator
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
    },
    addBranches() {
      this.form.branches.push({});
    },
    deleteBranch(index) {
      this.form.branches.splice(index, 1);
    },
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


.title-en {
  letter-spacing: 5px;
  font-size: 10px;
  white-space: nowrap;
  text-transform: uppercase;
  color: #55706D;
  display: block;
  padding-bottom: 15px;
}
</style>
