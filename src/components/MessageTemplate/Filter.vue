<template>
  <v-row
      style="background-color: #1E88E5; border-radius: 10px 10px 0 0; margin: 0 auto; border-bottom: inset lightslategray">
    <v-col lg="10" xl="10" md="10" sm="12" xs="12">
      <v-text-field label="نام قالب" color="white" reverse v-model="filter.name">

      </v-text-field>
    </v-col>
    <v-col lg="2" xl="2" md="2" sm="12" xs="12" style="margin: auto;text-align: center">
      <v-tooltip top style="margin: 5px">
        <template v-slot:activator="{ on , attrs}">
          <v-btn
              style="background-color: lavenderblush; margin: 0 auto"
              @click="search"
              fab
              small
              v-bind="attrs"
              v-on="on"
          >
            <v-icon style="color: darkcyan" dark>fa-search</v-icon>
          </v-btn>
        </template>
        <span>اعمال فیلتر</span>
      </v-tooltip>
      <v-tooltip top style="margin: 5px">
        <template v-slot:activator="{ on , attrs}">
          <v-btn
              style="background-color: lavenderblush;margin-right: 10px"
              @click="searchClearFilter"
              fab
              small
              v-bind="attrs"
              v-on="on"
          >
            <v-icon style="color: darkred" dark>fa-close</v-icon>
          </v-btn>
        </template>
        <span>حذف فیلتر</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions} from "vuex";
import {mapMutations} from "vuex/dist/vuex.esm.browser";

export default {
  name: "Filter",
  data() {
    return {
      filter: {
        name: null,
      },
    }
  },
  methods: {
    ...mapActions("template", ['loadTemplateList']),
    ...mapMutations("template", ['SET_TEMPLATE_FILTER']),
    async search() {
      this.SET_TEMPLATE_FILTER(this.filter);
      await this.loadTemplateList();
    },
    async searchClearFilter() {
      this.filter = {
        name: null,
      };
      this.SET_TEMPLATE_FILTER(this.filter);
      await this.loadTemplateList();
    }
  },
}
</script>

<style scoped>
</style>