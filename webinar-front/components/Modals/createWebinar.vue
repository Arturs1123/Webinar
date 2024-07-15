<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up">
        <span>Создание вебинара</span>
        <img class="close_btn" src="../../static/svg/close.svg" alt="Nope" @click="closeModal">
      </div>
      <div class="modal__content">
        <div class="modal__content__image">
          <img src="../../static/eos-icons_subscriptions-created-outlined.png" alt="">
        </div>
        <div style="margin-top: 20px">
          <p class="link" style="text-align: center">Ваша ссылка на вебинар: <br>
            <!-- <img :src="$config.staticURL + '/web_background_inside_0.png'"/> -->
            <a :href="'/w/' + prettyLink " target="_blank">{{ this.hostname }}/w/{{this.prettyLink}}</a>
            <!-- <span>{{ this.hostname }}/w/{{this.prettyLink}}</span> -->
          </p>
        </div>
        <div style="margin-top: 20px">
          <p class="support">С уважением, команда Neearby. <br>
            Neearby - всегда рядом.</p>
        </div>
        <div style="margin-top: 15px">
          <div class="modal__button">
            <button
              class="modal__button__yes"
              @click="closeModal"
            >OK</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "createWebinar",
  props: {
    prettyLink: String,
    closeModal: Function,
  },
  data() {
    return {
      hostname: location.host
    }
  },
  method: {
    // getTargetUrl() {
    //   return this.hostname + '/w/' + this.prettyLink
    // }
  }

}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
.modal__content {
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  width: 100%;
}
.modal__content__image {
  display: flex;
  justify-content: center;
}
.modal__button {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  justify-content: center;
}
.modal__button__yes {
  border-radius: 10px;
  background: #FE6637;
  padding: 10px 25px;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.support {
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin-left: 50px;
}
.link {
  color: #7A7777;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.link > span {
  color: #2A5885;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
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
    width: 500px;
    height: auto;
    align-items: center;
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

.mw_up {
  background-color: #FFDBBA;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  span {
    font-weight: 500 !important;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
  }
}


.close_btn {
  cursor: pointer;
}
@media screen and (max-width: 470px) {
  .modal_window .modal_window_i {
    width: 90%;
  }
  .support {
    margin-left: 20px;
  }
  .modal__button {
    margin-top: 0;
  }
  .buttons {
    margin-top: 10px;
  }
  .modal__content {
    margin: 20px 0;
  }
}
</style>
