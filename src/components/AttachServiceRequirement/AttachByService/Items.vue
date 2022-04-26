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
        <router-link
            :to="{name:'ManageProjectAttachment',  params: { requirement_id: item.id , service_id: service_id}}"
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
                <v-icon dark>fa-tasks</v-icon>
              </v-btn>
            </template>
            <span>ایجاد پروژه</span>
          </v-tooltip>
        </router-link>
        <router-link :to="{name:'AttachByRequirement',  params: { requirement_id: item.id , attachment: false}}"
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
      <template v-slot:item.project="{item}">
        <div v-if="item.project">{{ item.project.name }}</div>
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
            color="teal"
        >
          {{ (item.point / maxPoint) * 100 }} %
        </v-progress-circular>

      </template>
      <template v-slot:no-data>
        <img height="400px" :src="require('@/images/nodatafound.gif')">
        <p>
          برای این خدمت نیازمندی پیشنهاد شده ای وحود ندارد
        </p>
      </template>
    </v-data-table>
<!--    <div v-if="attachments">-->
<!--      <item v-for="(attachment , key) in attachments" :item="attachment" v-bind:key="key" :index="key"-->
<!--            :maxPoint="maxPoint" :service_id="service_id"/>-->
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
    service_id: {default: null},
  },
  data() {
    return {
      overlay: false,
      attachments: [],
      headers: [
        {
          text: 'عنوان نیازمندی', value: 'title', class: "blue lighten-3", align: 'center',
          divider: true,
        },
        {text: 'نام کاربر', value: 'user', class: "blue lighten-3", align: 'center'},
        {text: 'شهر', value: 'city', class: "blue lighten-3", align: 'center'},
        {text: 'دسته بندی', value: 'category', class: "blue lighten-3", align: 'center',},
        {text: 'میزان شباهت', value: 'point', class: "blue lighten-3", align: 'center',},
        {text: 'پروژه در حال انجام', value: 'project', class: "blue lighten-3", align: 'center',},
        {text: 'عملیات', value: 'actions', sortable: false, class: "blue lighten-3", align: 'center',},
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
    this.attachments = await repository.indexAttachmentByService(this.service_id);
    this.overlay = false;
  }
}
</script>

<style scoped>

</style>
