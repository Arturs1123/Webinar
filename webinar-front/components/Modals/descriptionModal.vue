<template>
	<div class="modal_window">
		<div class="modal_window_i">
			<div class="mw_up">
				<span>Описание ведущего</span>
				<img class="close_btn" src="../../static/svg/close.svg" alt="Nope" @click="closeModal">
			</div>
			<div class="description">
				<v-textarea
					label=""
					v-model="description"
					name="input-7-1"
					variant="filled"
					auto-grow
				></v-textarea>
			</div>
      <div class="btnGroup">
        <button @click="save" variant="outline-primary" class="btn btnSave">Сохранить</button>
        <button @click="closeModal" variant="outline-secondary" class="btn btnCancel">Отмена</button>
      </div>
		</div>
	</div>
</template>
  
  <script>
	import {BButton } from 'bootstrap-vue'
  export default {
    name: "description",
		components: {
			BButton,
		},
    props: {
      text: String,
			closeModal: Function,
			saveModal: Function,
    },
		data() {
			return {
				description: ''
			}
		}, 
		methods: {
			save() {
				this.saveModal(this.description)
			}
		},
    mounted() {
      this.description = this.text
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .description {
		width: 100%;
    height: auto;
    max-height: 450px;
		padding: 15px 20px 5px;
    // margin: 25px;
    color: #000;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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
  }

  .close_btn {
    cursor: pointer;
  }

  .description__text {
    width: 100%;
  }

  .btnGroup {
    width: 100%;
    padding: 10px 20px;
    display: -ms-inline-flexbox;
    display: inline-flex;
    vertical-align: middle;
  }

  .btnGroup button {
    position: relative;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }

  .btn {
    display: inline-block;
    padding: 10px;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .btn:hover {
    color: #212529;
    text-decoration: none;
  }

  .btnSave {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    color: #007bff;
    border-color: #007bff
  }

  .btnSave:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .btnCancel {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: #6c757d;
    border-color: #6c757d;
  }

  .btnCancel:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }

  @media screen and (max-width: 470px) {
    .modal_window .modal_window_i {
      width: 90%;
    }
    .description {
      font-size: 13px;
      gap: 10px;
      margin: 20px;
    }
  }
  </style>
  