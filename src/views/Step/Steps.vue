<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
    <div style="direction: rtl; background-color: aliceblue;border-radius: 10px">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>fa fa-chevron-left</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
              :disabled="item.disabled"
          >
            <router-link :to="{name:item.routeName}" style="text-decoration: none;color:black;padding: 5px"
                         class="bredRoute">
                           <span>
                                <v-icon>{{ item.icon }}</v-icon>  {{ item.text.toUpperCase() }}
                           </span>
            </router-link>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <v-row style="direction: rtl;margin-top: 20px">
      لیست مرحله ها
    </v-row>
    <br>
    <hr style="display: block; width: 75%"/>
    <div v-if="project_id != 0">
      <items :project_id="project_id"/>
      <router-link :to="{name:'AddStep', params:{project_id: project_id}}"
                   style="text-decoration: none">
        <v-btn style="margin-top: 15px">اضافه کردن مرحله جدید</v-btn>
      </router-link>
    </div>
    <div v-else>
      <project-search/>
    </div>
  </div>
</template>

<script>
import Items from "../../components/Step/Items";
import ProjectSearch from "@/components/Step/ProjectSearch";

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
</style>
