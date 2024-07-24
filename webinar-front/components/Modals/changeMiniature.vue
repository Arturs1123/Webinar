<template>
  <div class="modal_window">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-font"> Изменение миниатюры </p>
          <img @click="closeModal" src="../../static/svg/cancel-modal.svg" alt="" id="exit">

        </div>
        <div class="modal-body">
          <div>
            <p class="text-modal modal-font">
              Выберите область для маленьких фотографий. <br>
              Выбранная миниатюра будет использоваться в новостях, личных сообщениях и комментариях.
            </p>
          </div>
          <div class="img-wrapper">

            <cropper ref="cropper" class="change-miniature"
                     :src="profileImage"
                     @change="onChange"
                     :debounce="false"
                     :stencil-props="{
                        aspectRatio: 1
                    }"
                     :stencil-component="$options.components.CircleStencil"
                     :auto-zoom="true"
            />

            <preview
              class="big"
              :width="100"
              :height="100"
              :image="result.image"
              :coordinates="result.coordinates"
            />

            <preview
              class="small"
              :width="60"
              :height="60"
              :image="result.image"
              :coordinates="result.coordinates"
            />

          </div>

          <button class="modal-font"  style="cursor: pointer" @click="updateMiniature">
            Сохранить изменения
          </button>
        </div>
      </div>
  </div>
</template>

<script>
import { Cropper, CircleStencil, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css'

export default {
  name: 'changeMiniature',
  components: {
    Cropper, CircleStencil, Preview
  },

  props: {
    profilePicturePath: String,
    // profilePictureFile: File,
    closeModal: Function,
  },

  data (){
    return {
      profileImage: this.profilePicturePath,
      result: {
        coordinates: null,
        image: null
      }
    }
  },
  methods: {
    changeMiniature() {
      this.$emit('changeProfileMiniature');
    },
    updateMiniature(){
      const result = this.$refs.cropper.getResult()

      if (result.canvas) {
        const fileExt = this.profilePicturePath.match(/(png|jpg|jpeg)/)?.[0]
        if (!fileExt) {
          console.log('File extension not found')
          return
        }

        const path = result.canvas.toDataURL(`image/${fileExt}`)
        result.canvas.toBlob((blob) => {
          const file = new File([blob], `file.${fileExt}`)
          this.$emit('save', { path, file: file })

          // const reader = new FileReader();

          // reader.onload = e => {
          //   this.profilePicturePath = e.target.result;
          //   this.$forceUpdate()
          // };
          // reader.readAsDataURL(this.profilePictureFile);

          // console.log(this.profilePicturePath)
          // console.log(this.profilePictureFile)
          // this.$forceUpdate()
          this.closeModal()
        }, `image/${fileExt}`)
      }
      // this.$emit('updateProfilePictureMiniature', {
      //   miniature: JSON.stringify(this.result)
      // });
      // this.$emit('changeProfileMiniature');
    },

    onChange({ coordinates, image }) {
      this.result = {
        coordinates,
        image
      };
    },
  },
}
</script>
<style scoped lang="scss">
.modal-content {
  height: auto;
  width: 40%;
  background-color: white;
  border-radius: 15px;

  img#exit{
    cursor: pointer;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:#FFDBBA;
    height: 3.5rem;
    overflow: hidden;
    border-radius: 15px 15px 0 0;
    padding: 0 4% 0 4%;

    p {
      color: #00000099;
      font-weight: 500;
      margin-bottom: 0;
    }
  }

  .modal-body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // padding: 5%;

    div {
      width: 83%;
      margin-top: 2%;
      .text-modal {
        margin-top: 3%;
        font-weight: 400;
        color: #000000;
        font-size: 16px;
        margin-bottom: 0;
      }
    }

    button {
      width: 40%;
      height: 2.4rem;
      background-color: #FE6637 ;
      color: white;
      font-size: 16px;
      font-weight: 600;
      border: 1px #FE6637;
      border-radius: 10px;
      margin-top: 5%;
      margin-bottom: 30px;
    }

    .img-wrapper {
      position: relative;
      display: flex;
      justify-content: space-between;

      .change-miniature {
        width: 50%;
        margin-right: 14%;
        max-height: 250px;
      }

      .big {
        width: 150px;
        position: absolute;
        right: 30%;
        bottom: 40%;
        border-radius: 50%;
      }
      .small {
        width: 100px;
        position: absolute;
        bottom: 0%;
        right: 36%;
        border-radius: 50%;
      }
    }
  }
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
}

@media screen and (max-width: 1450px) {
  .modal-content {
    width: 50%;
  }
  .modal-content .modal-body .img-wrapper .big {
    right: 25%;
  }
  .modal-content .modal-body .img-wrapper .small {
    right: 35%;
  }
}
@media screen and (max-width: 769px) {
  .modal-content {
    width: 80%;
    padding-bottom: 20px;
  }
  .modal-content .modal-body .img-wrapper .big {
    right: 20%;
  }
  .modal-content .modal-body button {
    width: 80%;
  }
}
@media screen and (max-width: 480px) {
  .modal-content {
    width: 100%;
  }
  .modal-content .modal-body div .text-modal {
    font-size: 16px;
  }
  .modal-content .modal-body .img-wrapper .big {
    right: 5%;
  }
  .modal-content .modal-body .img-wrapper .small {
    right: 30%;
  }
  .modal-content .modal-body .img-wrapper {
    margin-top: 40px;
  }
}

</style>
