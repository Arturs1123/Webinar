<template>
  <div style="background: rgb(237, 238, 240); min-height: 100vh;">
    <Header/>
    <div class="main__content">
      <div class="content__sidebar__menu">
        <SidebarMenu/>
      </div>
      <div class="content__createwebinar">
        <div class="webinar__autowebinar"
             style="margin-top: 20px; width: 98%; margin-left: 50%; transform: translate(-50%, 0)"
        >
          <img src="../../static/svg/webinar.svg" alt="">
          <p class="webinar__title" style="margin-left: 20px">Редактировать {{ this.isAutowebinar ? 'автовебинара' : 'вебинара' }}</p>
        </div>
        <div class="webinar__autowebinar2"
             style="margin-top: 20px; width: 98%; margin-left: 50%; transform: translate(-50%, 0); padding: 30px">
          <h2 class="create__webinar__title" style="text-align: center;">Внешняя страница {{ this.isAutowebinar ? 'автовебинара' : 'вебинара' }}</h2>
          <div class="room">
            <div class="room__create">
              <p class="room__title">Стандартный стиль: <span class="room__subtitle">(Выберите задний фон входа в {{ this.isAutowebinar ? 'автовебинарную' : 'вебинарную' }} комнату)</span></p>
              <div class="create__fons">
                <div class="fons__style">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/web_background_0.jpg'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkStandardBackground('web_background_0.jpg')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.standard.checked === 'web_background_0.jpg') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/web_background_1.jpg'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkStandardBackground('web_background_1.jpg')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.standard.checked === 'web_background_1.jpg') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style" style="display: none;">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/web_background_2.jpg'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkStandardBackground('web_background_2.jpg')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.standard.checked === 'web_background_2.jpg') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style" style="display: none;">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/web_background_3.jpg'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkStandardBackground('web_background_3.jpg')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.standard.checked === 'web_background_3.jpg') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style" style="display: none;">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/web_background_4.jpg'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkStandardBackground('web_background_4.jpg')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.standard.checked === 'web_background_4.jpg') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style" style="display: none;">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/web_background_5.jpg'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkStandardBackground('web_background_5.jpg')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.standard.checked === 'web_background_5.jpg') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="option">
                <div class="option__webinar">
                  <div style="margin-top: 20px" class="room__checkbox">
                    <button class="add__title" @click="chooseFiles('web_background_custom')">Загрузить свой фон</button>
                    <p class="button__title">Рекомендуемый размер: 1280x720</p>
                  </div>
                  <v-file-input
                    style=""
                    id="web_background_custom"
                    v-model="customStandardBackground"
                    @change="setCustomBackground($event, 'customStandardBackgroundUrl')" />
                </div>
              </div>
              <!--              <div class="room__button">-->
              <!--                <button class="room__upload">Загрузить свой фон</button>-->
              <!--                <p class="button__title">Рекомендуемый размер: 1280x720</p>-->
              <!--              </div>-->
            </div>
            <!-- <hr style="margin-top: 20px;" /> -->
            <div style="margin-top: 30px; display: none;" class="room__create">
              <p class="room__title">Дизайнерский стиль стиль: <span class="room__subtitle">(Выберите задний фон входа в {{ this.isAutowebinar ? 'автовебинарную' : 'вебинарную' }} комнату)</span></p>
              <div class="create__fons">
                <div class="fons__style">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/design_background_0.png'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkDesignBackground('design_background_0.png')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.design.checked === 'design_background_0.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/design_background_0.png'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkDesignBackground('design_background_0.png')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.design.checked === 'design_background_0.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/design_background_1.png'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkDesignBackground('design_background_1.png')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.design.checked === 'design_background_1.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/design_background_1.png'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkDesignBackground('design_background_1.png')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.design.checked === 'design_background_1.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/design_background_2.png'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkDesignBackground('design_background_2.png')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.design.checked === 'design_background_2.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="fons__style">
                  <div class="chkbox__background__container">
                    <img class="style" :src="$config.staticURL + '/design_background_2.png'" alt="">
                    <div
                      class="chkbox__background__label"
                      @click="checkDesignBackground('design_background_2.png')"
                    >
                      <div
                        :class="['chkbox__background__icon',
                          (this.backgrounds.design.checked === 'design_background_2.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="option">
                <div class="option__webinar">
                  <div style="margin-top: 20px" class="room__checkbox">
                    <button class="add__title" @click="chooseFiles('design_background_custom')">Загрузить свой фон</button>
                    <p class="button__title">Рекомендуемый размер: 1280x720</p>
                  </div>
                  <v-file-input
                    style="display: none;"
                    id="design_background_custom"
                    v-model="customDesignBackground"
                    @change="setCustomBackground($event, 'customDesignBackgroundUrl')" />
                </div>
              </div>
              <!--              <div class="room__button">-->
              <!--                <button class="room__upload">Загрузить свой фон</button>-->
              <!--                <p class="button__title">Рекомендуемый размер: 1280x720</p>-->
              <!--              </div>-->
              <!-- <hr style="margin-top: 20px;" /> -->
            </div>
          </div>
          <div class="option__webinar">
            <label class="label__webinar" >Заголовок {{ this.isAutowebinar ? 'автовебинара' : 'вебинара' }}<span class="red--text">*</span>:</label>
            <input class="input__option" v-model="webinarData.title" type="text" :maxlength="140">
          </div>
          <div class="title-wrapper">
            <div>
              <div class="option__webinar">
                <label class="label__webinar" >Ведущий {{ this.isAutowebinar ? 'автовебинара' : 'вебинара' }}<span class="red--text">*</span>:</label>
                <input class="input__option" v-model="webinarData.userName" type="text">
                <div class="room__checkboxxxxxxx">
                  <div
                    @click="toggleMainStr"
                    :class="['chkbox__background__icon__simple',
                      (isMainStr) ?
                      'chkbox__background__icon_on' :
                      'chkbox__background__icon_off']"
                  ></div>
                  <span class="room__titles" style="font-size: 14px !important; line-height: 14px !important;">Отметить важным, чтобы описать ведущего вебинара</span>
                </div>
              </div>
              <div class="option__webinar">
                <label class="label__webinar" >Статус ведущего {{ this.isAutowebinar ? 'автовебинара' : 'вебинара' }}:</label>
                <input class="input__option" v-model="webinarData.userStatus" type="text">
              </div>
              <div style="padding-top: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;"
              >
                <p class="label__webinar">Аватар ведущего: Рекомендуемый размер 100x100</p>
                <v-avatar
                  @click="openChangeAvatarModal"
                  style="cursor: pointer"
                  size="180"
                >
                  <v-img
                    :src="userAvatarUrl"
                    alt="John"
                  ></v-img>
                </v-avatar>
                <v-file-input style="width: 300px" label="Загрузить изображение" v-model="webinarData.userAvatar" @change="onFileChange($event, 'userAvatarUrl')"></v-file-input>

              </div>
              <div class="option__webinar">
                <label class="label__webinar" >Дата проведения (Время Московское)<span class="red--text">*</span>:</label>
                <input id="dateStart" class="input__option" v-model="webinarData.dateStart" type="datetime-local" @click="focusDateStart">
              </div>
            </div>
            <div>
              <!-- <label class="label__webinar" >Дополнительная ссылка для входа в комнату:</label>
              <input class="input__option" v-model="redirectOut" type="text"> -->
              <label class="label__webinar" >Название кнопки входа в вебинар:</label>
              <input class="input__option" v-model="webinarData.buttonEnteringPage" :maxlength="30" type="text">
            </div>
            <div>
              <!-- <label class="label__webinar" >Дополнительная ссылка для входа в комнату:</label>
              <input class="input__option" v-model="webinarData.additionalLinkEnterRoom" type="text"> -->
              <label class="label__webinar" >Редирект при выходе со страницы входа:</label>
              <input class="input__option" v-model="webinarData.redirectLeaveEnteringPage" type="text">
            </div>
          </div>
          <!-- <hr style="margin-top: 40px;"/> -->
          <div class="option__webinar" style="display: none;">
            <label class="label__webinar" >Редирект по окончанию вебинара:</label>
            <input class="input__option" v-model="webinarData.redirectout" type="text">
          </div>
          <!-- <div class="option__webinar">
            <label class="label__webinar" >Редирект при выходе из вебинарной комнаты:</label>
            <input class="input__option" v-model="webinarData.redirectOut" type="text">
          </div> -->
          <!-- <hr style="margin-top: 40px;"/> -->
        </div>
        <div class="webinar__autowebinar2"
             style="margin-top: 20px; width: 98%; margin-left: 50%; transform: translate(-50%, 0); padding: 30px"
        >
          <h2 class="create__webinar__title" style="text-align: center;">Внутренняя страница {{ this.isAutowebinar ? 'автовебинара' : 'вебинара' }}</h2>
          <div class="webinar__autowebinars">
            <div class="room">
              <div style="margin-top: 30px;" class="room__create chat-room-background">
                <p style="color: #4D4D4D; text-decoration-line: underline;" class="room__title">Дневной режим</p>
                <div class="create__fons">
                  <div class="fons__style">
                    <div class="chkbox__background__container">
                      <img class="style" :src="$config.staticURL + '/web_background_inside_0.png'" alt="" style="border: 1px solid #f1f1f1;">
                      <div
                        class="chkbox__background__label"
                        @click="checkInsideBackground('web_background_inside_0.png')"
                      >
                        <div
                          :class="['chkbox__background__icon',
                          (this.backgrounds.inside.checked === 'web_background_inside_0.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="fons__style">
                    <div class="chkbox__background__container">
                      <img class="style" :src="$config.staticURL + '/web_background_inside_1.png'" alt="">
                      <div
                        class="chkbox__background__label"
                        @click="checkInsideBackground('web_background_inside_1.png')"
                      >
                        <div
                          :class="['chkbox__background__icon',
                          (this.backgrounds.inside.checked === 'web_background_inside_1.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="fons__style">
                    <div class="chkbox__background__container">
                      <img class="style" :src="$config.staticURL + '/web_background_inside_2.png'" alt="">
                      <div
                        class="chkbox__background__label"
                        @click="checkInsideBackground('web_background_inside_2.png')"
                      >
                        <div
                          :class="['chkbox__background__icon',
                          (this.backgrounds.inside.checked === 'web_background_inside_2.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p style="color: #4D4D4D; text-decoration-line: underline; margin-top: 10px;" class="room__title">Ночной режим</p>
                <div class="create__fons">
                  <div class="fons__style">
                    <div class="chkbox__background__container">
                      <img class="style" :src="$config.staticURL + '/web_background_inside_3.png'" alt="">
                      <div
                        class="chkbox__background__label"
                        @click="checkInsideBackground('web_background_inside_3.png')"
                      >
                        <div
                          :class="['chkbox__background__icon',
                          (this.backgrounds.inside.checked === 'web_background_inside_3.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="fons__style">
                    <div class="chkbox__background__container">
                      <img class="style" :src="$config.staticURL + '/web_background_inside_4.png'" alt="">
                      <div
                        class="chkbox__background__label"
                        @click="checkInsideBackground('web_background_inside_4.png')"
                      >
                        <div
                          :class="['chkbox__background__icon',
                          (this.backgrounds.inside.checked === 'web_background_inside_4.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="fons__style">
                    <div class="chkbox__background__container">
                      <img class="style" :src="$config.staticURL + '/web_background_inside_5.png'" alt="">
                      <div
                        class="chkbox__background__label"
                        @click="checkInsideBackground('web_background_inside_5.png')"
                      >
                        <div
                          :class="['chkbox__background__icon',
                          (this.backgrounds.inside.checked === 'web_background_inside_5.png') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr style="margin-top: 20px;" />
                <div class="option">
                  <div class="option__webinar">
                    <div style="margin-top: 20px" class="room_checkbox_column room__checkbox">
                      <p class="room__titless">Заставка-приветствие перед {{ this.isAutowebinar ? 'автовебинаром' : 'вебинаром' }}:</p>
                      <div>
                        <button class="add__title" @click="chooseFiles('screensaver-photo')">Загрузить фотографию</button>
                        <p class="button__title recommended-text">Рекомендуемый размер: 1280x720</p>
                      </div>
                    </div>
                    <v-file-input
                      id="screensaver-photo"
                      v-model="screensaverPhoto"
                      @change="onFileChange($event, 'screensaverPhotoUrl')"
                      :disabled="screensaverVideo !== ''" />
                    <label class="label__webinar" >Видео приветствие:</label>
                    <input
                      class="input__option"
                      type="text"
                      :disabled="screensaverPhoto !== '' || screensaverAudio !== ''"
                      v-model="screensaverVideo"
                    >
                    <div style="margin-top: 20px" class="room_checkbox_column room__checkbox">
                      <p class="room__titless">Аудио приветствие:</p>
                      <div>
                        <button class="add__title" @click="chooseFiles('screensaver-audio')">Загрузить аудиозапись</button>
                        <p class="button__title recommended-text">Аудио можно загрузить не больше 10 Мб</p>
                      </div>
                    </div>
                    <v-file-input
                      id="screensaver-audio"
                      v-model="screensaverAudio"
                      @change="onFileChange($event, 'screensaverAudioUrl')"
                      :disabled="screensaverVideo !== ''" />
                    <label class="label__webinar" >Закрепленный комментарий:</label>
                    <input class="input__option" type="text" v-model="webinarData.comment">
                  </div>
                  <hr style="margin-top: 20px;" />
                  <div class="room__author">
                    <div class="room__checkboxxxxxxx">
                      <div
                        @click="toggleBlockChatBeforeStart"
                        :class="['chkbox__background__icon__simple',
                          (webinarData.blockChatBeforeStart) ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                      <span class="room__titles">Блокировать чат до начала {{ this.isAutowebinar ? 'автовебинара' : 'вебинара' }}</span>
                    </div>
                    <div class="room__checkbox">
                      <div
                        @click="toggleBanWords"
                        :class="['chkbox__background__icon__simple',
                          (banWordsOn) ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                      <span class="room__titles">Запрещёные слова</span>
                      <BanWordsSettings v-bind:ban-words="webinarData.banWords"/>
                    </div>
                    <div class="room__checkboxxxxxxx">
                      <div
                        @click="toggleAddLinkNotificationSound"
                        :class="['chkbox__background__icon__simple',
                          (webinarData.addLinkNotificationSound) ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                      ></div>
                      <span class="room__titles">Звук уведомления при добавлении ссылки</span>
                    </div>
                  </div>
                  <hr style="margin-top: 20px;" />
                  <div class="option__webinar">

                    <div class="modal__content1" style="margin-top: 20px">
                      <div class="modals__input">
                        <div>
                          <label class="label__webinar" >Текст ссылки: <span class="room__subtitle">(не больше 50 символов)</span></label>
                          <input class="input__option" type="text" v-model="newLinkName">
                        </div>
                        <div>
                          <label class="label__webinar" >Ссылка:</label>
                          <input class="input__option" type="text" v-model="newLinkMsg">
                        </div>
                        <div class="modals__input__color">
                          <label class="label__webinar" >Цвет кнопки: </label>
                          <button
                            class="color__text"
                            @click="toggleColorPicker"
                            :style="{
                              background: newLinkColor,
                              width: '100%',
                              height: '43px',
                              'border-radius': '10px',
                              border: '1px solid #A8ADB8',
                              outline: 'none',
                            }">{{ newLinkColor }}
                          </button>
                          <v-color-picker
                            v-if="colorPickerOpen"
                            v-model="newLinkColor"
                          />
                        </div>
                        <div class="button__add__link">
                          <button style="margin-top: 25px;" class="add__title" @click="addLink">Добавить ссылку</button>
                        </div>
                      </div>
                    </div>
                    <div class="links__container" v-if="webinarData.links?.length">
                      <div v-for="(link, idx) in webinarData.links">
                        <div class="update__option">
                          <div style="display: flex; width: 90%">
                            <span class="wait">{{ link.nameLink }}. [Цвет кнопки: <span :style="{color: link.colorLink}">{{ link.colorLink }}</span>]<br>
                              <a :href="link.msgLink + ' '" target="_blank">{{ link.msgLink }}</a>
                            </span>
                          </div>
                          <div>
                            <img
                              style="display: flex;"
                              class="remove_link__btn"
                              src="../../static/svg/close.svg"
                              @click="removeLink(link)"
                              alt="Nope"
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <label class="label__webinar" >Редирект при выходе с комнаты: <span class="room__subtitle">(не больше 50 символов)</span></label>
                    <input class="input__option" type="text" v-model="webinarData.redirectLeave">
                    <label class="label__webinar" >Редирект по окончанию вебинара:</label>
                    <input class="input__option" type="text" v-model="webinarData.redirectOut">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="webinar__autowebinar2"
             style="margin-top: 20px; width: 98%; margin-left: 50%; transform: translate(-50%, 0); padding: 30px"
        >
          <h1 class="create__webinar__title" style="margin-bottom: 0px">Дополнительные настройки</h1>
          <div class="webinar__autowebinars">
            <div style="width: 100%;" class="room">
              <div class="room__create">
                <!--                style="margin-top: 30px;"-->
                <div class="option">
                  <div class="option__webinar">
                    <label class="label__webinar">Красивая ссылка<span class="red--text">*</span>:</label>
                    <input class="input__option" v-model="webinarData.url" type="text">
                    <label class="label__webinar">Ссылка на трансляцию YouTube<span class="red--text">*</span>:</label>
                    <input class="input__option" v-model="webinarData.source" type="text">
                    <div class="room__checkboxx">
                      <div class="dsada">
                        <div class="moderator">
                          <label class="" >Добавить модератора:</label>
                          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 0.5rem;">
                            <span class="selected__moderator">{{ moderatorText }}</span>
                            <img v-if="moderatorText" class="close_btn" @click="clearModerator" src="../../static/svg/close.svg" alt="Nope">
                          </div>  
                        </div>
                        <!-- <input
                          class="input__option"
                          type="text"
                          placeholder="ID, телефон или email пользователя"
                          v-model="moderator"
                        > -->
                        <div class="select__moderator">
                          <Select2 
                            class="select__moderator--select2"
                            :options="userList" 
                            v-model="moderator"
                            :settings="{ width: '100%' }"
                            @select="selectModerator"
                          />
                        </div>
                      </div>
                      <div style="display: contents; margin-top: 25px;">
                        <button class="add__titles" @click="addModerator">Добавить модератора</button>
                      </div>
                    </div>
                    <div class="room__author">
                      <div class="room__checkboxxxxxxx" style="margin-bottom: 16px" v-if="!this.isAutowebinar">
                        <div class="chkbox chex__title" style="width: auto" >
                          <div class="chkbox__playback__container" style="width: 50px">
                            <div
                              class="chkbox__background__label"
                              @click="togglePlayback"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                                (this.webinarData.playback) ?
                                'chkbox__background__icon_on' :
                                'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__titles" style="margin-left: 0;">{{ this.isAutowebinar ? 'Воспроизводить автовебинар каждые:' : 'Превратить в автовебинар по окончании вебинара:' }}</span>
                        </div>
                      </div>
                      <div class="room__checkboxxxxx">
                        <div class="chkbox chex__title">
                          <div class="chkbox__playback__container">
                            <div
                              class="chkbox__background__label"
                              @click="checkPlayback('1min')"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                                (this.webinarData.playbackFrequency === '1min') ?
                                'chkbox__background__icon_on' :
                                'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__title">1 мин.</span>
                        </div>
                        <div class="chkbox chex__title">
                          <div class="chkbox__playback__container">
                            <div
                              class="chkbox__background__label"
                              @click="checkPlayback('5min')"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                          (this.webinarData.playbackFrequency === '5min') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__title">5 мин.</span>
                        </div>
                        <div class="chkbox chex__title">
                          <div class="chkbox__playback__container">
                            <div
                              class="chkbox__background__label"
                              @click="checkPlayback('10min')"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                          (this.webinarData.playbackFrequency === '10min') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__title">10 мин.</span>
                        </div>
                        <div class="chkbox chex__title">
                          <div class="chkbox__playback__container">
                            <div
                              class="chkbox__background__label"
                              @click="checkPlayback('30min')"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                          (this.webinarData.playbackFrequency === '30min') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__title">30 мин.</span>
                        </div>
                        <div class="chkbox chex__title">
                          <div class="chkbox__playback__container">
                            <div
                              class="chkbox__background__label"
                              @click="checkPlayback('1hour')"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                          (this.webinarData.playbackFrequency === '1hour') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__title">1 ч.</span>
                        </div>
                        <div class="chkbox chex__title">
                          <div class="chkbox__playback__container">
                            <div
                              class="chkbox__background__label"
                              @click="checkPlayback('6hour')"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                          (this.webinarData.playbackFrequency === '6hour') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__title">6 ч.</span>
                        </div>
                        <div class="chkbox chex__title">
                          <div class="chkbox__playback__container">
                            <div
                              class="chkbox__background__label"
                              @click="checkPlayback('12hour')"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                          (this.webinarData.playbackFrequency === '12hour') ?
                          'chkbox__background__icon_on' :
                          'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__title">12 ч.</span>
                        </div>
                        <div class="chkbox chex__title">
                          <div class="chkbox__playback__container">
                            <div
                              class="chkbox__background__label"
                              @click="checkPlayback('24hour')"
                            >
                              <div
                                :class="['chkbox__playback__icon',
                                (this.webinarData.playbackFrequency === '24hour') ?
                                'chkbox__background__icon_on' :
                                'chkbox__background__icon_off']"
                              ></div>
                            </div>
                          </div>
                          <span class="room__title">24 ч.</span>
                        </div>
                      </div>
                      <div class="room__checkboxx">
                        <div style="width: 100%; display: flex; flex-direction: column;">
                          <label style="text-align: left;" class="label__webinar" >Количество посетителей в течение {{ this.isAutowebinar ? 'автовебинара' : 'вебинара' }}:</label>
                          <div class="fsdfsfsd">
                            <div>
                              <label for="viewersQuantityStart">
                                В начале
                              </label>
                              <input
                                class="input__option"
                                id="viewersQuantityStart"
                                type="number"
                                placeholder="В начале"
                                v-model="webinarData.viewersQuantityStart"
                              >
                            </div>
                            <div style="margin-right: 10px">
                              <label for="viewersQuantityMiddle">
                                В середине
                              </label>
                              <input
                                class="input__option"
                                id="viewersQuantityMiddle"
                                type="number"
                                placeholder="В середине"
                                v-model="webinarData.viewersQuantityMiddle"
                              >
                            </div>
                            <div style="margin-right: 10px">
                              <label for="viewersQuantityEnd">
                                В конце
                              </label>
                              <input
                                class="input__option"
                                id="viewersQuantityEnd"
                                type="number"
                                placeholder="В конце"
                                v-model="webinarData.viewersQuantityEnd"
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    <div style="text-align: left;" v-if="isAutowebinar">
                      <button style="margin-top: 25px; margin-left:0; color: #fff;" class="add__title" @click="goToScriptEditor">Редактор сценария</button>
                      <button style="margin-top: 25px; margin-left:0; color: #fff;" class="add__title"><a target="_blank" :href="'/a/'+ webinarData.url" >Превью</a></button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="requiredFieldsError" class="required-fields-error">
          <span class="red--text">Не заполнены все обязательные поля</span>
        </div>
        <div class="header-profile-icon" :style="{'margin-top': (requiredFieldsError) ? '5px' : '30px'}">
          <button class="customBtn" @click="updateWebinar">Сохранить изменения</button>
        </div>
      </div>
    </div>
    <createWebinar
      v-if="createWebinarModalOpen"
      :pretty-link="url"
      :close-modal="closeCreateWebinarModal"
    />
    <changeMiniature
      v-if="changeAvatarModalOpen"
      v-bind:profile-picture-path="userAvatarUrl"
      v-bind:profile-picture-file="webinarData.userAvatar"
      :close-modal="closeChangeAvatarModal"
      v-on:save="updateMiniature"
    />
    <descriptionModal 
      v-if="descriptionModalOpen"
      :text="webinarData.userDescription"
      :close-modal="closeDescriptionModal"
      :save-modal="saveDescription"
    />
  </div>
</template>

<script>
import DeleteWebinar from "@/components/Modals/deleteWebinar.vue";
import CreateWebinar from "@/components/Modals/createWebinar.vue";
import ChangeMiniature from "@/components/Modals/changeMiniature.vue";
import moment from "moment-timezone";
import Select2 from 'vue3-select2-component';
import DescriptionModal from "@/components/Modals/descriptionModal";
export default {
  name: 'IndexPage',
  components: {ChangeMiniature, DeleteWebinar, CreateWebinar, Select2, DescriptionModal},
  middleware: "authorized",
  watch: {
    viewersQuantityStart: {
      handler() {
        console.log(this.viewersQuantityStart)
      }
    },
    screensaverPhoto: {
      handler() {
        if (!this.screensaverPhoto) {
          this.screensaverPhotoUrl = ''
        }
      },
      deep: true
    },
    screensaverAudio: {
      handler() {
        if (!this.screensaverAudio) {
          this.screensaverAudioUrl = ''
        }
      },
      deep: true
    }
  },
  data() {
    return {
      socket: null,
      userList: [],
      isMainStr: false,
      editId: 0,
      isAutowebinar: false,
      userId: localStorage.getItem('userId'),
      userAvatarUrl: '',
      userAvatarBlobData: null,
      screensaverPhoto: '',
      screensaverPhotoUrl: '',
      screensaverAudio: '',
      screensaverAudioUrl: '',
      screensaverVideo: '',
      comment: '',
      webinarData: {
        id: '',
        title: '',
        backgroundIn: '',
        backgroundOut: '',
        userName: '',
        userDescription: '',
        userAvatar: null,
        userAvatarName: '',
        userAvatarUrl: '',
        userStatus: '',
        redirectLeave: '',
        redirectOut: '',
        redirectLeaveEnteringPage: '',
        additionalLinkEnterRoom: '',
        dateStart: '',
        comment: '',
        commentData: '',
        url: '',
        source: '',
        buttonEnteringPage: '',
        isActive: 0,
        userCount: 0,
        status: 0,
        banWords: [],
        moderators: [],
        playbackFrequency: '',
      	screensaverPhoto: null,
        screensaverPhotoUrl: '',
      	screensaverAudio: null,
        screensaverAudioUrl: '',
        screensaverVideo: '',
        avatarFilePath: 'http://localhost:5001/storage/design_background_2.png',
        viewersQuantityStart: 0,
        viewersQuantityMiddle: 0,
        viewersQuantityEnd: 0,
        links: [],
        blockChatBeforeStart: false,
        addLinkNotificationSound: false,
        playback: false,
      },
      banWordsModal: false,
      banWordsOn: false,
      newLinkName: '',
      newLinkMsg: '',
      newLinkColor: '#0077FF',
      colorPickerOpen: false,
      createWebinarModalOpen: false,
      changeAvatarModalOpen: false,
      backgrounds: {
        standard: {
          checked: '',
          default: [],
          custom: []
        },
        inside: {
          checked: '',
          default: [],
          custom: []
        },
        design: {
          checked: '',
          default: [],
          custom: []
        },
      },
      moderator: null,
      moderatorText: '',
      moderators: [],
      requiredFieldsError: false,
      customStandardBackground: null,
      customStandardBackgroundUrl: '',
      customDesignBackground: null,
      customDesignBackgroundUrl: '',
      strScriptEditor: '',
      descriptionModalOpen: false,
    }
  },
  async mounted() { 
    if (!localStorage.getItem('token')) {
      await this.$router.push(`/`)
    } else {
      var users = await this.$axios.post(
        `/users/getModeratorList`,
        ).catch(e => {
          return false
        });
      this.userList = users.data.data

      this.isAutowebinar = this.$store.state.editWebinarType
      this.editId = this.$store.state.editWebinarId
      this.strScriptEditor = this.$store.state.strScriptEditor
      let data = null
      if (this.strScriptEditor == 'edit') {
        data = this.$store.state.autowebinar
        this.isAutowebinar = 1
        this.editId = data.id
      } else {
        const params = {
          id: this.editId,
          isAutowebinar: this.isAutowebinar,
        }
        data = await this.$axios.$get(
          `/webinars/1`,
          {
            params: params
          }
        )
        var moderator = await this.$axios.$post(
          `/webinars/moderator`,
          {
            params: params
          }
        )
        
        if (moderator.length) {
          this.moderator = this.userList[this.userList.findIndex(option => option.id === moderator[0].userId)]
          this.moderatorText = this.moderator.text;
        } 

        console.log("moderator=====>", this.moderator)
      }

      for (const [key, value] of Object.entries(data)) {
        if (Object.hasOwn(this.webinarData, key)) {
          if(key === 'userId') {
            if(localStorage.getItem('userId')) {
              this.webinarData[key] = localStorage.getItem('userId');
            } else {
              this.webinarData[key] = value
            }
          }
          if (key === 'links') {
            if (!value || value.length == undefined || value == null || value.length == 0) continue
            
            this.webinarData[key] = []
            if (typeof value === 'string') {
              try {
                const arr = JSON.parse(value)
                for (let i in arr) {
                  const obj = {
                    'nameLink': arr[i].nameLink,
                    'msgLink': arr[i].msgLink,
                    'colorLink': arr[i].colorLink
                  }
                  this.webinarData[key].push(obj)
                }
              } catch (error) {
                console.log('error', error)         
              }
            }
            // console.log(typeof this.webinarData[key])
            // console.log(this.webinarData[key])
            continue
          }
          if (key === 'dateStart') {
            const dbDate = new Date(value)
            const dbUtc = dbDate.getTime()

            const date = new Date(dbUtc + 180 * 60000).toISOString().slice(0, 16)
            this.webinarData[key] = date
            continue
          }

          if (key === 'blockChatBeforeStart') {
            this.webinarData[key] = (value === 'Y') ? true : false
            continue
          }
          if (key === 'addLinkNotificationSound') {
            this.webinarData[key] = (value === 'Y') ? true : false
            continue
          }
          if (key === 'playback') {
            this.webinarData[key] = (value === 'Y') ? true : false
            continue
          }

          if (key === 'userAvatar') {
            if (!value || value.length == undefined || value == null || value.length == 0) {
              this.userAvatarUrl = `/author__photo.png`
              const res = await fetch('`/author__photo.png`')
              const blob = await res.blob()
              this.userAvatar = null
              this.webinarData[key] = null
            } else {
              this.webinarData.userAvatar = this.$config.staticURL + '/' + value
              this.userAvatarUrl = this.$config.staticURL + '/' + value
              const avatar = await this.$axios.$get(
                '/files/photo',
                {
                  params: {
                    filename: value,
                  },
                  headers: {
                    "Authorization": localStorage.getItem('token')
                  },
                  responseType: 'arraybuffer'
                }
              )

              const fileAvatar = new File([avatar], value)
              this.webinarData[key] = fileAvatar
            }
            continue
          }

          if (key === 'banWords') {
            if (!value || value.length == undefined || value == null || value.length == 0) continue
            console.log('123')
            const banWords = value.split('; ')
            if (banWords.length && banWords[0]) {
              this.webinarData.banWords = banWords
              this.banWordsOn = true
            }
            continue
          }

          if (key === 'screensaverPhoto' || key === 'screensaverAudio') {
            if (value) {
              this.webinarData[`${key}Url`] = this.$config.staticURL + '/' + value
              const res = this.$axios.$get(
                '/files/photo',
                {
                  params: {
                    filename: value,
                  },
                  headers: {
                    "Authorization": localStorage.getItem('token')
                  },
                  responseType: 'arraybuffer'
                }
              )

              const screensaverFile = new File([res], value)
              this.webinarData[key] = screensaverFile
              if (key === 'screensaverPhoto')
                this.screensaverPhoto = screensaverFile
              else if (key === 'screensaverAudio')
                this.screensaverAudio = screensaverFile
              continue
            }
          }

          if (key === 'screensaverVideo') {
            if (value === null) {
              this.screensaverVideo = ''
            } else {
              this.screensaverVideo = value
            }
          }

          if (key === 'comment') {
            this.comment = value
            this.webinarData.comment = value
          }
          this.webinarData[key] = value
        } else {
          if (key?.startsWith('backgroundImage')) {
            if (value?.match(/.*background.*/)) {
              this.backgrounds[key.replace('backgroundImage', '').toLowerCase()].checked = value
            } else if (value) {
              this.backgrounds[key.replace('backgroundImage', '').toLowerCase()].checked = 'custom'

              this[`custom${key.replace('backgroundImage', '')}BackgroundUrl`] = this.$config.staticURL + '/' + value
              const customBackgroudFile = this.$axios.$get(
                '/files/photo',
                {
                  params: {
                    filename: value,
                  },
                  headers: {
                    "Authorization": localStorage.getItem('token')
                  },
                  responseType: 'arraybuffer'
                }
              )

              this[`custom${key.replace('backgroundImage', '')}Background`] = new File([customBackgroudFile], value)
            }

            continue
          }
        }
      }
      console.log(this.webinarData)
      this.$store.commit('setStrScriptEditor', '');
      if (this.webinarData.userName.includes('!')) {
        this.isMainStr = true
      }
      const routePath = this.$route.path
      if (routePath.includes('2')) {
        const socket = new WebSocket(process.env.SOCKET_URL);
        socket.onopen = function () {
          let strLogin = 'User'
          console.log(strLogin)
          if(localStorage.getItem("login")) strLogin = localStorage.getItem("login")
          else strLogin = localStorage.getItem("nameGhoste")
          
          socket.send(JSON.stringify({
            action: "auth",
            data: {
              isAutowebinar: isAutowebinar,
              type: auth.type,
              authData: auth.data,
              login: strLogin,
              chat: String(this.webinarId),
              device: String(navigator.userAgent?.toLowerCase()),
              msg: this.comment,
              room: this.webinarId,
              timestamp: moment().tz('Europe/Moscow'), // Date.now(),
            }
          }))

          socket.onmessage = async (event) => {
            const command = JSON.parse(event.data)
            
          }
        };

        socket.onmessage = async (event) => {
          const command = JSON.parse(event.data)

        }

        this.socket = socket
      }
    }
  },
  methods: {
    clearModerator() {
      this.moderator = null
      this.moderatorText = ''
    },
    selectModerator(val){
      this.moderator = val
    },
    closeDescriptionModal() {
      this.descriptionModalOpen = false
    },
    saveDescription(data) {
      this.webinarData.userDescription = data
      if (data) {
        this.isMainStr = true
        if (!this.webinarData.userName.includes('!')) {
          this.webinarData.userName = this.webinarData.userName + '!'
        }
      } else {
        this.isMainStr = false
        this.webinarData.userName = this.webinarData.userName.replace('!', '')
      }
      this.descriptionModalOpen = false
      this.descriptionModalOpen = false
    },
    removeLink(linkForRemove) {
      this.webinarData.links = this.webinarData.links.filter((link) => {
        return (
          link.nameLink.trim() !== linkForRemove.nameLink.trim()
          || link.msgLink.trim() !== linkForRemove.msgLink.trim()
          || link.colorLink !== linkForRemove.colorLink
        )
      })
    },
    setCustomBackground(event, field)  {
      this.checkStandardBackground('custom')
      this.onFileChange(event, field)
    },
    toggleColorPicker() {
      this.colorPickerOpen = !this.colorPickerOpen
    },
    addLink() {
      if (
        (this.newLinkName.trim() !== '' && this.newLinkMsg.trim() !== '')
        && !this.webinarData.links.some((link) => {
          return (
            link.nameLink.trim() === this.newLinkName.trim()
            && link.msgLink.trim() === this.newLinkMsg.trim()
            && link.colorLink === this.newLinkColor
          )
        })
      ) {
        this.webinarData.links = [
          ...this.webinarData.links,
          {
            nameLink: this.newLinkName,
            msgLink: this.newLinkMsg,
            colorLink: this.newLinkColor,
          }
        ]
        this.newLinkName = ''
        this.newLinkMsg = ''
      }
    },
    chooseFiles(inputId) {
      document.getElementById(inputId).click()
    },
    updateMiniature(data) {
      this.userAvatarUrl = data.path;
      this.webinarData.userAvatar = data.file;
    },
    getUrlFromFile(e, field) {
      const file = e.target.files[0];
      this[field] = URL.createObjectURL(file);
    },
    openChangeAvatarModal() {
      this.changeAvatarModalOpen = true
    },
    closeChangeAvatarModal() {
      this.changeAvatarModalOpen = false
    },
    toggleBlockChatBeforeStart() {
      this.webinarData.blockChatBeforeStart = !this.webinarData.blockChatBeforeStart
    },
    toggleBanWords() {
      this.banWordsOn = !this.banWordsOn
    },
    toggleAddLinkNotificationSound() {
      this.webinarData.addLinkNotificationSound = !this.webinarData.addLinkNotificationSound
    },
    openCreateWebinarModal() {
      this.createWebinarModalOpen = true
    },
    async closeCreateWebinarModal() {
      this.createWebinarModalOpen = false
      await this.$router.push(`/webinar-autowebinar`)
    },
    async updateWebinar() {
      let userAvatarFilename = null 

      if (this.webinarData.userAvatar) {
        // const existAvatar = await this.checkExistPhotoByFilename(this.userAvatarUrl.split('/').at(-1))
        // userAvatarFilename = this.userAvatarUrl.split('/').at(-1)

        // if (!existAvatar) {
          userAvatarFilename = await this.uploadPhoto(this.webinarData.userAvatar)
        // }
      }
      // const backgroundInFilename = await this.uploadPhoto(this.webinarData.backgroundIn)
      let  screensaverPhotoFilename = null
      if (this.screensaverPhotoUrl.indexOf('base64') !== -1) {
        screensaverPhotoFilename = await this.uploadPhoto(this.screensaverPhoto)
      } else {
        screensaverPhotoFilename = this.screensaverPhotoUrl?.split('/').at(-1) || null
        if (screensaverPhotoFilename) {
          const existScreensaverPhoto = await this.checkExistPhotoByFilename(this.screensaverPhotoUrl.split('/').at(-1))
  
          if (!existScreensaverPhoto) {
            console.log('sendScreensaverPhoto')
            screensaverPhotoFilename = await this.uploadPhoto(this.screensaverPhoto)
          }
        }
      }

      let screensaverAudioFilename = null
      if (this.screensaverAudioUrl.indexOf('base64') !== -1) {
        screensaverAudioFilename = await this.uploadPhoto(this.screensaverAudio)
      } else {
        screensaverAudioFilename = this.screensaverAudioUrl?.split('/').at(-1) || null
        if (screensaverAudioFilename) {
          const existScreensaverAudio = await this.checkExistPhotoByFilename(this.screensaverAudioUrl.split('/').at(-1))
  
          if (!existScreensaverAudio) {
            console.log('sendScreensaverAudio')
            screensaverAudioFilename = await this.uploadPhoto(this.screensaverAudio)
          }
        }
      }

      let customStandardBackgroundFilename = null
      if (this.customStandardBackgroundUrl.indexOf('base64') !== -1) {
        customStandardBackgroundFilename = await this.uploadPhoto(this.customStandardBackground)
      } else {
        customStandardBackgroundFilename = this.customStandardBackgroundUrl?.split('/').at(-1) || null
        if (customStandardBackgroundFilename) {
          const existCustomStandardBackgroundFilename = await this.checkExistPhotoByFilename(this.customStandardBackgroundUrl.split('/').at(-1))
  
          if (!existCustomStandardBackgroundFilename) {
            console.log('sendCustomStandardBackground')
            customStandardBackgroundFilename = await this.uploadPhoto(this.customStandardBackground)
          }
        }
      }
      // return

      let customDesignBackgroundFilename = this.customDesignBackgroundUrl?.split('/').at(-1) || null
      if (customDesignBackgroundFilename) {
        const existCustomDesignBackgroundFilename = await this.checkExistPhotoByFilename(this.customDesignBackgroundUrl.split('/').at(-1))

        if (!existCustomDesignBackgroundFilename) {
          console.log('sendCustomDesignBackground')
          customDesignBackgroundFilename = await this.uploadPhoto(this.customDesignBackground)
        }
      }

      if (this.screensaverVideo) {
        this.webinarData.screensaverVideo = this.screensaverVideo
      } else {
        this.webinarData.screensaverVideo = ''
      }

      if (this.webinarData.links) {
        this.webinarData.links = JSON.stringify(this.webinarData.links)
      }

      if (!this.isMainStr) 
        this.webinarData.userDescription = '';

      if (this.webinarData.buttonEnteringPage === '') {
        this.webinarData.buttonEnteringPage = 'Войти в комнату'
      }

      let auth = {
        type: "token",
        data: localStorage.getItem("token")
      }
      
      let strLogin = localStorage.getItem("login")
      if (this.webinarData.comment !== '' && this.webinarData.comment === this.comment) {
        this.webinarData.comment = this.webinarData.comment
        this.webinarData.commentData = this.webinarData.commentData
      } else if (this.webinarData.comment !== '' && this.webinarData.comment !== this.comment) {
        var commentData = {
          type: auth.type,
          authData: auth.data,
          login: strLogin,
          chat: undefined,
          device: String(navigator.userAgent?.toLowerCase()),
          timestamp: moment().tz('Europe/Moscow'),
          auth: {
            id : localStorage.getItem('userId'),
            login: strLogin,
            name: localStorage.getItem('name'),
            hideDates: "N", 
          },
          ip: "::1",
        }
        this.webinarData.commentData = JSON.stringify(commentData)
      } else {
        this.webinarData.comment = ''
        this.webinarData.commentData = ''
      }

      try {
        let dateStart = this.webinarData.dateStart
        let data = {
          ...this.webinarData,
          userId: localStorage.getItem('userId'),
          userAvatar: userAvatarFilename,
          dateStart: dateStart,
          moderators: (this.moderators?.length) ? this.moderators.map((moder) => moder.trim()) : [],
          backgroundImageStandard: customStandardBackgroundFilename || this.backgrounds.standard.checked,
          backgroundImageDesign: customDesignBackgroundFilename || this.backgrounds.design.checked,
          backgroundImageInside: this.backgrounds.inside.checked,
          screensaverPhoto: screensaverPhotoFilename || '',
          screensaverAudio: screensaverAudioFilename || '',
          screensaverVideo: this.screensaverVideo,
          blockChatBeforeStart: (this.webinarData.blockChatBeforeStart) ? 'Y' : 'N',
          banWords: this.webinarData.banWords.join('; '),
          addLinkNotificationSound: (this.webinarData.addLinkNotificationSound) ? 'Y' : 'N',
          playback: (this.webinarData.playback) ? 'Y' : 'N',
          buttonEnteringPage: (this.webinarData.buttonEnteringPage) ? (this.webinarData.buttonEnteringPage) : 'Войти в комнату'
        }

        Object.keys(data).forEach((key) => {
          if (![
            'id',
            'userId',
            'title',
            'backgroundIn',
            'backgroundOut',
            'buttonEnteringPage',
            'isActive',
            'userName',
            'userAvatar',
            'userStatus',
            'redirectOut',
            'redirectLeave',
            'redirectLeaveEnteringPage',
            'additionalLinkEnterRoom',
            'dateStart',
            'comment',
            'commentData',
            'url',
            'source',
            'status',
            'banWords',
            'moderators',
            'playbackFrequency',
            'backgroundImageStandard',
            'backgroundImageDesign',
            'backgroundImageInside',
            'viewersQuantityStart',
            'viewersQuantityMiddle',
            'viewersQuantityEnd',
            'links',
            'screensaverPhoto',
            'screensaverAudio',
            'screensaverVideo',
            'blockChatBeforeStart',
            'addLinkNotificationSound',
            'playback',
            'dateCreated',
            'userCount',
          ].includes(key)) {
            delete data[key]
          }
        })
        data.id = this.editId
        data.isAutowebinar = this.isAutowebinar

        const res = await this.$axios.patch(
          `/webinars`
          ,
          data,
          {
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          })
        console.log("res====>", res)
        
        const isRoomEdit = this.$store.state.isRoomEdit
        console.log("editRoom", isRoomEdit)
        this.socket.send(JSON.stringify({
          action: "updateRoom",
          data: {
            isAutowebinar: this.isAutowebinar,
            chat: String(this.webinarData.id),
            device: String(navigator.userAgent?.toLowerCase()),
            roomData: data,
            timestamp: moment().tz('Europe/Moscow'), // Date.now(),
          }
        }))
        if (isRoomEdit) {
          const newData = {
            roomTitle: this.webinarData.title,
            authorStatus: this.webinarData.userStatus,
            authorName: this.webinarData.userName,
          } 
          this.$store.commit('updateRoom', newData); 
          localStorage.setItem('sharedData', JSON.stringify(newData)); 

          // this.$store.commit('setRoomTitle', this.webinarData.title);
          console.log('roomTitle: ', this.$store.state.roomTitle)
          this.$store.commit('setRoomEdit', 0);
          window.close()
          return 
        } 
        if (res && res.status === 201) {
          await this.$router.push(`/webinar-autowebinar`)
        }
      } catch(err) {
        console.log(err)
      }
    },
    async checkExistPhotoByFilename(filename) {
      let existPhoto = false

      if (!filename || typeof filename !== 'string') return existPhoto
      try {
        const avatarReq = await this.$axios.get(
          '/files/photo',
          {
            params: {
              filename: filename,
            },
            headers: {
              "Authorization": localStorage.getItem('token')
            }
          }
        )

        if (avatarReq?.status === 200) {
          existPhoto = true
        }
      } catch(err) {
        if (err?.message === 'Request failed with status code 404') {

        }
      }

      return existPhoto
    },
    checkStandardBackground(value) {
      if (
        this.backgrounds.standard.checked !== value
      ) {
        this.backgrounds.standard.checked = value
        this.backgrounds.design.checked = ''
      } else {
        this.backgrounds.standard.checked = ''
      }

      if (value !== 'custom') {
        this.customStandardBackground = null
        this.customStandardBackgroundUrl = ''
      }
      this.$forceUpdate()
    },

    checkDesignBackground(value) {
      if (
        this.backgrounds.design.checked !== value
      ) {
        this.backgrounds.design.checked = value
        this.backgrounds.standard.checked = ''
      } else {
        this.backgrounds.design.checked = ''
      }

      if (value !== 'custom') {
        this.customDesignBackground = null
        this.customDesignBackgroundUrl = ''
      }
      this.$forceUpdate()
    },

    checkInsideBackground(value) {
      if (this.backgrounds.inside.checked !== value) {
        this.backgrounds.inside.checked = value
      } else {
        this.backgrounds.inside.checked = ''
      }
      this.$forceUpdate()
    },
    async uploadPhoto(file) {
      const formData = new FormData()
      formData.append('photo', file)
      const res = await this.$axios.post(
        `/files/photo`,
        formData,
      )

      return res.data?.filename
    },
    createImage(file, field) {
      const reader = new FileReader();

      reader.onload = e => {
        this[field] = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async onFileChange(file, field) {
      if (!file) {

        if (field === 'userAvatarUrl') {
          this[field] = `/author__photo.png`
          const res = await fetch('`/author__photo.png`')
          const blob = await res.blob()
          this.userAvatar = blob

          return
        } else if (field === 'screensaverPhotoUrl') {
          this.webinarData.screensaverPhoto = ''
          this.screensaverPhoto = ''
          return
        } else if (field === 'screensaverAudioUrl') {
          this.webinarData.screensaverAudio = ''
          this.screensaverAudio = ''
          return
        }
        this[field] = ''
        this[field.replace('Url', '')] = ''
        console.log(this[field.replace('Url', '')])
        return;
      }
      this.createImage(file, field);
    },
    addModerator() {
      if (this.moderator) {
        this.moderators = []
        this.moderatorText = this.moderator.text
        this.moderators.push(this.moderator.id)
        this.moderator = null
       }
    },
    playbackChecked() {
      return false
    },
    togglePlayback() {
      this.playback = !this.playback
      if (this.playback) {
        this.checkPlayback('24hour')
      } else {
        this.checkPlayback('')
      }
    },
    checkPlayback(value) {
      if (this.webinarData.playbackFrequency !== value) {
        this.webinarData.playbackFrequency = value
      } else {
        this.webinarData.playbackFrequency = ''
      }
    },
    async goToScriptEditor() {
      let data = this.webinarData
      data.broadcastId = data.id
      data.autowebinarTitle = data.title

      this.$store.commit('setAutowebinar', data);
      await this.$router.push('/create-an-autowebinar-script-editor')
    },
    toggleMainStr() {
      this.descriptionModalOpen = true
    }, 
    focusDateStart() {
      const inputElement = document.querySelector("#dateStart");
      if (inputElement && inputElement.showPicker) {
        inputElement.showPicker();
      } else {
        // Fallback or alternative logic for unsupported browsers
      }
    }
  }
}
</script>

<style scoped>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

.close_btn {
  cursor: pointer;
}

.chkbox__background__container {
  position: relative;
  width: 100%;
  height: 100%;
}

.chkbox__background__label {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 10;
  cursor: pointer;
}

.chkbox__background__icon {
  width: 35px;
  height: 35px;
  z-index: 11;
  vertical-align: middle;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: calc(95% - 35px);
  top: 10%;
  background-repeat: no-repeat;
  background-position: bottom;
}

.chkbox__background__icon__simple {
  width: 35px;
  height: 35px;
  z-index: 11;
  vertical-align: middle;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background-repeat: no-repeat;
  background-position: bottom;
}

.chkbox__background__icon_off {
  background-image: url("../../static/svg/check_false.svg");
}

.chkbox__background__icon_on {
  background-image: url("../../static/svg/check_true.svg");
}

.chkbox__playback__container {
  position: relative;
  width: 100%;
  max-width: 48px;
  height: 50px;
}

.chkbox__playback__icon {
  width: 35px;
  height: 35px;
  z-index: 11;
  vertical-align: middle;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 10%;
  top: 7px;
  background-repeat: no-repeat;
  background-position: bottom;
}

.chkbox {
  width: 120px;
  display: flex;
  align-items: center;
  user-select: none;
}

.chkbox input {
  width: 35px;
  height: 35px;
  opacity: 0;
  position: absolute;
  visibility: hidden;
}
.chkbox label {
  max-width: 70px;
  display: flex;
  align-items: center;
  position: absolute;
  height: 35px;
  padding-left: 50px;
  z-index: 9;
  cursor: pointer;
}

.chkbox .check-span {
  width: 35px;
  height: 35px;
  vertical-align: middle;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-position: bottom;
  background-image: url("../../static/svg/check_false.svg");

}

.chkbox .check-span::after {
  content: '';
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 4;
  transform: scale(0);
  background-repeat: no-repeat;
  background-position: bottom;
  background-image: url("../../static/svg/check_true.svg");
}

.chkbox input:checked ~ .check-span::after {
  opacity: 1;
  transform: scale(1);
}

.required-fields-error {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

.header-profile-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.customBtn {
  padding: 10px 90px;
  border-radius: 5px;
  color: white;
  background-color: #FE6637;
}

.main__content {
  display: flex;
  flex-direction: row;
  width: 98%;
  margin: 0 auto;
  /* margin-top: 50px; */
}

.fdsfsfs {
  margin-left: 50px;
  padding-left: 15px;
  width: 100%;
  height: 43px;
  border: 1px solid #A8ADB8;
  border-radius: 10px;
  margin-top: 15px;
}

.dsada {
  width: 70%;
}

.fsdfsfsd {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content__sidebar__menu {
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-top: 20px;
}

.room__checkboxxxxx {
  display: flex;
  flex-direction: row;
}

.room__checkboxxxxxxx {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
}

.content__createwebinar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 1%;
}

.webinar__autowebinar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  padding: 10px 30px 10px 30px;
}

.webinar__autowebinar2 {
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  padding: 10px 30px 10px 30px;
}

.webinar__title {
  color: black;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 0;
  margin-left: 10px;
}

.create__webinar {
  margin-top: 7px;
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  padding: 30px;
}

.webinar__autowebinars {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 10px;
  width: 100%;
}

.create__webinar__title {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 27px;
  color: #FE6637;
  margin-bottom: 40px;
}

.room__title {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  text-align: left;
}

.room__subtitle {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #7A7777;
}

.style {
  border-radius: 20px;
  width: 100%;
}

.create__fons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
}

.room__upload {
  background: #FE6637;
  border-radius: 10px;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #FFFFFF;
  width: 20%;
  height: 43px;
}

.button__title {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #7A7777;
  margin-left: 15px;
}

.room__button {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
  align-items: baseline;
}

.label__webinar {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  float: left;
  margin-top: 25px;
}

.moderator {
  display: flex;
  align-items: end;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  float: left;
  margin-top: 25px;
  gap: 10px;
}

.selected__moderator {
  font-size: 18px;
  line-height: 18px;
}

.select__moderator {
  display: flex;
  width: 100%;
  margin-top: 10px;
}

.select__moderator--select2 {
  width: 100%;
}

.input__option {
  width: 100%;
  height: 43px;
  border: 1px solid #A8ADB8;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px 10px;
}

.roon_avatar {
  width: 100%;
}

.avatar__title {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
}

.room__checkbox {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.room__author {
  margin-top: 20px;
}

.room__titles {
  display: flex;
  align-content: center;
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  margin-left: 20px;
}

.room__titless {
  font-family: 'Inter', Arial, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
}

.authorrs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
}

.add__title {
  background: #FE6637;
  border-radius: 10px;
  margin-left: 20px;
  min-width: 130px;
  width: 20%;
  height: 40px;
  line-height: 16px;
}

.room__checkboxx {
  display: flex;
  flex-direction: row;
}

.add__titles {
  background: #FE6637;
  border-radius: 10px;
  margin-left: 20px;
  width: 30%;
  height: 60px;
  align-self: flex-end;
}

/* .chex__title {
  margin-left: 25px;
} */
.links__container {
  margin-top: 20px;
  max-height: 100px;
  overflow-y: auto;
}

.remove_link__btn {
  cursor: pointer;
  margin-left: auto;
}

.update__option {
  /* margin-top: 15px; */
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.title-wrapper {
  display: flex; 
  flex-direction: column;
}

.room_checkbox_column {
  display: flex;
}

.room_checkbox_column div {
  width: 60%;
  display: flex;
}

@media (max-width: 1500px) {
  .content__createwebinar {
    width: 80%;
  }

  .content__sidebar__menu {
    width: 20%;
  }

  .create__fons {
    grid-template-columns: 1fr 1fr;
  }

  .style {
    width: 100%;
  }
}

@media screen and (max-width: 1200px) {

}

@media screen and (max-width: 900px) {
  .room__checkboxxxxx .room__title {
    font-size: 14px;
    line-height: 14px;
  }
}



@media screen and (max-width: 769px) {
  .content__sidebar__menu {
    display: none;
  }

  .content__createwebinar {
    width: 100%;
  }

  .container {
    width: 100%;
  }

  .add__title {
    margin-top: 15px;
  }

  .create__fons {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
  }

  .create__webinar__title {
    margin-bottom: 10px;
  }

  .fons__style {
    height: 150px;
    position: relative;
  }

  .fons__style > img {
    height: 100%;
  }

  .room__upload {
    width: 100%;
  }

  .room__button {
    align-items: center;
  }

  .button__title {
    margin-bottom: 0;
    text-align: left;
  }

  .authorrs {
    flex-direction: column;
    margin-top: 0;
  }

  .room__author {
    margin-top: 10px;
  }

  .label__webinar {
    margin-top: 15px;
    text-align: left;
    font-size: 16px;
  }

  .roon_avatar {
    margin-top: 20px;
  }

  .avatar__title {
    text-align: left;
    font-size: 16px;
  }

  .room_checkbox_column {
    flex-direction: column !important;
    width: 100%;
  }

  .room_checkbox_column > p {
    margin-left: 0;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 0px !important;
  }

  .room_checkbox_column div {
    width: 100%;
  }

  .room__titless {
    text-align: left;
  }

  .add__title {
    width: 189px;
    margin-left: 0;
    margin-right: 5px;
  }

  .room__checkboxx {
    flex-direction: column;
  }

  .add__titles {
    width: 100%;
    height: 45px;
    margin-top: 20px;
    margin-left: 0;
  }

  .room__checkboxxxxx {
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .dsada {
    width: 100%;
  }

  .room__titles {
    align-content: center;
    margin-left: 5px;
    margin-bottom: 0;
  }

  .title-wrapper {
    display: flex; 
    flex-direction: column;
  }

  .chkbox__background__container img {
    height: 130px;
  }

  .room__titless {
    font-size: 16px;
    line-height: 18px;
  }
  .recommended-text {
    margin-top: 16px;
  }
}


@media screen and (max-width: 470px) {
  .fsdfsfsd {
    flex-direction: column;
  }

  .fdsfsfs {
    margin-left: 0;
  }

  .add__title {
    margin-top: 10px;
  }


  .button__add__link {
    display: flex;
    justify-content: center;
  }
  .add__link {
    border-radius: 10px;
    background: #FE6637;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 25px;
  }
  .color__text {
    border-radius: 10px;
    border: 1px solid #A8ADB8;
    /* background: #07F; */
    width: 30%;
    padding: 10px;
    color: black;
    text-align: center;
  }
  .modals__input__color {
    margin-top: 25px;
  }
  .modals__input {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .modal__content1 {
    display: flex;
    flex-direction: column;
    padding: 40px;
  }
  .title {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0;
    margin-bottom: 5px;
  }
  .title > span {
    color: #7A7777;
    font-size: 14px;
    font-weight: 400;
  }
  .modal_window_i1 {
    width: 500px;
    height: auto;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
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
  .modal__content {
    display: flex;
    flex-direction: row;
    margin: 30px 0;
  }
  .modal__content__image {
    margin: 0 25px;
  }
  a {
    text-decoration: underline;
  }
  .button__chat {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 15px 0;
  }
  .button__chat__delete {
    width: 107px;
    height: 33px;
    background: #F00;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border-radius: 10px;
  }
  .button__chat__update {
    width: 161px;
    height: 33px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #6BC432;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .button__chat__create {
    width: 126px;
    height: 33px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #07F;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .button__chat__delete__webinar {
    width: 210px;
    height: 33px;
    flex-shrink: 0;
    border-radius: 10px;
    background: #8F00FF;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
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
      align-items: center;
      width: 720px;
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
  .imageSupport {
    margin-top: 20px;
  }

  .mw_up {
    background-color: #FFDBBA;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 2rem;

    span {
      font-weight: 500 !important;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .wait {
    margin-top: 30px;
    margin-bottom: 25px;
    color: #000;
    text-align: center;
    font-weight: 400;
  }

  .btn_y {
    width: 35%;
    height: 40px;
    border-radius: 10px;
    background: #FE6637;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 30px;
  }

  .close_btn {
    cursor: pointer;
  }

  .room__titles {
    font-size: 16px;
    line-height: 18px;
  }

  .header-profile-icon {
    margin-top: 20px !important;
    margin-bottom: 20px !important;

    .customBtn {
      padding: 10px 40px;
    }
  }
}

@media screen and (max-width: 410px) {
  .chat-room-background .create__fons {
    width: 320px;
  }
}

@media screen and (max-width: 385px) {
  .chat-room-background .create__fons {
    width: 290px;
  }

  .chat-room-background .option {
    width: 300px;
  }

  .webinar__autowebinar2 {
    width: 300px;
    padding: 5px;
  }
}

</style>
