import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d2d64d22 = () => interopDefault(import('..\\pages\\create.vue' /* webpackChunkName: "pages/create" */))
const _4dc7dac0 = () => interopDefault(import('..\\pages\\create-a-webinar.vue' /* webpackChunkName: "pages/create-a-webinar" */))
const _18c9d8ee = () => interopDefault(import('..\\pages\\create-an-autowebinar.vue' /* webpackChunkName: "pages/create-an-autowebinar" */))
const _a3b78b2a = () => interopDefault(import('..\\pages\\create-an-autowebinar-script-editor.vue' /* webpackChunkName: "pages/create-an-autowebinar-script-editor" */))
const _5fd3c042 = () => interopDefault(import('..\\pages\\create-an-autowebinar-script-editor\\_id.vue' /* webpackChunkName: "pages/create-an-autowebinar-script-editor/_id" */))
const _2811fa46 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _0f1b89e5 = () => interopDefault(import('..\\pages\\preview.vue' /* webpackChunkName: "pages/preview" */))
const _33cafcc5 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _6944a8d6 = () => interopDefault(import('..\\pages\\webinar-autowebinar.vue' /* webpackChunkName: "pages/webinar-autowebinar" */))
const _e55b0388 = () => interopDefault(import('..\\pages\\a\\secret\\_id.vue' /* webpackChunkName: "pages/a/secret/_id" */))
const _71dbece6 = () => interopDefault(import('..\\pages\\w\\secret\\_id.vue' /* webpackChunkName: "pages/w/secret/_id" */))
const _66d40728 = () => interopDefault(import('..\\pages\\a\\_id.vue' /* webpackChunkName: "pages/a/_id" */))
const _57cb9f60 = () => interopDefault(import('..\\pages\\edit-webinar\\_id.vue' /* webpackChunkName: "pages/edit-webinar/_id" */))
const _298c2244 = () => interopDefault(import('..\\pages\\s\\_s.vue' /* webpackChunkName: "pages/s/_s" */))
const _30265435 = () => interopDefault(import('..\\pages\\sa\\_s.vue' /* webpackChunkName: "pages/sa/_s" */))
const _6a3495d4 = () => interopDefault(import('..\\pages\\w\\_id.vue' /* webpackChunkName: "pages/w/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/create",
    component: _d2d64d22,
    name: "create"
  }, {
    path: "/create-a-webinar",
    component: _4dc7dac0,
    name: "create-a-webinar"
  }, {
    path: "/create-an-autowebinar",
    component: _18c9d8ee,
    name: "create-an-autowebinar"
  }, {
    path: "/create-an-autowebinar-script-editor",
    component: _a3b78b2a,
    name: "create-an-autowebinar-script-editor",
    children: [{
      path: ":id?",
      component: _5fd3c042,
      name: "create-an-autowebinar-script-editor-id"
    }]
  }, {
    path: "/login",
    component: _2811fa46,
    name: "login"
  }, {
    path: "/preview",
    component: _0f1b89e5,
    name: "preview"
  }, {
    path: "/test",
    component: _33cafcc5,
    name: "test"
  }, {
    path: "/webinar-autowebinar",
    component: _6944a8d6,
    name: "webinar-autowebinar"
  }, {
    path: "/a/secret/:id?",
    component: _e55b0388,
    name: "a-secret-id"
  }, {
    path: "/w/secret/:id?",
    component: _71dbece6,
    name: "w-secret-id"
  }, {
    path: "/a/:id?",
    component: _66d40728,
    name: "a-id"
  }, {
    path: "/edit-webinar/:id?",
    component: _57cb9f60,
    name: "edit-webinar-id"
  }, {
    path: "/s/:s?",
    component: _298c2244,
    name: "s-s"
  }, {
    path: "/sa/:s?",
    component: _30265435,
    name: "sa-s"
  }, {
    path: "/w/:id?",
    component: _6a3495d4,
    name: "w-id"
  }, {
    path: "/",
    component: _2811fa46,
    name: "home"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
