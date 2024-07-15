<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="modal-event-content ">
        <div class="preview-page" :style="{...backgroundImage}">
          <div class="preview-content"> 
            <div class="preview-parent">
              <div class="preview-wrapper">
                <div class="preview">
                  <div class="player-wrapper">
                    <div class="player">
                      <div id="previewPlayer"></div>
                    </div>
                    <div id="pdfViewer" v-if="pdfUrl">
                      <vue-pdf :src="pdfUrl" :page="pageNum ? pageNum : 1" class="pdfContent"></vue-pdf>
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
                      <v-img
                        :src="broadcastData.userAvatarUrl"
                        alt="Фото не загружено"
                      ></v-img>
                    </v-avatar>
                    <div class="webinar__chat__title">
                      <div class="img">
                        <img src="../../static/svg/corona.svg" alt="">
                      </div>
                      <div class="subtitle">
                        <p class="add" style="color: black">Ведущий: <span>{{ authorName }}</span></p>
                        <p class="adds" style="color: black;margin-top: 9px;">{{ authorStatus }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="webinar__chat__guest" v-bind:class = "{'webinar__chat__guest__dark' : this.darkMode }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" v-if="this.darkMode">
                      <path fill="white" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" v-else>
                      <path fill="gray" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.54 5.54 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13zM0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20zm24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9z" />
                    </svg>
                    <!-- <p v-if="chatNumber !== 0" class="guest">Участников: {{  }}</p> -->
                    <p class="guest">Участников: 1</p>
                  </div>
                  <div class="webinar__chat__chat">
                    <div
                      v-if="sendLinks.length"
                      class="chating_links"
                    >
                      <div v-for="link in sendLinks">
                        <div ref="linkItem">
                          <NuxtLink
                            class="chating_link"
                            :to="link.msgLink"
                            :href="link.msgLink"
                            :style="{
                            'font-size': '20px', width: '100%',
                            'overflow-wrap': 'break-word', color: 'white',
                            'margin-top': '5px', 'background-color': link.colorLink
                          }" target="_blank"
                          >
                            <div style="height: 25px">
                              <img src="../../static/svg/chat_link_present-open.svg" alt="">
                            </div>
                            <div>
                              <p style="width: 100%; overflow-wrap: break-word;">
                                {{ cutString(link.nameLink, 18) }}
                              </p>
                            </div>
                            <div style="height: 23px; align-items: center">
                              <img src="../../static/svg/chat_link_arrow-circle-right-rounded.svg" alt="">
                            </div>
                          </NuxtLink>
                        </div>
                      </div>
                    </div>

                    <div class="chatting" >
                      <div v-for="item in chatItems">
                        <div class="form__author">
                          <v-avatar size="40" class="chatting_avatar" color="blue">
                          </v-avatar>
                          <div class="chatting_content">
                            <div class="chatting_content_state">
                              <p class="author__name">{{ item.username }}</p>
                              <p class="chatting_content_time" >{{ getMessageTime(item.timeshift) }}</p>
                            </div>
                            <p class="chatting_content_msg">{{ item.message }}</p>
                          </div>
                        </div>
                      </div>
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
                      <div style="display: flex; justify-content: center; align-items: center; padding-left: 5px; gap: 3px; ">
                        <button class="chat-heart" type="button" disabled="disabled">&nbsp;</button>
                        <button
                          id="id_of_button"
                          style="
                          display: inline-block;
                          background-color: white;
                          border-radius: 50%;
                          padding: 0;
                          width: 30px;
                          height: 40px;"
                          disabled="disabled"
                        >
                          <v-icon>
                            mdi-send
                          </v-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-event-footer">
        <div class="btn-group">
          <b-button @click="close" variant="outline-secondary" class="btn-cancel">Отмена</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import {BButton, BIcon } from 'bootstrap-vue'

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css'
import moment from "moment-timezone"
import VuePdf from 'vue-pdf'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapState } from 'vuex';
export default {
  name: "preview",
  components: {
    BButton, BIcon,
    VueSlider,
    VuePdf,
  },
  data () {
    return {
      flag: 1,
      broadcastData: this.$store.state.autowebinar,
      eventItems: [],
      chatItems: [],
      backgroundImage: {
        background: 'rgb(237, 238, 240)',
      },
      darkMode: false,
      sendLinks: [],
      pdfUrl: '',
      pageNum: null,
    }
  },
  props: {
    closeModal: Function,
    saveModal: Function,
  },
  methods: {
    getMessageTime(timestamp) {
        return moment(timestamp).tz('Europe/Moscow').format('HH:mm')
    },
    save() {
      this.saveModal(this.flag)
    },
    close() {
      this.closeModal()
    },
    cutString(string, length) {
      if (!string || string.length <= length) {
        return string
      }
      return string.split('').slice(0, length).join('') + '...'
    },
    operateEvent() {
      for (let i = 0; i < this.eventItems.length; i++) {
        if (this.eventItems[i].actionType === 'chat') {
          setTimeout(() => {
            this.chatItems.push(this.eventItems[i]) 
          }, this.eventItems[i].timeshift)
        } else if (this.eventItems[i].actionType === 'deleteChat') {
          setTimeout(() => {
            const popIndex = this.chatItems.findIndex(item => item.logId === this.eventItems[i].data.ID);
            this.chatItems.splice(popIndex, 1)
          }, this.eventItems[i].timeshift)
        } else if (this.eventItems[i].actionType === 'presentation') {
          setTimeout(() => {
            this.pdfUrl =  this.$config.staticURL + '/' + this.eventItems[i].data.filename
            console.log(this.pdfUrl)
          }, this.eventItems[i].timeshift)
        } else if (this.eventItems[i].actionType === 'slide') {
          setTimeout(() => {
            this.pdfUrl =  this.$config.staticURL + '/' + this.eventItems[i].data.filename
            this.pageNum = this.eventItems[i].data.slide
            console.log(this.pdfUrl)
          }, this.eventItems[i].timeshift)
        } else if (this.eventItems[i].actionType === 'presentationPos') {
          if (this.eventItems[i].data.pos === 'broadcastFullscreen') {
            document.getElementById('pdfViewer').style.display = 'none'
          } else if (this.eventItems[i].data.pos === 'presentationFullscreen') {
            document.getElementById('pdfViewer').style.display = 'block'
            document.getElementById('pdfViewer').style.width = '100%'
            document.getElementById('pdfViewer').style.height = '67vh'
            document.getElementById('pdfViewer').style.top = 0
          } else if (this.eventItems[i].data.pos === 'left-top') {
            document.getElementById('pdfViewer').style.width = '50%'
            document.getElementById('pdfViewer').style.height = '33.5vh'
            document.getElementById('pdfViewer').style.top = 0
            document.getElementById('pdfViewer').style.left = 0
          } else if (this.eventItems[i].data.pos === 'right-top') {
            document.getElementById('pdfViewer').style.width = '50%'
            document.getElementById('pdfViewer').style.height = '33.5vh'
            document.getElementById('pdfViewer').style.top = 0
            document.getElementById('pdfViewer').style.right = 0
          } else if (this.eventItems[i].data.pos === 'left-bottom') {
            document.getElementById('pdfViewer').style.width = '50%'
            document.getElementById('pdfViewer').style.height = '33.5vh'
            document.getElementById('pdfViewer').style.bottom = 0
            document.getElementById('pdfViewer').style.left = 0
          } else if (this.eventItems[i].data.pos === 'right-bottom') {
            document.getElementById('pdfViewer').style.width = '50%'
            document.getElementById('pdfViewer').style.height = '33.5vh'
            document.getElementById('pdfViewer').style.bottom = 0
            document.getElementById('pdfViewer').style.right = 0
          }
        }
      }
    },
  },
  mounted() {
    this.$axios.get(`/broadcast/getEvents?broadcastId=0`)
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
        this.operateEvent()
        return
      })
    if (this.broadcastData.backgrounds.inside.checked) { 
      var temp =this.broadcastData.backgrounds.inside.checked.substr(this.broadcastData.backgrounds.inside.checked.length - 5, 1);
      this.darkMode = temp >= 3 ?  true : false; 

      this.backgroundImage = {
        'background-image': `url('${this.$config.staticURL + '/' + this.broadcastData.backgrounds.inside.checked}')`,
        'background-size': '100% 100%'
      }
      //  'background-size': '100% auto',
    }

    let tag = document.createElement('script');
    let firstScriptTag = document.getElementsByTagName('script')[0];
    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    var player;
    const urlContext = this.broadcastData.source.split("watch?v=")
    const videoId = urlContext[urlContext.length - 1]
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('previewPlayer', {
        height: '100%',
        width: '100%',
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
  },
  computed: {
    ...mapState([
      'authorName', 'authorStatus'
    ]),
  },
}


</script>
  
<style lang="scss" scoped>

.modal_window_i {
  width: 100%;
  height: 100%;
  height: auto;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 16px;
    text-align: center;
  }
}

.modal-event-title {
  width: 100%;
}

.modal-event-footer {
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
}

.modal-event-footer .btn-group {
  position: absolute;
  right: 63px;
}

.btn-group .btn-cancel {
  display: flex;
  padding: 5px 10px;
}

.modal-event-content {
  width: 100%;
  height: 85vh;
  overflow-y: auto;
}

.modal_window_i1 {
  width: 500px;
  height: auto;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.modal__button {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 30px;
  margin-left: 15px;
}
.modal__button__yes {
  border-radius: 10px;
  background: #FE6637;
  width: 150px;
  height: 39px;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.modal__button__no {
  border-radius: 10px;
  background: #6BC432;
  width: 150px;
  height: 39px;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.modal__content {
  display: flex;
  flex-direction: row;
  margin: 30px 0;
}
.modal_window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1120;
  transition: .3s all;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}
.close_btn {
  cursor: pointer;
}

@media screen and (max-width: 470px) {
  .modal_window_i1 {
    width: 90%;
  }
  .modal__content {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

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
  height: 100%;
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
  padding: 20px;
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
  z-index: 9990;
  position: absolute;
}

#pdfViewer {
  position: absolute;
  width: 100%;
  height: 67vh;
  overflow: hidden;
  z-index: 9991;
}

.pdfContent {
  width: 100%;
  height: 100%;
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

.webinar__chat__guest__dark {
  color: white;
}

.guest {
  margin-bottom: 0;
  margin-left: 11px;
}

.webinar__chat__chat {
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 55vh;
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

.form__author {
  display: flex;
  justify-content: left;
  width: 90%;
  margin-top: 10px
}

.chatting_avatar {
  margin-right: 10px;
}

.chatting_content {
  width: 90%;
}

.chatting_content_state {
  display: flex; 
  justify-content: flex-start; 
  align-items: center;
}

.author__name {
  font-weight: 900; 
  display: inline-block; 
  margin-right: 10px;
}

.chatting_content_time {
  line-height: 10px; 
  font-size: 10px; 
  color: rgb(73,71,71);
}

.chatting_content_msg {
  width: 100%;
  overflow-wrap: break-word;
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

.chat-heart {
  width: 20px;
  height: 20px;
  right: 80px;
  z-index: 1;
  bottom: 14px;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  padding: 0;
  background: url(../../static/heart.png);
  background-size: cover;
}

</style>
  