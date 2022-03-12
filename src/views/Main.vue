<template>
  <div style="width: 90%;margin: 0 auto; direction: rtl">
    <div v-if="getLoginStatus" style="direction: rtl; background-color: rgba(13,75,118,0.83);border-radius: 10px">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>fa fa-chevron-left</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
              :disabled="item.disabled"
          >
            <router-link :to="{name:item.routeName}" style="text-decoration: none;color:yellow;padding: 5px"
                         class="bredRoute">
                           <span>
                                <v-icon>fa fa-home</v-icon>  {{ item.text.toUpperCase() }}
                           </span>
            </router-link>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <v-card
        elevation="2"
        outlined
        style="text-align: center; width: 50%;margin: 10px auto"
        v-else
    >
      <v-card-title style="display: block"> جهاد سازندگی</v-card-title>
      <v-card-subtitle>سامانه جهاد سازدنگی</v-card-subtitle>
      <v-card-actions>
        <router-link to="/login" style="margin: 0 auto">
          <v-btn outlined
                 rounded
                 text
          >ورود
          </v-btn>
        </router-link>
        <router-link to="/register" style="margin: 0 auto">
          <v-btn
              outlined
              rounded
              text
          >ثبت نام
          </v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
    <v-row v-if="getLoginStatus" style="padding: 20px">
      <v-col lg="6" style="margin-bottom: 20px">
        <router-link :to="{name:'ListServices'}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div>
                <div class="desc"> جهت مشاهده لیست خدمات و اضافه کردن خدمت درخواستی کلیک کنید</div>
                <div class="title-fa"> خدمات</div>
                <div class="title-en En Bold">
                  <div style="position: absolute;text-align: left"> services</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-cog
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
      <v-col lg="6" style="margin-bottom: 20px">
        <router-link :to="{name:'ListRequirements'}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div class="texts">
                <div class="desc"> جهت مشاهده لیست نیازمندی ها و اضافه کردن نیازمندی درخواستی کلیک کنید
                </div>
                <div class="title-fa"> نیازمندی ها</div>
                <div class="title-en">
                  <div style="position: absolute;text-align: left">Requirement</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-hand-paper-o
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
      <v-col lg="12" style="margin-bottom: 20px">
        <router-link :to="{name:'ListCategories'}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div>
                <div class="desc"> جهت مشاهده دسته بندی و بررسی آن ها کلیک کنید</div>
                <div class="title-fa"> دسته بندی</div>
                <div class="title-en">
                  <div style="position: absolute;text-align: left"> Category</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-sitemap
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
      <v-col lg="6" style="margin-bottom: 20px">
        <router-link :to="{name:'ListSteps', params:{project_id : 0}}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div>
                <div class="desc"> جهت مشاهده مراحل تعریف شده و بررسی آن ها کلیک کنید</div>
                <div class="title-fa"> مراحل</div>
                <div class="title-en">
                  <div style="position: absolute;text-align: left"> Step</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-random
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
      <v-col lg="6" style="margin-bottom: 20px">
        <router-link :to="{name:'ListProjects'}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div>
                <div class="desc"> جهت مشاهده پروژه های تعریف شده و بررسی آن ها کلیک کنید</div>
                <div class="title-fa"> پروژه ها</div>
                <div class="title-en">
                  <div style="position: absolute;text-align: left"> Project</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-cog
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
      <v-col lg="12" style="margin-bottom: 20px">
        <router-link :to="{name:'ListProducts'}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div>
                <div class="desc"> جهت مشاهده محصولات و کوجودی آن در انبار و بررسی آن ها کلیک کنید</div>
                <div class="title-fa"> محصولات و موجودی</div>
                <div class="title-en">
                  <div style="position: absolute;text-align: left">Product</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-cogs
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
      <v-col lg="6" style="margin-bottom: 20px">
        <router-link :to="{name:'ListTemplates'}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div>
                <div class="desc"> جهت مشاهده قالب های پیامکی تعریف شده و بررسی آن ها کلیک کنید</div>
                <div class="title-fa"> قالب های پیامکی</div>
                <div class="title-en">
                  <div style="position: absolute;text-align: left">Template</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-file-text-o
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
      <v-col lg="6" style="margin-bottom: 20px">
        <router-link :to="{name:'ListBranches'}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div>
                <div class="desc"> جهت مشاهده شعبه ها و بررسی آن ها کلیک کنید</div>
                <div class="title-fa">شعب</div>
                <div class="title-en">
                  <div style="position: absolute;text-align: left">Branch</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-compass
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
      <v-col lg="12" style="margin-bottom: 20px">
        <router-link :to="{name:'AttachProduct',params: {project_id: 0}}" style="text-decoration: none;color: black">
          <v-row class="flex-justified-space-between title-big">
            <div>
              <div>
                <div class="desc"> جهت اعطای محصولات از انبار مه نیازمندی های پروژه و بررسی آن ها کلیک کنید</div>
                <div class="title-fa"> اعطای محصول از انبار</div>
                <div class="title-en">
                  <div style="position: absolute;text-align: left">Product to Require Product</div>
                </div>
              </div>
            </div>
            <v-row style="direction: ltr">
              <v-icon size="75px" style="text-align: left">
                fa fa-paperclip
              </v-icon>
            </v-row>
          </v-row>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Main",
  data() {
    return {
      items: [
        {
          text: 'صفحه اصلی',
          disabled: false,
          routeName: "Main",
          icon: "fa fa-home"
        },
      ],
    }
  },
  computed: {
    ...mapGetters("user", ['getLoginStatus'])
  },
}
</script>

<style scoped type="scss">
.bredRoute:hover {
  background-color: cadetblue;
  color: white;
  border-radius: 10px;
  transition: 1s;
}

.title-big {
  border: 5px solid transparent;
  background: rgba(216, 186, 17, 0.80);
  color: #55706D;
  border-radius: 40px;
  padding: 15px 30px;
  overflow: hidden;
  width: 80%;
  transition: all 1.2s,
  border 0.5s 1.2s,
  box-shadow 0.3s 1.5s;
  white-space: nowrap;
  text-indent: 23px;
  font-weight: bold;
}

.title-big:hover {
  text-indent: 0;
  background: rgba(118, 118, 35, 0.83);
  color: white;
  width: 100%;
  border: 5px solid rgba(118, 118, 35, 0.83);
  box-shadow: 3px 3px 2px rgba(black, 0.15);
}

.title-big:hover .desc {
  display: inline-block;
  color: #eeeeee;
  transition: all 0.5s;
  transform: translateX(0);
  opacity: 1;
}

.title-big * {
  flex-shrink: 0;
}

.title-big .title-fa {
  font-size: 50px;
}

.title-big .desc {
  display: none;
  transform: translateX(300px);
  font-weight: normal;
  opacity: 0;
  transition: opacity 0.1s 0.5s,
  transform 0.4s 0.5s;
}

.title-big .title-en {
  letter-spacing: 3px;
  font-size: 20px;
  padding-bottom: 10px;
  white-space: nowrap;
  text-transform: uppercase;
  color: rgba(13, 75, 118, 0.70);
  opacity: 0.1;
}

.title-big .title-en .text {
  position: absolute;
  left: 0px;
  bottom: 0px;
}

.back-icon-sm i {
  display: none;
  font-size: 25px;
}
</style>
