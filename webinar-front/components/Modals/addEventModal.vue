<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up modal-event-header">
        <span class="modal-event-title">изменение события</span>
        <img class="close_btn" @click="close" src="../../static/svg/close.svg" alt="Nope">
      </div>
      <div class="modal-event-content ">

        <div class="content-row">
          <label class="label-option" style="margin-top: 15px;" >Тин <span class="red--text">*</span>:</label>
          <b-form-select
            class="select-option"
            name="eventType"
            v-model="selectedType"
            :options="eventType"
            @change="changeEventType"
          ></b-form-select>
        </div>
        <div class="content-row" v-if="isChatMsg && false">
          <b-form-checkbox
            class="cbx-allow"
            id="cbxAllow"
            v-model="status"
            name="cbxAllow"
            value="accepted"
            unchecked-value="not_accepted"
          >
          Разрешить редактирование по целочке
          </b-form-checkbox>
        </div>

        <!-- <div class="content-row" v-if="isButton">
          <label class="label-option" >Тип ссылки</label>
          <b-form-select
            class="select-option"
            name="linkType"
            v-model="selectedLinkType"
            :options="linkType"
          ></b-form-select>
        </div> -->
        <div class="content-row" v-if="isPresentationPos">
          <label class="label-option" >выбора расположения</label>
          <b-form-select
            class="select-option"
            name="role"
            v-model="selectedPresentationPos"
            :options="presentationPosList"
          ></b-form-select>
        </div>
        <div class="content-row" v-if="isPresentation">
          <label class="label-option" >ID презентации</label>
          <b-form-select
            class="select-option"
            name="role"
            v-model="selectedPresentation"
            :options="presentationList"
          ></b-form-select>
        </div>
        <div class="content-row" v-if="isSlide">
          <label class="label-option" >ID презентации</label>
          <b-form-select
            class="select-option"
            name="role"
            v-model="selectedPresentation"
            :options="presentationList"
          ></b-form-select>
        </div>
        <div class="content-row" v-if="isSlide">
          <label class="label-option" >номера слайда </label>
          <input class="input-option" type="number" v-model="slide" >
        </div>
        <div class="content-row" v-if="isOnVideo">
          <label class="label-option" >ID видео </label>
          <input class="input-option"  type="text" v-model="onVideoID">
        </div>
        <div class="content-row" v-if="isOnVideo">
          <label class="label-option" >Ссылка</label>
          <input class="input-option" type="text" v-model="onVideoUrl">
        </div>
        <div class="content-row" v-if="isOffVideo">
          <label class="label-option" >ID видео </label>
          <input class="input-option"  type="text" v-model="offVideoID">
        </div>
        <div class="content-row" v-if="isOffVideo">
          <label class="label-option" >Ссылка</label>
          <input class="input-option" type="text" v-model="offVideoUrl">
        </div>
        <div class="content-row" v-if="isBlockChat">
          <label class="label-option" >Блокировка/разблокировка чата</label>
          <b-form-select
            class="select-option"
            name="role"
            v-model="selectedBlockChat"
            :options="blockChatList"
          ></b-form-select>
        </div>
        <div class="content-row" v-if="isFixChat">
          <label class="label-option" >ID сообщение в чате </label>
          <input class="input-option"  type="text" v-model="fixChatID">
        </div>
        <div class="content-row" v-if="isDeleteChat">
          <label class="label-option" >ID Сообщение </label>
          <input class="input-option"  type="text" v-model="deleteChatID">
        </div>
        <div class="content-row" v-if="isDeleteButton">
          <label class="label-option" >ID кнопки</label>
          <input class="input-option"  type="text" v-model="deleteButtonID">
        </div>
        <div class="content-row" v-if="isButton">
          <label class="label-option" >ID кнопки</label>
          <input class="input-option"  type="text" v-model="buttonID">
        </div>
        <div class="content-row" style="display: flex;" v-if="isButton">
          <div class="type-group">
            <label class="label-option" >Иконка:</label>
            <div class="type-btn-group">
              <div class="type-img-wrapper active">
                <img src="../../static/svg/file-icon.svg" style="width: 25px; height: 25px;" alt="">
              </div>
              <div class="type-img-wrapper">
                <img src="../../static/svg/file-file-link.svg" style="width: 25px; height: 25px;" alt="">
              </div>
              <div class="type-img-wrapper">
                <img src="../../static/svg/download-document-svgrepo-com.svg" style="width: 25px; height: 25px;" alt="">
              </div>
              <div class="type-img-wrapper">
                <img src="../../static/svg/gift-box-18.svg" style="width: 25px; height: 25px;" alt="">
              </div>
              <div class="type-img-wrapper">
                <img src="../../static/svg/call-date-schedule-icon.svg" style="width: 25px; height: 25px;" alt="">
              </div>
            </div>
          </div>
          <div class="color-text">
            <div class="modals__input__color">
              <label class="label-option" >Цвет: </label>
              <button
                class="color__text"
                @click="toggleColorPicker"
                :style="{ background: newLinkColor, }">{{ newLinkColor }}
              </button>
            </div>
              <div class="color-picker-wrapper"><v-color-picker v-if="colorPickerOpen" v-model="newLinkColor" class="color-picker"/></div>
          </div>
        </div>
        <div class="content-row" v-if="isButton">
          <label class="label-option" >Заголовок</label>
          <input class="input-option" type="text" v-model="buttonTitle" :maxlength="140">
        </div>
        <div class="content-row" v-if="isButton">
          <label class="label-option" >Ссылка</label>
          <input class="input-option" type="text" v-model="buttonLink">
        </div>
        <div class="content-row" v-if="isButton">
          <b-form-checkbox
            class="cbx-allow"
            id="cbxAllow"
            v-model="buttonStatus"
            name="cbxAllow"
            value="1"
            unchecked-value="0"
          >
          Это ссылка-оффер
          </b-form-checkbox>
        </div>

        <div class="content-row" v-if="isBroadcast">
          <label class="label-option" >Ссылка на трансляцию</label>
          <input class="input-option"  type="text" v-model="broadcastUrl">
        </div>

        <div class="content-row" v-if="isChatMsg">
          <label class="label-option" >Имя</label>
          <input class="input-option" name="username" type="text" v-model="username">
        </div>
        <div class="content-row" v-if="isChatMsg">
          <label class="label-option" >Содержимое</label>
          <textarea-emoji-picker name="message" v-model="txtMessage" />
        </div>
        <div class="content-row" v-if="isChatMsg">
          <label class="label-option" >Роль</label>
          <b-form-select
            class="select-option"
            name="role"
            v-model="selectedRole"
            :options="roleList"
          ></b-form-select>
        </div>
        <div class="content-row" style="height: 100px;" v-if="isChatMsg || true">
          <b-row class="row-time-label">
            <label class=" label-option" >Тайминг (время от начала записи вебинара)</label>
          </b-row>
           <b-row class="row-time">
            <b-col>
              <b-input-group size="sm" append="ч" class="mb-2">
                <b-form-input type="number" v-model="timeHour"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group size="sm" append="мин" class="mb-2">
                <b-form-input type="number" v-model="timeMin"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group size="sm" append="сек" class="mb-2">
                <b-form-input type="number" v-model="timeSec"></b-form-input>
              </b-input-group>
            </b-col>
            <b-col>
              <b-input-group size="sm" append="мс" class="mb-2">
                <b-form-input type="number" v-model="timeMc"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>
          </div>
      </div>
      <div class="modal-event-footer">
        <div class="btn-group">
          <b-button @click="close" variant="outline-secondary" class="btn-cancel">Отмена</b-button>
          <b-button @click="save" variant="primary" class="btn-save">
            Сохранить
            <img src="../../static/svg/save-svgrepo-com.svg" style="width: 20px; height: 20px; margin-left: 15px;" alt="">
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BFormSelect, BFormCheckbox, BInputGroup, BFormInput, BInputGroupText, BRow, BCol, BButton, BIcon } from 'bootstrap-vue'
import TextareaEmojiPicker from '~/components/TextareaEmojiPicker'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "addInChat",
  components: {
    TextareaEmojiPicker ,
    BFormSelect, BFormCheckbox, BInputGroup, BFormInput, BInputGroupText, BRow, BCol, BButton, BIcon
  },
  data () {
    return {
      broadcastId: 0,
      data: null,
      logId: null,
      note: null,
      username: null,
      timeshift: null,
      timeHour: null,
      timeMin: null,
      timeSec: null,
      timeMc: null,
      txtMessage: '',
      selectedLinkType: null,
      linkType: [
        { value: 'дополнительный материал', text: 'дополнительный материал' },
        { value: 'link1', text: 'link1' },
        { value: 'link2', text: 'link2' },
      ],
      selectedRole: null,
      roleList: [
        { value: 'guest', text: 'Пользователь' },
        { value: 'admin', text: 'Админ' },
        { value: 'moderator', text: 'Модератор' },
      ],
      selectedType: 'chat',
      eventType: [
        { value: 'broadcastUrl', text: 'Трансляция' }, // ok
        { value: 'button', text: 'Кнопка' }, // ok
        { value: 'deleteButton', text: 'Удалить кнопку' }, // ok
        { value: 'presentation', text: 'Выбор презентации' }, // ok
        { value: 'slide', text: 'Номер слайда' },
        { value: 'presentationPos', text: 'Расположение видео и презентации' },
        { value: 'chat', text: 'Сообщение в чат' },
        { value: 'deleteChat', text: 'Удалить сообщение' },
        { value: 'fixChat', text: 'Закрепить сообщения в чате' },
        { value: 'blockChat', text: 'Блокировка чата' },
        { value: 'onVideo', text: 'Включить видео' },
        { value: 'offVideo', text: 'Выключить видео' },

        // { value: 'chat', text: 'Репост Сообщения из чата' },
        // { value: 'клик по ссылке (показать уведомление)', text: 'клик по ссылке (показать уведомление)' },
        // { value: 'клик по соц.сети (показать уведомление)', text: 'клик по соц.сети (показать уведомление)' },
        // { value: 'pause', text: 'Сделать перерыв' },
        // { value: 'continue', text: 'Прервать перерыв' },
        // { value: 'endRecord', text: 'Конец записи' },
        // { value: 'present', text: 'Подарок' },
        // { value: 'link365', text: 'Ссылки (импорт из bizon365)' },
        // { value: 'tariffs', text: 'Изменение блока с тарифами' },
        // { value: 'sendLink', text: 'Отправка в комнату ссылок на соц.сети' },
      ],
      selectedPresentation: null,
      presentationList: [],
      selectedPresentationPos: null,
      presentationPosList: [
        { value: 'broadcastFullscreen', text: 'только трансляция' },
        { value: 'presentationFullscreen', text: 'только презентация' },
        { value: 'left-top', text: 'видео сверху слева' },
        { value: 'right-top', text: 'видео сверху справа' },
        { value: 'left-bottom', text: 'видео снизу слева' },
        { value: 'right-bottom', text: 'видео снизу справа' },
      ],
      slide: null,
      status: true,
      isChatMsg: true,
      isBroadcast: false,
      isButton: false,
      isDeleteButton: false,
      isDeleteChat: false,
      isFixChat: false,
      isBlockChat: false,
      isOffVideo: false,
      isOnVideo: false,
      isPresentation: false,
      isSlide: false,
      isPresentationPos: false,
      broadcastUrl: '',
      // newLinkName: '',
      // newLinkMsg: '',
      colorPickerOpen: false,
      newLinkColor: '#0077FF',
      buttonID: '',
      buttonTitle: '',
      buttonLink: '',
      buttonStatus: '',
      deleteButtonID: '',
      deleteChatID: '',
      fixChatID: '',
      blockChatList: [
        { value: 'Разблокирован', text: 'Разблокирован' },
        { value: 'Заблокирован', text: 'Заблокирован' },
      ],
      selectedBlockChat: 'Разблокирован',
      offVideoID: '',
      offVideoUrl: '',
      onVideoID: '',
      onVideoUrl: '',
      // linkIdEdit: null,
      // editLinkName: '',
      // editLinkMsg: '',
      // editLinkColor: '#0077FF',
      // deleteLinkName: '',
      // deleteLinkMsg: '',
      // deleteLinkColor: '#0077FF',
    }
  },
  props: {
    closeModal: Function,
    saveModal: Function,
    rowData: Object,
    isUpdate: Boolean,
    nbroadcastId: Number,
  },
  mounted() {
    this.broadcastId = this.nbroadcastId
    this.initData()
  },
  methods: {
    initData() {
      if (!this.isUpdate) return
      this.selectedType = this.rowData.actionType
      this.changeEventType()

      this.broadcastId = this.rowData.broadcastId
      this.data = this.rowData.data
      this.logId = this.rowData.logId
      this.note = this.rowData.note
      this.timeshift = this.rowData.timeshift
      this.username = this.rowData.username
      this.txtMessage = this.rowData.message
      this.selectedRole = this.rowData.role

      if (this.selectedType == 'broadcastUrl') {
        this.broadcastUrl = this.rowData.data.broadcastUrl
      } else if (this.selectedType == 'button') {
        this.buttonID = this.rowData.data.buttonID
        this.buttonTitle = this.rowData.data.buttonTitle
        this.buttonLink = this.rowData.data.buttonLink
        this.buttonStatus = this.rowData.data.buttonStatus
        this.buttonColor = this.rowData.data.buttonColor
      } else if (this.selectedType == 'deleteButton') {
        this.deleteButtonID = this.rowData.data.buttonID
      } else if (this.selectedType == 'presentation') {
        this.selectedPresentation = this.rowData.data.filename
      } else if (this.selectedType == 'slide') {
        this.slide = this.rowData.data.slide
      } else if (this.selectedType == 'presentationPos') {
        this.selectedPresentationPos = this.rowData.data.pos
      } else if (this.selectedType == 'deleteChat') {
        this.deleteChatID = this.rowData.data.ID
      } else if (this.selectedType == 'fixChat') {
        this.fixChatID = this.rowData.data.ID
      } else if (this.selectedType == 'blockChat') {
        this.selectedBlockChat = this.rowData.data.ID
      } else if (this.selectedType == 'offVideo') {
        this.offVideoID = this.rowData.data.ID
        this.offVideoUrl = this.rowData.data.url
      } else if (this.selectedType == 'onVideo') {
        this.onVideoID = this.rowData.data.ID
        this.onVideoUrl = this.rowData.data.url
      }

      let tmpTime1 = Math.floor(this.rowData.timeshift / 3_600_000)
      let tmpTime2 = this.rowData.timeshift % 3_600_000
      this.timeHour = (tmpTime1 === 0 ? '' : tmpTime1)

      tmpTime1 = Math.floor(tmpTime2 / 60_000)
      tmpTime2 = tmpTime2 % 60_000
      this.timeMin = (tmpTime1 === 0 ? '' : tmpTime1)

      tmpTime1 = Math.floor(tmpTime2 / 1_000)
      tmpTime2 = tmpTime2 % 1_000
      this.timeSec = (tmpTime1 === 0 ? '' : tmpTime1)
      this.timeMc = (tmpTime2 === 0 ? '' : tmpTime2)
    },
    toggleColorPicker() {
      this.colorPickerOpen = !this.colorPickerOpen
    },
    close() {
      this.closeModal()
    },
    clearTypeFlag() {
      this.isChatMsg = false
      this.isBroadcast = false
      this.isButton = false
      this.isDeleteButton = false
      this.isDeleteChat = false
      this.isFixChat = false
      this.isBlockChat = false
      this.isOffVideo = false
      this.isOnVideo = false
      this.isPresentation = false
      this.isSlide = false
      this.isPresentationPos = false
    },
    async changeEventType() {
      this.clearTypeFlag()

      if (this.selectedType == 'chat') {
        this.isChatMsg = true
      } else if (this.selectedType == 'broadcastUrl') {
        this.isBroadcast = true
      } else if (this.selectedType == 'button') {
        this.isButton = true
      } else if (this.selectedType == 'deleteButton') {
        this.isDeleteButton = true
      } else if (this.selectedType == 'deleteChat') {
        this.isDeleteChat = true
      } else if (this.selectedType == 'fixChat') {
        this.isFixChat = true
      } else if (this.selectedType == 'blockChat') {
        this.isBlockChat = true
      } else if (this.selectedType == 'offVideo') {
        this.isOffVideo = true
      } else if (this.selectedType == 'onVideo') {
        this.isOnVideo = true
      } else if (this.selectedType == 'slide') {
        this.getPDFfiles()
        this.isSlide = true
      } else if (this.selectedType == 'presentation') {
        // get pdf file list
        this.getPDFfiles()
        this.isPresentation = true
      } else if (this.selectedType == 'presentationPos') {
        this.isPresentationPos = true
      } else {
        this.isChatMsg = true
      }
    },
    save() {
      const timeShift = 3600000 * this.timeHour + 60000 * this.timeMin + this.timeSec * 1000 + Math.floor(this.timeMc)
      console.log(timeShift)
      let data = {
        'logId': this.logId,
        'broadcastId': this.broadcastId,
        'actionType': this.selectedType,
        'timeshift': timeShift,
        'data': '{}',
        'username': '',
        'message': '',
        'role': '',
        'note': '',
        'isUpdate': this.isUpdate,
      }

      if (this.selectedType == 'chat') {
        data.username = this.username
        data.message = this.txtMessage
        data.role = this.selectedRole
      } else if (this.selectedType == 'broadcastUrl') {
        data.data = JSON.stringify({
          'broadcastUrl': this.broadcastUrl
        })
      } else if (this.selectedType == 'button') {
        data.data = JSON.stringify({
            'buttonID': this.buttonID,
            'buttonTitle': this.buttonTitle,
            'buttonLink': this.buttonLink,
            'buttonStatus': this.buttonStatus,
            'buttonColor': this.newLinkColor,
          })
      } else if (this.selectedType == 'deleteButton') {
        data.message = 'Удалить кнопку'
        data.data = JSON.stringify({
            'buttonID': this.deleteButtonID,
        })
      } else if (this.selectedType == 'deleteChat') {
        data.message = 'Удалить сообщение из чата'
        data.data = JSON.stringify({
            'ID': this.deleteChatID,
        })
      } else if (this.selectedType == 'fixChat') {
        data.message = 'Закрепить приветственное сообщения в чате'
        data.data = JSON.stringify({
            'ID': this.fixChatID,
        })
      } else if (this.selectedType == 'blockChat') {
        data.message = 'Блокировка/разблокировка чата'
        data.data = JSON.stringify({
            'ID': this.selectedBlockChat,
        })
      } else if (this.selectedType == 'offVideo') {
        data.message = 'Включить видео'
        data.data = JSON.stringify({
            'ID': this.offVideoID,
            'url': this.offVideoUrl
        })
      } else if (this.selectedType == 'onVideo') {
        data.message = 'Вsключить видео'
        data.data = JSON.stringify({
            'ID': this.onVideoID,
            'url': this.onVideoUrl
        })
      } else if (this.selectedType == 'presentation') {
        data.data = JSON.stringify({
            'filename': this.selectedPresentation
          })
      } else if (this.selectedType == 'slide') {
        data.data = JSON.stringify({
            'filename': this.selectedPresentation,
            'slide': this.slide
          })
      } else if (this.selectedType == 'presentationPos') {
        let text = ''
        const val = this.selectedPresentationPos
        if (val == 'broadcastFullscreen') {
          text = 'только трансляция'
        } else if (val == 'presentationFullscreen') {
          text = 'только презентация'
        } else if (val == 'left-top') {
          text = 'видео сверху слева'
        } else if (val == 'right-top') {
          text = 'видео сверху справа'
        } else if (val == 'left-bottom') {
          text = 'видео снизу слева'
        } else if (val == 'right-bottom') {
          text = 'видео снизу справа'
        } else {
          text = 'только трансляция'
        }
        data.data = JSON.stringify({
            'pos': val,
            'text': text,
          })
      } else {

      }
      console.log(data)
      this.saveModal(data)
    },
    async getPDFfiles() {
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
        this.presentationList = []
        for (let i = 0; i < arr.length; i++) {
          const filename = arr[i];
          const item = {
            value: filename,
            text: 'презентации-' + (1+i) + '.pdf'
          }
          this.presentationList.push(item)
        }
        if (this.presentationList.length > 0 ) {
          this.selectedPresentation = this.presentationList[0].value
        }
        if (this.isUpdate) {
          this.selectedPresentation = this.rowData.data.filename
        }
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.modal_window_i {
  align-items: center;
  width: 800px;
  height: auto;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  span {
    font-size: 16px;
    text-align: center;
  }
}

.modal-event-title {
  width: 100%;
}

.modal-event-content {
  padding-left: 50px;
  padding-right: 50px;
}

// .modal-event-content .content-row {
//   margin-top: 15px;
// }

.modal-event-content .label-option {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin-top: 10px;
  text-align: left;
}

.modal-event-content .cbx-allow {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin-top: 10px;

  margin-left: 5px;
}

.modal-event-content .input-option {
  width: 100%;
  height: 31px;
  border: 1px solid #A8ADB8;
  border-radius: 3px;
  margin-top: 5px;
  padding: 10px 10px;
}

.modal-event-content .select-option {
  display: inline-block;
  width: 100%;
  height: 31px;
  border: 1px solid #A8ADB8;
  border-radius: 3px;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  margin-top: 5px;
  line-height: 20px;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E") !important;
  // padding: 10px 10px;
}

.txt-time {
  height: 35px;
  width: 100px;
  border: 1px solid #A8ADB8;
  border-radius: 3px;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  margin-top: 5px;
  line-height: 20px;
}

.row-time-label {
  margin-left: 0px;
  margin-top: 5px;
}

.row-time {
  margin-top: 0px;
}

.mw_up {
  // background-color: #FFDBBA;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 2rem;
  border-bottom: 1px solid #A8ADB8;

  span {
    font-weight: 500 !important;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.6);
  }
}

.modal-event-footer {
  position: relative;
  border-top: 1px solid #A8ADB8;
  height: 70px;
  width: 100%;
}

.modal-event-footer .btn-group {
  position: absolute;
  right: 63px;
  padding-top: 17px;
}

.btn-group .btn-cancel {
  margin-right: 20px;
  border-radius: 3px;
  padding-left: 25px;
  padding-right: 25px;
}

.btn-group .btn-save {
  border-radius: 3px;
  padding-left: 25px;
  padding-right: 25px;
}

.type-group {
  width: 50%;
  height: 75px;
}

.type-btn-group {
  display: flex;
}

.type-img-wrapper {
  padding: 7px 5px;
  margin-right: 10px;
  background-color: #ddd;
  border-radius: 3px;
}

.type-img-wrapper:hover {
    background-color: #79F0AA;
    cursor: pointer;
}

.type-img-wrapper.active {
    background-color: #79F0AA;
    cursor: pointer;
}

.color-text {
  width: 50%;
  height: 75px;
}

.modals__input__color {
  width: 200px;
}

.color__text {
  width: 100%;
  height: 43px;
  border-radius: 3px;
  border: 1px solid #A8ADB8;
  outline: none;
  border-radius: 3px;
  border: 1px solid #A8ADB8;
  padding: 10px;
  color: black;
  text-align: center;
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

input {
  width: 100%;
  height: 43px;
  border-radius: 10px;
  border: 1px solid #A8ADB8;
  outline: none;
}
.modal-event-content {
  max-height: 450px;
  overflow-y: auto;
}
.empty_links {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 60px;
}
.button__add__link {
  display: flex;
  justify-content: center;
}
.add__link {
  border-radius: 10px;
  background: #FE6637;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 25px;
}
.modals__input {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.modal__content1 {
  display: flex;
  flex-direction: column;
  padding: 40px;
}
.title {
  color: #000;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0;
  margin-bottom: 5px;
}
.title > span {
  color: #7A7777;
  font-size: 14px;
  font-weight: 400;
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
.modal__content__image {
  margin: 0 25px;
}
a {
  text-decoration: underline;
}
.update__option {
  margin-top: 15px;
}
.button__chat {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 15px 0;
}
.button__chat__delete {
  width: 107px;
  height: 33px;
  background: #F00;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 10px;
}
.button__chat__update {
  width: 161px;
  height: 33px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #6BC432;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.button__chat__create {
  width: 126px;
  height: 33px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #07F;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.button__chat__delete__webinar {
  width: 210px;
  height: 33px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #8F00FF;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
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
.imageSupport {
  margin-top: 20px;
}

.wait {
  margin-top: 30px;
  margin-bottom: 25px;
  color: #000;
  text-align: center;
  font-weight: 400;
}

.btn_y {
  width: 35%;
  height: 40px;
  border-radius: 10px;
  background: #FE6637;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 30px;
}

.close_btn {
  cursor: pointer;
}
.color-picker-wrapper {
  position: absolute;
  z-index: 9999;
}

@media screen and (max-width: 900px) {
  .modal_window_i {
    width: 90%;
  }
  .row-time .col {
    padding-right: 5px;
    padding-left: 5px;
  }
}
@media screen and (max-width: 600px) {
  .modal-event-content .label-option {
    font-size: 15px;
  }
}
@media screen and (max-width: 470px) {
  .modal-event-content {
    max-height: 400px;
  }
  .modal_window_i1 {
    width: 90%;
  }
  .button__chat {
    flex-direction: column;
  }
  .button__chat > button {
    width: 100%;
  }
  .modal__content {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .modals__input__color {
    display: flex;
    gap: 10px;
  }
  .mw_up {
    height: 50px;
  }
  .mw_up span {
    font-size: 15px;
  }
  .modal-event-content {
    padding-left: 10px;
    padding-right: 10px;
  }
  .modal-event-content .label-option {
    font-size: 14px;
    line-height: 16px;
    margin-top: 5px;
    margin-bottom: 0px;
  }
  .modal-event-content .input-option {
    margin-top: 1px;
  }
  .input-group-append .input-group-text {
    padding: 3px;
  }
  .row-time .col[data-v-618bbb26] {
    padding-right: 0px;
    padding-left: 0px;
  }
  .row-time {
    width: 100%;
    margin: 0px;
  }
  .row-time-label {
    margin-right: 0px;
  }
  .modal-event-footer .btn-group {
    right: 25px;
    padding-top: 10px;
  }
  .btn-group .btn-cancel {
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .btn-group .btn-save {
    border-radius: 3px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .type-img-wrapper {
    padding: 7px 1px;
    margin-right: 1px;
    border-radius: 3px;
  }
  .type-btn-group {
    justify-content: space-evenly;
    width: 100%;
  }
  // .type-group {
  //   width: 40%;
  // }
  .modals__input__color {
    width: 100px;
  }
  .color__text {
    margin-top: 22px;
  }
  .color-picker {
    width: 180px;
    font-size: 12px;
  }
}
@media screen and (max-width: 375px) {
  .color-picker {
    width: 150px;
  }
}
@media screen and (max-width: 350px) {
  .color-picker {
    width: 125px;
  }
}

</style>
