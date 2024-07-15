<template>
  <v-dialog
    v-model="banWordsModal"
    width="551px"
    style="border-radius: 15px"
  >
    <template v-slot:activator="{ on, attrs }">
      <button
        class="add__title"
        v-bind="attrs"
        v-on="on"
      >
        Добавить свои слова
      </button>
    </template>

    <v-card class="modal__container">
      <div class="modal__header">
        <div class="flex modal__title">
          Добавление запрещенных слов
        </div>
        <div
          class="modal__close"
          @click="() => {banWordsModal = false}"
        >
          <img src="../static/svg/radix-icons_cross-circled.svg" alt=""/>
        </div>
      </div>
      <div class="flex" style="width: 100%; height: 70px; justify-content: center; justify-items: center; margin-bottom: 20px">
        <div class="flex" style="width: 90%">
          <textarea
            class="add__textarea"
            placeholder="Напишите через пробел слова, которые хотите добавить..."
            v-model="banWord"
          />
        </div>
      </div>
      <div class="add__button__container">
        <button
          class="add__button"
          @click="addBanWord"
        >
          Добавить свои слова
        </button>
      </div>
      <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 10px">
        <div style="width: 90%">Список запрещенных слов:</div>
      </div>
      <div class="flex" style="width: 100%; justify-content: center">
        <div class="ban_words__list">
          <div v-for="word of banWords" class="flex" style="flex-grow: 0; flex-direction: row; justify-content: space-between; width: 90%">
            <div>{{word}}</div>
            <div
              style="margin-left: auto; cursor: pointer"
              @click="deleteBanWord"
            >
              <img src="../static/svg/radix-icons_cross-2.svg" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BanWordsSettings',
  props: {
    banWords: Array,
  },
  data() {
    return {
      banWordsModal: false,
      banWord: '',
    }
  },
  methods: {
    addBanWord() {
      if (!this.banWords.find((word) => word === this.banWord)) {
        const trimWords = this.banWord.trim()
        const words = trimWords.split(' ')

        if (words.length > 1) {
          words.forEach((word) => {
            const trimWord = word.trim()
            if (trimWord) {
              this.banWords.push(trimWord)
            }
          })
        } else {
          this.banWords.push(this.banWord)
        }
      }
    },
    deleteBanWord() {
      this.banWords = this.banWords.filter((word) => word !== this.banWord)
    }
  }
}
</script>

<style>
ul {
  list-style-type: none;
}

.add__textarea {
  display: block;
  width: 90%;
  height: 70px;
  border: 1px solid #A8ADB8;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
}

.flex {
  display: flex;
}

.modal__container {
  width: 551px;
  height: 374px;
  border-radius: 15px !important;
  background: #FFFFFF;
}

.modal__header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  top: 0;
  height: 59px;
  background: #FFDBBA;
  margin-bottom: 20px;
  border-radius: 15px !important;
}

.modal__title {
  margin-left: 20px;
}

.modal__close {
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
}

.add__title {
  background: #FE6637;
  border-radius: 10px;
  margin-left: 20px;
  width: 20%;
  height: 40px;
  line-height: 16px;
}

.add__button {
  width: 149px;
  height: 29px;
  background: #FE6637;
  color: white;
  border-radius: 5px;
  margin-bottom: 20px;
}

.ban_words__list {
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
  width: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1px solid #A8ADB8;
  border-radius: 15px;
}

.add__button__container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
}

@media screen and (max-width: 769px) {
  .add__title {
    width: 189px;
    margin-left: 0;
    margin-right: 5px;
  }
}


@media screen and (max-width: 470px) {
  .room_checkbox .add__title {
    width: 100px;
    margin-left: 10px;
    margin-top: 10px;
  }
}

</style>
