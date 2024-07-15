<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up modal-event-header">
        <span class="modal-event-title">Перемещение событий по шкале времени</span>
        <img class="close_btn" @click="close" src="../../static/svg/close.svg" alt="Nope">
      </div>
      <div class="modal-event-content ">
        <div class="content-row slider-wrapper" >
          <vue-slider v-model="upTimeshift" :min="0" :max="3600" :height="6"
                      @change="changeSlider"
                      :barStyle="{ backgroundColor: '#00ff00' }"
                      :dotStyle="{ backgroundColor: '#007bff' }"
                      :processStyle="{ backgroundColor: '#007bff' }"
          />
        </div>
        <div class="content-row timeline-row" >
          <input class="input-option timeline-value" readonly type="text" v-model="txtTimeshift">
          <label class="label-option" style="color: #827f7f; font-size: 16px;">-относительно начала сценария</label>
        </div>
        <div class="content-row text-row" >
          <span>Если какие-то события выделены, перемещаются они</span> <br/>
          <span>Если ничего не выделено - перемещаются <b>все события</b> в сценария</span>
        </div>
        <div class="content-row" style="margin-bottom: 40px;">
          <label class="label-option" style="font-size: 16px;"><b>События будут перемещены в указанную временную метку</b></label>
        </div>

      </div>
      <div class="modal-event-footer">
        <div class="btn-group">
          <b-button @click="close" variant="outline-secondary" class="btn-cancel">Отмена</b-button>
          <b-button @click="save" variant="primary" class="btn-save">
            Переместить
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

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "addInChat",
  components: {
    TextareaEmojiPicker ,
    BFormSelect, BFormCheckbox, BInputGroup, BFormInput, BInputGroupText, BRow, BCol, BButton, BIcon,
    VueSlider
  },
  data () {
    return {
      upTimeshift: 0,
      txtTimeshift: '',
    }
  },
  props: {
    closeModal: Function,
    saveModal: Function,
  },
  methods: {
    changeSlider() {
      this.txtTimeshift = ''
      let tmpTime1 = Math.floor(this.upTimeshift / 3_600)
      let tmpTime2 = this.upTimeshift % 3_600
      this.txtTimeshift += (tmpTime1 === 0 ? '' : tmpTime1 + ' ч ' )

      tmpTime1 = Math.floor(tmpTime2 / 60)
      tmpTime2 = tmpTime2 % 60
      this.txtTimeshift += (tmpTime1 === 0 ? '' : tmpTime1 + ' мин ' )

      this.txtTimeshift += (tmpTime2 === 0 ? '' : tmpTime2 + ' сек ' )

      if (this.txtTimeshift !== '') {
        this.txtTimeshift = '+' + this.txtTimeshift
      }
    },
    close() {
      this.closeModal()
    },
    save() {
      this.saveModal(this.upTimeshift)
    },
  }
}


</script>

<style lang="scss" scoped>
.slider-wrapper
{
  margin-top: 40px;
}

.timeline-row {
  margin-top: 20px;
}

.timeline-value {
  width: 200px;
  margin-right: 50px;
  cursor: no-drop;
}

.text-row {
  margin-top: 20px;
}

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
  border-radius: 3px;
  border: 1px solid #A8ADB8;
  padding: 10px;
  color: black;
  text-align: center;
}

.vue-slider-rail {
    background-color: #df0000 !important;
}

// .vue-slider-rail {
//   background-color: #0000ff !important;
// }

// .vue-slider-dot {
//   background-color: rgb(0, 0, 255) !important;
//   border-radius: 50px !important;
//   cursor: pointer !important;
// }

// .vue-slider-process {
//   background-color: #ff0000 !important;
// }

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

input {
  width: 100%;
  height: 43px;
  border-radius: 10px;
  border: 1px solid #A8ADB8;
  outline: none;
}
.modal-event-content {
  width: 100%;
  max-height: 580px;
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

@media screen and (max-width: 470px) {
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
}

</style>
