export { default as BanWordsSettings } from '../..\\components\\banWordsSettings.vue'
export { default as CreateWebinarForm } from '../..\\components\\createWebinarForm.vue'
export { default as Footer } from '../..\\components\\footer.vue'
export { default as Header } from '../..\\components\\header.vue'
export { default as Room } from '../..\\components\\room.vue'
export { default as SidebarMenu } from '../..\\components\\sidebarMenu.vue'
export { default as TextareaEmojiPicker } from '../..\\components\\TextareaEmojiPicker.vue'
export { default as ModalsActionNotifications } from '../..\\components\\Modals\\actionNotifications.vue'
export { default as ModalsAddEventModal } from '../..\\components\\Modals\\addEventModal.vue'
export { default as ModalsAddInChat } from '../..\\components\\Modals\\addInChat.vue'
export { default as ModalsBagMoneyContent } from '../..\\components\\Modals\\bagMoneyContent.vue'
export { default as ModalsBagMoneyWait } from '../..\\components\\Modals\\bagMoneyWait.vue'
export { default as ModalsBanWord } from '../..\\components\\Modals\\banWord.vue'
export { default as ModalsChangeMiniature } from '../..\\components\\Modals\\changeMiniature.vue'
export { default as ModalsClearScriptModal } from '../..\\components\\Modals\\clearScriptModal.vue'
export { default as ModalsConfirmReset } from '../..\\components\\Modals\\confirmReset.vue'
export { default as ModalsCreateAutowebinar } from '../..\\components\\Modals\\createAutowebinar.vue'
export { default as ModalsCreateWebinar } from '../..\\components\\Modals\\createWebinar.vue'
export { default as ModalsDayNightModeModal } from '../..\\components\\Modals\\dayNightModeModal.vue'
export { default as ModalsDeleteAllMessage } from '../..\\components\\Modals\\deleteAllMessage.vue'
export { default as ModalsDeleteRow } from '../..\\components\\Modals\\deleteRow.vue'
export { default as ModalsDeleteWebinar } from '../..\\components\\Modals\\deleteWebinar.vue'
export { default as ModalsDescriptionModal } from '../..\\components\\Modals\\descriptionModal.vue'
export { default as ModalsImportScriptModal } from '../..\\components\\Modals\\importScriptModal.vue'
export { default as ModalsIncorrectLink } from '../..\\components\\Modals\\incorrectLink.vue'
export { default as ModalsLeaveRoom } from '../..\\components\\Modals\\leaveRoom.vue'
export { default as ModalsPointMoveModal } from '../..\\components\\Modals\\pointMoveModal.vue'
export { default as ModalsPreviewModal } from '../..\\components\\Modals\\previewModal.vue'
export { default as ModalsPrivacyPolicy } from '../..\\components\\Modals\\privacyPolicy.vue'
export { default as ModalsSelectIntervalModal } from '../..\\components\\Modals\\selectIntervalModal.vue'
export { default as ModalsSendedLink } from '../..\\components\\Modals\\sendedLink.vue'
export { default as ModalsStartTranslate } from '../..\\components\\Modals\\startTranslate.vue'
export { default as ModalsStopStream } from '../..\\components\\Modals\\stopStream.vue'
export { default as ModalsSupportWebinar } from '../..\\components\\Modals\\supportWebinar.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
