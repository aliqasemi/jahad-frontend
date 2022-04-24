<template>
    <div>
        <v-row class="category cols-justified-right cols-pt-pb-1" style="text-align: right; direction: rtl;">
            <v-col xl="4" md="3" lg="3" sm="6" xs="12" style="margin: auto">
                <span>{{ item.name }}</span>
            </v-col>
            <v-col xl="4" md="6" lg="4" sm="12" xs="12" justify="center"
                   style="background-color: #55706D;  color:#eeeeee ;border-radius:20px; margin:auto;text-align: center">
                <span>{{ item.children_count }} زیر مجموعه</span>
            </v-col>
            <v-col xl="4" lg="4" sm="4" class="flex-justified-left">
                <v-row justify="center" style="padding: 5px; margin: 0 auto">
                    <v-tooltip top  style="text-decoration: none;margin: 5px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                slot="activator"
                                @click="editDialog = true"
                                style="background-color: lavenderblush"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                            >
                              <v-icon style="color: darkcyan" dark>fa-edit</v-icon>
                            </v-btn>
                        </template>
                        <span>ویرایش</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on,attrs }">
                            <v-btn
                                slot="activator"
                                v-bind="attrs"
                                v-on="on"
                                style="background-color: lavenderblush"
                                fab
                                small
                                @click.native="deleteDialog = true"
                            >
                              <v-icon style="color: red" dark>fa-trash</v-icon>
                            </v-btn>
                        </template>
                        <span>حذف</span>
                    </v-tooltip>
                    <v-tooltip top  style="text-decoration: none; margin: 5px">
                        <template v-slot:activator="{ on, attrs}">
                            <v-btn
                                style="background-color: lavenderblush"
                                slot="activator"
                                v-bind="attrs"
                                v-on="on"
                                fab
                                small
                                @click.native="plusDialog = true"
                            >
                              <v-icon style="color: darkgreen" dark>fa-plus</v-icon>
                            </v-btn>
                        </template>
                        <span>اضافه کردن زیر مجموعه</span>
                    </v-tooltip>
                    <delete-modal v-model="deleteDialog" @action="deleteCategory(item.id)"/>
                    <add-modal v-model="plusDialog" :parent_id="item.id"/>
                    <add-modal v-model="editDialog" :category_id="item.id"/>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import DeleteModal from "../GeneralComponent/deleteModal";
import AddModal from "./AddModal";

export default {
    name: 'Item',
    components: {AddModal, DeleteModal},
    data: () => ({
        deleteDialog: false,
        plusDialog: false,
        editDialog: false,
        id: {default: null}
    }),
    props: {
        item: {
            default: () => [],
        },
        subCategoriesCount: {default: 0},
    },
    methods: {
        ...mapActions('category', ['removeCategory', 'loadCategoryList']),
        async deleteCategory(id) {
            let response;
            response = await this.removeCategory(id);
            await this.loadCategoryList();
            if (!(response instanceof Error)) {
                this.dialog = false;
            }
        },
    }
}
</script>
<style lang="scss">
.category {
    border: 1px ;
    border-radius: 10px;
}
</style>
