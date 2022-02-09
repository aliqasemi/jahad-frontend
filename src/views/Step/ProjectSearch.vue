<template>
  <div class="v-card">
    <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label="Search for a coin..."
        solo
    >
      <template v-slot:no-data>
        <v-list-item>
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
          <v-icon left>
            mdi-bitcoin
          </v-icon>
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-avatar
            color="indigo"
            class="text-h5 font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-chip v-text="item.requirement.title"></v-chip>
          <v-chip v-for="(service,key) in item.services" v-bind:key="key">
            {{ service.title }}
          </v-chip>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-bitcoin</v-icon>
        </v-list-item-action>
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
      console.log(val)
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