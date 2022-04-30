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
            <v-row v-if="requirement_id"
                   style="direction: rtl;margin-top: 10px;color:  #1565C0;  letter-spacing: 3px;">
              ویرایش نیازمندی
            </v-row>
            <v-row v-else style="direction: rtl;margin-top: 10px;color:  #1565C0;  letter-spacing: 3px;">
              افزودن نیازمندی
            </v-row>
            <br>
            <div class="title-en">
              <div v-if="requirement_id"
                   style="position: absolute;text-align: left; background-color: #1565C0; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Edit requirements
              </div>
              <div v-else
                   style="position: absolute;text-align: left; background-color: #1565C0; color: #eeeeee; border-radius: 10px;padding: 7px;">
                Add requirements
              </div>
            </div>
            <hr style="display: block; width: 100%"/>
            <br>
            <v-row>
              <v-col lg="3">
                <v-text-field style="text-align: right" label="عنوان" v-model="form.title"
                              reverse></v-text-field>
                <v-textarea style="text-align: right" label="توضیحات" v-model="form.description"
                            reverse></v-textarea>
              </v-col>
              <v-col lg="4">
                <category-select v-model="form.category_id"/>
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
                <v-btn v-if="requirement_id"
                       color="blue darken-2"
                       style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;color: white"
                       type="submit">
                  ویرایش نیازمندی
                </v-btn>
                <v-btn v-else
                       color="blue darken-2"
                       style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;color: white"
                       type="submit">
                  اضافه کردن نیازمندی
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
import CategorySelect from "../../components/GeneralComponent/CategorySelect";
import {mapActions} from "vuex";

var defaultForm = {
  title: null,
  description: null,
  city_id: null,
  address: null,
  category_id: [],
  crop_data: "",
  image: "",
  thumbnail: "",
};

export default {
  name: "Add",
  props: {
    requirement_id: {default: null}
  },
  components: {
    CitySelect,
    CropperImage,
    CategorySelect
  },
  data() {
    return {
      show: false,
      form: {...defaultForm},
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'نیازمندی ها',
          disabled: false,
          routeName: "ListRequirements",
          icon: "fa fa-asterisk"
        },
        {
          text: 'نیازمندی',
          disabled: true,
          routeName: "AddRequirement",
          icon: "fa fa-asterisk"
        },
      ],
    }
  },
  methods: {
    ...mapActions("requirement", ['storeRequirement', 'showRequirement', 'updateRequirement']),
    async registerRequest() {
      if (this.requirement_id) {
        let response = await this.updateRequirement({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/requirements");
        }
      } else {
        let response = await this.storeRequirement({data: this.form});
        if (!(response instanceof Error)) {
          await this.$router.replace("/requirements");
        }
      }
    }
  },
  async created() {
    if (this.requirement_id) {
      this.form = await this.showRequirement(this.requirement_id)
    }
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
