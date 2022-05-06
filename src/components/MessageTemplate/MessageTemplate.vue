<template>
  <div>
    <v-row>
      <v-col xl="5" lg="5" md="12" sm="12" xs="12">
        <variables-table @click="addVar" :commonVariables="variables"/>
      </v-col>
      <v-col xl="5" lg="5" md="12" sm="12" xs="12" style="margin: 60px auto;">
        <v-textarea
            style="text-align: right"
            reverse
            ref="message_textarea"
            v-model="message"
            label="محتوای پیامکی خود را وارد نمایید"
        >
        </v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import VariablesTable from "@/components/MessageTemplate/VariablesTable";

export default {
  name: "MessageTemplate",
  props: {
    value: {default: ""},
    isDisabled: {type: Boolean, default: false},
    init: {default: null},
    variables: [],
  },
  data() {
    return {
      // variables: [
      //   {
      //     title: "نام نیازمند",
      //     value: " {requirement_user_firstname} ",
      //   },
      //   {
      //     title: "نام خانوادگی نیازمند",
      //     value: " {requirement_user_lastname} ",
      //   },
      //   {
      //     title: "نام خدمت دهنده",
      //     value: " {service_user_firstname} ",
      //   },
      //   {
      //     title: "نام خانوادگی خدمت دهنده",
      //     value: " {service_user_lastname} ",
      //   },
      //   {
      //     title: "نام مرحله",
      //     value: " {step_name} ",
      //   },
      //   {
      //     title: "نام نیازمندی",
      //     value: " {requirement_name} ",
      //   },
      //   {
      //     title: "نام سرویس",
      //     value: " {service_name} ",
      //   },
      //   {
      //     title: "نام دسته بندی",
      //     value: " {category_name} ",
      //   },
      // ],
    }
  },
  components: {
    VariablesTable
  },
  computed: {
    message: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    addVar(value) {
      if (this.isDisabled) {
        return;
      }
      let textarea = this.$refs.message_textarea;
      const startPos = textarea.$el.querySelector("textarea").selectionStart;
      const endPos = textarea.$el.querySelector("textarea").selectionEnd;
      this.message =
          this.message.substring(0, startPos) +
          value +
          this.message.substring(endPos, this.message.length);
      textarea.$el.querySelector("textarea").focus();
    },
  },
}
</script>

<style scoped>

</style>