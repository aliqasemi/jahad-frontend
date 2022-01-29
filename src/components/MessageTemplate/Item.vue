<template>
  <v-col lg="3" xl="3" md="6" class="item" style="padding: 25px; margin: 25px">
    <v-col lg="2">
      {{ index + 1 }}
    </v-col>
    <v-col lg="3">
      {{ item.name }}
    </v-col>
    <v-col lg="5" style="text-align: left">
      <router-link :to="{name:'EditTemplate',  params: { template_id: item.id },}" style="text-decoration: none;">
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
      <delete-modal v-model="deleteDialog" @action="deleteTemplate(item.id)"/>
    </v-col>
  </v-col>
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
    ...mapActions("template", ['removeTemplate']),
    async deleteTemplate(id) {
      let response;
      response = await this.removeTemplate(id);
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
}

.item:hover {
  background-color: azure;
  transition: 100ms;
  border: 2px inset black;
}

.angle:hover{
  background-color: #55706D;
}
</style>
