<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up">
        <span>Добавить в чат</span>
        <img class="close_btn" @click="close" src="../../static/svg/close.svg" alt="Nope">
      </div>
      <div class="links__container">
        <div v-for="(link, idx) in links">
          <div class="update__option">
          <span class="wait">{{ link.nameLink }}. [Цвет кнопки: <span :style="{color: link.colorLink}">{{ link.colorLink }}</span>]<br>
            <a :href="link.msgLink + ' '">{{ link.msgLink }}</a>
          </span>
            <div class="button__chat">
              <button @click="openDeleteLinkFromWebinar(link)" class="button__chat__delete">Удалить</button>
              <button @click="openEdit(idx)" class="button__chat__update">Редактировать</button>
              <button @click="sendLink(link, idx)" class="button__chat__create">Отправить</button>
              <button @click="openDelete(idx)" class="button__chat__delete__webinar">Удалить из вебинара</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!links.length" class="empty_links">
        Ссылок пока нет
      </div>
      <button @click="dialog2 = true" class="btn_y">Добавить ссылку</button>
    </div>
    <div class="dialog1">
      <v-row justify="center">
        <v-dialog v-model="dialog" width="auto">
          <v-card>
            <div class="modal_window">
              <div class="modal_window_i1">
                <div class="mw_up">
                  <span>Подтверждение действия</span>
                  <img @click="dialog = false" class="close_btn" src="../../static/svg/close.svg" alt="Nope">
                </div>
                <div class="modal__content">
                  <div class="modal__content__image">
                    <img src="../../static/deleteMessage.png" alt="">
                  </div>
                  <div>
                    <span>Вы уверены, что хотите удалить все <br> сообщения из чата?</span>
                    <div class="modal__button">
                      <button @click="deleteLink" class="modal__button__yes">Да, удалить</button>
                      <button @click="dialog = false" class="modal__button__no">Нет, оставить</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div class="dialog2">
      <v-row justify="center">
        <v-dialog v-model="dialog2" width="auto">
          <v-card>
            <div class="modal_window">
              <div class="modal_window_i1">
                <div class="mw_up">
                  <span>Добавить ссылку</span>
                  <img @click="dialog2 = false" class="close_btn" src="../../static/svg/close.svg" alt="Nope">
                </div>
                <div class="modal__content1">
                  <div class="modals__input">
                    <div>
                      <p class="title">Текст ссылки: <span>(не больше 50 символов)</span> </p>
                      <input v-model="newLinkName">
                    </div>
                    <div>
                      <p class="title">Ссылка: </p>
                      <input v-model="newLinkMsg">
                    </div>
                    <div class="modals__input__color">
                      <p class="title">Цвет кнопки: </p>
                      <button
                        class="color__text"
                        @click="toggleColorPicker"
                        :style="{background: newLinkColor}">{{ newLinkColor }}
                      </button>
                      <v-color-picker
                        v-if="colorPickerOpen"
                        v-model="newLinkColor"
                      />
                    </div>
                    <div class="button__add__link">
                        <button class="add__link" @click="addLink">Добавить еще ссылку</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div class="dialog3">
      <v-row justify="center">
        <v-dialog v-model="dialog3" width="auto">
          <v-card>
            <div class="modal_window">
              <div class="modal_window_i1">
                <div class="mw_up">
                  <span>Редактировать ссылку</span>
                  <img @click="dialog3 = false" class="close_btn" src="../../static/svg/close.svg" alt="Nope">
                </div>
                <div class="modal__content1">
                  <div class="modals__input">
                    <div>
                      <p class="title">Текст ссылки: <span>(не больше 50 символов)</span> </p>
                      <input v-model="editLinkName">
                    </div>
                    <div>
                      <p class="title">Ссылка: </p>
                      <input v-model="editLinkMsg">
                    </div>
                    <div class="modals__input__color">
                      <p class="title">Цвет кнопки: </p>
                      <button
                        class="color__text"
                        @click="toggleColorPicker"
                        :style="{background: editLinkColor}">{{ editLinkColor }}
                      </button>
                      <v-color-picker
                        v-if="colorPickerOpen"
                        v-model="editLinkColor"
                      />
                    </div>
                    <div class="button__add__link">
                      <button class="add__link" @click="editLink">Сохранить изменения</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div class="dialog4">
      <v-row justify="center">
        <v-dialog v-model="dialog4" width="auto">
          <v-card>
            <div class="modal_window">
              <div class="modal_window_i1">
                <div class="mw_up">
                  <span>Подтверждение действия</span>
                  <img @click="dialog4 = false" class="close_btn" src="../../static/svg/close.svg" alt="Nope">
                </div>
                <div class="modal__content">
                  <div class="modal__content__image">
                    <img src="../../static/deleteMessage.png" alt="">
                  </div>
                  <div>
                    <span>Вы уверены, что хотите удалить все .</span>
                    <div class="modal__button">
                      <button @click="deleteLinkFromWebinar" class="modal__button__yes">Да, удалить</button>
                      <button @click="dialog4 = false" class="modal__button__no">Нет, оставить</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "addInChat",
  data () {
    return {
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      newLinkName: '',
      newLinkMsg: '',
      newLinkColor: '#0077FF',
      colorPickerOpen: false,
      linkIdEdit: null,
      editLinkName: '',
      editLinkMsg: '',
      editLinkColor: '#0077FF',
      deleteLinkName: '',
      deleteLinkMsg: '',
      deleteLinkColor: '#0077FF',
      link: null,
    }
  },
  props: {
    closeModal: Function,
    links: Array,
  },
  methods: {
    toggleColorPicker() {
      this.colorPickerOpen = !this.colorPickerOpen
    },
    addLink() {
      this.$emit(
        'add-link',
        JSON.stringify({
          nameLink: this.newLinkName,
          msgLink: (this.newLinkMsg.startsWith('http')) ? this.newLinkMsg : `https://${this.newLinkMsg}`,
          colorLink: this.newLinkColor,
        })
      )
      this.newLinkName = ''
      this.newLinkMsg = ''
      this.dialog2 = false
    },
    sendLink(link, idx) {
      console.log('link: ', link)
      console.log('idx: ', idx)
      this.$emit(
        'send-link',
        JSON.stringify(link),
        idx,
      )
    },
    editLink() {
      this.$emit(
        'edit-link',
        JSON.stringify({
          nameLink: this.editLinkName,
          msgLink: (this.editLinkMsg.startsWith('http')) ? this.editLinkMsg : `https://${this.editLinkMsg}`,
          colorLink: this.editLinkColor,
          oldNameLink: this.oldLinkName,
          oldMsgLink: this.oldLinkMsg,
          oldColorLink: this.oldLinkColor,
        })
      )

      this.linkIdEdit = null
      this.editLinkName = ''
      this.editLinkMsg = ''
      this.editLinkColor = '#0077FF'
      this.oldLinkName = ''
      this.oldLinkMsg = ''
      this.oldLinkColor = '#0077FF'
      this.dialog3 = false
    },
    deleteLink() {
      this.$emit(
        'delete-link',
        JSON.stringify({
          nameLink: this.deleteLinkName,
          msgLink: this.deleteLinkMsg,
          colorLink: this.deleteLinkColor,
        })
      )

      this.linkIdEdit = null
      this.deleteLinkName = ''
      this.deleteLinkMsg = ''
      this.deleteLinkColor = '#0077FF'
      this.dialog = false
    },
    deleteLinkFromWebinar() {
      this.$emit(
        'delete-link-from-webinar',
        JSON.stringify(this.link)
      )
      this.link = null
      this.dialog4 = false
    },
    openEdit(idx) {
      this.linkIdEdit = idx
      this.editLinkName = this.links[idx].nameLink
      this.editLinkMsg = this.links[idx].msgLink
      this.editLinkColor = this.links[idx].colorLink

      this.oldLinkName = this.links[idx].nameLink
      this.oldLinkMsg = this.links[idx].msgLink
      this.oldLinkColor = this.links[idx].colorLink
      this.dialog3 = true
    },
    openDelete(idx) {
      this.linkIdEdit = idx
      this.deleteLinkName = this.links[idx].nameLink
      this.deleteLinkMsg = this.links[idx].msgLink
      this.deleteLinkColor = this.links[idx].colorLink
      this.dialog = true
    },
    openDeleteLinkFromWebinar(link) {
      this.link = link
      this.dialog4 = true
    },
    close() {
      this.closeModal()
    },
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  height: 43px;
  border-radius: 10px;
  border: 1px solid #A8ADB8;
  outline: none;
}
.links__container {
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
.color__text {
  border-radius: 10px;
  border: 1px solid #A8ADB8;
  //background: #07F;
  width: 30%;
  padding: 10px;
  color: black;
  text-align: center;
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

  .modal_window_i {
    align-items: center;
    width: 720px;
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
}
.imageSupport {
  margin-top: 20px;
}

.mw_up {
  background-color: #FFDBBA;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 2rem;

  span {
    font-weight: 500 !important;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
  }
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

@media screen and (max-width: 700px) {
  .modal_window_i1 {
    width: 90%;
  }
  .button__chat {
    gap: 5px;
    margin: 5px 0px;
  }
  .button__chat > button {
    width: 130px;
    font-size: 13px;
  }
  .update__option {
    margin-top: 5px;
  }
}

@media screen and (max-width: 550px) {
  .modal_window_i1 {
    width: 90%;
  }
  .button__chat {
    gap: 5px;
    margin: 5px 0px;
  }
  .button__chat > button {
    width: 100px;
    font-size: 13px;
  }
  .update__option {
    margin-top: 5px;
  }
}

@media screen and (max-width: 470px) {
  .modal_window_i1 {
    width: 90%;
  }
  .button__chat {
    gap: 5px;
    margin: 5px 0px;
  }
  .button__chat > button {
    width: 75px;
    font-size: 13px;
  }
  .update__option {
    margin-top: 5px;
  }
  .modal__content {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .modal__content1 {
    height: 400px;
    overflow: scroll;
    padding: 10px;
  }
  .title {
    font-size: 17px !important;
  }
  .modals__input__color {
    display: flex;
    gap: 5px;
    flex-direction: column;
  }
  .btn_y {
    width: 45%;
  }
}

</style>
