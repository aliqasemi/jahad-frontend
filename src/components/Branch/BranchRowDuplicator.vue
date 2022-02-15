<template>
  <div
      style="width: 90%;margin: 5px auto; direction: rtl;font-size: 20px;background-color: white; padding: 10px;border-radius: 5px">
    <branch-search v-model="branches.branch_id" />
    <v-text-field v-model="branches.stock" type="number" style="text-align: right" label="مقدار موجودی"
                  reverse></v-text-field>
    <br>
    <br>
    <v-textarea v-model="branches.description" type="number" height="10px" style="text-align: right" label=" توضیحات"
                reverse></v-textarea>
    <v-tooltip top>
      <template v-slot:activator="{ on , attrs}">
        <v-btn
            slot="activator"
            v-bind="attrs"
            v-on="on"
            @click="$emit('removeBranch')"
        >
          <v-icon style="color: red" dark>fa-trash</v-icon>
        </v-btn>
      </template>
      <span>حذف</span>
    </v-tooltip>
  </div>
</template>

<script>
import BranchSearch from "@/components/Branch/BranchSearch";

export default {
  name: "Branches",
  props:{
    value: {
      default: () => ({
        branch_id: null,
        description: null,
        stock: null,
      }),
    },
  },
  data() {
    return {
      branches: this.value,
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
        {
          text: 'شعبه ها',
          disabled: true,
          routeName: "ListBranches",
          icon: "fa fa-wrench"
        },
      ]
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.branches = this.value;
        this.$emit("input", this.branches);
      },
    },
  },
  components: {BranchSearch}
}
</script>

<style scoped>
</style>
