<template>
  <div>
    <v-progress-linear
        v-if="getProjectLoading"
        color="black accent-4"
        indeterminate
        rounded
        height="10"
        style="margin: 10px"
    ></v-progress-linear>
    <v-row style="margin-top: 5px" v-else>
      <item :item="project" v-for="(project , key) in getListProject" :index="key" v-bind:key="key"/>
    </v-row>
    <div class="text-center" style="direction: ltr">
      <v-pagination
          v-model="page"
          :length="pageNumber"
          :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Item from "../Project/Item";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "items",
  components: {Item},
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      pageNumber: 1,
    }
  },
  computed: {
    ...mapGetters("project", ['getListProject', 'getProjectLoading']),
  },
  methods: {
    ...mapActions("project", ['loadProjectList']),
    ...mapMutations("project", ['SET_PROJECT_PAGINATION'])
  },
  watch: {
    page: {
      deep: true,
      immediate: true,
      async handler() {
        this.SET_PROJECT_PAGINATION({page: this.page, itemsPerPage: this.itemsPerPage});
        await this.loadProjectList();
      },
    },
  },
  async created() {
    let response = await this.loadProjectList();
    this.pageNumber = response.pagination.pageCount;
  }
}
</script>

<style scoped>

</style>
