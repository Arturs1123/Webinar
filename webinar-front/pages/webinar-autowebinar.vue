<template>
  <div>
    <Header/>
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
                @click="goToCreateAutoWebinar"
              >
                <div class="webinar__photo">
                  <img style="width: 90%;" src="../static/peopleee.png" alt="">
                </div>
                <p class="card__autowebinar__title">Создать Автовебинар</p>
              </div>
          </div>
        </div>
        <div class="save__webinar">
          <div class="webinar__save">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="../static/svg/save.svg" alt="">
              <p class="webinar__title">Вебинары и автовебинары</p>
            </div>
            
            <div class="webinar-filter">
              <input @change="handlePDFUpload" type="file" id="pdfUpload" ref="pdfFile" accept="application/pdf" style="display: none;" />
              <button @click="selectPDF" class="select-pdf">Выберите PDF-файл</button>
              <div class="webinar__none__date">
                <button @click="hideShowAllDates">{{ (hideAllDates) ? 'Показать даты' : 'Скрыть даты' }}</button>
              </div>
              <div class="dropdown">
                <img style="width: 25px; height: 25px;" src="../static/ps_filter.png">
                <button class="dropdown-btn" aria-haspopup="menu" @click="filtersMenuToggle">
                  <span>Фильтр</span>
                </button>
                <div class="dropdown-content-wrapper" :style="filtersMenuOpen ? 'display: block' : 'display: none'" @click="closeFilter"></div>
                <ul class="dropdown-content" role="menu" :style="filtersMenuOpen ? 'visibility: visible' : ''">
                  <li :style="'--delay: 1;' + filtersMenuOpen ? 'left: 0' : ''">
                    <p style="margin-bottom: 0;">Выберите тип фильтрации</p>
                    <div class="search_filter__input">
                      <img class="search_filter__img" src="../static/svg/material-symbols_manage-search-rounded.svg"/>
                      <input placeholder="Поиск по названию вебинара" v-model="filters.title">
                    </div>
                    <div class="search_filter__input">
                      <img class="search_filter__img" src="../static/svg/material-symbols_manage-search-rounded.svg"/>
                      <input placeholder="Поиск по ссылке" v-model="filters.url">
                    </div>
                    <button class="search" @click="getWebinars">
                      Найти
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="webinar-filter-wrapper">
            <div class="type-check-wrapper">
              <div>
                <div @click="clickCheckWebinar" :class="['chkbox__background__icon', filters.chxWebinar ? 'chkbox__background__icon_on' : 'chkbox__background__icon_off' ]"></div>
                <p>Живой вебинар</p>
              </div>
              <div>
                <div @click="clickCheckAutowebinar" :class="['chkbox__background__icon', filters.chxAutowebinar ? 'chkbox__background__icon_on' : 'chkbox__background__icon_off' ]"></div>
                <p>Автовебинар</p>
              </div>
            </div>
          </div>
        </div>
        <v-item-group
          multiple
          v-if="webinars.length"
        >
          <v-item
            v-for="(webinar, index) in webinars"
            :key="webinar.id"
          >
            <div class="save__webinars">
              <div class="webinar__status">
                <div class="webinar__description">
                  <img src="../static/svg/camera.svg" alt="">
                </div>
                <div class="description">
                  <p class="description__title">{{ webinar.title }}</p>
                  <div class="flex justify-space-between flex-row">
                    <NuxtLink is="a" :to="'/' + (webinar.autowebinar ? 'a' : 'w') + '/'+ webinar.url" :href="'/' + (webinar.autowebinar ? 'a' : 'w') + '/'+ webinar.url" >{{ webinar.fullUrl }}</NuxtLink>
                    <div  class="hover-text"  style="margin-left: auto; position: relative">
                      <img 
                        src="../static/svg/copy.svg"
                        width="23"
                        height="23"
                        alt=""
                        @click="copyText(webinar.fullUrl, `copy-tooltip-${webinar.id}`)"
                      >
                      <span
                        class="tooltip-text-link"
                        id="fade" style="width: 150px;" 
                      > Скопировать ссылку </span> <!-- style="opacity: 0" :ref="`copy-tooltip-${webinar.id}`" -->
                    </div>
                  </div>
                  <div class="flex justify-space-between flex-row">
                    <NuxtLink is="a" :to="'/' + (webinar.autowebinar ? 'a' : 'w') + '/secret/'+ webinar.url" :href="'/' + (webinar.autowebinar ? 'a' : 'w') + '/secret/'+ webinar.url" target="_blank">{{ webinar.fullSecretUrl }}</NuxtLink>
                    <div  class="hover-text"  style="margin-left: auto; position: relative">
                      <img 
                        src="../static/svg/copy.svg"
                        width="23"
                        height="23"
                        alt=""
                        @click="copyText(webinar.fullSecretUrl, `copy-tooltip-${webinar.id}`)"
                      >
                      <span
                        class="tooltip-text-link"
                        id="fade" style="width: 150px;" 
                      > Скопировать ссылку </span> <!-- style="opacity: 0" :ref="`copy-tooltip-${webinar.id}`" -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="webinar__info">
                <div class="info__stat">
                  <div class="stat__icon">
                    <img src="../static/svg/majesticons_chat-status-line.svg" alt="">
                    <p class="stat__title">
                      Статус: <span :class="webinar.isActive ? 'green--text' : 'red--text'">{{ webinar.isActive ? webinarStatuses.enable : webinarStatuses.disable }}</span>
                    </p>
                  </div>
                  <div class="stat__icon">
                    <img src="../static/svg/ep_video-play.svg" alt="">
                    <p class="stat__title">{{ (webinar.autowebinar) ? `Автовебинар | ${playbackIntervals[webinar.playbackFrequency] || '-'}` : 'Живой вебинар' }}</p>
                  </div>
                  <div class="stat__icon">
                    <img src="../static/svg/material-symbols_supervised-user-circle.svg" alt="">
                    <p class="stat__title">Посетителей: {{ webinar.userCount }}</p>
                  </div>
                  <div class="stat__icon" v-if="!hideAllDates">
                    <img src="../static/svg/majesticons_rocket-3-start-line.svg" alt="">
                    <p class="stat__title">{{ (webinar.autowebinar) ? 'Следующий: ' : 'Начало: ' }}
                      <span style="color: #FE6637;">{{ webinar.prettyDateStart }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="webinar__action">
                <div class="action__icon">
                  <button class="hover-text" @click="goToEditPage(webinar.id, webinar.autowebinar)">
                    <img src="../static/svg/redaktirovat`.svg" alt="">
                    <span class="tooltip-text1" id="fade">Редактировать</span>
                  </button>
                  <button
                    :class="webinar.isActive ? 'hover-text': 'hover-text enable-btn'"
                    @click="enableWebinar(
                      webinar.id,
                      webinar.isActive ? 0 : 1,
                      webinar.autowebinar
                      )">
                    <img src="../static/svg/image 73.svg" alt="">
                    <span
                      class="tooltip-text"
                      id="fade">{{
                        webinar.isActive ? 'Выключить' : 'Включить'
                      }}
                    </span>
                  </button>
                  <button
                    class="hover-text"
                    @click="openDeleteWebinarModal(webinar.id,  webinar.autowebinar)"
                  >
                    <img src="../static/svg/radix-icons_cross-circled.svg" alt="">
                    <span class="tooltip-text" id="fade">Удалить</span>
                  </button>
                </div>
              </div>
            </div>
          </v-item>
        </v-item-group>
      </div>
    </div>
    <deleteWebinar
      v-if="deleteWebinarModalOpen"
      :close-modal="closeDeleteWebinarModal"
      :delete-webinar="deleteWebinar"
      v-on:deleted-webinar="deleteWebinarFromList($event)"
    />
  </div>
</template>

<script>
import HeaderComponent from "../components/header.vue";
import FooterComponent from "../components/footer.vue";
import SidebarMenuComponent from "../components/sidebarMenu.vue";
import DeleteWebinar from "@/components/Modals/deleteWebinar.vue";
import moment from "moment-timezone"

export default {
  name: 'Webinar-autowebinar',
  components: {DeleteWebinar, HeaderComponent, FooterComponent, SidebarMenuComponent},
  data() {
    return {
      webinars: [],
      webinarStatuses: {
        enable: 'Включен',
        disable: 'Выключен'
      },
      hideAllDates: false,
      deleteWebinarModalOpen: false,
      filtersMenuOpen: false,
      filters: {
        title: '',
        url: '',
        chxWebinar: true,
        chxAutowebinar: true,
      },
      playbackIntervals: {
        '1min': 'Каждую минуту',
        '5min': 'Каждые 5 минут',
        '10min': 'Каждые 10 минут',
        '30min': 'Каждые 30 минут',
        '1hour': 'Каждый час',
        '6hour': 'Каждые 6 часов',
        '12hour': 'Каждые 12 часов',
        '24hour': 'Каждые сутки',
      }
    }
  },
  async mounted() {
    await this.getWebinars()
  },
  methods: {
    async getWebinars() {
      try {
        const data = await this.$axios.$get(
          `/users/${localStorage.getItem('userId')}/hide-dates`,
          {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          }
        )

        if (data?.hideDates) {
          if (data.hideDates === 'Y') {
            this.hideAllDates = true
          }
        }
      } catch(err) {
        console.log(err)
      }

      try {
        const webinars = await this.$axios.$get(
          `/webinars`,
          {
            params: {
              userId: localStorage.getItem('userId'),
              ...this.filters
            }
          }
        )

        webinars.sort((a, b) => {
          let dateA = new Date(a.dateCreated);
          let dateB = new Date(b.dateCreated);

          return dateB - dateA;
        });

        webinars.forEach((webinar) => {
          webinar.id = webinar.id
          webinar.cardImg = `/files/photo?filename=${webinar.backgroundIn}`
          webinar.editLink = `/edit-webinar/${webinar.id}`
          webinar.prettyDateStart = moment(webinar.dateStart)
            .tz('Europe/Moscow')
            .format('DD.MM.YYYY в HH:mm')
            
          if (!Object.hasOwn(webinar, 'lastTimeViewer')) {
            webinar.autowebinar = 1
          } else {
            webinar.autowebinar = 0
          }
          webinar.fullUrl = `${location.host}/` + (webinar.autowebinar ? 'a' : 'w') + `/${webinar.url}`
          webinar.fullSecretUrl = `${location.host}/` + (webinar.autowebinar ? 'a' : 'w') + `/secret/${webinar.url}`
        })

        this.webinars = webinars
      } catch(err) {
        this.webinars = []
        console.log(err)
      }
    },
    async goToCreatePage() {
      await this.$router.push('/create-a-webinar')
    },
    async goToCreateAutoWebinar() {
      await this.$router.push('/create-an-autowebinar')
    },
    async goToEditPage(webinarId, isAutowebinar) {
      this.$store.commit('setWebinarId', webinarId);
      this.$store.commit('setWebinarType', isAutowebinar);

      await this.$router.push(`/edit-webinar/1`)
    },
    async enableWebinar(webinarId, isActive, isAutowebinar) {
      const idx = this.webinars.findIndex((webinar) => (webinar.id === webinarId && webinar.autowebinar == isAutowebinar))
      let sendData = this.webinars[idx];
      const data = await this.$axios.$patch(
        `/webinars`, {
          id: sendData.id,
          isActive: isActive,
          userId: localStorage.getItem('userId'),
          title: sendData.title,
          isAutowebinar: isAutowebinar,
        }, {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        }
      )

      if (data) {
        this.webinars = [
          ...this.webinars.slice(0, idx),
          {
            ...this.webinars[idx],
            isActive: data.isActive
          },
          ...this.webinars.slice(idx + 1)
        ]
      }
    },
    filtersMenuToggle() {
      this.filtersMenuOpen = !this.filtersMenuOpen
    },
    closeFilter() {
      this.filtersMenuOpen = false
    },
    openDeleteWebinarModal(webinarId, isAutowebinar) {
      this.$store.commit('setWebinarId', webinarId);
      this.$store.commit('setWebinarType', isAutowebinar);

      this.deleteWebinarModalOpen = true
    },
    closeDeleteWebinarModal() {
      this.deleteWebinarModalOpen = false
    },
    async deleteWebinar() {
      const params = {
        id: this.$store.state.editWebinarId,
        isAutowebinar: this.$store.state.editWebinarType,
      }
      const data = await this.$axios.$get(
        `/webinars/delete`,
        {
          params: params
        }
      )
      // const data = await this.$axios.$delete(
      //   `/webinars/1`,
      //   {
      //     headers: {
      //       "Authorization": localStorage.getItem('token')
      //     }
      //   }
      // )

      return !!data.deletedRows;
    },
    deleteWebinarFromList() {
      const isAutowebinar = this.$store.state.editWebinarType
      const webinarId = this.$store.state.editWebinarId
console.log(isAutowebinar)
      this.webinars = this.webinars.filter((webinar) => !(webinar.id === webinarId && webinar.autowebinar === isAutowebinar))
    },
    async hideShowAllDates() {
      this.hideAllDates = !this.hideAllDates
      await this.$axios.$patch(
        `/users/${localStorage.getItem('userId')}/change-hide-dates`,
        { value: (this.hideAllDates) ? 'Y' : 'N' },
        {
          headers: {
            "Authorization": localStorage.getItem('token')
          }
        }
      )
    },
    async copyText(text, ref = null) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
          document.execCommand('copy');
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }

      // if (ref) {
      //   const tooltip = this.$refs[ref]
      //   console.log(this.$refs)
      //   console.log(tooltip)
      //   tooltip[0].style.opacity = 1
      //   setTimeout(() => {
      //     tooltip[0].style.opacity = 0
      //   }, 1500)
      // }
    },
    clickCheckWebinar () {
      this.filters.chxWebinar=!this.filters.chxWebinar
      this.getWebinars()
    },
    clickCheckAutowebinar () {
      this.filters.chxAutowebinar=!this.filters.chxAutowebinar
      this.getWebinars()
    },
    selectPDF() {
      this.$refs.pdfFile.click();

    },
    async handlePDFUpload(event) { 
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData()
        formData.append('pdfFile', file)
        const res = await this.$axios.post(
          `/files/pdf`,
          formData,
        )
        console.log(res.data?.filename)
      } else {
        console.error('No file selected.');
      }
    },
  },
  watch: {
    webinars: {
      handler() {
        this.$forceUpdate()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.select-pdf {
  margin-left: 30px;
  padding: 10px 10px;
  border-radius: 5px;
  border: 1px solid #A8ADB8;
}

.type-check-wrapper {
  display: flex;
  gap: 10px;
}

.type-check-wrapper > div {
  display: flex;
  align-content: center;
}

.type-check-wrapper p {
  vertical-align: middle;
  line-height: 28px;
  margin-bottom: 0px !important;
  margin-left: 5px;
  font-size: 17px;
}

.chkbox__background__icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
  align-items: center;
  background-repeat: no-repeat;
  background-position: bottom;
}

.chkbox__background__icon_off {
  background-image: url('../static/svg/check_false.svg');
  background-size: 20px;
}

.chkbox__background__icon_on {
  background-image: url('../static/svg/check_true.svg');
  background-size: 20px;
}

.enable-btn img {
  opacity: 0.2;
}

.webinar-filter-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search_filter__input {
  display: flex;
  justify-content: center;
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;
}

.search_filter__input input {
  border: 0px;
  width: 100%
}

.search_filter__img {
  margin-left: 10px;
}

.dropdown {
  max-width: 13em;
  position: relative;
  display: flex;
  align-items: center;
}

.webinar-filter {
  display: flex;
  align-items: center;
  gap: 10px;
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

.dropdown-content-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 1120;
  transition: 0.3s all;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.dropdown-content {
  position: absolute;
  top: 3.2em;
  visibility: hidden;
  overflow: hidden;
  width: 366px;
  height: 219px;
  right: 0;
  z-index: 2000;
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


.dropdown-content li a {
  display: block;
  padding: 0.7em 0.5em;
  color: #fff;
  margin: 0.1em 0;
  text-decoration: none;
}

.tooltip-text-link {
  position: absolute;
  top: -35px;
  right: -100px;
  z-index: 2;
  /* width: 100px; */
  color: #7A7777;
  font-size: 12px;
  border-radius: 5px;
  background: #EDEEF0;
  box-shadow: 3px 3px 5px 0 rgba(122, 119, 119, 0.20);
  padding: 2px 2px;
}

.tooltip-text {
  position: absolute;
  top: -35px;
  right: -19px;
  z-index: 2;
  /* width: 100px; */
  color: #7A7777;
  font-size: 12px;
  border-radius: 5px;
  background: #EDEEF0;
  box-shadow: 3px 3px 5px 0 rgba(122, 119, 119, 0.20);
  padding: 2px 4px;
}

.tooltip-text1 {
  position: absolute;
  top: -42px;
  right: -35px;
  z-index: 2;
  width: 120px;
  color: #7A7777;
  font-size: 12px;
  border-radius: 5px;
  background: #EDEEF0;
  box-shadow: 3px 3px 5px 0 rgba(122, 119, 119, 0.20);
  padding: 2px 4px;
}
/* 
.tooltip-text-copy {
  position: absolute;
  text-align: center;
  top: -80px;
  left: -50%;
  z-index: 2;
  width: 100px;
  color: #7A7777;
  font-size: 12px;
  border-radius: 5px;
  background: #EDEEF0;
  box-shadow: 3px 3px 5px 0 rgba(122, 119, 119, 0.20);
  padding: 10px 0;
} */

#fade {
  display: none;
  opacity: 0;
  transition: opacity 0.5s;
}

#delay {
  display: none;
  opacity: 0;
  transition: opacity 0.2s;
  transition-delay: 1s;
}

.hover-text:hover #fade { display: block; opacity: 1; }
.hover-text:hover #delay { display: block; opacity: 1; }


.hover-text {
  position: relative;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.webinar__title{
  color: black;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 0;
}
.content__createwebinar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 85%;
  height: 1%;
  padding-bottom: 10px;
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
  gap: 10px;
}
.webinar__autowebinars {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 200px;
  background: #FFFFFF;
  border-radius: 10px;
  padding-top: 50px;
  padding-bottom: 50px;
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
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.webinar__none__date > button {
  padding: 10px 10px;
  width: 140px;
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
  text-overflow: ellipsis;
  overflow: hidden;
}
.save__webinars {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.webinar__status {
  display: flex;
  flex-grow: inherit;
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
  width: 85%;
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
  align-items: center;
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
  /* padding: 50px; */
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
  .webinar__autowebinars {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 100px;
    background: #FFFFFF;
    border-radius: 10px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
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

  .save__webinar {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .webinar-filter-wrapper {
    gap: 5px;
  }
}

@media (max-width: 1300px) {
  .card__webinar, .card__autowebinar {
    width: 270px;
    height: 300px;
  }
}

@media screen and (max-width: 900px) {
  .main__content {
    width: 100%;
    justify-content: center;
  }
  .webinar__autowebinars {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 50px;
    background: #FFFFFF;
    border-radius: 10px;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .card__webinar, .card__autowebinar {
    width: 230px;
    height: 250px;
  }

  .card__autowebinar__title {
    margin-top: 10px;
  }

  .content__sidebar__menu {
    display: none;
  }
  .save__webinars {
    flex-direction: column;
    position: relative;
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
    right: 0px;
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

  .tooltip-text-link {
    top: 2px;
    right: 25px;
  }
  .tooltip-text1 {
    top: 2px;
    right: 30px;
  }
  .tooltip-text {
    top: 4px;
    right: 35px;
  }
}

@media screen and (max-width: 769px) {
  .main__content {
    margin-top: 20px;
  }

  .card__webinar, .card__autowebinar {
    width: 230px;
    height: 250px;
  }

  .content__sidebar__menu {
    display: none;
  }
  .webinar__none__date {
    margin-left: 15px;
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
  .save__webinars {
    flex-direction: column;
  }
  .webinar__info {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
    min-height: 115px;
  }
  .webinar__action {
    width: 50px;
    margin-left: 0;
    position: absolute;
    right: 0px;
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

  .card__webinar__title {
    margin-top: 10px;
  }
}


@media screen and (max-width: 600px) {
  .webinar__autowebinars {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    background: #FFFFFF;
    border-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .card__webinar, .card__autowebinar {
    width: 200px;
    height: 220px;
  }

  .card__webinar__title {
    margin-top: 10px;
  }

  .webinar__title, .select-pdf, .type-check-wrapper p, .webinar__none__date button, .dropdown-btn span {
    font-size: 15px;
    line-height: 15px;
  }

  .type-check-wrapper p {
    margin-top: 8px;
  }

  .type-check-wrapper {
    gap: 0px;
  }

  .webinar-filter-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-direction: column;
    width: 100%;
  }

  .webinar__none__date {
    margin-left: 0px;
  }

  .webinar-filter {
    width: 100%;
    justify-content: space-around;
  }

  .type-check-wrapper {
    width: 100%;
    justify-content: space-around;
  }
}

@media screen and (max-width: 470px) {
  .webinar__autowebinars {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    background: #FFFFFF;
    border-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .card__webinar, .card__autowebinar {
    width: 138px;
    height: 154px;
  }

  .card__webinar__title, .card__autowebinar__title {
    margin-top: 10px;
    font-size: 15px;
    line-height: 18px;
  }
  .webinar__none__date {
    margin-left: 0;
  }
  .webinar__action {
    right: 0px;
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

