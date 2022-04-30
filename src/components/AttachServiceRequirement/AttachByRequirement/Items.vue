<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-data-table
        :headers="headers"
        :items="attachments"
        :loading="overlay"
        class="elevation-1"
        loading-text="در حال پردازش اطلاعات... لطفا صبر کنید"
        hide-default-footer
    >
      <template v-slot:item.actions="{item}">
        <router-link :to="{name:'AttachByService',  params: { service_id: item.id , attachment: false}}"
                     style="text-decoration: none">
          <v-tooltip top>
            <template v-slot:activator="{ on,attrs }">
              <v-btn
                  slot="activator"
                  v-bind="attrs"
                  v-on="on"
                  fab
                  small
              >
                <v-icon dark>fa-info-circle</v-icon>
              </v-btn>
            </template>
            <span>جزییات</span>
          </v-tooltip>
        </router-link>
      </template>
      <template v-slot:item.user="{item}">
        <span v-if="item.user">{{ item.user.firstname }} {{ item.user.lastname }}</span>
        <span v-else style="color: brown">کابر وجود ندارد</span>
      </template>
      <template v-slot:item.category="{item}">
        {{ item.category.name }}
      </template>
      <template v-slot:item.projects="{item}">
        <div v-if="item.projects.length">
          <div class="pa-2 ma-1 rounded-pill"
               style="background-color: #90caf9; font-size: 12px;width: fit-content; display: inline-block"
               v-for="(project,key) in item.projects"
               v-bind:key="key">
            {{ project.name }}
          </div>
        </div>
        <div v-else>ندارد</div>
      </template>
      <template v-slot:item.city="{item}">
        {{ item.city.name }}
      </template>
      <template v-slot:item.point="{item}">
        <v-progress-circular
            :rotate="-90"
            :size="80"
            :width="15"
            :value="(item.point  / maxPoint) * 100"
            color="blue darken-1"
        >
          {{ (item.point / maxPoint) * 100 }} %
        </v-progress-circular>

      </template>
      <template v-slot:no-data>
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p>
          برای این نیازمندی خدمت پیشنهاد شده ای وحود ندارد
        </p>
      </template>
    </v-data-table>
    <!--    <div v-if="attachments">-->
    <!--      <item :item="attachment" :index="key" :maxPoint="maxPoint"-->
    <!--            v-for="(attachment , key) in attachments" v-bind:key="key"/>-->
    <!--    </div>-->

  </div>
</template>

<script>
// import Item from "./Item";
import AttachmentRepository from "../../../abstraction/repository/AttachmentRepository";

let repository = new AttachmentRepository;
export default {
  name: "Items",
  components: {},
  props: {
    requirement_id: {default: ''},
  },
  data() {
    return {
      overlay: false,
      attachments: [],
      headers: [
        {
          text: 'عنوان خدمت', value: 'title', class: "blue darken-1 white--text", align: 'center',
          divider: true,
        },
        {text: 'نام کاربر', value: 'user', class: "blue darken-1 white--text", align: 'center'},
        {text: 'شهر', value: 'city', class: "blue darken-1 white--text", align: 'center'},
        {text: 'دسته بندی', value: 'category', class: "blue darken-1 white--text", align: 'center',},
        {text: 'میزان شباهت', value: 'point', class: "blue darken-1 white--text", align: 'center',},
        {text: 'پروژه در حال انجام', value: 'projects', class: "blue darken-1 white--text", align: 'center',},
        {text: 'عملیات', value: 'actions', sortable: false, class: "blue darken-1 white--text", align: 'center',},
      ],
    }
  },
  computed: {
    maxPoint() {
      if (this.attachments)
        return this.attachments[0].point
      else
        return 0
    }
  },
  async created() {
    this.overlay = true;
    this.attachments = await repository.indexAttachmentByRequirement(this.requirement_id);
    this.overlay = false;
  }
}
</script>

<style scoped>

</style>
