<template>
  <div class="v-card" style="direction: rtl; text-align: right">
    <v-autocomplete
        v-model="model"
        :items="items"
        auto-select-first
        :loading="isLoading"
        :search-input.sync="search"
        chips
        hide-details
        no-filter
        append-icon=""
        item-text="name"
        item-value="id"
        label="محصول مورد نظر خود را جست و جو کنید"
        solo
        reverse
    >
      <template v-slot:no-data>
        <v-list-item style="text-align: end">
          <v-list-item-title>
            چنین محصولی وجود ندارد
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip
            v-bind="attr"
            :input-value="selected"
            color="blue-grey"
            class="white--text"
            v-on="on"
        >
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-content style="direction: rtl">
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>fa fa-edit</v-icon>
        </v-list-item-action>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import ProductRepository from "@/abstraction/repository/ProductRepository";

let repository = new ProductRepository();
export default {
  name: "ProductSearch",
  props: {
    value: {}
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  data: () => ({
    isLoading: false,
    items: [],
    search: null,
    filters: {
      typeMode: 'or',
      name: null,
      description: null,
    }
  }),

  watch: {
    async search(value) {

      if (value.length === 0) {
        this.items = [];
        return;
      }

      this.isLoading = true

      for (const key in this.filters) {
        if (key !== 'typeMode') {
          this.filters[key] = value;
        }
      }

      await repository.indexFilter(this.filters)
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
    },
    async value() {
      this.model = (await repository.show(this.value)).id;
      this.items = [await repository.show(this.value)];
    },
  },
  async created(){
    if (this.value){
      this.model = (await repository.show(this.value)).id;
      this.items = [await repository.show(this.value)];
    }
  }
}
</script>

<style scoped>

</style>