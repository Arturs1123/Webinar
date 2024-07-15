<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up">
        <span>Подтверждение действия</span>
        <img class="close_btn" @click="close" src="../../static/svg/close.svg" alt="Nope">
      </div>
      <div class="modal__content">
        <div class="modal__content__image">
          <img src="../../static/startTranslate.png" alt="">
          <span>Завершить трансляцию?</span>
        </div>
        <div class="modalen">
          <div class="modal__button">
            <button class="modal__button__yes" @click="stopStream">Да, завершить.</button>
          </div>
        </div>
        <button class="modal__button__no" @click="close">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "startTranslate",
  props: {
    closeModal: Function,
  },
  methods: {
    stopStream() {
      this.$emit('stop-stream')
      this.closeModal()
    },
    close() {
      this.closeModal()
    },
  }
}
</script>

<style lang="scss" scoped>
.modal__content {
  display: flex;
  flex-direction: column;
  margin: 30px 0;
}
.modalen {
  margin-top: 15px;
}
.modal__content__image {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  padding: 10px 30px;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.modal__button__no {
  position: relative;
  left: 170px;
  bottom: 30px;
  color: #000;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
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
    width: 500px;
    height: auto;
    align-items: center;
    background: #E6E6E6;
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
  .modal__content {
    margin: 10px 0 0 0;
  }
  .modal__content__image {
    flex-direction: row;
  }
  .modal__content__image > img {
    rotate: 270deg;
    margin-right: 20px;
  }
  .modal__button__no {
    left: 100px;
    color: gray;
  }
  .modalen {
    margin-top: 0;
  }
  .modal__button {
    margin-top: 0;
  }
  .modal__button__yes {
    padding: 5px 10px;
  }
}
</style>
