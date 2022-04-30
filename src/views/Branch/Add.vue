<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
    <div style="direction: rtl; background-color: #1976D2;border-radius: 10px">
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
    <transition name="loader-transition">
      <div v-if="show" style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
        <v-form @submit.prevent="registerRequest" style="margin-top: 20px">
          <div style="margin: 0 auto; direction: rtl">
            <v-row v-if="branch_id"
                   style="direction: rtl;margin-top: 10px;color:  #1976D2;  letter-spacing: 3px;">
              ویرایش شعبه
            </v-row>
            <v-row v-else style="direction: rtl;margin-top: 10px;color:  #1976D2;  letter-spacing: 3px;">
              افزودن شعیه
            </v-row>
            <br>
            <div class="title-en">
              <div v-if="branch_id"
                   style="position: absolute;text-align: left; background-color: #1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Edit Branch
              </div>
              <div v-else
                   style="position: absolute;text-align: left; background-color: #1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Add Branch
              </div>
            </div>
            <hr style="display: block; width: 100%"/>
            <br>
            <v-row>
              <v-col lg="3">
                <v-text-field style="text-align: right" label="عنوان" v-model="form.name"
                              reverse></v-text-field>
                <v-textarea style="text-align: right" label="توضیحات" v-model="form.description"
                            reverse></v-textarea>
              </v-col>
              <v-col lg="4">
                <v-text-field style="text-align: right" label="تلفن" v-model="form.cell_number"
                              reverse></v-text-field>
                <v-text-field style="text-align: right" label="تلفن همراه" v-model="form.phone_number"
                              reverse></v-text-field>
                <v-text-field style="text-align: right" label="کد پستی" v-model="form.postal_code"
                              reverse></v-text-field>
              </v-col>
              <v-col lg="5">
                <!--                      :url.sync="form.thumbnail"-->
                <cropper-image
                    :crop_data.sync="form.crop_data"
                    v-model="form.image"
                    :url="form.thumbnail"
                />
              </v-col>
              <v-col lg="12">
                <city-select v-model="form.city_id"/>
                <v-text-field style="text-align: right; width: 60%" label="آدرس" v-model="form.address"
                              reverse></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn v-if="branch_id"
                       color="blue darken-2"
                       style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;color: white"
                       type="submit">
                  ویرایش شعبه
                </v-btn>
                <v-btn v-else
                       color="blue darken-2"
                       style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;color: white"
                       type="submit">
                  اضافه کردن شعبه
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-form>
      </div>
    </transition>
  </div>
</template>

<script>
import CitySelect from "../../components/GeneralComponent/CitySelect";
import CropperImage from "../../components/GeneralComponent/CropperImage";
import {mapActions} from "vuex";
import CityRepository from "../../abstraction/repository/CityRepository";

let repository = new CityRepository();

var defaultForm = {
  title: null,
  description: null,
  city_id: null,
  address: null,
  postal_code: null,
  cell_number: null,
  phone_number: null,
  crop_data: "",
  image: "",
  thumbnail: "",
};

export default {
  name: "Add",
  props: {
    branch_id: {default: null}
  },
  components: {
    CitySelect,
    CropperImage,
  },
  data() {
    return {
      show: false,
      form: {...defaultForm},
      provinces: [],
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'شعبه ها',
          disabled: false,
          routeName: "ListBranches",
          icon: "fa fa-wrench"
        },
        {
          text: 'شعبه',
          disabled: true,
          routeName: "AddBranch",
          icon: "fa fa-wrench"
        },
      ],
    }
  },
  methods: {
    ...mapActions("branch", ['storeBranch', 'showBranch', 'updateBranch']),
    async registerRequest() {
      if (this.branch_id) {
        let response = await this.updateBranch({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/branches");
        }
      } else {
        let response = await this.storeBranch({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/branches");
        }
      }
    }
  },
  async created() {
    if (this.branch_id) {
      this.form = await this.showBranch(this.branch_id)
    }
    this.provinces = await repository.indexProvinces();
    this.show = await true;
  }
}
</script>

<style scoped>
.loader-transition-enter-active {
  transition: all .8s ease;
}

.loader-transition-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.loader-transition-enter, .loader-transition-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

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
