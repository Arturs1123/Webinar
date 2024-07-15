<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up">
        <span>“Мешок с деньгами“</span>
        <img class="close_btn" @click="close" src="../../static/svg/close.svg" alt="Nope">
      </div>
      <span class="wait">Ожидайте. Скоро для Вас появятся исклюзивные подарки!</span>
      <button class="btn_y" @click="close">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "bagMoneyWait",
  props: {
    closeModal: Function,
  },
  methods: {
    close() {
      this.closeModal()
    }
  }
}
</script>

<style lang="scss" scoped>
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
    width: 565px;
    height: 240px;
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
  padding: 0 1rem 0 3rem;

span {
    font-weight: 500 !important;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
  }
}

.wait {
  margin-top: 30px;
  margin-bottom: 60px;
}

.btn_y {
  width: 70px;
  height: 40px;
  border-radius: 10px;
  background: #FE6637;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
    padding: 15px;
  }
  .wait {
    margin: 20px 0;
  }
  .btn_y {
    margin-bottom: 20px;
  }
}
</style>
