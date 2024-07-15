import colors from 'vuetify/es5/util/colors'
import dotenv from 'dotenv'

dotenv.config()

export default {
    server: {
        host: "0.0.0.0",
        port: 5002
    },
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    env: process.env,
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - Nearby',
        title: 'Вебинары, автовебинары',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    router: {
      extendRoutes(routes, resolve) {
        routes.push({
          name: 'home',
          path: '/',
          component: resolve(__dirname, 'pages/login.vue')
        });
      }
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/persistedstate.js', ssr: false },
      ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        '@nuxtjs/moment',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/toast',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.BASE_URL + '/' + process.env.SERVICE_URL,
        staticURL: process.env.STATIC_URL
    },
    publicRuntimeConfig: {
        staticURL: process.env.STATIC_URL
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    toast: {
        position: 'bottom-right',
        duration: 2_000,
        register: [ // Register custom toasts
          {
            name: 'my-error',
            message: 'Oops...Something went wrong',
            options: {
              type: 'error'
            }
          }
        ]
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: null,
    }
}
