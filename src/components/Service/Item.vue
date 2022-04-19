<template>
  <v-row class="item">
    <v-col lg="1" style="font-weight: bolder">
      {{ index + 1 }}
    </v-col>
    <v-col lg="4">
      {{ item.title }}
    </v-col>
    <v-col lg="3">
      <v-row
          style="background-color: rgba(13, 75, 118, 0.8); color: white; border-radius: 10px;text-align: center; height: fit-content; width: fit-content; margin: auto 0">
        <v-col lg="2">
          <v-icon style="color: #d6d6d6">fa fa-user</v-icon>
        </v-col>
        <v-col lg="10">
          {{ item.user.firstname + ' ' + item.user.lastname }}
        </v-col>
      </v-row>
    </v-col>
    <v-col lg="4" style="text-align: left; margin: auto 0">
      <router-link :to="{name:'AttachByService',  params: { service_id: item.id },}"
                   style="text-decoration: none; margin: 5px"
                   v-if="getAuthorizeUser === 'admin' || getAuthorizeUser === 'superAdmin'"
      >
        <v-tooltip top>
          <template v-slot:activator="{ on ,attrs}">
            <v-btn
                style="background-color: lavenderblush"
                slot="activator"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon style="color: darkgreen" dark>fa-paperclip</v-icon>
            </v-btn>

          </template>
          <span>نیازمندی های ارایه شده</span>
        </v-tooltip>
      </router-link>
      <router-link :to="{name:'EditService',  params: { service_id: item.id },}"
                   style="text-decoration: none;margin: 5px">
        <v-tooltip top>
          <template v-slot:activator="{ on,attrs }">
            <v-btn
                style="background-color: lavenderblush"
                slot="activator"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon style="color: darkcyan" dark>fa-edit</v-icon>
            </v-btn>

          </template>
          <span>ویرایش</span>
        </v-tooltip>
      </router-link>
      <v-tooltip top style="margin: 5px">
        <template v-slot:activator="{ on , attrs}">
          <v-btn
              style="background-color: lavenderblush"
              slot="activator"
              v-bind="attrs"
              v-on="on"
              @click.native="deleteDialog = true"
          >
            <v-icon style="color: red" dark>fa-trash</v-icon>
          </v-btn>
        </template>
        <span>حذف</span>
      </v-tooltip>
      <delete-modal v-model="deleteDialog" @action="deleteService(item.id)"/>
    </v-col>
  </v-row>
</template>

<script>
import DeleteModal from "../GeneralComponent/deleteModal";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Item",
  props: {
    item: {default: null},
    index: {default: 0},
  },
  components: {
    DeleteModal
  },
  computed: {
    ...mapGetters("user", ['getAuthorizeUser'])
  },
  data() {
    return {
      deleteDialog: false
    }
  },
  methods: {
    ...mapActions("service", ['removeService']),
    async deleteService(id) {
      let response;
      response = await this.removeService(id);
      if (!(response instanceof Error)) {
        this.deleteDialog = false;
      }
    },
  }
}
</script>

<style scoped>
.item {
  border-radius: 5px;
  margin: 5px;
  background-color: #eeeeea;
  transition: all 900ms;
}

.item:hover {
  background-color: #d6d6d6;
}
</style>
