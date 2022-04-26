import Login from "../views/Login";
import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main";
import {isAuthenticated, isGuest} from "./AuthenticateRoute";
import Profile from "../views/Profile";
import Register from "../views/Register";
import Category from "../views/Category/Category";
import Services from "../views/Service/Services";
import AddService from "../views/Service/Add";
import Requirements from "../views/Requirement/Requirements";
import AddRequirement from "../views/Requirement/Add";
import AttachByRequirement from "../views/Attachment/AttachByRequirement";
import AttachByService from "../views/Attachment/AttachByService";
import AddStep from "../views/Step/Add";
import Steps from "@/views/Step/Steps";
import Projects from "@/views/Project/Projects";
import ManageProject from "@/views/Project/Manage";
import AddTemplate from "../views/MessageTemplate/Add";
import Templates from "@/views/MessageTemplate/Templates";
import Products from "@/views/Product/Products";
import AddProduct from "@/views/Product/Add";
import Branches from "@/views/Branch/Branches";
import AddBranch from "@/views/Branch/Add";
import AttachProduct from "@/views/AttachProduct/AttachProduct";
import ForgotPassword from "@/views/ForgotPassword";
import ResetPassword from "@/views/ResetPassword";
import Users from "@/views/User/Users";
import EditUser from "@/views/User/Edit";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        name: "Main",
    },
    {
        path: '/login',
        component: Login,
        name: "Login",
        beforeEnter: isGuest,
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
        name: "ForgotPassword",
        beforeEnter: isGuest,
    },
    {
        path: '/reset-password',
        component: ResetPassword,
        name: "ResetPassword",
        beforeEnter: isAuthenticated,
    },
    {
        path: '/register',
        component: Register,
        name: "register",
        props: true,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/users',
        name: 'ListUsers',
        component: Users,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/users/:user_id',
        name: 'EditUser',
        component: EditUser,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //categories
    {
        path: '/categories',
        name: 'ListCategories',
        component: Category,
        beforeEnter: isAuthenticated,
    },
    //services
    {
        path: '/services',
        name: 'ListServices',
        component: Services,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/services/add',
        name: 'AddService',
        component: AddService,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/services/edit/:service_id',
        name: 'EditService',
        component: AddService,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //requirement
    {
        path: '/requirements',
        name: 'ListRequirements',
        component: Requirements,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/requirements/add',
        name: 'AddRequirement',
        component: AddRequirement,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/requirements/edit/:requirement_id',
        name: 'EditRequirement',
        component: AddRequirement,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //attachment
    {
        path: '/attachment/requirement/:requirement_id',
        name: 'AttachByRequirement',
        component: AttachByRequirement,
        beforeEnter: isAuthenticated,
        props: true,
    },
    {
        path: '/attachment/service/:service_id',
        name: 'AttachByService',
        component: AttachByService,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //step
    {
        path: '/steps/project/:project_id',
        name: 'ListSteps',
        component: Steps,
        beforeEnter: isAuthenticated,
        props: true,
    },
    {
        path: '/steps/add/project/:project_id',
        name: 'AddStep',
        component: AddStep,
        beforeEnter: isAuthenticated,
        props: true,
    },
    {
        path: '/steps/edit/:step_id',
        name: 'EditStep',
        component: AddStep,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //project
    {
        path: '/projects',
        name: 'ListProjects',
        component: Projects,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/projects/management/:project_id',
        name: 'ManageProject',
        component: ManageProject,
        beforeEnter: isAuthenticated,
        props: true,
    },
    {
        path: '/projects/management/requirement/:requirement_id/service/:service_id',
        name: 'ManageProjectAttachment',
        component: ManageProject,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //message template
    {
        path: '/templates',
        name: 'ListTemplates',
        component: Templates,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/templates/add',
        name: 'AddTemplate',
        component: AddTemplate,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/templates/edit/:template_id',
        name: 'EditTemplate',
        component: AddTemplate,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //product
    {
        path: '/products',
        name: 'ListProducts',
        component: Products,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/products/add',
        name: 'AddProduct',
        component: AddProduct,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/products/edit/:product_id',
        name: 'EditProduct',
        component: AddProduct,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //branch
    {
        path: '/branches',
        name: 'ListBranches',
        component: Branches,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/branches/add',
        name: 'AddBranch',
        component: AddBranch,
        beforeEnter: isAuthenticated,
    },
    {
        path: '/branches/edit/:branch_id',
        name: 'EditBranch',
        component: AddBranch,
        beforeEnter: isAuthenticated,
        props: true,
    },
    //attach product
    {
        path: '/attach-product/:project_id',
        name: 'AttachProduct',
        component: AttachProduct,
        beforeEnter: isAuthenticated,
        props: true,
    },

];

export const router = new VueRouter({
    routes,
})
