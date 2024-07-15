<template>
  <div class="preview-page">
    <div class="preview-content"> 
      <div class="preview-parent">
        <div class="preview-wrapper">
          <div class="preview">
            <div class="player-wrapper">
              <div class="player">
                <div id="previewPlayer"></div>
              </div>
              <!-- <div v-if="isCenterLink" class="room_action_notification__container">
                <div class="action_notification__icon">
                  <img src="../static/svg/action-click-link-icon.svg" alt="">
                </div>
                <div style="margin-right: 20px">
                  <div>
                  <span class="action_notification__name">
                  </span>
                  </div>
                  <div class="action_notification__msg_container">
                    <span class="action_notification__msg" >
                    </span>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="chat">
            <div class="webinar__chat__user">
              <v-avatar size="70">
                <!-- <v-img
                  :src="authorAvatar"
                  alt="Фото не загружено"
                ></v-img> -->
              </v-avatar>
              <div class="webinar__chat__title">
                <div class="img">
                  <img src="../static/svg/corona.svg" alt="">
                </div>
                <div class="subtitle">
                  <p class="add" style="color: black">Ведущий: <span>{{  }}</span></p>
                  <p class="adds" style="color: black;margin-top: 9px;">{{  }}</p>
                </div>
              </div>
            </div>
            <div class="webinar__chat__guest">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" v-if="this.darkMode">
                <path fill="white" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z" />
              </svg> -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                <path fill="gray" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z" />
              </svg>
              <!-- <p v-if="chatNumber !== 0" class="guest">Участников: {{  }}</p> -->
              <!-- <p v-else class="guest">Участников: 0</p> -->
            </div>
            <div class="webinar__chat__chat">
              <!-- <div
                v-if="sendLinks.length"
                class="chating_links"
              >
                <div v-for="link in sendLinks">
                  <div
                    ref="linkItem"
                    @click="addActionWS({
                      type: 'clickLink',
                      msg: link.msgLink,
                    })"
                  >
                    <NuxtLink
                      class="chating_link"
                      is="a"
                      :to="link.msgLink"
                      :href="link.msgLink"
                      :style="{
                      'font-size': '20px', width: '100%',
                      'overflow-wrap': 'break-word', color: 'white',
                      'margin-top': '5px', 'background-color': link.colorLink
                    }" target="_blank"
                    >
                      <div style="height: 25px">
                        <img src="../static/svg/chat_link_present-open.svg" alt="">
                      </div>
                      <div>
                        <p style="width: 100%; overflow-wrap: break-word;">
                          {{ cutString(link.nameLink, 18) }}
                        </p>
                      </div>
                      <div style="height: 23px; align-items: center">
                        <img src="../static/svg/chat_link_arrow-circle-right-rounded.svg" alt="">
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div> -->

              <div class="chatting" >

              </div>
              <div class="chatting_action">
                <input
                  class="chat_input"
                  :style="{
                    'max-width': '87%', 
                    'margin-left': '5px',
                    display: 'inline-block',
                    outline: 'none',
                  }"
                  type="text"
                  clearable
                  :placeholder="'Чат заблокирован'"
                  disabled="'disabled'"
                ></input>
                <!-- <div style="display: flex; justify-content: center; align-items: center; padding-left: 5px; gap: 3px; ">
                  <button @click="onHeart" class="chat-heart" type="button" 
                                                :disabled="iBanned || isBlockChat">&nbsp;</button>
                  <button
                    id="id_of_button"
                    @click="sendMsg"
                    style="
                    display: inline-block;
                    background-color: white;
                    border-radius: 50%;
                    padding: 0;
                    width: 30px;
                    height: 40px;
                  "
                    :disabled="iBanned || isBlockChat"
                  >
                    <v-icon>
                      mdi-send
                    </v-icon>
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preview',
  data() {
    return {
      broadcastData: this.$store.state.autowebinar,
      eventItems: null,
      chat: null,
    }
  },
  mounted() {
    console.log("Load")
    let tag = document.createElement('script');
    let firstScriptTag = document.getElementsByTagName('script')[0];
    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    var player;
    const urlContext = this.broadcastData.source.split("watch?v=")
    const videoId = urlContext[urlContext.length - 1]
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('previewPlayer', {
        height: '390',
        width: '640',
        videoId: videoId,
        playerVars: {
          'playsinline': 1
        },
        events: {
          'onReady': onPlayerReady
        }
      });
    }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        console.log(event)
        event.target.playVideo();
      }

    // window.onYouTubeIframeAPIReady = function () {
    //   this.readyYT = true
    // }.bind(this)
  },
  methods: {
    async initData() {
      await this.$axios.get(`/broadcast/getEvents?broadcastId=0`)
        .then(data => {
          this.eventItems = data.data
          try {
            this.eventItems.map((event) => {
              let item = null
              const json_data = event.data
              if(json_data != null && json_data != '') {
                item = JSON.parse(json_data)
                if(item.slide == undefined) item.slide = 0
                else item.slide = Number(item.slide)
              }
              event.data = item
              return event
            })
          } catch (error) {
            console.log(error)
          }
          return
        })
    }
  }
}
</script>

<style scoped>

.is-firefox * { 
  scrollbar-width: thin;
  scrollbar-color: rgba(226, 226, 226, 0.35) rgba(46, 27, 11, 1); 
}

/* Style the scrollbar track (background) */
::-webkit-scrollbar {
  width: 5px;
  background: #000;
}

/* Style the scrollbar handle */
::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #fff;
}

.preview-page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.preview-content {
  width: 100%;
  background-size: cover;
}

.preview-parent {
  width: 100%;
  padding: 20px 50px 0 30px;
}

.preview-wrapper {
  display: grid; 
  grid-template-columns: 2fr 1fr; 
  grid-column-gap: 20px; 
  padding: 10px; 
  height: 100%;
}

.preview {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.player-wrapper {
  height: 67vh; 
  position: relative;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.5);
}

.player {
  width: 100%; 
  height: 67vh;
  position: absolute;
}

.chat {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
}

.webinar__chat__user {
  display: flex;
  border-radius: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  color: wheat;
}

.webinar__chat__title {
  display: flex;
  margin-left: 10px;
}

.subtitle {
  margin-left: 10px;
}

.subtitle > button {
  width: 209px;
  height: 39px;
  background: #FF5C00;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #FFFFFF;
  margin-top: 35px;
}

.add {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: black;
}

.adds {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: black;
  right: 30px;
  position: relative;
}

.webinar__chat__guest {
  height: 7%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: black;
}

.webinar__chat__chat {
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 65vh;
  position: relative;
}

.chatting {
  padding-right: 5px;
  min-height: auto;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
}

.chatting_action {
  margin-top: 5px; 
  border: 1px solid #818C99; 
  background-color: white; 
  border-radius: 10px; 
  display: flex; 
  align-items: center; 
  justify-content: space-between;
}

</style>