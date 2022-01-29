<template>
  <v-col xl="12 pa-0">
    <v-row
        :class="
        `section-bordered certificate-variables ma-0 mt-2 pa-2 cols-justified-right`
      "
    >
      <v-col lg="2" md="2" mt-3 class="RTL">
        <v-card-text
        >
          متغیرها
        </v-card-text>
      </v-col>
      <v-col>
        <div
            class="content pa-1 ma-2"
            @click="$emit('click', commonVariable.value)"
            v-for="(commonVariable, i) in commonVariables"
            :key="i"
        >
          <div>{{ commonVariable.title }}</div>
          <div>{{ commonVariable.value }}</div>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
export default {
  name: "VariablesTable",
  components: {},
  props: {
    commonVariables: {default: ""},
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.certificate-variables {
}

.certificate-variables .content {
  border-radius: 5px;
  border: 1px solid #d6d6d6;
  padding: 4px 12px;
  cursor: pointer;
  transition: 0.2s cubic-bezier(1, 0, 0.2, 1);
  background: linear-gradient(to right, #eeeeee 50%, #32cad5 50%);
  background-size: 200% 100%;
  background-position: left bottom;
}

.certificate-variables .label {
  color: #000;
  font-size: 14px;
  text-align: right;
  transition: 0.2s cubic-bezier(1, 0, 0.2, 1);
  white-space: nowrap;
}

.certificate-variables .value {
  color: #96989a;
  font-size: 12px;
  text-align: right;
  direction: ltr;
  transition: 0.2s cubic-bezier(1, 0, 0.2, 1);
  margin-top: -5px;
}

/*----------------------------Hover State----------------------------------*/
.certificate-variables .content:hover {
  background-position: right bottom;
}

.certificate-variables .content:hover .label {
  color: #fff;
}

.certificate-variables .content:hover .value {
  color: #fff;
}
</style>
