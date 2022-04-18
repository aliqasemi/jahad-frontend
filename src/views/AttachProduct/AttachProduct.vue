<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl;font-size: 20px;"
       v-if="getAuthorizeUser === 'superAdmin' || getAuthorizeUser === 'admin'">
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
    <transition name="loader-transition">
      <div v-if="show" style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
        <v-row style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
          لیست نیازمندی های پروژه
        </v-row>
        <br>
        <div class="title-en">
          <div
              style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
            Steps
          </div>
        </div>
        <hr style="display: block; width: 100%"/>
        <br>
        <transition name="loader-transition">
          <div v-if="project_id !== 0">
            <items :project_id="project_id"/>
          </div>
        </transition>
        <div v-if="project_id === 0">
          <project-search type="attachProduct"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Items from "../../components/AttachProduct/Items";
import ProjectSearch from "@/components/Project/ProjectSearch";
import {mapGetters} from "vuex";

export default {
  name: "AttachProduct",
  props: {
    project_id: {default: null},
  },
  data() {
    return {
      show: false,
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'اعطای محصول',
          disabled: true,
          routeName: "AttachProduct",
          icon: "fa fa-wrench"
        },
      ]
    }
  },
  components: {
    ProjectSearch,
    Items,
  },
  computed: {
    ...mapGetters("user", ['getAuthorizeUser'])
  },
  async created() {
    this.show = await true;
  }
}
</script>

<style scoped>
.loader-transition-enter-active {
  transition: all .8s ease;
}

.loader-transition-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.loader-transition-enter, .loader-transition-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

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
