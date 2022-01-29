<template>
  <div>
    <v-progress-linear
        v-if="getTemplateLoading"
        color="black accent-4"
        indeterminate
        rounded
        height="10"
        style="margin: 10px"
    ></v-progress-linear>
    <v-row style="margin-top: 5px" v-else>
      <item :item="template" v-for="(template , key) in getListTemplate" :index="key" v-bind:key="key"/>
    </v-row>
  </div>
</template>

<script>
import Item from "../MessageTemplate/Item";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "items",
  components: {Item},
  data() {
    return {}
  },
  computed: {
    ...mapGetters("template", ['getListTemplate', 'getTemplateLoading'])
  },
  methods: {
    ...mapActions("template", ['loadTemplateList']),
  },
  async created() {
    await this.loadTemplateList();
  }
}
</script>

<style scoped>

</style>
