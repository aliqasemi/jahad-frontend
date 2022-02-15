<template>
  <v-row class="item">
    <v-col lg="1" style="font-weight: bolder">
      {{ index + 1 }}
    </v-col>
    <v-col lg="3">
      {{ item.name }}
    </v-col>
    <v-col lg="4">
      <v-row
          style="background-color: #AED6D1; border-radius: 10px;text-align: center; height: fit-content; width: 50%; margin: auto 0">
        <v-col lg="1">
          <v-icon>fa fa-map-marker</v-icon>
        </v-col>
        <v-col lg="5">
          {{ item.city.name }}
        </v-col>
      </v-row>
    </v-col>
    <v-col lg="4" style="text-align: left; margin: auto 0">
      <router-link :to="{name:'EditBranch',  params: { branch_id: item.id },}" style="text-decoration: none;">
        <v-tooltip top>
          <template v-slot:activator="{ on,attrs }">

            <v-btn
                slot="activator"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon dark>fa-edit</v-icon>
            </v-btn>

          </template>
          <span>ویرایش</span>
        </v-tooltip>
      </router-link>
      <v-tooltip top>
        <template v-slot:activator="{ on , attrs}">
          <v-btn
              slot="activator"
              v-bind="attrs"
              v-on="on"
              @click.native="deleteDialog = true"
          >
            <v-icon dark>fa-trash</v-icon>
          </v-btn>
        </template>
        <span>حذف</span>
      </v-tooltip>
      <delete-modal v-model="deleteDialog" @action="deleteBranch(item.id)"/>
    </v-col>
  </v-row>
</template>

<script>
import DeleteModal from "../GeneralComponent/deleteModal";
import {mapActions} from "vuex";

export default {
  name: "Item",
  props: {
    item: {default: null},
    index: {default: 0},
  },
  components: {
    DeleteModal
  },
  data() {
    return {
      deleteDialog: false
    }
  },
  methods: {
    ...mapActions("branch", ['removeBranch']),
    async deleteBranch(id) {
      let response;
      response = await this.removeBranch(id);
      if (!(response instanceof Error)) {
        this.deleteDialog = false;
      }
    },
  }
}
</script>

<style scoped>
.item {
  border: 2px inset darkseagreen;
  border-radius: 5px;
  margin: 5px;
  background-color: rgba(46, 201, 189, 0.2);
}

.item:hover {
  background-color: rgba(202, 200, 5, 0.4);
  transition: 900ms;
  border: 2px inset black;
}
</style>
