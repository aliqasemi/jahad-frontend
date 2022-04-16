<template>
  <v-dialog
      v-model="state"
      persistent
      max-width="290"
  >
    <v-card>
      <br>
      <v-card-subtitle style="direction: rtl">
        {{ label }}
      </v-card-subtitle>
      <v-card-text>
        <v-list>
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

</style>
