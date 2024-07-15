<template>
  <div>
    <Header />

    <div class="main__content">
      <div class="content__sidebar__menu">
        <SidebarMenu/>
      </div>
      <div class="content__createwebinar">
        <div class="webinar__autowebinar">
          <img src="../static/svg/webinar.svg" alt="">
          <p class="webinar__title">Вебинар | Автовебинар</p>
        </div>
        <div class="create__webinar">
          <div class="webinar__autowebinars">
            <div class="cards">
              <div
                class="card__webinar"
                @click="goToCreatePage"
              >
                <div class="webinar__photo">
                  <img style="width: 100%;" src="../static/gradd.png" alt="">
                </div>
                <p class="card__webinar__title">Создать вебинар</p>
              </div>
              <div
                class="card__autowebinar"
              >
                <div class="webinar__photo">
                  <img style="width: 90%;" src="../static/peopleee.png" alt="">
                </div>
                <p class="card__autowebinar__title">Создать Автовебинар</p>
              </div>
            </div>
          </div>
        </div>
        <div class="save__webinar">
          <div class="webinar__save">
            <img src="../static/svg/save.svg" alt="">
            <p class="webinar__title">Сохраненные вебинары</p>
          </div>
          <div class="webinar__none__date">
            <button>Скрыть даты</button>
          </div>
          <div class="dropdown">
            <img style="width: 100%; height: 100%;" src="../static/ps_filter.png">
            <button class="dropdown-btn" aria-haspopup="menu">
              <span>Фильтр</span>
            </button>
            <ul class="dropdown-content" role="menu">
              <li style="--delay: 1;">
                <p style="margin-bottom: 0;">Выберите тип фильтрации</p>
                <input placeholder="Поиск по названию вебинара">
                <input placeholder="Поиск по ссылке">
                <button class="search">Найти</button>
              </li>
            </ul>
          </div>
        </div>
        <v-item-group
          multiple
        >
          <v-item>
            <div class="save__webinars">
              <div class="webinar__status">
                <div class="webinar__description">
                  <img src="../static/svg/camera.svg" alt="">
                </div>
                <div class="description">
                  <p class="description__title">Связи на деньги на полном АВТОМАТЕ и с Гарантией! Входи в комнату сейчас!</p>
                  <a href="">https://alexhotpro.neearby.pro/w/good}</a>
                </div>
              </div>
              <div class="webinar__info">
                <div class="info__stat">
                  <div class="stat__icon">
                    <img src="../static/svg/majesticons_chat-status-line.svg" alt="">
                    <p class="stat__title">Статус: Включен</p>
                  </div>
                  <div class="stat__icon">
                    <img src="../static/svg/ep_video-play.svg" alt="">
                    <p class="stat__title">Живой вебинар</p>
                  </div>
                  <div class="stat__icon">
                    <img src="../static/svg/material-symbols_supervised-user-circle.svg" alt="">
                    <p class="stat__title">Посетителей: 3</p>
                  </div>
                  <div class="stat__icon">
                    <img src="../static/svg/majesticons_rocket-3-start-line.svg" alt="">
                    <p class="stat__title">Начало: 13.03.2023 в 19:30</p>
                  </div>
                </div>
              </div>
              <div class="webinar__action">
                <div class="action__icon">
                  <div class="hover-text">
                    <img src="../static/svg/redaktirovat`.svg" alt="">
                    <span class="tooltip-text1" id="fade">Редактировать</span>
                  </div>
                  <div class="hover-text">
                    <img src="../static/svg/image 73.svg" alt="">
                    <span class="tooltip-text" id="fade">Включить</span>
                  </div>
                  <div class="hover-text">
                    <img src="../static/svg/radix-icons_cross-circled.svg" alt="">
                    <span class="tooltip-text" id="fade">Удалить</span>
                  </div>
                </div>
              </div>
            </div>
          </v-item>
        </v-item-group>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/header.vue";
import FooterComponent from "../components/footer.vue";
import SidebarMenuComponent from "../components/sidebarMenu.vue";
export default {
  name: 'Webinar-autowebinar',
  components: {HeaderComponent, FooterComponent, SidebarMenuComponent},
  data() {
    return {
      webinars: []
    }
  },
  async mounted() {
    try {
      const webinars = await this.$axios.$get(
        `/webinars`,
        {
          params: {
            userId: localStorage.getItem('userId'),
          }
        }
      )
      webinars.forEach((webinar) => {
        webinar.cardImg = `/files/photo?filename=${webinar.backgroundIn}`
        webinar.editLink = `/edit/${webinar.id}`
      })
      console.log(webinars)
      this.webinars = webinars
    } catch(err) {
      console.log(err)
    }
  },
  methods: {
    async goToCreatePage() {
      await this.$router.push('/create')
    },
    async goToEditPage() {

    }
  }
}
</script>

<style scoped>

.dropdown {
  max-width: 13em;
  position: relative;
  display: flex;
  align-items: center;
}
.webinar__none__date {
  margin-left: 750px;
}

.dropdown-btn {
  font-size: 18px;
  border: none;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7em 0.5em;
  border-radius: 0.5em;
  cursor: pointer;
}
.search {
  border-radius: 10px;
  background: #FE6637;
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  padding: 10px 35px;
}
input {
  border-radius: 5px;
  border: 1px solid #818C99;
  width: 100%;
  height: 39px;
  outline: none;
  padding-left: 10px;
}


.dropdown-content {
  position: absolute;
  top: 3.2em;
  visibility: hidden;
  overflow: hidden;
  width: 366px;
  height: 219px;
  right: 0;
  z-index: 1000;
}

.dropdown-content li {
  border-radius: 10px 0 0 10px;
  background: #FFF;
  box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);
  position: relative;
  justify-content: center;
  align-items: center;
  left: 100%;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  transition-delay: calc(60ms * var(--delay));
}

.dropdown-btn:focus + .dropdown-content li {
  left: 0;
}

.dropdown-btn:focus + .dropdown-content {
  visibility: visible;
}


.dropdown-content li a {
  display: block;
  padding: 0.7em 0.5em;
  color: #fff;
  margin: 0.1em 0;
  text-decoration: none;
}





.tooltip-text {
  position: absolute;
  top: -40px;
  left: -50%;
  z-index: 2;
  width: 100px;
  color: #7A7777;
  font-size: 12px;
  border-radius: 5px;
  background: #EDEEF0;
  box-shadow: 3px 3px 5px 0 rgba(122, 119, 119, 0.20);
  padding: 10px 0;
}

.tooltip-text1 {
  position: absolute;
  top: -40px;
  left: -50%;
  z-index: 2;
  width: 120px;
  color: #7A7777;
  font-size: 12px;
  border-radius: 5px;
  background: #EDEEF0;
  box-shadow: 3px 3px 5px 0 rgba(122, 119, 119, 0.20);
  padding: 10px 0;
}

#fade {
  opacity: 0;
  transition: opacity 0.5s;
}

#delay {
  opacity: 0;
  transition: opacity 0.2s;
  transition-delay: 1s;
}

.hover-text:hover #fade { opacity: 1; }
.hover-text:hover #delay { opacity: 1; }


.hover-text {
  position: relative;
  display: inline-block;
  text-align: center;
}

.webinar__title{
  color: black;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 0;
  margin-left: 10px;
}
.content__createwebinar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 85%;
  height: 1%;
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
.webinar__autowebinars {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
}
.main__content {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
}
.content__sidebar__menu {
  display: flex;
  flex-direction: column;
  width: 15%;
}
.create__webinar {
  margin-top: 7px;
}
.card__webinar {
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  width: 350px;
  height: 380px;
  margin-right: 75px;
  justify-content: space-between;
  cursor: pointer;
}
.webinar__photo {
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 50%;
}
.card__autowebinar {
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  width: 350px;
  height: 380px;
  margin-left: 75px;
  justify-content: space-between;
  cursor: pointer;
}
.card__webinar__title {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  margin-top: 20px;
}
.card__autowebinar__title {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  margin-top: 20px;
}
.save__webinar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  padding: 10px 10px 10px 30px;
  margin-top: 10px;
}
.webinar__save {
  display: flex;
}
.webinar__none__date > button {
  padding: 10px 25px;
  border-radius: 5px;
  border: 1px solid #A8ADB8;
}
.description__title {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 0;
}
.save__webinars {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.webinar__status {
  display: flex;
  background: #FFFFFF;
  border-radius: 15px 5px 5px 15px;
  min-height: 100%;
  width: 40%;
  padding: 30px;
}
.description {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.stat__title {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 0;
  margin-left: 5px;
}
.webinar__info {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, #FFFFFF 100%);
  border-radius: 5px;
  display: flex;
  display: flex;
  margin-left: 10px;
  width: 40%;
  padding: 10px 15px;
}
.info__stat {
  display: flex;
  flex-direction: column;
}
.stat__icon {
  display: flex;
  align-items: flex-start;
  margin-bottom: 7px;
  display: flex;
  flex-direction: row;
}
.webinar__action {
  background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  margin-left: 10px;
  width: 20%;
  padding: 50px;
  justify-content: center;
}
.cards {
  display: flex;
  flex-direction: row;
  padding: 70px 120px;
}
.action__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.action__icon > img {
  margin-right: 15px;
  cursor: pointer;
}
@media (max-width: 1500px) {
  .webinar__status {
    width: 45%;
    padding-right: 10px;
  }
  .webinar__info {
    width: 40%;
    padding-right: 10px;
  }
  .webinar__action {
    width: 15%;
  }
  .action__icon {
    margin-left: 5%;
  }
  .webinar__none__date {
    margin-left: 350px;
  }
}
@media screen and (max-width: 769px) {

  .content__sidebar__menu {
    display: none;
  }
  .webinar__none__date {
    margin-left: 150px;
  }
  .content__createwebinar {
    width: 100%;
  }
  .main__content {
    width: 100%;
  }
  .container {
    margin-left: 0;
  }
  .cards {
    width: 100%;
    padding: 20px;
  }
  .card__webinar {
    margin-right: 10px;
  }
  .card__autowebinar {
    margin-left: 10px;
  }
  .save__webinars {
    flex-direction: column;
  }
  .webinar__info {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
  .webinar__action {
    width: 50px;
    margin-left: 0;
    position: absolute;
    right: 50px;
    bottom: 5px;
    padding: 0;
  }
  .webinar__status {
    width: 100%;
  }
  .action__icon {
    flex-direction: column;
    gap: 10px;
  }
}



@media screen and (max-width: 470px) {
  .cards {
    padding: 15px;
  }
  .card__webinar {
    height: 250px;
    padding: 15px;
  }
  .webinar__none__date {
    margin-left: 0;
  }
  .card__autowebinar {
    height: 250px;
    padding: 15px;
  }
  .webinar__action {
    right: 10px;
  }
  .save__webinar {
    padding: 10px;
    align-items: center;
  }
  .webinar__title {
    font-size: 13px;
  }
  .dropdown-btn {
    padding: 0;
  }
  .webinar__none__date > button {
    padding: 7px;
    font-size: 10px;
    color: #ABABAB;
  }
}
</style>

