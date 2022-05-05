<template>
  <v-col lg="3" xl="3" md="4" sm="6" xs="12" style=" margin-bottom: 10px">
    <v-card
        color="#1E88E5"
        dark
        style="height: 280px"
    >
      <v-card-title class="text-h6">
        <v-row>
          <v-col lg="1" xl="1" md="1" sm="1" xs="1" style="font-weight: bolder">
            {{ index + 1 }}
          </v-col>
          <v-col lg="12" xl="12" md="12" sm="12" xs="12">
            {{ (item.name).slice(0, 23) }} {{ (item.name).length > 24 ? '...' : '' }}
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-subtitle v-if="item.description">{{ (item.description).slice(0, 29) }}
        {{ (item.description).length > 30 ? '...' : '' }}
      </v-card-subtitle>
      <v-card-subtitle v-else>
        ...
      </v-card-subtitle>
      <v-card-text style="text-align: left;">
        <v-tooltip top>
          <template v-slot:activator="{ on,attrs }">
            <v-btn
                :color="item.send_sms ? 'blue' :'red'"
                fab
                x-small
                dark
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>fa-envelope-open-o</v-icon>
            </v-btn>

          </template>
          <span>وضعیت سرویس پیامکی</span>
        </v-tooltip>
      </v-card-text>
      <delete-modal v-model="deleteDialog" @action="deleteStep(item.id)"/>
      <v-card-actions>
        <v-icon :disabled="index === 0" @click="moveUp(item.id)" style="margin: 5px auto; padding: 10px" class="angle">
          fa-angle-right
        </v-icon>
        <router-link :to="{name:'EditStep',  params: { step_id: item.id , project_id:project_id },}"
                     style="text-decoration: none;margin: 5px">
          <v-tooltip top>

            <template v-slot:activator="{ on,attrs }">
              <v-btn
                  style="background-color: lavenderblush"
                  slot="activator"
                  v-bind="attrs"
                  v-on="on"
                  fab
              >
                <v-icon style="color: darkcyan" dark>fa-cog</v-icon>
              </v-btn>

            </template>
            <span>تنظیمات</span>
          </v-tooltip>
        </router-link>
        <v-tooltip top>
          <template v-slot:activator="{ on , attrs}">
            <v-btn
                style="background-color: lavenderblush"
                slot="activator"
                v-bind="attrs"
                v-on="on"
                fab
                @click.native="deleteDialog = true"
            >
              <v-icon style="color: red" dark>fa-trash</v-icon>
            </v-btn>
          </template>
          <span>حذف</span>
        </v-tooltip>
        <v-icon :disabled="index === number -1" @click="moveDown(item.id)" style="margin: 5px auto;padding: 10px"
                class="angle">
          fa-angle-left
        </v-icon>
      </v-card-actions>
    </v-card>
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
    number: {default: 0},
    project_id: {default: null},
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
    ...mapActions("step", ['removeStep', 'moveUp', 'moveDown']),
    async deleteStep(id) {
      let response;
      response = await this.removeStep(id);
      if (!(response instanceof Error)) {
        this.deleteDialog = false;
      }
    },
  }
}
</script>

<style scoped>
.item {
  height: 280px;
  transition: all 1s;
}

.item:hover {
}

.angle:hover {
  background-color: #b1b1b1;
  color: black;
  border-radius: 15px;
}
</style>
