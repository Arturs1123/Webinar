<template>
  <div>
    <Header />
    <div class="main__content">
      <div class="content__sidebar__menu">
        <SidebarMenu/>
      </div>
      <div class="content__createwebinar">
        <div class="webinar__autowebinar">
            <div class="webinar__autowebinar__image">
              <img src="../static/svg/autowebinar.svg" alt="">
            </div>
            <div class="webinar__autowebinar__title">
              <p class="webinar__title" @click="goToAutowebinarEditor">{{autowebinarTitle}}</p>
              <div class="pencil_square_wrapper">
                <img class="pencil__square" src="../static/svg/heroicons_pencil-square.svg" alt="" @click="goToAutowebinarEditor">
                <p class="update__webinar__title" @click="goToAutowebinarEditor">Редактировать автовебинар</p> 
            </div>
            </div>
            <div class="hamburger__mobile">
              <img src="../static/svg/charm_menu-hamburger.svg" alt="">
            </div>
        </div>
        <div class="content__createwebinar__option">
          <div class="option__wrapper">
            <div class="content__createwebinar__option__blocks">
              <div class="block__option">
                <div class="block__option__choice">
                  <p class="block__option__choice__p">Выбрано: <span>{{nSelected}}</span></p>
                  <p class="block__option__choice__reset" @click="clearChecked">Сбросить</p>
                </div>
                <div class="block__option__buttons">
                  <div class="buttons__link">
                    <button @click="showLinkEvent">{{ strLinkFilter }}</button>
                  </div>
                  <div class="buttons__events">
                    <button @click="openAddEventModal"><img src="../static/svg/add-events.svg" alt=""><p>Добавить событие</p></button>
                    <button @click="openDeleteCheckedItemModal" :class="isChecked ? 'active-btn' : ''"><img src="../static/svg/delete-events.svg" alt=""><p>Удалить</p></button>
                  </div>
                  <div class="buttons__events">
                    <button @click="openSelectIntervalModal"><img src="../static/svg/interval.svg" alt=""><p>Выделить интервал</p></button>
                    <button @click="openPointMoveModal"><img src="../static/svg/mdi_cursor-move.svg" alt=""><p>Переместить в точку</p></button>
                    <button @click="clearChecked"><img src="../static/svg/reset-hard.svg" alt=""><p>Сбросить выделения</p></button>
                    <button @click="previewEvent"><img src="../static/svg/view-scene.svg" alt=""><p>Просмотр сценария</p></button>
                  </div>
                  <div class="buttons__events">
                    <button @click="importFile"><img src="../static/svg/file-import.svg" alt=""><p>Импорт сценария</p></button>
                    <button @click="exportFile"><img src="../static/svg/file-export.svg" alt=""><p>Экспорт сценария</p></button>
                    <v-file-input
                      style="display: none;"
                      id="importFile"
                      v-model="importFileModel"
                      @change="changeFile"
                    > </v-file-input>
                  </div>
                  <div class="buttons__events clear">
                    <button @click="openClearScriptModal"  class="clear__button" style="justify-content: center"><img src="../static/svg/clear.svg" alt=""><p>Очистить сценарий</p></button>
                  </div>
                </div>
              </div>
              <div class="block__update">
                <!-- <div class="block__pagination">
                    <button>1-6</button>
                </div> -->
                <div v-if="noData" style="padding-top: 150px">
                  Нет данных для отображения.
                </div>
                <div v-for="(eventItem, index) in eventItems" class="row-event event__wrapper" :ref="'rowEvent_' + index" @click="clickEventRow(index)">
                  <div class="event-check">
                    <img src="../static/svg/green-check.svg" alt="" style="width: 15px; height: 15px; ">
                    <span>Выбрано</span>
                  </div>
                  <div class="event__editor__comments">
                    <div class="event__editor__time">
                      <div class="event__time__wrapper">
                        <p>{{ getTextTimesift(eventItem.timeshift) }}</p>
                        <img v-if="eventItem.actionType == 'chat'" src="../static/svg/comment-chat.svg" alt="">
                        <img v-else-if="eventItem.actionType == 'broadcastUrl'" src="../static/svg/video-chat.svg" alt="">
                        <img v-else-if="eventItem.actionType == 'button'" src="../static/svg/file-icon-green.png" alt="">
                        <img v-else-if="eventItem.actionType == 'deleteButton'" src="../static/svg/file-icon-green.png" alt="">
                        <img v-else-if="eventItem.actionType == 'presentation'" src="../static/svg/file-icon-green.png" alt="">
                        <img v-else-if="eventItem.actionType == 'slide'" src="../static/svg/file-icon-green.png" alt="">
                        <img v-else-if="eventItem.actionType == 'presentationPos'" src="../static/svg/comment-chat.svg" alt="">
                        <img v-else-if="eventItem.actionType == 'deleteChat'" src="../static/svg/comment-chat.svg" alt="">
                        <img v-else-if="eventItem.actionType == 'fixChat'" src="../static/svg/comment-chat.svg" alt="">
                        <img v-else-if="eventItem.actionType == 'blockChat'" src="../static/svg/comment-chat.svg" alt="">
                        <img v-else-if="eventItem.actionType == 'offVideo'" src="../static/svg/comment-chat.svg" alt="">
                        <img v-else-if="eventItem.actionType == 'onVideo'" src="../static/svg/comment-chat.svg" alt="">
                      </div>
                    </div>
                    <div class="event__editor__content">
                      <div v-if="eventItem.actionType == 'chat'" class="event__editor__comment">
                        <p>[{{ eventItem.logId }}]</p>
                        <p class="event__name">{{ eventItem.username }}</p>
                        <p class="event__message">{{ eventItem.message }}</p>
                      </div>

                      <div v-else-if="eventItem.actionType == 'presentation'" class="event__editor__comment">
                        <p class="event__message">Выбор презентации [{{ eventItem.data.filename }}]</p>
                        <p class="event__message">{{ eventItem.message }}</p>
                      </div>

                      <div v-else-if="eventItem.actionType == 'slide'" class="slide-wrapper">
                        <p class="event__message">Выбран слайда[{{ eventItem.data.slide }}] [{{ eventItem.data.filename }}]</p>
                        <div class="slide-view hidden" ref="slideRow">
                          <vue-pdf-app class="pdf-content" 
                                      :pdf="PDFfiles[eventItem.data.filename]" 
                                      :config="pdfConfig" 
                                      :page-number="eventItem.data.slide" 
                                      @pages-rendered="pagesRendered"
                                      @open="openHandler" 
                                      @after-created="afterCreated"></vue-pdf-app>
                        </div>
                      </div>
                      <div v-else-if="eventItem.actionType == 'broadcastUrl'" class="event__editor__image">
                        <div>
                          <img src="../static/Video.png" alt="" />
                        </div>
                        <a>{{ eventItem.data.broadcastUrl }}</a>
                      </div>
                      <div v-if="eventItem.actionType == 'button'" class="button-link-wrapper">
                        <span class="button-title">Кнопка {{ eventItem.data.buttonColor }}</span>
                        <div class="button-content" :style="{backgroundColor : eventItem.data.buttonColor }">
                          <img src="../static/svg/button-left-icon.svg" style="width: 20px; height: 20px;" alt="">
                          <span class="button-name">{{ eventItem.data.buttonTitle }}</span>
                          <span>→</span>
                        </div>
                        <div class="button-link">
                          <a target="_blank" :href="eventItem.data.buttonLink">Перейти по ссылке</a>
                          <img src="../static/svg/button-link-right.png" style="width: 10px; height: 10px;" alt="">
                        </div>
                      </div>
                      <div v-if="eventItem.actionType == 'deleteButton'" class="button-link-wrapper">
                        <span class="button-title">ID кнопку [{{ eventItem.data.buttonID }}]</span>
                        <div class="button-content">
                          <img src="../static/svg/button-left-icon.svg" style="width: 20px; height: 20px;" alt="">
                          <span class="button-name" style="color: #000;">Удалить кнопку</span>
                          <span>→</span>
                        </div>
                        <div class="button-link">
                          <!-- <a target="_blank"></a> -->
                          <!-- <img src="../static/svg/button-link-right.png" style="width: 10px; height: 10px;" alt=""> -->
                        </div>
                      </div>
                      <div v-else-if="eventItem.actionType == 'presentationPos'" class="event__editor__comment_pos">
                        <p class="event__message">Расположение видео и презентации</p>
                        <p class="event__message">{{ eventItem.data.text }}</p>
                      </div>
                      <div v-else-if="eventItem.actionType == 'deleteChat' 
                                  || eventItem.actionType == 'fixChat' " class="event__editor__comment_pos">
                        <p class="event__message">{{ eventItem.message }}</p>
                        <p class="event__message">ID chat [{{ eventItem.data.ID }}]</p>
                      </div>
                      <div v-else-if="eventItem.actionType == 'blockChat'" class="event__editor__comment_pos">
                        <p class="event__message">{{ eventItem.message }}</p>
                        <p class="event__message">{{ eventItem.data.ID }}</p>
                      </div>
                      <div v-else-if="eventItem.actionType == 'offVideo'
                                  || eventItem.actionType == 'onVideo'" class="event__editor__comment_pos">
                        <p class="event__message">{{ eventItem.message }}</p>
                        <p class="event__message">ID видео [{{ eventItem.data.ID }}]</p>
                        <p class="event__message">{{ eventItem.data.url }}</p>
                      </div>
                    </div>
                    <div class="event__editor__buttons">
                      <div class="event__editor__buttons__option">
                        <button @click="openUpdateModal(eventItem.logId)" class="update__message">Изменить</button>
                        <button @click="openDeleteEventItemModal(eventItem.logId)" class="delete__message"><img src="../static/svg/delete__message.svg" alt=""></button>
                        <button @click="openDeleteEventItemModal(eventItem.logId)" class="update__message__mobile"><img src="../static/svg/fluent_delete-16-regular.svg"></button>
                        <button @click="openUpdateModal(eventItem.logId)" class="delete__message__mobile"><img src="../static/svg/ooui_recent-changes-ltr.svg" alt=""></button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="block__pagination">
                  <button>1-6</button>
                </div> -->
              </div>
            </div>
            <!-- <div class="preview" v-if="isPreview">
              <div class="preview-left">
                <span class="control-btn" @click="colsePreview">Выйти из просмотра</span>
                <span class="left-text">Режим просмотра</span>
              </div>
              <div class="preview-control">
                <div class="content-row timeline-text">
                  <span>1сек</span>
                  <span></span>
                  <span>2ч</span>
                </div>
                <div class="content-row slider-wrapper timeline-slide" >
                  <vue-slider v-model="timeline" :min="0" :max="3600" :height="6"
                              @change="changeTimeline"
                              :barStyle="{ backgroundColor: '#00ff00' }"
                              :dotStyle="{ backgroundColor: '#007bff' }"
                              :processStyle="{ backgroundColor: '#007bff' }"
                  />
                </div>
                <div class="content-row control-group">
                  <span class="control-btn" title="В начало">В начало</span>
                  <span class="control-btn">60 сек назад</span>
                  <span class="control-btn">10 сек назад</span>
                  <span class="control-btn play-btn" @click="playPreview" >Воспроизведение</span>
                  <span class="control-btn">10 сек вперед</span>
                  <span class="control-btn">60 сек вперед</span>
                  <span class="control-btn">5 минут вперед</span>
                </div>
              </div>
            </div> -->
          </div>
            <!-- <div class="play-video" v-if="isPreview">
              <img src="../static/Video.png" alt="" />
            </div> -->
        </div>
      </div>
    </div>

    <div class="nav__mobile">
      <v-bottom-navigation>
        <v-btn value="recent" @click="showLinkEvent">
          <span>Ссылки</span>
          <img src="../static/svg/bx_show-alt.svg" alt="">
        </v-btn>

        <v-btn value="favorites"  @click="openAddEventModal">
          <span>Добавить</span>
          <img src="../static/svg/heroicons-outline_view-grid-add.svg" alt="">
        </v-btn>

        <v-btn value="nearby"  @click="openDeleteCheckedItemModal" >
          <span>Удалить</span>
          <img src="../static/svg/delrte.svg" alt="">
        </v-btn>
        <v-btn value="nearby" @click="exportFile">
          <span>Экспорт</span>
          <img src="../static/svg/uil_file-export.svg" alt="">
        </v-btn>
        <v-btn value="nearby" @click="openClearScriptModal"  >
          <span>Очистить</span>
          <img src="../static/svg/mdi_television-clean.svg" alt="">
        </v-btn>
      </v-bottom-navigation>
    </div>

    <add-event-modal
      v-if="addEventModalOpen"
      :nbroadcast-id="broadcastId"
      :is-update="isUpdate"
      :row-data="curRowData"
      :close-modal="closeAddEventModal"
      :save-modal="addEvent"
    />
    <point-move-modal
      v-if="pointMoveModalopen"
      :close-modal="closePointMoveModal"
      :save-modal="pointMove"
    />
    <select-interval-modal
      v-if="selectIntervalModalopen"
      :close-modal="closeSelectIntervalModal"
      :save-modal="selectInterval"
    />
    <clear-script-modal
          v-if="clearScriptModalOpen"
          :close-modal="closeClearScriptModal"
          v-on:clear-script="clearScript"
        />
    <deleteRow
            v-if="deleteEventItemModalOpen"
            :close-modal="closeDeleteEventItemModal"
            :delete-item="deleteEventItem"
            v-on:deleted-action="deleteEventItemFromList"
          />

    <import-script-modal
      v-if="importScriptModalOpen"
      :import-filename="importFileName"
      :close-modal="closeImportScriptModal"
      :save-modal="saveImportData"
    />

    <preview-modal
      v-if="isPreview"
      :close-modal="closePreview"
    />


  </div>
</template>
<script>

let timmer = []
let nums = 0

import { BFormSelect, BFormCheckbox, BInputGroup, BFormInput, BInputGroupText, BRow, BCol, BButton, BIcon } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

import AddEventModal from "~/components/Modals/addEventModal.vue";
import PointMoveModal from "~/components/Modals/pointMoveModal.vue";
import SelectIntervalModal from "~/components/Modals/selectIntervalModal.vue";
import ClearScriptModal from "~/components/Modals/clearScriptModal.vue";
import DeleteRow from "~/components/Modals/deleteRow.vue";
import ImportScriptModal from "~/components/Modals/importScriptModal.vue";
import PreviewModal from "~/components/Modals/previewModal.vue";

import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";

import ConfirmReset from "@/components/Modals/confirmReset";

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css'

export default {
  name: "CreateAnAutowebinarScriptEditor",
  components: {ConfirmReset, AddEventModal, PointMoveModal, ClearScriptModal, DeleteRow, BIcon, SelectIntervalModal, ImportScriptModal, VueSlider, VuePdfApp, PreviewModal },
  data: () => ({
    strLinkFilter: 'Показать ссылки',
    PDFfiles: {},
    pdfConfig: {
        toolbar: false,
        sidebar: false,
      },
    noData: false,
    autowebinarTitle: '',
    autowebinar: null,
    oldAutowebinarTitle: '',
    curTime: 1,
    value: 1 ,
    curRowId: 0,
    curRowData: null,
    addEventModalOpen: false,
    pointMoveModalopen: false,
    selectIntervalModalopen: false,
    clearScriptModalOpen: false,
    deleteEventItemModalOpen: false,
    importScriptModalOpen: false,
    broadcastId: 0,
    eventItems: [],
    isUpdate: false,
    // rowsChecked: [],
    idxArrCheckedItem: [],
    isChecked: false,
    arrCheckedLogId: [],
    nSelected: 0,
    isMultiple: false,
    importFileModel: null,
    importFileName: '',
    arrImportData: [],
    timeline: 0,
    isPreview: false,
    isPlay: false,
  }),
  mounted() {
    this.initData()
  },

  methods: {
    async initData() {
      try {
        const res = await this.$axios.get(
          '/files/pdfList',
          {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          }
        )
        const arr = res.data
        for (let i = 0; i < arr.length; i++) {
          const filename = arr[i]
          const file = await this.$axios.$get(
            '/files/pdf',
            {
              params: {
                filename: filename,
              },
              headers: {
                "Authorization": localStorage.getItem('token')
              },
              responseType: 'blob'
            })
          if (file) {
            const blob = new Blob([file]);
            const objectUrl = URL.createObjectURL(blob);
            this.PDFfiles[filename] = objectUrl
          }
        }
      } catch (error) {
        console.log(error)
        this.PDFfiles = {}
      }
      // console.log(this.PDFfiles)
      this.$store.commit('setStrScriptEditor', 'edit');
      this.autowebinar = this.$store.state.autowebinar
      if (this.autowebinar != null) {
        this.broadcastId = this.autowebinar.broadcastId
        this.autowebinarTitle = this.autowebinar.title
      }
      
      this.oldAutowebinarTitle = this.$store.state.oldAutowebinarTitle
      if (this.oldAutowebinarTitle != this.autowebinarTitle) {
        this.clearScript()
        this.$store.commit('setOldAutowebinarTitle', this.autowebinarTitle);
      }
      await this.$axios.get(`/broadcast/getEvents?broadcastId=${this.broadcastId}`)
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
      if (this.eventItems == null || this.eventItems.length == 0) {
        this.noData = true
      }
      // console.log(this.eventItems)
    },
    openAddEventModal() {
      this.isUpdate = false
      this.addEventModalOpen = true
    },
    closeAddEventModal() {
      this.isUpdate = false
      this.addEventModalOpen = false
    },
    openPointMoveModal() {
      this.pointMoveModalopen = true
    },
    closePointMoveModal() {
      this.pointMoveModalopen = false
    },
    async pointMove(upTimeshift) {
      upTimeshift = upTimeshift * 1000

      console.log("upTimeshift", upTimeshift)
      if (!this.isChecked) return
      if (this.idxArrCheckedItem.length <= 0) return
      console.log(this.idxArrCheckedItem)
      this.idxArrCheckedItem.sort((a, b) => a - b);
// up(minuse)
      this.arrCheckedLogId = []
      let arrCheckedItems = []
      for (let i = 0; i < this.idxArrCheckedItem.length; i++) {
        let idx = this.idxArrCheckedItem[i]
        this.arrCheckedLogId.push(this.eventItems[idx].logId)
        arrCheckedItems.push(this.eventItems[idx])
      }

// plus
      let arrDownItems = []
      let arrDownLogId = []
      let diffTimeshift = 0
      const nChecked = arrCheckedItems.length
      // console.log('this.idxArrCheckedItem[0]')
      // console.log(this.idxArrCheckedItem[0])
      // console.log('nChecked')
      // console.log(nChecked)
      // if (nChecked > 0) {
      //   for (let j = 0; j < this.eventItems.length; j++) {
      //     if (j >= this.idxArrCheckedItem[0]) break
      //     let item = this.eventItems[j]
      //     // console.log('for-if ')
      //     if ( (arrCheckedItems[0].timeshift - upTimeshift) <= item.timeshift && item.timeshift <= (arrCheckedItems[nChecked-1].timeshift - upTimeshift) ) {
      //       arrDownItems.push(item)
      //       arrDownLogId.push(item.logId)
      //       // console.log('item')
      //       // console.log(item)
      //       // console.log('arrCheckedItems[nChecked-1].timeshift')
      //       // console.log(arrCheckedItems[nChecked-1].timeshift)
      //       // console.log('arrDownItems[0].timeshift')
      //       // console.log(arrDownItems[0].timeshift)
      //       // console.log('diffTimeshift')
      //       // console.log(diffTimeshift)
      //       if (diffTimeshift === 0) {
      //         // console.log('if-if')
      //         diffTimeshift = (arrCheckedItems[nChecked-1].timeshift - upTimeshift) - arrDownItems[0].timeshift
      //       }
      //     }
      //   }
      // }

      let reqData = {
        'upTimeshift': upTimeshift,
        'arrCheckedLogId': this.arrCheckedLogId,
        'diffTimeshift': diffTimeshift,
        'arrDownLogId': arrDownLogId,
        'broadcastId': this.broadcastId,
      }
// console.log(reqData)
      await this.$axios.post(
          `/broadcast/move`,
          reqData,
          {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          }
        ).then(data => {
          this.arrCheckedLogId = []
          this.isChecked = false
          this.eventItems = data
          return
       })
      this.clearChecked()
      this.pointMoveModalopen = false
      this.initData()
    },
    openSelectIntervalModal() {
      this.selectIntervalModalopen = true
    },
    closeSelectIntervalModal() {
      this.selectIntervalModalopen = false
    },
    selectInterval(fromTimeshift, toTimeshift) {
      fromTimeshift = fromTimeshift * 1000
      toTimeshift = toTimeshift * 1000

      console.log('fromTimeshift, toTimeshift')
      console.log(fromTimeshift)
      console.log(toTimeshift)

      if (fromTimeshift > toTimeshift) return
      this.clearChecked()
      for (let i = 0; i < this.eventItems.length; i++) {
        const item = this.eventItems[i]
        if (fromTimeshift <= item.timeshift && item.timeshift <= toTimeshift) {
          this.idxArrCheckedItem.push(i)
        }
      }
      console.log('this.idxArrCheckedItem')
      console.log(this.idxArrCheckedItem)
      if (this.idxArrCheckedItem.length > 0) {
        this.isChecked = true
        this.nSelected = this.idxArrCheckedItem.length

        for (let key in this.$refs) {
          if (this.$refs.hasOwnProperty(key)) {
            if (key.includes('rowEvent_')) {
              let arrTemp = key.split('_')
              if (arrTemp.length < 2) continue

              let k = Number(arrTemp[1])
              let idx = this.idxArrCheckedItem.filter((t) => t === k)
              if (idx.length < 1) continue
              console.log('idx')
              console.log(idx)

              let rowElement = this.$refs[key][0]
              if (rowElement === undefined) break

              let cellCheck = rowElement.getElementsByClassName('event-check')[0]
              if (!cellCheck.classList.contains('row-checked')) {
                cellCheck.classList.add('row-checked')
              }
            }
          }
        }
      }

      this.selectIntervalModalopen = false
    },
    openClearScriptModal() {
      if (this.eventItems.length > 0)
        this.clearScriptModalOpen = true
    },
    closeClearScriptModal() {
      this.clearScriptModalOpen = false
    },
    openDeleteEventItemModal(log_id) {
      this.curRowId = log_id
      this.isMultiple = false
      this.deleteEventItemModalOpen = true
    },
    closeDeleteEventItemModal() {
      this.isMultiple = false
      this.deleteEventItemModalOpen = false
    },
    openImportScriptModal() {
      this.importScriptModalOpen = true
    },
    closeImportScriptModal() {
      this.importScriptModalOpen = false
    },
    closePreview() {
      this.isPreview = false
    },

    openDeleteCheckedItemModal() {
      if (this.isChecked === false) return
      this.arrCheckedLogId = []
      for (let i = 0; i < this.idxArrCheckedItem.length; i++) {
        let idx = this.idxArrCheckedItem[i]
        this.arrCheckedLogId.push(this.eventItems[idx].logId)
      }
      console.log(this.arrCheckedLogId)
      this.isMultiple = true
      this.curRowId = 0
      this.deleteEventItemModalOpen = true
    },
    openUpdateModal(log_id) {
      this.isUpdate = true
      this.curRowId = log_id
      this.curRowData = this.eventItems.filter((item) => {
          return (
            item.logId === log_id
          )
        })[0]
      this.addEventModalOpen = true
    },
    async addEvent(data) {
      console.log("addEvent", data);
      this.addEventModalOpen = false
      const val = await this.$axios.post(
          `/broadcast`,
          data, {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          })
          .then(res => {
            return
          })
      this.noData = false
      this.initData()
    },
    async deleteEventItem() {
      let data = null
      if (this.isMultiple) {
        let req_data = this.arrCheckedLogId
        await this.$axios.post(
          `/broadcast/mutiple`,
          req_data,
          {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          }
        ).then(res => {
          console.log(res)
          return true
        })
      } else {
	let thisObj = this
        data = await this.$axios.$delete(
          `/broadcast/${thisObj.curRowId}`,
          {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          }
        )
        return !!data.deletedRow;
      }
      return true
    },
    deleteEventItemFromList() {
      if (this.isMultiple) {
        this.eventItems = this.eventItems.filter(item => !this.arrCheckedLogId.includes(item.logId));
      } else {
        this.eventItems = this.eventItems.filter((eventItem) => eventItem.logId !== this.curRowId)
      }
      if (this.eventItems == null || this.eventItems.length == 0) {
        this.noData = true
      }
      this.clearChecked()
    },
    clearChecked() {
      this.isChecked = false
      this.idxArrCheckedItem = []
      this.arrCheckedLogId = []
      this.nSelected = 0

      for (let key in this.$refs) {
        if (this.$refs.hasOwnProperty(key)) {
          if (key.includes('rowEvent_')) {
            let rowElement = this.$refs[key][0]
            if (rowElement === undefined) break

            let cellCheck = rowElement.getElementsByClassName('event-check')[0]
            if (cellCheck.classList.contains('row-checked')) {
              cellCheck.classList.remove('row-checked')
            }
          }
        }
      }
    },
    clickEventRow(index) {
      if (this.deleteEventItemModalOpen === true || this.addEventModalOpen === true) return

      const strRef = 'rowEvent_' + index
      let rowElement = this.$refs[strRef][0]
      let cellCheck = rowElement.getElementsByClassName('event-check')[0]

      if (cellCheck.classList.contains('row-checked')) {
        cellCheck.classList.remove('row-checked')

        // this.rowsChecked = this.rowsChecked.filter((row) => row !== strRef)
        this.idxArrCheckedItem = this.idxArrCheckedItem.filter((idx) => idx !== index)
      } else {
        cellCheck.classList.add('row-checked')

        // this.rowsChecked.push(strRef)
        this.idxArrCheckedItem.push(index)
      }

      if (this.idxArrCheckedItem.length > 0) {
        this.isChecked = true
      } else {
        this.isChecked = false
      }
      this.nSelected = this.idxArrCheckedItem.length
    },
    async clearScript() {
      let req_data = {
        'broadcastId': this.broadcastId
      }
      await this.$axios.post(
        `/broadcast/all`,
        req_data,
        {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        }
      ).then(res => {
        console.log(res)
        return true
      })
      this.eventItems = []
      this.noData = true
    },
    getTextTimesift(timeshift) {
      let txtTimeshift = ''
      let tmpTime1 = Math.floor(timeshift / 3600000)
      let tmpTime2 = timeshift % 3600000
      txtTimeshift += (tmpTime1 === 0 ? '' : tmpTime1 + 'ч' )
      tmpTime1 = Math.floor(tmpTime2 / 60000)
      tmpTime2 = tmpTime2 % 60000
      txtTimeshift += (tmpTime1 === 0 ? '' : tmpTime1 + 'мин' )

      tmpTime1 = tmpTime2 / 1000
      txtTimeshift += (tmpTime1 === 0 ? '' : tmpTime1 + 'сек' )

      if (txtTimeshift !== '') {
        txtTimeshift = '+' + txtTimeshift
      }
      return txtTimeshift
    },
    importFile() {
      console.log('importFile')
      document.getElementById('importFile').click()
    },
    changeFile(file) {
      console.log('changeFile')
      if (!file) {
        console.log('No file was selected.');
        return;
      }
      let thisObj = this
      const reader = new FileReader();
      reader.onload = function(e) {
        const fileContent = e.target.result;
        console.log(fileContent);
        if (fileContent === '') thisObj.arrImportData = []
        else {
          try {
            thisObj.importFileName = file.name
            thisObj.arrImportData = JSON.parse(fileContent);
            thisObj.openImportScriptModal()
          } catch (error) {
            thisObj.arrImportData = []
            thisObj.importFileName = ''
            alert('error')
          }
        }
        console.log(thisObj.arrImportData)
        // You can now use fileContent as needed
      };

      reader.onerror = function(e) {
        console.error('Error reading file:', e.target.error);
      };

      // Read the content of the file as text
      reader.readAsText(file);
    },
    exportFile() {
      console.log('exportFile')
      console.log(this.eventItems)
      const arr = this.eventItems
      arr.forEach(obj => {
        delete obj.broadcastId,
        delete obj.logId
      });
      console.log(arr)

      let jsonString = '';

      try {
        jsonString = JSON.stringify(arr);
      } catch (error) {
        console.error('Error converting array to JSON string:', error);
      }
      console.log(jsonString)
      const data = jsonString;
      const blob = new Blob([data], { type: 'text/plain' });
      const link = document.createElement('a');
      link.download = 'autowebinar_ ' + this.broadcastId + '.json';
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    },
    async saveImportData(flag) {
      console.log('saveImportData')
      console.log(flag)
      let req_data = {
        'broadcastId': this.broadcastId,
        'data': this.arrImportData,
        'flagImport': flag, // (flag == 1 => delete & import, == 0 => import)
      }
      await this.$axios.post(
        `/broadcast/import`,
        req_data,
        {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        }
      ).then(res => {
        return true
      })
      this.importScriptModalOpen = false
      this.initData()
    },
    // getBroadcastUrlFromItem(jsonData) {
    //   try {
    //     console.log('jsonData')
    //     console.log(jsonData)
    //     console.log('json.parse')
    //     let arr = JSON.parse(jsonData);
    //     console.log('arr')
    //     console.log(arr)
    //     console.log('arr.broadcastUrl')
    //     console.log(arr.broadcastUrl)
    //     return arr.broadcastUrl
    //   } catch (error) {
    //     console.log('error')
    //     console.log(error)
    //     return ''
    //   }

    // },
    changeTimeline() {
      console.log('changeTimeline')
    },
    previewEvent() {
      this.clearChecked()
      this.isPreview = true
      this.isPlay = false
    },
    playPreview() {
      if (this.isPlay) return

      this.isPlay = true
      this.func(0, 0)
    },
    colsePreview() {
      this.isPreview = false
      this.isPlay = false
      console.log(nums)
      for (let index = 0; index < nums; index++) {
        clearTimeout(timmer[index]);
      }
      for (let index = 0; index < nums; index++) {
        timmer.pop();
      }
      nums = 0
      console.log(timmer)
    },
    func(idx, time) {
      console.log('----- func -----' + '(' + idx + ', ' + time + ')' )
      let thisObj = this
      timmer[nums++] = setTimeout(() => {
        let dt = new Date();
        console.log('idx - '+ idx + ' : play : ' + dt.getTime());

        const elements = thisObj.$refs['rowEvent_' + idx][0]
        console.log(elements)
        console.log(elements.classList)
        elements.classList.add('passed');

        const rect = elements.getBoundingClientRect();
        const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visiblePercentage = (visibleHeight / rect.height) * 100;

        if (!isFullyVisible)
          elements.scrollIntoView({ behavior: 'smooth', block: 'start' });

          if (idx < thisObj.eventItems.length) {
            thisObj.timeline = thisObj.timeline + time
            thisObj.func(idx + 1, thisObj.eventItems[idx].timeshift)
          }
          else
            return;
      }, time);
    },
    goToAutowebinarEditor() {
      // await this.$router.push('/create-an-autowebinar')
      this.$router.go(-1);
    }, 
    pagesRendered(pdfApp) {
      console.log('pagesRendered')
      const startPage = 1, pageCount = pdfApp.pagesCount, curPage = pdfApp.page
      pdfApp.pdfViewer.viewer.childNodes[curPage-1].style.border = "none"
      pdfApp.pdfViewer.viewer.childNodes[curPage-1].style.width = "100%"

      this.$refs.slideRow.forEach(function(element, index) {
        element.classList.remove("hidden");
      });
    },
    openHandler(pdfApp) {
      console.log('openHandler')
      pdfApp.pdfViewer.currentScaleValue = "page-width"
      pdfApp.appConfig.mainContainer.style.overflow = "hidden"
    },
    afterCreated(pdfApp) {
      console.log('afterCreated')
    }, 
    showLinkEvent() {
      if (this.strLinkFilter == 'Показать ссылки') {
        this.strLinkFilter = 'Убрать ссылки'
        this.eventItems = this.eventItems.filter((eventItem) => eventItem.actionType == 'button')
      } else {
        this.strLinkFilter = 'Показать ссылки'
        this.initData()
      }
    }
  }
}
</script>

<style scoped>
.event__time__wrapper > img {
  width: 30px;
}
.pdf-content {
  width: 200px;
  height: 100px;
}

.pdf-app.light {
  --sidebar-width: 0px !important;
  --pdf-app-background-color: transparent !important;
}

.slide-view.hidden {
  visibility: hidden;
}

.slide-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 15px;
}

.pencil_square_wrapper {
  display: flex;
  cursor: pointer;
  gap: 5px;
  margin-left: 20px;
}
.preview {
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  border-top: 1px solid #d7d7dc;
  box-shadow: 0px -3px 8px 0px #888888;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 8px;
}

.preview-left {
  width: 23%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 20px;
}

.preview-left span.control-btn {
  width: 180px;
}

.preview-control {
  width: 53%;
}

span.control-btn {
  background-color: #ffffff;
  border: 1px solid #c0c0c0;
  padding: 3px 5px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  border-radius: 3px;
  font-size: 13px;
}

.play-btn {
  background-color: #4dc0f5 !important;
}

span.control-btn:hover {
  background-color: #ddd;
}

.timeline-text {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 13px;
  line-height: 13px;
}

.left-text {
  margin-top: 5px;
  font-size: 18px;
}

.control-group {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 15px;
}

.play-video {
  position: fixed;
  bottom: 105px;
}

.vue-slider-rail {
    background-color: #df0000 !important;
}

.button-link-wrapper {
  margin-right: 5px;
}

.button-title {
  font-weight: bold;
}

.button-content {
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 15px;
  border-radius: 5px;
  gap: 7px;
}

.button-content .button-name {
  width: 100%
}

.button-link {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding-top: 5px;
}

.button-link span {
  color: #00f;
}

.active-btn {
  background-color: #fe6637;
  color: #fff !important;
}
p {
  margin-bottom: 0;
}
a {
  text-decoration: none;
}
hr {
  margin-top: 20px;
}
.update__message__mobile {
  display: none;
}
.delete__message__mobile {
  display: none;
}
.webinar__title{
  color: black;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 0;
  margin-left: 20px;
  min-width: 10px;
  min-height: 24px;
}
.content__createwebinar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 85%;
  height: 1%;
}
.hamburger__mobile {
  display: none;
}
.webinar__autowebinar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  padding: 10px 0 10px 30px;
}
.webinar__autowebinar__title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.main__content {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
}
.update__webinar__title {
  color: #7A7777;
}
.content__sidebar__menu {
  display: flex;
  flex-direction: column;
  width: 15%;
}
.action__icon > img {
  margin-right: 15px;
}
.content__createwebinar__option {
  margin-top: 15px;
}
.content__createwebinar__option__blocks {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
}
.block__option {
  width: 30%;
  padding: 20px;
  height: 659px;
  border-radius: 10px;
  background: #FFF;
}
.block__option__choice {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}
.block__option__choice__p {
  color: #000;
  font-size: 16px;
  font-weight: 400;
}
.block__option__choice > p > span {
  color: #000;
  font-size: 20px;
  font-weight: 500;
}
.block__option__choice__reset {
  cursor: pointer;
  color: #2A5885;
  font-size: 16px;
  font-weight: 400;
}
.buttons__link {
  width: 100%;
  margin-top: 20px;
}
.buttons__link > button {
  border-radius: 10px;
  background: #FE6637;
  width: 100%;
  height: 40px;
  color: white;
}
.block__option__buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
}
.buttons__events {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
}
.clear__button{
  justify-content: center;
}
.clear > button > p {
  color: #FE6637;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.buttons__events > button {
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid #A8ADB8;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  gap: 10px;
  padding: 0 15px;
  color: #7A7777;
}
.block__update {
  width: 70%;
  min-height: 700px;
  border-radius: 10px;
  background: #FFF;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.block__pagination {
  border-radius: 10px;
  background: #000AFF;
  width: 86px;
  padding: 10px;
  color: #FFF;
  text-align: center;
  font-weight: 600;
}
.event__wrapper {
  position: relative;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 3px;
  border-bottom: 1px solid #ddd;
}
.event-check {
  position: absolute;
  top: 29px;
  left: 45px;
  color: #181;
  font-weight: bold;
  font-size: 15px;
  display: none;
}
.row-checked {
  display: block;
}
.event__wrapper:hover, .event__wrapper.passed, .event__wrapper.active {
  background-color: #e0ffce;
  cursor: pointer;
}
.event__editor {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}
.event__editor__comments {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
}
.event__editor__buttons__option {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.event__time__wrapper {
  width: 170px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
}
.event__editor__content {
  min-width: 400px;
}

.event__editor__comment {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding-left: 5px;
}

.event__editor__comment_pos {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 5px;
}
.event__editor__time > div > p {
  color: #7A7777;
  font-size: 14px;
  font-weight: 400;
}
.nav__mobile {
  display: none;
}
.update__message {
  width: 100px;
  height: 39px;
  border-radius: 10px;
  background: #FE6637;
  color: #FFF;
  font-weight: 600;
}
.delete__message {
  width: 50px;
  height: 39px;
  border-radius: 10px;
  background: #F00;
}
.event__name {
  color: #000;
  font-size: 18px;
  font-weight: 500;
}
.event__message {
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin-left: 15px;
}
@media screen and (max-width: 1500px) {
  .block__option {
    width: 25%;
    padding: 10px;
  }
  .event__time__wrapper {
    width: 120px;
  }
  .update__message {
    width: 70px;
    height: 30px;
    border-radius: 5px;
    font-size: 13px;
  }
  .delete__message {
    width: 40px;
    height: 30px;
    border-radius: 5px;
  }
  .delete__message > img {
    width: 20px;
  }
  .event__editor__image img {
    width: 200px;
  }
  .event__editor__content {
    min-width: 300px;
  }
  .buttons__events > button {
    border-radius: 5px;
    height: 40px;
    gap: 3px;
    padding: 0 15px;
  }
  .block__update {
    border-radius: 5px;
    padding: 10px 20px;
    gap: 5px;
  }
}
@media screen and (max-width: 1300px) {
  .control-group {
    gap: 3px;
  }
  span.control-btn {
    min-width: 80px;
    padding-left: 2px;
    padding-right: 2px;
    height: 25px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .block__option {
    width: 30%;
    padding: 10px;
  }
  .buttons__events > button {
    padding-left: 15px;
  }
  .buttons__events > button > p {
    font-size: 13px;
  }
}
@media screen and (max-width: 1200px) {
  .play-video img {
    width: 300px;
  }
  .block__update {
    border-radius: 5px;
    padding: 10px 10px;
    gap: 5px;
  }
  .event__time__wrapper {
    width: 90px;
  }
  .event__editor__buttons__option {
    gap: 5px;
  }
  .event__editor__time > div > p {
    font-size: 12px;
  }
  .event__time__wrapper > img {
    width: 20px;
  }
}
@media screen and (max-width: 1024px) {
  .control-group {
    gap: 3px;
  }
  span.control-btn {
    padding-left: 2px;
    padding-right: 2px;
    height: 25px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .block__option {
    width: 38%;
    padding: 5px;
  }
  .buttons__events > button {
    padding-left: 5px;
  }
  .block__option__choice__p {
    font-size: 13px;
  }
  .block__option__choice__p > span {
    font-size: 13px;
  }
  .block__option__choice__reset {
    font-size: 13px;
  }
  .block__option__choice {
    margin-bottom: 10px;
  }
  .buttons__link {
    margin-top: 10px;
  }
  .event__editor__content {
    min-width: 250px;
  }
  .update__message {
    width: 50px;
    height: 25px;
    border-radius: 5px;
    font-size: 9px;
  }
  .delete__message {
    width: 20px;
    height: 25px;
    border-radius: 5px;
  }
  .delete__message > img {
    width: 15px;
  }
}
@media screen and (max-width: 900px) {
  .content__sidebar__menu {
    display: none;
  }
  .content__createwebinar {
    width: 100%;
  }
  .main__content {
    margin-top: 15px;
    width: 100%;
  }
  .block__option {
    width: 38%;
    padding: 15px;
  }
  .preview-left {
    width: 38%;
  }
  .preview-control {
    width: 62%;
    margin-left: -20px;
  }
  .buttons__events > button {
    padding-left: 15px;
  }
  .buttons__events > button > p {
    font-size: 15px;
  }
  .block__option__choice__p {
    font-size: 15px;
  }
  .block__option__choice__reset {
    font-size: 15px;
  }
}
@media screen and (max-width: 768px) {
  .play-video img {
    width: 200px;
  }
  .control-group {
    gap: 3px;
  }
  span.control-btn {
    padding-left: 2px;
    padding-right: 2px;
    height: 25px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
@media screen and (max-width: 700px) {
  span.control-btn {
    min-width: 55px;
  }
  .block__option {
    width: 38%;
    padding: 5px;
  }
  .buttons__events > button {
    padding-left: 5px;
  }
  .buttons__events > button > p {
    font-size: 13px;
  }
  .block__option__choice__p {
    font-size: 13px;
  }
  .block__option__choice__reset {
    font-size: 13px;
  }
}
@media screen and (max-width: 650px) {
  .headers {
    display: none;
  }
  .block__option {
    display: none;
  }
  .block__update {
    width: 100%;
    padding: 10px 5px;
    margin: 0px;
  }
  .event__editor__image > img {
    width: 90%;
  }
  .event__editor__buttons__option {
    flex-direction: column;
  }
  .update__message {
    display: none;
  }
  .delete__message {
    display: none;
  }
  .update__message__mobile {
    display: block;
  }
  .delete__message__mobile {
    display: block;
  }
  .event__editor__time > div {
    flex-direction: column;
  }
  .event__editor__content {
    margin-left: 0;
    min-width: 300px;
  }
  .event__editor__comments > .event__editor__time > div {
    flex-direction: row;
  }
  .event__editor__comment {
    /* position: relative;
    top: 40px;
    right: 150px;
    gap: 15px; */
    flex-direction: column;
  }
  .main__content {
    margin-top: 0;
  }
  .nav__mobile {
    width: 100%;
    display: block;
    margin-top: 10px;
    position: fixed;
    z-index: 9999;
    bottom: 0px;
    left: 0px;
  }
  .webinar__autowebinar {
    padding: 10px 5px;
    border-radius: 0;
    justify-content: space-around;
    align-items: center;
  }
  .update__webinar__title {
    display: none;
  }
  .webinar__title {
    font-size: 16px;
    margin-left: 3px;
    max-width: 250px;
    word-break: break-all;
    line-height: 15px;
  }
  .webinar__autowebinar__title {
    flex-direction: row;
    margin-right: 5px;
  }
  .pencil__square {
    display: block;
    margin-left: 10px;
    width: 17px;
    margin-top: 3px;
  }
  .pencil_square_wrapper {
    gap: 1px;
    margin-left: 5px;
  }
  .hamburger__mobile {
    display: block;
    margin-top: -6px;
  }
  .webinar__autowebinar__image > img {
    width: 40px;
  }
  .v-item-group.v-bottom-navigation .v-btn {
    padding: 0px 5px !important;
    min-width: 75px;
  }
  .event__time__wrapper {
    width: 60px;
  } 
  .v-item-group.v-bottom-navigation {
    justify-content: space-evenly;
  }
}
@media screen and (max-width: 475px) {
  .event__editor__content {
    min-width: 200px;
  }
  .event__editor__image a {
    font-size: 13px;
  }
}
@media screen and (max-width: 375px) {
  .v-item-group.v-bottom-navigation .v-btn[data-v-61f66ce5] {
    padding: 0px 3px !important;
    min-width: 60px;
  }
}
@media screen and (max-width: 320px) {
  
}
</style>
