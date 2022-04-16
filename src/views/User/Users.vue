<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl;font-size: 20px;" v-if="getAuthorizeUser === 'superAdmin'">
    <div style="direction: rtl; background-color: rgba(13,75,118,0.83);border-radius: 10px">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>fa fa-chevron-left</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
              :disabled="item.disabled"
          >
            <router-link :to="{name:item.routeName}" style="text-decoration: none;color:yellow;padding: 5px"
                         class="bredRoute">
                           <span>
                                <v-icon>{{ item.icon }}</v-icon>  {{ item.text.toUpperCase() }}
                           </span>
            </router-link>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <div style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
      <v-row style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
        لیست کاربران
      </v-row>
      <br>
      <div class="title-en">
        <div
            style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
          Users
        </div>
      </div>
      <hr style="display: block; width: 100%"/>
      <br>
      <div>
        <items/>
      </div>
    </div>
  </div>
</template>

<script>
import Items from "../../components/User/Items";
import {mapGetters} from "vuex";

export default {
  name: "Users",
  props: {},
  computed: {
    ...mapGetters("user", ['getAuthorizeUser'])
  },
  data() {
    return {
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'کابران',
          disabled: true,
          routeName: "ListUsers",
          icon: "fa fa-users"
        },
      ]
    }
  },
  components: {
    Items,
  }
}
</script>

<style scoped>
.bredRoute:hover {
  background-color: cadetblue;
  color: white;
  border-radius: 10px;
  transition: 1s;
}

.title-en {
  letter-spacing: 5px;
  font-size: 10px;
  white-space: nowrap;
  text-transform: uppercase;
  color: #55706D;
  display: block;
  padding-bottom: 15px;
}
</style>
