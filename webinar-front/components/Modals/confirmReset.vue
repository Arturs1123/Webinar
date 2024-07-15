<template>
      <div class="modal_window">
        <div class="modal_window_i">
          <div class="mw_up">
            <span>Подтверждение действия</span>
            <img class="close_btn" src="../../static/svg/close.svg" alt="Nope">
          </div>
          <span class="reset">Вы уверены, что хотите удалить все команды сценария? <br>Восстановить будет невозможно!</span>
          <div class="mw_down">
            <div class="btn_no">Нет</div>
            <div class="btn_y">Да</div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
  name: "ConfirmReset",
  components: {},
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
  },
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
    height: 190px;
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
  padding: 0 1rem;

  span {
    font-weight: 500 !important;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
  }
}

.mw_down {
  width: 100%;
  background-color: #FFDBBA;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem;

  .btn_no {
    font-size: 16px;
    font-weight: 500;
    margin-right: 1rem;
    cursor: pointer;
  }

  .btn_y {
    width: 50px;
    height: 30px;
    background: #FE6637;
    border-radius: 5px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.close_btn {
  cursor: pointer;
}
@media screen and (max-width: 470px) {
  .modal_window .modal_window_i {
    width: 90%;
    height: auto;
  }
  .modal_window .modal_window_i span {
    font-size: 16px;
  }
  .reset {
    padding: 20px;
  }
}
</style>
