<template>
  <v-expansion-panels flat>
    <v-expansion-panel v-for="(item, i) in items" :key="i"
                       style="background: whitesmoke;padding: 5px">
      <v-expansion-panel-header expand-icon="WMi-down-open" style="background-color: #42A5F5;color: white">
        <slot :item="item" :subCategoriesCount="getSubCategoriesCount(item)" :index="i"></slot>
        <template v-slot:actions>
          <v-icon color="warning">
            fa fa-level-down
          </v-icon>
          <v-icon color="warning">
            fa fa-superpowers
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content v-if="listView === 'tree'">
        <recursive-panels :parentId="item.id" :list-view="listView" :items="item.children">
          <template v-slot:default="{ item, subCategoriesCount, index }">
            <slot :item="item" :subCategoriesCount="subCategoriesCount" :index="index"></slot>
          </template>
        </recursive-panels>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: "recursivePanels",
  props: {
    parentId: {
      default: null,
    },
    items: {
      default: () => [],
    },
    listView: {
      default: "tree",
    },
  },
  methods: {
    getSubCategoriesCount(item) {
      return this.items.filter((x) => x.parent_id === item.id).length;
    },
  },
};
</script>
<style lang="scss">
.v-expansion-panel-header {
  margin-top: 12px !important;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  transition: 0.2s;
  background: #AED6D1;
}

.v-expansion-panel-header:hover {
  border: 1px solid #000;
  background: #55706D;
}
</style>
