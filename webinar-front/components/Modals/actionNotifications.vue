<template>
  <div class="action_notification__pull">
    <div v-for="action in actions" class="action_notification__container">
      <div class="action_notification__icon">
        <img src="../../static/svg/action-click-link-icon.svg" alt="">
      </div>
      <div style="margin-right: 20px">
        <div>
        <span class="action_notification__name">
          {{ cutString(action?.username, 19) }}
        </span>
        </div>
        <div class="action_notification__msg_container">
          <span v-if="action?.type === 'clickLink'" class="action_notification__msg">
            {{ cutString(actionTypes[action?.type].split(' ').slice(0, 2).join(' '), 39) }}
            <NuxtLink
              is="a"
              :to="action?.msg"
              :href="action?.msg"
              target="_blank"
            >
              {{ actionTypes[action?.type].split(' ').slice(2).join(' ') }}
            </NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'actionNotifications',
  props: {
    actions: Array,
    actionsEmitter: Object,
  },
  data() {
    return {
      actionTypes: {
        clickLink: 'кликает по ссылке'
      }
    }
  },
  methods: {
    cutString(string, length) {
      if (!string || string.length <= length) {
        return string
      }
      return string.split('').slice(0, length).join('') + '...'
    },
  },
  mounted() {
    setInterval(() => {
      this.actions.forEach((action, i) => {
        let count = action.count;
        if (!count) {
          count = 1
        } else {
          count = count + 1
        }
        action.count = count
        if (count >= 3) {
          this.actions.splice(i, 1)
        }
      })
    }, 1000)
  },
}
</script>

<style>
.action_notification__pull {
  max-height: 420px;
  width: 280px;
  position: absolute;
  z-index: 1001;
  bottom: 63px;
  right: -14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden;
}
.action_notification__container {
  width: 277px;
  height: 84px;
  background-image: url("../../static/svg/link-action-notification.svg");
  padding: 20px 0 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.action_notification__icon {
  width: 47px;
  height: 55px;
  margin-left: 20px;
  margin-right: 10px;
}

.action_notification__name {
  color: black;
  font-size: 18px;
}

.action_notification__msg_container {
  /* border-radius: 5px;
  background-color: rgba(107, 196, 50, 1);
  padding: 5px 10px 5px 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.action_notification__msg {
  color: black;
  margin-bottom: 0px;
  word-wrap: break-word;
}
</style>
