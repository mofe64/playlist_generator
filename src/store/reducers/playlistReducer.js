import { CREATE_MOOD_PLAYLIST } from '../actions/playlistActions';
const initialState = {
    playlists : [],
}

const playlistReducer = (state=initialState, action) => {
    switch (action.type) {
        case CREATE_MOOD_PLAYLIST:
            return {
                playlists: [ ...action.playlists]
            }
        default:
            return state;
    }
}

export default playlistReducer;