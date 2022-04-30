<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl;font-size: 20px;">
    <div style="direction: rtl; background-color: #1976D2;border-radius: 10px">
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
      <div v-if="show">
        <div style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
          <v-row style="direction: rtl;margin-top: 10px;color:  #1565C0;  letter-spacing: 3px;">
            مدیریت نیازمندی
          </v-row>
          <br>
          <div class="title-en">
            <div
                style="position: absolute;text-align: left; background-color: #1565C0; color: #eeeeee; border-radius: 10px;padding: 7px;">
              Requirements
            </div>
          </div>
          <hr style="display: block; width: 100%"/>
          <br>
          <items/>
        </div>
        <router-link :to="{name:'AddRequirement'}" style="text-decoration: none; padding: 20px;">
          <v-btn
              color="blue darken-2"
              style=" font-weight: bolder; font-size: 15px; letter-spacing: 3px;color: white">
            اضافه کردن نیازمندی جدید
          </v-btn>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
import Items from "../../components/Requirement/Items";

export default {
  name: "Requirement",
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
          text: 'نیازمندی ها',
          disabled: true,
          routeName: "ListCategories",
          icon: "fa fa-asterisk"
        },
      ],
    }
  },
  components: {Items},
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
