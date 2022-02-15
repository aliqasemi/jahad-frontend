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
    <div style="background-color: whitesmoke; padding: 20px; margin: 10px; border-radius: 10px">
      <v-row style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
        نیازمندی
      </v-row>
      <br>
      <div class="title-en">
        <div
            style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
          requirement
        </div>
      </div>
      <hr style="display: block; width: 100%"/>
      <br>
      <v-container>
        <v-row style="background-color: #8DCCC4; padding: 15px; border-radius: 10px; margin: 10px">
          <v-col
              cols="12"
              md="4"
          >
            <v-card-text>
              عنوان:
            </v-card-text>
            <v-card-text>
              {{ requirement.title }}
            </v-card-text>
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-card-text>
              توضیحات:
            </v-card-text>
            <v-card-text>
              {{ requirement.description }}
            </v-card-text>
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-card-text>
              آدرس:
            </v-card-text>
            <v-card-text>
              {{ requirement.address }}
            </v-card-text>
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-card-text>
              دسته بندی:
            </v-card-text>
            <v-card-text>
              {{ requirement.category ? requirement.category.name : '' }}
            </v-card-text>
          </v-col>

          <v-col
          >
            <v-card-text>
              مستندات:
            </v-card-text>
            <v-img v-if="requirement.thumbnail" :src="requirement.thumbnail" width="700px" height="300px"
                   alt="مستندات"/>
            <v-card-text v-else>
              ندارد
            </v-card-text>
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-card-text>
              استان:
            </v-card-text>
            <v-card-text>
              {{ requirement.province }}
            </v-card-text>
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-card-text>
              شهر:
            </v-card-text>
            <v-card-text>
              {{ requirement.county }}
            </v-card-text>
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-card-text>
              مرکز:
            </v-card-text>
            <v-card-text>
              {{ requirement.city }}
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      <div v-if="attachment" style="background-color: white; padding: 15px; border-radius: 10px">
        <v-row style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
          خدمت پیشنهاد شده
        </v-row>
        <br>
        <div class="title-en">
          <div
              style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
            Services recommend
          </div>
        </div>
        <hr style="display: block; width: 100%"/>
        <br>
        <Items :requirement_id="requirement_id"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import Items from "../../components/AttachServiceRequirement/AttachByRequirement/Items";

export default {
  name: "AttachByRequirement",
  components: {Items},
  props: {
    requirement_id: null,
    attachment: {default: true},
  },
  data() {
    return {
      requirement: {default: null},
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'نیازمندی ها',
          disabled: false,
          routeName: "ListRequirements",
          icon: "fa fa-wrench"
        },
        {
          text: 'خدمت های پیشنهاد شده',
          disabled: true,
          routeName: "AttachByRequirement",
          icon: "fa fa-paperclip"
        },
      ]
    }
  },
  methods: {
    ...mapActions('requirement', ['showRequirement'])
  },
  async created() {
    this.requirement = await this.showRequirement(this.requirement_id);
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
