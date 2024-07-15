<template>
  <div class="modal_window" @click="closeModal">
    <div
      class="modal_window_i"
      @click="(e) => {e.stopPropagation()}"
    >
      <div class="mw_up">
        <span>Подтверждение действия</span>
        <img
          class="close_btn"
          src="../../static/svg/close.svg"
          alt="Nope"
          @click="closeModal"
        >
      </div>
      <div class="spanned">
        <span>Восстановить вебинар будет невозможно! <br>Вы уверены, что хотите удалить?</span>
      </div>
      <div class="mw_down">
        <button
          class="btn_no"
          @click="closeModal"
        >
          Нет
        </button>
        <button
          class="btn_y"
          @click="deleteAndEvent"
        >
          Да
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteWebinar",
  props: {
    closeModal: Function,
    deleteWebinar: Function,
  },
  methods: {
    emitDeleteEvent: function () {
      this.$emit('deleted-webinar');
    },
    async deleteAndEvent() {
      const res = await this.deleteWebinar()
      if (res) {
        this.emitDeleteEvent()
      }
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
  background-color: rgba(0, 0, 0, .05);
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
.spanned {
  text-align: center;
}

.close_btn {
  cursor: pointer;
}

@media screen and (max-width: 769px) {
  .modal_window .modal_window_i {
    width: 430px;
    height: auto;
  }
}
@media screen and (max-width: 470px) {
  .modal_window .modal_window_i {
    width: 320px;
    height: auto;
  }
  .spanned {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
