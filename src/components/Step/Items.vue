<template>
  <div>
    <v-progress-linear
        v-if="getStepLoading"
        color="black accent-4"
        indeterminate
        rounded
        height="10"
        style="margin: 10px"
    ></v-progress-linear>
    <v-row style="margin-top: 5px" v-else>
      <item v-for="(step , key) in getListStep" v-bind:key="key" :item="step" :number="getListStep.length" :index="key"/>
    </v-row>
  </div>
</template>

<script>
import Item from "../Step/Item";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "items",
  components: {Item},
  props: {
    project_id: {default: null},
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters("step", ['getListStep', 'getStepLoading'])
  },
  methods: {
    ...mapActions("step", ['loadStepList']),
  },
  async created() {
    await this.loadStepList(this.project_id);
  }
}
</script>

<style scoped>

</style>
