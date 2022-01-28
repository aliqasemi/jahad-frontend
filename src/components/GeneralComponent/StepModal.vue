<template>
  <v-dialog
      v-model="state"
      persistent
      max-width="350"
      max-heght="500"
  >
    <v-card>
      <br>
      <v-card-text style="direction: rtl">
        <p style="font-size: 20px">
          مرحله خود را انتخاب نمایید
        </p>
        <v-row style="margin: 5px auto;" v-for="(step, key) in steps" v-bind:key="key">
          <v-btn
              v-if="step"
              outlined
              rounded
              text
              style="margin: 5px auto"
              @click="
              $emit('action', {step_id: step.id});
              state = false;
              "
          >
            {{ step.name }}
          </v-btn>
        </v-row>
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "StepModal",
  props: {
    value: {
      type: Boolean,
    },
    steps: {default: null},
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
