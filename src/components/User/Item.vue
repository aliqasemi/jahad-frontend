<template>
  <v-col lg="12" xl="12" md="12" class="item" style=" margin-top: 25px">
    <v-row>
      <v-col lg="1" style="font-weight: bolder">
        {{ index + 1 }}
      </v-col>
      <v-col lg="3" xl="3">
        {{ item.firstname }} {{ item.lastname }}
      </v-col>
      <v-col lg="2" xl="2">
        {{ item.phoneNumber }}
      </v-col>
      <v-col class="role" lg="2" xl="2" v-if="item.role === 'user'" @click="roleDialog = true">
        کاربر عادی
      </v-col>
      <v-col class="role" lg="2" xl="2" v-else-if="item.role === 'admin'" @click="roleDialog = true">
        کاربر مدیر
      </v-col>
      <v-col class="role" lg="2" xl="2" v-else-if="item.role === 'superAdmin'" @click="roleDialog = true">
        کاربر مدیر کل
      </v-col>
      <v-col lg="4" xl="4" style="text-align: center">
        <router-link :to="{name:'EditUser',  params: { user_id: item.id },}" style="text-decoration: none;margin: 5px">
          <v-tooltip top>
            <template v-slot:activator="{ on,attrs }">
              <v-btn
                  style="background-color: lavenderblush"
                  slot="activator"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon style="color: darkcyan" dark>fa-pencil</v-icon>
              </v-btn>
            </template>
            <span>ویرایش</span>
          </v-tooltip>
        </router-link>
        <v-tooltip top>
          <template v-slot:activator="{ on , attrs}">
            <v-btn
                style="background-color: lavenderblush"
                slot="activator"
                v-bind="attrs"
                v-on="on"
                @click.native="activeDialog = true"
            >
              <v-icon v-if="item.active" style="color: blue" dark>fa-toggle-on</v-icon>
              <v-icon v-else style="color: black" dark>fa-toggle-off</v-icon>
            </v-btn>
          </template>
          <span v-if="item.active">غیر فعال کردن</span>
          <span v-else>فعال کردن</span>
        </v-tooltip>
        <delete-modal v-if="item.active" label="آیا از غیر فعال کردن این کاربر اطمینان دارید؟" v-model="activeDialog"
                      @action="activeUser(item.id)"/>
        <delete-modal v-else label="آیا از فعال کردن این کاربر اطمینان دارید؟" v-model="activeDialog"
                      @action="activeUser(item.id)"/>
        <choose-modal v-model="roleDialog" @action="assignRoleUser"
        />

      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import DeleteModal from "../GeneralComponent/deleteModal";
import ChooseModal from "../GeneralComponent/chooseModal";
import {mapActions} from "vuex";

export default {
  name: "Item",
  props: {
    item: {default: null},
    index: {default: 0},
  },
  components: {
    DeleteModal,
    ChooseModal
  },
  data() {
    return {
      activeDialog: false,
      roleDialog: false,
    }
  },
  methods: {
    ...mapActions("user", ['active', 'assignRole']),
    async activeUser(id) {
      let response;
      response = await this.active({
        data: !this.item.active,
        userId: id
      });
      if (!(response instanceof Error)) {
        this.activeDialog = false;
      }
    },
    async assignRoleUser(value) {
      let response;
      response = await this.assignRole({role: value, userId: this.item.id});
      console.log(response);
      if (!(response instanceof Error)) {
        this.roleDialog = false;
      }
    }
  },
}
</script>

<style scoped>
.item {
  border: 2px inset darkseagreen;
  border-radius: 5px;
  background-color: rgba(46, 201, 189, 0.2);
}

.item:hover {
  background-color: rgba(202, 200, 5, 0.4);
  transition: 900ms;
  border: 2px inset black;
}

.angle:hover {
  background-color: #55706D;
}

.role {
  background-color: #AED6D1;
  border-radius: 5px;
  text-align: center;
  height: 80%;
  margin: auto;
  transition: 1s;
}

.role:hover {
  background-color: #b1b1b1;
  cursor: grabbing;
}
</style>
