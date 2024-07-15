export const state = () => ({
    count: 0,
    autowebinar: null,
    oldAutowebinarTitle: '',
    strScriptEditor: '',
    editWebinarId: 0,
    editWebinarType: false,
    roomData: null, // { roomId, playTime, }
    roomTitle: '',
    authorStatus: '',
    authorName: '',
    isRoomEdit: 0,
  })

  export const mutations = {
    increment (state) {
      state.count++
    },
    setAutowebinar (state, data) {
        state.autowebinar = data
    },
    setOldAutowebinarTitle (state, data) {
        state.oldAutowebinarTitle = data
    },
    setStrScriptEditor (state, data) {
        state.strScriptEditor = data
    },
    setWebinarId (state, data) {
        state.editWebinarId = data
    },
    setWebinarType (state, data) {
        state.editWebinarType = data
    },
    setRoomData (state, data) {
        state.roomData = data
    },
    setRoomTitle (state, data) {
        state.roomTitle = data
    },
    setRoomEdit(state, data) {
        state.isRoomEdit= data
    },
    updateRoom(state, data) {
        state.roomTitle= data.roomTitle
        state.authorName= data.authorName
        state.authorStatus= data.authorStatus
    },
  }