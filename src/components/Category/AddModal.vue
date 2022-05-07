<template>
  <v-dialog
      v-model="state"
      persistent
      :retain-focus="false"
      transition="dialog-bottom-transition"
      max-width="600"
  >
    <v-card style="text-align: center;direction: rtl;">
      <div style="background-color: whitesmoke; padding: 20px; border-radius: 10px">
        <v-row style="direction: rtl;margin-top: 10px;color:  #1976D2;  letter-spacing: 3px;">
          مدیریت دسته بندی
        </v-row>
        <br>
        <div class="title-en">
          <div
              style="position: absolute;text-align: left; background-color: #1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
            Manage Category
          </div>
        </div>
        <hr style="display: block; width: 100%"/>
        <br>
        <v-form>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  style="margin:0 auto "
              >
                <category-select body="دسته پدر را انتخاب کنید" v-model="form.parent_id"/>
                <v-text-field
                    v-model="form.name"
                    label="نام دسته"
                    required
                    reverse
                ></v-text-field>
              </v-col>

            </v-row>
            <router-link style="text-decoration: none" :to="{name:'ListCategories'}">
              <v-btn
                  class="mr-4"
                  @click="state = false"
              >
                بازگشت
              </v-btn>
            </router-link>
            <v-btn
                class="mr-4"
                @click="submit"
            >
              ذخیره
            </v-btn>
          </v-container>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CategorySelect from "@/components/GeneralComponent/CategorySelect";

let defaultForm = {
  name: null,
  parent_id: null,
};

export default {
  name: "AddModal",
  components: {CategorySelect},
  props: {
    category_id: {default: null},
    parent_id: {default: null},
    value: {
      type: Boolean,
    },
  },
  data: () => ({
    form: defaultForm,
  }),
  computed: {
    ...mapGetters('category', ['getTreeCategories']),
    state: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions('category', ["showCategory", "storeCategory", "updateCategory", "loadCategoryList"]),
    async submit() {
      if (this.category_id) {
        let response;
        response = await this.updateCategory({data: this.form});
        await this.loadCategoryList();
        if (!(response instanceof Error)) {
          this.state = false;
        }
      } else {
        let response;
        response = await this.storeCategory({data: this.form});
        await this.loadCategoryList();
        if (!(response instanceof Error)) {
          this.state = false;
        }
      }
    },
  },
  watch: {
    state: {
      async handler() {
        if (this.category_id && this.state === true) {
          this.form = await this.showCategory(this.category_id);
        }
        if (this.parent_id && this.state === true) {
          this.form.parent_id = this.parent_id;
        }
      }
    }
  },
}
</script>

<style scoped>
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
