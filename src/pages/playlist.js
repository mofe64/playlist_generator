import Header from '../components/header';
import '../css/playlist.css'
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as playlistActions from '../store/actions/playlistActions';

const cardColors = ['card-yellow', 'card-blue', 'card-green', 'card-pink', 'card-grey']
const Playlist = function ({ match }) {
    const [mood] = useState(match.params.mood);
    const [dataLoaded, setDataLoaded] = useState(false);
    const playlists = useSelector(state => state.playlists.playlists);
    const dispatch = useDispatch();

    const getPlaylists = useCallback(async () => {
        try {
            await dispatch(playlistActions.createMoodPlaylist(mood));
        } catch (err) {
            console.log(err)
        }
    }, [dispatch, mood])
    
    useEffect(() => {
        setDataLoaded(false);
        getPlaylists().then(setDataLoaded(true))
    },[dispatch, getPlaylists])
    if (!dataLoaded || playlists.length === 0) {
        return (
            <>
                <Header />
                <h1>Loading</h1>
            </>
        )
    }
    return (
        <>
            <Header/>
            <div className='container'>
                <div className='playlist-header'>
                    <h1>Here are some playlists you might enjoy</h1>
                </div>
                <div className='playlists'>
                    {playlists.map((playlist, i) => {
                        return (
                        <div className={`playlist-card ${cardColors[Math.floor(Math.random() * cardColors.length)]}`} key={i}>
                            <div className='card-top'>
                                <img src={playlist.images[0].url} alt='COVER' />
                            </div>
                            <div className='card-bottom'>
                                    <h2>{playlist.name}</h2>
                                    <button className='spotify-btn'>
                                        <a href={playlist.external_urls.spotify}>Open in spotify</a>
                                    </button>
                                {/* <p>{ playlist.description}</p> */}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Playlist;