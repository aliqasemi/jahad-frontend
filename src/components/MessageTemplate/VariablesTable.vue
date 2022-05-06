<template>
  <v-col xl="12 pa-0">
    <v-row
        :class="
        `section-bordered template-variables mr-1 pr-2 cols-justified-right`
      "
    >
      <v-col lg="12" md="12" mt-3 class="RTL">
        <v-card-text
        >
          <v-row
              style="direction: rtl;margin-top: 10px;color:   #1565C0;  letter-spacing: 3px;">
            {{ title }}
          </v-row>
          <br>
          <div class="title-en">
            <div
                style="position: absolute;text-align: left; background-color:  #1565C0; color: #eeeeee; border-radius: 10px;padding: 7px;">
              {{ title_en }}
            </div>
          </div>
          <hr style="display: block; width: 100%"/>
        </v-card-text>
      </v-col>
      <v-row style="background-color: #eeeeee; margin-top: 10px;border-radius: 10px">
        <div
            class="content pa-1 ma-2 blue darken-1"
            @click="$emit('click', commonVariable.value)"
            v-for="(commonVariable, i) in commonVariables"
            :key="i"
        >
          <div>{{ commonVariable.title }}</div>
          <hr/>
          <div>{{ commonVariable.value }}</div>
        </div>
      </v-row>
    </v-row>
  </v-col>
</template>
<script>
export default {
  name: "VariablesTable",
  components: {},
  props: {
    title: {default: 'متغیر ها'},
    title_en: {default: 'variables'},
    commonVariables: {default: ""},
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.template-variables {
}

.template-variables .content {
  border-radius: 5px;
  border: 1px solid #d6d6d6;
  padding: 4px 12px;
  cursor: pointer;
  color: white;
  transition: 0.2s cubic-bezier(1, 0, 0.2, 1);
  background: linear-gradient(to right, #1976D2 50%, #1565C0 50%);
  background-size: 200% 100%;
  background-position: left bottom;
}

.template-variables .label {
  color: #000;
  font-size: 14px;
  text-align: right;
  transition: 0.2s cubic-bezier(1, 0, 0.2, 1);
  white-space: nowrap;
}

.template-variables .value {
  color: #96989a;
  font-size: 12px;
  text-align: right;
  direction: ltr;
  transition: 0.2s cubic-bezier(1, 0, 0.2, 1);
  margin-top: -5px;
}

/*----------------------------Hover State----------------------------------*/
.template-variables .content:hover {
  background-position: right bottom;
}

.template-variables .content:hover .label {
  color: #fff;
}

.template-variables .content:hover .value {
  color: #fff;
}

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
