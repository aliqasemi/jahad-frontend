<template>
  <v-dialog
      v-model="state"
      persistent :retain-focus="false"
      max-width="600"
  >
    <v-card style="direction: rtl">
      <div style="background-color: whitesmoke; padding: 20px; border-radius: 10px">
        <v-row style="direction: rtl;margin-top: 10px;color:  rgba(13,75,118,0.83);  letter-spacing: 3px;">
          مدیریت سطح دسترسی
        </v-row>
        <br>
        <div class="title-en">
          <div
              style="position: absolute;text-align: left; background-color: rgba(13,75,118,0.83); color: #eeeeee; border-radius: 10px;padding: 7px;">
            Manage Authorization
          </div>
        </div>
        <hr style="display: block; width: 100%"/>
        <br>
        <v-card-subtitle style="direction: rtl;">
          {{ label }}
        </v-card-subtitle>
        <v-card-text >
          <v-list style="background-color: whitesmoke">
            <v-list-item-group
                v-model="model"
                mandatory
                color="indigo"
            >
              <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content style="text-align: right">
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="state = false"
          >
            بستن
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="$emit('action', items[model].value)"
          >
            تایید
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "deleteModal",
  props: {
    value: {
      type: Boolean,
    },
    label: {default: 'دسترسی کاربر را تعیین کنید'},
  },
  data() {
    return {
      items: [
        {
          icon: 'fa fa-users',
          text: 'کاربر معمولی',
          value: 'user'
        },
        {
          icon: 'fa fa-cog',
          text: 'مدیر',
          value: 'admin'
        },
        {
          icon: 'fa fa-cogs',
          text: 'مدیر کل',
          value: 'superAdmin'
        },
      ],
      model: 'user',
    }
  },
  computed: {
    state: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
}
</script>

<style scoped>
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
