<template>
  <div class="v-card" style="direction: rtl; text-align: right">
    <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        hide-details
        hide-selected
        no-filter
        item-text="name"
        item-value="id"
        label="پروژه خود را جست و جو کنید"
        solo
        append-icon=""
        reverse
    >
      <template v-slot:no-data>
        <v-list-item style="text-align: end">
          <v-list-item-title>
            چنین پروژه ای وجود ندارد
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
        <v-list-item-avatar
            color="indigo"
            class="text-h5 font-weight-light white--text"
        >
          <v-icon style="color: white">fa fa-cogs</v-icon>
        </v-list-item-avatar>
        <v-list-item-content style="direction: rtl;border:solid 1px; margin: 2px;border-radius: 5px">
          <v-list-item-title v-text="item.name" style="padding: 10px"></v-list-item-title>
          <v-row style="width: -webkit-fill-available">
              <div style="padding-top: 20px; padding-right: 20px">
                <v-chip style="background-color: #AED6D1"> نیازمندی</v-chip>
                <v-chip> {{ item.requirement.title }}</v-chip>
              </div>
          </v-row>
          <v-row style="margin: 5px">
            <v-chip style="background-color: cadetblue">سرویس‌ </v-chip>
            <v-chip v-for="(service,key) in item.services" v-bind:key="key">
              <v-col lg="2">
                {{ service.title }}
              </v-col>
            </v-chip>
          </v-row>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import ProjectRepository from "@/abstraction/repository/ProjectRepository";

let repository = new ProjectRepository();
export default {
  name: "ProjectSearch",
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    filters: {
      typeMode: 'or',
      name: null,
      description: null,
      requirement_title: null,
      service_title: null,
    }
  }),

  watch: {
    model(val) {
      this.$router.push({name: 'ListSteps', params: {project_id: val}})
    },
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
  },
}
</script>

<style scoped>

</style>