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
        <v-list-item-content style="direction: rtl;border-bottom: solid 1px #b1b1b1; margin: 2px;">
          <v-list-item-title v-text="item.name" style="padding: 10px"></v-list-item-title>
          <v-row>
            <div style="padding: 20px;">
              <v-chip style="margin-left: 2px"> نیازمندی‌: {{ item.requirement.title }}</v-chip>
              |
              <v-chip style="margin-left: 2px">سرویس‌</v-chip>
              <v-chip v-for="(service,key) in item.services" v-bind:key="key">
                <v-col lg="2">
                  {{ service.title }}
                </v-col>
              </v-chip>
            </div>
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
  props: {
    type: {default: 'step'},
  },
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
      if (this.type === 'step') {
        this.$router.push({name: 'ListSteps', params: {project_id: val}})
      } else if (this.type === 'attachProduct') {
        this.$router.push({name: 'AttachProduct', params: {project_id: val}})
      }
    },
    async search(value) {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

      await delay(1500);

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