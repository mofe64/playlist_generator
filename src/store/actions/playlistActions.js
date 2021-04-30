import env from 'react-dotenv';

const fetch = require('node-fetch');

var ClientID = env.ClientID;
var ClientSecret = env.ClientSecret;

export const CREATE_MOOD_PLAYLIST = 'CREATE_MOOD_PLAYLIST';
var encoded = window.btoa(ClientID + ":" + ClientSecret);
// var encoded = Buffer.from(ClientID + ":" + ClientSecret).toString('base64');
const getAccessToken = async () => {
     try {
        var myHeaders = new fetch.Headers();
        myHeaders.append("Authorization", `Basic ${encoded}`)
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        }

        let res = await fetch("https://accounts.spotify.com/api/token", requestOptions);
        res = await res.json();
        // console.log(res);
        return res.access_token;
    } catch (err) {
        console.log(err)
    }
}
export const createMoodPlaylist = (mood) => {
    console.log(`mood ${mood}`)
    var category_playlist_url = `https://api.spotify.com/v1/browse/categories/${mood}/playlists?limit=10`
    return async (dispatch) => {
        let playlists=[];
        try {
            var accessToken = await getAccessToken();
            var myHeaders = new fetch.Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`)
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            let res = await fetch(category_playlist_url, requestOptions);
            res = await res.json();
            console.log(res.playlists.items)
            playlists = res.playlists.items;
        } catch (err) {
            console.log(err)
        }  
        dispatch({type: CREATE_MOOD_PLAYLIST, playlists})
    }
} 