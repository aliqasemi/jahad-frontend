<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl;font-size: 20px;">
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
        لیست مراحل
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
      <div v-if="project_id != 0">
        <items :project_id="project_id"/>
        <router-link :to="{name:'AddStep', params:{project_id: project_id}}"
                     style="text-decoration: none; padding: 20px;">
          <v-btn style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;background-color: rgba(13,75,118,0.83);color: white">افزودن مرحله جدید</v-btn>
        </router-link>
      </div>
      <div v-else>
        <project-search/>
      </div>
    </div>
  </div>
</template>

<script>
import Items from "../../components/Step/Items";
import ProjectSearch from "@/components/Project/ProjectSearch";

export default {
  name: "Steps",
  props: {
    project_id: {default: null},
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
          text: 'مرحله ها',
          disabled: true,
          routeName: "ListSteps",
          icon: "fa fa-wrench"
        },
      ]
    }
  },
  components: {
    ProjectSearch,
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
