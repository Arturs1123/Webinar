<template>
  <div :style="{
    ...backgroundImage,
    'min-height': '100vh',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    'justify-content': 'center'
  }">
    <v-container>
      <div :style="{
        'min-height': '100vh',
        height: '100vh',
        overflow: 'hidden',
      }">
        <div class="sektet__fons">
<!--          <img :src="background" alt="">-->
          <div v-if="!isLoad" class="sekret__form">
            <div v-if="!isNotFound" class="form__sign" action="">
              <img class="close_btn" @click="roomOut" src="../../static/svg/close.svg" alt="Nope">
              <div class="form__buttons" style="display: none;">
                <button style="border-radius: 7px;" class="form__button__sign" @click="">Вход на Мастер-Класс</button>
              </div>
              <div class="sektet__forms">
                <p class="sekret__title">Тема: {{ title }}</p>
              </div>
              <div class="author__info">
                <p style="margin-left: 30px; margin-right: 30px" class="author__title">Ведущий</p>
                <div class="form__author">
                  <v-avatar size="120" style="margin-left: 30px; margin-right: 30px">
                    <v-img
                      :src="authorAvatar"
                      alt="Фото не загружено"
                    ></v-img>
                  </v-avatar>
                  <p class="author__name">{{ author }} <br> <span>“{{ userStatus }}”</span></p>
                </div>
              </div>
              <div class="form__prod">
                <p class="form__date">Дата проведения:</p>
                <p class="form__date__number">
<!--                  <v-icon style="margin-right: 10px" aria-label="My Account" role="img" aria-hidden="false">-->
<!--                    mdi-clock-time-nine-outline-->
<!--                  </v-icon>-->
                  {{dateStartPole}}
                </p>
              </div>
              <div class="form__input" v-if="!user">
                <label class="label__name" for="">Введите ваше имя:</label>
                <input
                  v-model="nameGhoste"
                  class="form__inputs"
                  placeholder="Например, Иван Петров"
                  type="text"
                  name=""
                  id=""
                  :style="(error) ? 'background: #FFD9D9; border: 1px solid #FF0000;' : ''"
                >
              </div>
              <div class="form__button">
                <button
                  class="form__button__sign"
                  @click="sign"
                >
                  {{ buttonEnteringPage }}
                </button>
                <NuxtLink
                  v-if="additionalLinkEnterRoom"
                  is="a"
                  :to="additionalLinkEnterRoom"
                  :href="additionalLinkEnterRoom"
                  target="_blank"
                >
                  <button class="form__button__additional_link">
                    Мини-презентация
                  </button>
                </NuxtLink>
                <p class="form__button__title" style="color: red; font-size: 20px">{{ error }}</p>
                <p class="form__button__title">Заполняя эту форму вы соглашаетесь на обработку персональных данных</p>
              </div>
            </div>
            <div v-else>Вебинар не найден или закончен</div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import moment from 'moment-timezone'
export default {
  name: "s",
  async mounted() {
    const webinarSearch = this.$route.params.s;
    const routePath = this.$route.path
    console.log(this.$route)
    console.log(routePath)
    this.isAutowebinar = (localStorage.getItem('isAutowebinar')) ? (localStorage.getItem('isAutowebinar')) : 0


    this.webinar = await this.$axios.get(`/webinars/prettyLink?prettyLink=${webinarSearch}&isAutowebinar=${this.isAutowebinar}`)
      .then(data => {
        console.log(data)
        console.log(data.data.additionalLinkEnterRoom)
        
        this.userStatus = data.data.userStatus
        this.author = data.data.userName
        this.title = data.data.title
        this.dateStart = data.data.dateStart
        this.dateStartPole = this.$moment(this.dateStart).format("DD.MM.YYYY в hh:mm мск")
        this.authorAvatar = this.$config.staticURL + '/' + data.data.userAvatar
        this.additionalLinkEnterRoom = data.data.additionalLinkEnterRoom
        this.status = data.data.status
        this.buttonEnteringPage = data.data.buttonEnteringPage
        this.redirectLeaveEnteringPage = data.data.redirectLeaveEnteringPage ? data.data.redirectLeaveEnteringPage : 'http://neearby.pro'

        if (data.data.backgroundImageStandard) {
          this.backgroundImage = {
            'background-image': `url('${this.$config.staticURL + '/' + data.data.backgroundImageStandard}')`,
            'background-size': '100% 100%',
          }
        }

        const banWords = data.data.banWords?.split('; ')

        if (banWords?.length && banWords[0]) {
          this.banWords = banWords
        }

        return data.data
      })
      .catch(e => {
        this.isNotFound = true
      })

    if (this.webinar.status == 2) {
      this.isNotFound = true
    }
    console.log(this.status)
    this.isLoad = false

    this.interval()
    let userData = null
    const nameGhoste = localStorage.getItem("nameGhoste")

    if (localStorage.getItem("token")) {
      userData = await this.$axios.post(
        `/auth/check-user-token`,
        {
          token: localStorage.getItem("token"),
        }
      )
        .catch(e => {
          console.log('user not found')
        })
      if (userData && userData.data?.id) {
        this.user = userData.data
      }
    } else if (localStorage.getItem("nameGhoste") && !nameGhoste.includes('победитель')) {
      userData = await this.$axios.get(
        '/users/ghostes',
        {
          params: {
            name: localStorage.getItem("nameGhoste"),
            webinarId: this.webinar.id,
          }
        }
      )
        .catch(e => {
          console.log('ghoste not found')
        })
      if (userData && userData.data?.name) {
        this.user = userData.data
      }

    }

    this.$forceUpdate()
  },
  data() {
    return {
      user: null,
      error: "",
      title: "",
      author: "",
      dateStartPole: "",
      authorAvatar: "",
      dateStart: "",
      isLoad: true,
      isNotFound: false,
      webinar: {},
      userStatus: "",
      nameGhoste: "",
      background: "",
      backgroundImage: {
        background: 'rgb(237, 238, 240)',
      },
      additionalLinkEnterRoom: '',
      tryClickPopupWithoutLoginAlert: false,
      banWords: [],
      status: 0,
      buttonEnteringPage: '',
      redirectLeaveEnteringPage: '',
    }
  },
  methods: {
    interval(){
      if (this.status) {
        this.dateStartPole = "В эфире"
        return
      }

      const int = setInterval(()=> {
        if (this.status) {
          this.dateStartPole = "В эфире"
          clearInterval(int)
          return
        }

        const dateStart = new Date(this.dateStart)
        const now = new Date()

        const diff = dateStart - now

        if (diff < 0 && status == 0) {
          this.dateStartPole = "В эфире"
          return
        }

        const secDiff = diff / 1000
        const minDiff = diff / 60 / 1000
        const hDiff = diff / 3600 / 1000

        if (hDiff > 3) {
          this.dateStartPole = moment(dateStart).tz('Europe/Moscow').format("DD.MM.YYYY в hh:mm мск")
          return
        }

        if (hDiff <= 3 && hDiff >= 2) {
          this.dateStartPole = `Начало через ${hDiff.toFixed()} часа`
          return
        }

        if (hDiff < 2 && hDiff - 1 >= 0) {
          this.dateStartPole = `Начало через 1 час ${minDiff.toFixed() - 60} мин.`
          return
        }

        if (minDiff > 10) {
          this.dateStartPole = `Начало через ${minDiff.toFixed()} мин.`
        }
        else if (minDiff > 1 && minDiff < 10){
          this.dateStartPole = `Начало через ${minDiff.toFixed()} мин. ${(30 + (secDiff - 60 * minDiff.toFixed())).toFixed()} сек.`
        }
        else {
          this.dateStartPole = `Начало через ${(30 + (secDiff - 60 * minDiff.toFixed())).toFixed()} сек.`
        }
      }, 500)
    },
    async sign() {
      if (!this.user) {
        const trimmedNameGhoste = this.nameGhoste.trim()
        if (trimmedNameGhoste.length < 2) {
          return this.error = "Имя должно содержать минимум 2 символа"
        } else if (trimmedNameGhoste.length > 128) {
          return this.error = "Слишком длинное имя"
        }

        if (this.banWords.some((banWord) => trimmedNameGhoste.toLowerCase().includes(banWord.toLowerCase().trim()))) {
          return this.error = "Имя содержит запрещенные слова"
        }

        let candidate = null

        try {
          candidate = await this.$axios.$get(
            '/users/ghostes',
            {
              params: {
                name: trimmedNameGhoste,
                webinarId: this.webinar.id,
              }
            }
          )
        } catch(err) {
          this.error = 'Произошла ошибка при проверке польователя'
          return
        }

        if (candidate) {
          this.error = 'Пользователь с таким именем уже существует'
          return
        }

        try {
          const res = await this.$axios.post(
            '/users/ghostes',
            {
              name: trimmedNameGhoste,
              webinarId: this.webinar.id,
              translationId: null,
            }
          )

          if (res.status !== 201) {
            throw new Error()
          }
        } catch(err) {
          this.error = 'Произошла ошибка при сохранении польователя'
          return
        }

        localStorage.setItem("nameGhoste", trimmedNameGhoste)
      }
      if (localStorage.getItem('isAutowebinar') == 0) {
        await this.$router.push(`/w/${this.$route.params.s}`)
      } else {
        await this.$router.push(`/a/${this.$route.params.s}`)
      }
    },
    roomOut() {
      window.location.href= this.redirectLeaveEnteringPage
    }
  }
}
</script>

<style scoped>
.author__info {
  /* display: flex;
  justify-content: flex-start;
  align-items: start; */
}
.sektet__fons {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}

.sektet__fons > img {
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
}

.form__sign {
  width: 100%;
  height: auto;
  min-height: 450px;
  max-height: 750px;
  overflow-y: auto;
  left: -1px;
  top: 19px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  position: relative;
}

.sekret__form {
  display: flex;
  align-self: center;
  justify-content: center;
  width: 50%;
  position: relative;
}

.form__author {
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.form__prod {
  display: flex;
  flex-direction: column;
  padding: 35px 0px 0px 30px;
}

.form__input {
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0px 30px;
  margin-top: 20px;
}

.form__inputs {
  width: 90%;
  height: 35px;
  left: 44px;
  top: 412px;
  background: white;
  border: 1px solid #000000;
  border-radius: 5px;
  outline: none;
  padding: 20px;
  margin-top: 5px;
}

.form__button__sign {
  width: auto;
  min-width: 40%;
  /* height: 39px; */
  padding: 16px 25px;
  left: 182px;
  top: 477px;
  color: white;
  background: #FE6637;
  border-radius: 3px;
}

.form__button__additional_link {
  width: auto;
  height: 39px;
  margin-top: 10px;
  padding: 5px 10px 5px 10px;
  align-content: center;
  color: white;
  background-color: rgba(0, 163, 255, 1);
  border-radius: 3px;
}

.form__button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.form__buttons {
  position: relative;
  bottom: 20px;
  left: 25px;
}

.form__button__title {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #A8ADB8;
  margin-top: 10px;
}

.sekret__title {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  color: #000000;
  padding: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.author__title {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #535353;
}

.author__name {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}

.author__name > span {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
}

.form__date {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #535353;
}

.form__date__number {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}

.label__name {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #535353;
}

.form__author > img {
  margin-left: 50px;
  margin-right: 20px;
}

.close_btn {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}

@media (min-width: 1264px) {
  .container {
    width: 100%;
    max-width: 100%;
    padding: 0;
  }
}


@media screen and (max-width: 769px) {
  .sekret__form {
    width: 100%;
  }
}

@media screen and (max-width: 470px) {
  .author__title {
    margin-right: 10px !important;
  }
  .v-avatar {
    margin-left: 10px !important;
    margin-right: 10px !important;
    height: 60px !important;
    min-width: 60px !important;
    width: 60px !important;
  }
  p {
    margin-bottom: 0;
  }

  .sekret__form {
    width: 100%;
  }

  .form__button__sign {
    width: 80%;
  }

  .form__author > img {
    margin-left: 20px;
  }

  .author__title {
    margin-left: 30px;
  }

  .container {
    width: 100%;
  }

  .form__button__title {
    margin-bottom: 30px;
  }
}

</style>
