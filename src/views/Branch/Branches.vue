<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
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
    <v-row style="direction: rtl;margin-top: 20px">
      لیست شعبه ها
    </v-row>
    <br>
    <hr style="display: block; width: 75%"/>
    <items/>

    <router-link :to="{name:'AddBranch'}" style="text-decoration: none">
      <v-btn>اضافه کردن شعبه جدید</v-btn>
    </router-link>
  </div>
</template>

<script>
import Items from "../../components/Branch/Items";

export default {
  name: "Branches",
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
          text: 'شعبه ها',
          disabled: true,
          routeName: "ListBranches",
          icon: "fa fa-wrench"
        },
      ]
    }
  },
  components: {Items}
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
