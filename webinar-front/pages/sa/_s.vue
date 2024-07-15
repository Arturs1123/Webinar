<template>
  <div class="sektet__fons">
    <img v-if="isBackground" :src="background" >
    <div v-if="!isLoad" class="sekret__form">
      <div v-if="!isNotFound" class="form__sign" action="">
        <div class="form__buttons">
          <button style="border-radius: 7px;" class="form__button__sign" @click="">Вход на Мастер-Класс</button>
        </div>
        <div class="sektet__forms">
          <p class="sekret__title">Тема: {{ title }}</p>
        </div>
        <p style="margin-left: 30px; margin-right: 30px" class="author__title">Ведущий</p>
        <div class="form__author">
          <v-avatar size="70" style="margin-left: 30px; margin-right: 30px">
            <v-img
              :src="authorAvatar"
              alt="Фото не загружено"
            ></v-img>
          </v-avatar>
          <p class="author__name">{{ author }} <br> <span>“{{ userStatus }}”</span></p>
        </div>
        <div class="form__prod">
          <p class="form__date">Дата проведения:</p>
          <p class="form__date__number"> <v-icon style="margin-right: 10px" aria-label="My Account" role="img" aria-hidden="false">
            mdi-clock-time-nine-outline
          </v-icon>{{dateStartPole}}</p>
        </div>
        <div class="form__input">
          <label class="label__name" for="">Введите ваше имя:</label>
          <input v-model="nameGhoste" class="form__inputs" placeholder="Например, Иван Петров" type="text" name=""
                 id="">
        </div>
        <div class="form__button">
          <button class="form__button__sign" @click="sign">Войти в комнату</button>
          <p class="form__button__title" style="color: red; font-size: 20px">{{ error }}</p>
          <p class="form__button__title">Заполняя эту форму вы соглашаетесь на обработку персональных данных</p>
        </div>
      </div>
      <div v-else>Вебинар не найден или закончен</div>
    </div>
  </div>
</template>
<script>

export default {
  name: "s",
  async mounted() {
    const webinarSearch = this.$route.params.s;

    this.webinar = await this.$axios.get(`/webinars/prettyLink?prettyLink=${webinarSearch}`)
      .then(data => {
        this.userStatus = data.data.userStatus
        this.author = data.data.userName
        this.title = data.data.title
        this.dateStart = data.data.dateStart
        this.dateStartPole = this.$moment(this.dateStart).format("DD.MM.YYYY в hh:mm мск")
        this.background = `/files/photo?filename=${data.data.backgroundIn}`
        this.authorAvatar = `/files/photo?filename=${data.data.userAvatar}`
        if (data.data.backgroundIn != '' && data.data.backgroundIn != null && data.data.backgroundIn != undefined )
          this.isBackground = true
        return data.data
      })
      .catch(e => {
        this.isNotFound = true
      })

    if (this.webinar.status == 2) {
      this.isNotFound = true
    }

    this.isLoad = false

    this.interval()
  },
  data() {
    return {
      isBackground: false,
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
      background: ""
    }
  },
  methods: {
    interval(){
      if (this.status == 1) {
        this.dateStartPole = "В эфире"
        return
      }

      const int = setInterval(()=> {
        if (this.status == 1) {
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
          this.dateStartPole = "Дата начала  " + this.$moment(dateStart).format("DD.MM.YYYY в hh:mm мск")
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
      if (this.nameGhoste.length < 2) {
        return this.error = "Имя должно содержать минимум 2 символа"
      }

      localStorage.setItem("nameGhoste", this.nameGhoste)

      await this.$router.push(`/w/${this.$route.params.s}`)
    }
  }
}
</script>

<style scoped>
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
  left: -1px;
  top: 19px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  padding: 10px;
}

.sekret__form {
  display: flex;
  align-self: center;
  justify-content: center;
  width: 40%;
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
  background: #FFD9D9;
  border: 1px solid #FF0000;
  border-radius: 5px;
  outline: none;
  padding: 20px;
  margin-top: 5px;
}

.form__button__sign {
  width: 40%;
  height: 39px;
  left: 182px;
  top: 477px;
  color: white;
  background: #FE6637;
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
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #A8ADB8;
  margin-top: 5px;
  margin-bottom: 10px;
}

.sekret__title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 550;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  padding: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.author__title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #535353;
}

.author__name {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
}

.author__name > span {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin-top: 10px;
}
p {
  margin-bottom: 0;
}

.form__date {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 5px;
  color: #535353;
}

.form__date__number {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}

.label__name {
  font-family: 'Inter';
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
  .form__button__sign {
    font-size: 14px;
  }
  p {
    margin-bottom: 0;
  }

  .sekret__form {
    width: 90%;
  }

  .form__button__sign {
    width: 70%;
  }

  .sekret__title {
    padding: 10px;
  }
  .form__prod {
    padding: 15px;
  }
  .form__author {
    align-items: center;
  }

  .form__author > img {
    margin-left: 20px;
  }

  .author__title {
    margin-left: 30px;
  }


  .form__button__title {
    font-size: 14px;
    padding-left: 15px;
    margin-bottom: 30px;
  }
  .sektet__fons > img {
    width: auto;
  }
}

</style>
