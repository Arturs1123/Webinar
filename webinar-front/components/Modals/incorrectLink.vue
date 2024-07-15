<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up">
        <span>Неверная ссылка</span>
        <img class="close_btn" src="../../static/svg/close.svg" alt="Nope">
      </div>
      <div class="modal__content">
        <div class="modal__content__image">
          <img src="../../static/falselink.png" alt="">
          <span>Укажите верную ссылку на трансляцию YouTube</span>
        </div>
        <div style="margin-top: 15px; text-align: center;">
          <div>
            <input placeholder="Введите ссылку на видео...">
          </div>
          <div class="modal__button">
            <button class="modal__button__yes">Да, начать</button>
          </div>
        </div>
        <button class="modal__button__no">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "incorrectLink"
}
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #A8ADB8;
  padding: 10px;
  outline: none;
  margin-top: 15px;
}
.modal__content {
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  width: 80%;
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
  background: #F00;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  span {
    font-weight: 500 !important;
    font-size: 16px;
    color: #FFF;
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
  .modal__button__no {
    left: 130px;
    color: gray;
  }
}
</style>
