<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up">
        <span>Подтверждение действия</span>
        <img class="close_btn" src="../../static/svg/close.svg" @click="closeModal" alt="Nope">
      </div>
      <div class="modal__content">
        <div class="modal__content__image">
          <img src="../../static/deleteMessage.png" alt="">
        </div>
        <div class="titles">
          <span>Вы уверены, что хотите удалить все <br> сообщения из чата?</span>
          <div class="modal__button">
            <button class="modal__button__yes" @click="clearChat">Да, удалить</button>
            <button class="modal__button__no" @click="closeModal">Нет, оставить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteAllMessage",
  props: {
    closeModal: Function,
  },
  methods: {
    clearChat() {
      this.$emit('clear-chat')
      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal__content {
  display: flex;
  flex-direction: row;
  margin: 30px 0;
}
.modal__content__image {
  margin: 0 25px;
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
    width: 85%;
    height: auto;
  }
  .mw_up {
    padding: 10px;
  }
  .modal_window .modal_window_i span {
    font-size: 14px;
  }
  .modal__button {
    position: relative;
    top: 10px;
    right: 25%;
    margin-left: 0;
    margin-top: 50px;
    width: 250px;
    gap: 0;
  }
  .modal__button__yes {
    // position: relative;
    // right: 40px;
    // width: 100%;
    padding: 5px 10px;
    font-size: 13px;
  }
  .modal__button__no {
    // position: relative;
    // width: 100%;
    padding: 5px 10px;
    font-size: 13px;
    margin-left: 27px;
  }
  .titles {
    text-align: center;
  }
  .titles > span {
    position: relative;
    top: 20px;
    right: 30px;
    font-size: 14px;
  }
  .modal_window .modal_window_i span {
    font-size: 14px;
    width: 210px;
    display: block;
  }
  .modal__content__image {
    margin-top: 19px;
  }
  .modal__content__image img {
    width: 40px;
  }
}
</style>
