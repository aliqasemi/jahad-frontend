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
  </div>
</template>

<script>
import Item from "../Project/Item";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "items",
  components: {Item},
  data() {
    return {}
  },
  computed: {
    ...mapGetters("project", ['getListProject', 'getProjectLoading'])
  },
  methods: {
    ...mapActions("project", ['loadProjectList']),
  },
  async created() {
    await this.loadProjectList();
  }
}
</script>

<style scoped>

</style>
