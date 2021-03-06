import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" }
      }
    ]
  },

  /*{
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "Example", icon: "example" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "Table", icon: "table" }
      }
    ]
  },*/
];


export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/basic',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '证书管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'basic',
        component: () => import('@/views/permission/basic'),
        name: 'PagePermission',
        meta: {
          title: '基本命令',
          //roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'apply',
        component: () => import('@/views/permission/apply'),
        name: 'DirectivePermission',
        meta: {
          title: '申请证书'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/u2f',
    component: Layout,
    alwaysShow: true,
    redirect:'/u2f/show',
    meta: {
      title: 'u2f设备管理',
      icon: 'skill',
      roles: ['admin','editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'show',
        component: () => import('@/views/u2f/show'),
        name: 'U2f',
        meta: { title: '设备演示', noCache: false }
      }
    ]
  },
  {
    path: '/faces',
    component: Layout,
    alwaysShow: true,
    redirect:'/faces/recog',
    meta: {
      title: '人脸相关',
      icon: 'peoples',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'recog',
        component: () => import('@/views/faces/recognition'),
        name: 'Recog',
        meta: { title: '人脸识别', noCache: false }
      },
      {
        path: 'compare',
        component: () => import('@/views/faces/compare'),
        name: 'Compare',
        meta: { title: '人脸比对', noCache: false }
      },
      {
        path: 'camera',
        component: () => import('@/views/faces/camera'),
        name: 'Camera',
        meta: { title: '摄像头', noCache: false }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
