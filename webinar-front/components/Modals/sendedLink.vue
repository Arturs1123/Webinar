<template>
  <div class="sended_link__container">
    <div class="sended_link__icon">
      <img src="../../static/svg/sended-link-icon.svg" alt="">
    </div>
    <div style="margin-right: 20px">
      <div>
        <span class="sended_link__name">
          {{ cutString(link?.user?.name, 22) }}
        </span>
      </div>
      <NuxtLink
        is="a"
        :to="link?.msg"
        :href="link?.msg"
        style="color: rgba(42, 88, 133, 1)"
        target="_blank"
        @click="emitAddAction"
      >
        <div class="sended_link__msg_container">
          <span class="sended_link__msg">
            {{ link?.msg }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sendedLink',
    props: {
      link: Object,
    },
    methods: {
      emitAddAction() {
        this.$emit('add-action', JSON.stringify({
          type: 'clickLink',
        }))
      },
      cutString(string, length) {
        if (!string || string.length <= length) {
          return string
        }
        return string.split('').slice(0, length).join('') + '...'
      }
    }
  }
</script>

<style>
p {
  margin-bottom: 0;
}
.sended_link__container {
  min-width: 425px;
  height: 130px;
  border-radius: 10px;
  background-color: white;
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  z-index: 1000;
  bottom: -5%;
  left: calc(50% - 213px);
}

.sended_link__icon {
  width: 75px;
  height: 90px;
  margin-left: 20px;
  margin-right: 20px;
}

.sended_link__name {
  color: black;
  font-size: 22px;
}

.sended_link__msg_container {
  border-radius: 5px;
  background-color: rgba(107, 196, 50, 1);
  padding: 5px 10px 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sended_link__msg {
  color: white;
  text-decoration: underline;
  margin-bottom: 0px;
}
</style>
