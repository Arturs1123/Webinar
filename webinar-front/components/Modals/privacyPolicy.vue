<template>
  <div class="modal_window">
    <div class="modal_window_i">
      <div class="mw_up">
        <span>Политика конфиденциальности</span>
        <img class="close_btn" src="../../static/svg/close.svg" alt="Nope">
      </div>
      <div class="privacy">
        <p>Настоящая Политика конфиденциальности персональной
          информации (далее — Политика) действует в отношении всей
          информации, которую Сайт ( могут получить о пользователе во
          время использования им сайта. Согласие пользователя на
          предоставление персональной информации, данное им в
          соответствии с настоящей Политикой в рамках отношений с одним
          из лиц, входящих, распространяется на все лица.
        </p>
        <p class="privacy__text2">
          Использование Сайта означает безоговорочное согласие
          пользователя с настоящей Политикой и указанными в ней
          условиями обработки его персональной информации; в случае
          несогласия с этими условиями пользователь должен воздержаться
          от использования Сервисов.
        </p>
        <p class="privacy__text2">
          1. Персональная информация пользователей, которую получает и
          обрабатывает Сайт
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "privacyPolicy"
}
</script>

<style lang="scss" scoped>
.privacy {
  margin: 25px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  gap: 40px;
  flex-direction: column;
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
    align-items: center;
    width: 565px;
    height: auto;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
  padding: 0 1.5rem;

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
  .privacy {
    font-size: 13px;
    gap: 10px;
    margin: 20px;
  }
  p {
    margin-bottom: 0;
  }
}
</style>
