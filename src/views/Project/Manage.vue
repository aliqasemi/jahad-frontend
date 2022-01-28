<template>
    <div style="width: 90%;margin: 0 auto; direction: rtl">
        <div style="direction: rtl; background-color: aliceblue;border-radius: 10px">
            <v-breadcrumbs :items="items">
                <template v-slot:divider>
                    <v-icon>fa fa-chevron-left</v-icon>
                </template>
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item
                        :disabled="item.disabled"
                    >
                        <router-link :to="{name:item.routeName}" style="text-decoration: none;color:black;padding: 5px"
                                     class="bredRoute">
                           <span>
                                <v-icon>{{ item.icon }}</v-icon>  {{ item.text.toUpperCase() }}
                           </span>
                        </router-link>
                    </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>
        </div>
        <v-form @submit.prevent="registerRequest" style="margin-top: 20px">
            <div style="margin: 0 auto; direction: rtl">
                <v-row style="direction: rtl;">
                   مدیریت پروزه
                </v-row>
                <br>
                <hr style="display: block; width: 75%"/>
                <v-row>
                    <v-col lg="3">
                        <v-textarea style="text-align: right" label="توضیحات" v-model="form.description"
                                    reverse></v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn type="submit">
                            تغییرات پروژه
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-form>
    </div>
</template>

<script>
import {mapActions} from "vuex";

var defaultForm = {
    description: null,
};

export default {
    name: "Manage",
    props: {
      project_id: {default: null}
    },
    components: {
    },
    data() {
        return {
            form: {...defaultForm},
            provinces: [],
            items: [
                {
                    text: 'صفحه اصلی',
                    disabled: false,
                    routeName: "Main",
                    icon: "fa fa-home"
                },
                {
                    text: 'پروژه ها',
                    disabled: false,
                    routeName: "ListProjects",
                    icon: "fa fa-wrench"
                },
                {
                    text: 'مدیریت پروژه',
                    disabled: true,
                    routeName: "ManageProject",
                    icon: "fa fa-wrench"
                },
            ],
        }
    },
    methods: {
        ...mapActions("project", ['storeProject', 'showProject', 'updateProject']),
        async registerRequest() {
            if (this.service_id) {
                let response = await this.updateProject({data: this.form});
                if (!(response instanceof Error)) {
                    await this.$router.replace("/projects");
                }
            } else {
                let response = await this.storeProject({data: this.form});
                if (!(response instanceof Error)) {
                    await this.$router.replace("/projects");
                }
            }
        }
    },
    async created() {
        if (this.project_id) {
            this.form = await this.showService(this.project_id)
        }
    }
}
</script>

<style scoped>
.bredRoute:hover {
    background-color: cadetblue;
    color: white;
    border-radius: 10px;
    transition: 1s;
}
</style>
