<template>
  <v-app dark>
    <v-main>
<!--      <v-container>-->
        <Nuxt />
<!--      </v-container>-->
    </v-main>
    <!-- <v-footer>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style>
body {
  background: rgb(237, 238, 240) !important;
}

.v-main__wrap {
  background: rgb(237, 238, 240) !important;
}
.v-sheet.v-footer:not(.v-sheet--outlined) {
  background: white;
}
.v-application a {
  text-decoration: none;
}
.container {
  width: 90%;
  margin: 0 auto;
}

@media (min-width: 1264px) {
  .container {
    width: 100%;
    /* height: 100%; */
    margin: 0 auto;
    max-width: 100%;
    padding: 0;
  }
}
@media screen and (max-width: 769px) {
  .container {
    width: 100%;
    /* height: 100%; */
  }
}

@media screen and (max-width: 470px) {
  .container {
    padding: 0;
    /* height: 100%; */
  }
}



</style>

