<template>
  <v-row
      style="width: 80%;margin: 5px auto; direction: rtl;font-size: 20px;background-color: #d6d6d6; padding: 10px;border-radius: 5px">
    <v-col xl="6" lg="6" md="6" sm="12" xs="12">
      <v-text-field v-model="requireProduct.name" style="text-align: right" label="نام محصول مورد نیاز"
                    reverse></v-text-field>
    </v-col>

    <v-col xl="6" lg="6" md="6" sm="12" xs="12">
      <v-text-field v-model="requireProduct.number" type="number" style="text-align: right" label="تعداد مورد نیاز"
                    reverse></v-text-field>
    </v-col>
    <v-col xl="8" lg="8" md="8" sm="12" xs="12">
      <br>
      <v-textarea v-model="requireProduct.description" height="10px" style="text-align: right" label=" توضیحات"
                  reverse></v-textarea>
    </v-col>

    <v-col xl="8" lg="8" md="8" sm="12" xs="12">
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
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: "RequireProductRowDuplicator",
  props: {
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
