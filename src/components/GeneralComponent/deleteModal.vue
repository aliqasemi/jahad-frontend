<template>
  <v-dialog
      v-model="state"
      persistent
      :retain-focus="false"
      max-width="600"
  >
    <v-card style="direction: rtl">
      <div style="background-color: whitesmoke; padding: 20px; border-radius: 10px">
        <v-row style="direction: rtl;margin-top: 10px;color:  #1976D2;  letter-spacing: 3px;">
          مدیریت آیتم
        </v-row>
        <br>
        <div class="title-en">
          <div
              style="position: absolute;text-align: left; background-color: #1976D2; color: #eeeeee; border-radius: 10px;padding: 7px;">
            Manage Item
          </div>
        </div>
        <hr style="display: block; width: 100%"/>
        <br>
        <v-card-text style="direction: rtl">
          {{label }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="state = false"
          >
            خیر
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="$emit('action')"
          >
            بله
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
    label: {default: 'آیا از حذف کردن ایتم خود اطمینان دارید?'},
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
