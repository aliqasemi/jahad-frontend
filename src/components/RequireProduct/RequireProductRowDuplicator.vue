<template>
  <div
      style="width: 90%;margin: 5px auto; direction: rtl;font-size: 20px;background-color: #eeeeee; padding: 10px;border-radius: 5px">
    <v-text-field v-model="requireProduct.name" style="text-align: right" label="نام محصول مورد نیاز"
                  reverse></v-text-field>

    <v-text-field v-model="requireProduct.number" type="number" style="text-align: right" label="تعداد مورد نیاز"
                  reverse></v-text-field>
    <br>
    <br>
    <v-textarea v-model="requireProduct.description" height="10px" style="text-align: right" label=" توضیحات"
                reverse></v-textarea>
    <v-tooltip top>
      <template v-slot:activator="{ on , attrs}">
        <v-btn
            slot="activator"
            v-bind="attrs"
            v-on="on"
            @click="$emit('removeRequireProduct')"
        >
          <v-icon style="color: red" dark>fa-trash</v-icon>
        </v-btn>
      </template>
      <span>حذف</span>
    </v-tooltip>
  </div>
</template>

<script>

export default {
  name: "RequireProductRowDuplicator",
  props:{
    value: {
      default: () => ({
        name: null,
        description: null,
        number: null,
      }),
    },
  },
  data() {
    return {
      requireProduct: this.value,
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.requireProduct = this.value;
        this.$emit("input", this.requireProduct);
      },
    },
  },
  components: {}
}
</script>

<style scoped>
</style>
