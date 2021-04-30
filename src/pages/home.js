import Header from '../components/header';
import headerImage from '../assets/karsten-winegeart-guCLBw5Cflc-unsplash.jpg';
import '../css/home.css'
import {useHistory } from 'react-router-dom';
import { useState } from 'react';
const Home = () => {
    const history = useHistory();
    const [mood, setMood] = useState('mood');
    const moodChange = (event) => {
        console.log(event.target.value)
        setMood(event.target.value)
    }
    const collectMood = () => {
        console.log(mood)
        history.push(`/${mood}`)
    }
    return (
        <>
        <Header />
            <div className='container'>
                <div className='home'>
                    <div className='home-left'>
                        <h1>Custom Playlists for every mood</h1>
                        <p>Leveraging AI to create custom playlist to help you deal with whatever way you're feeling</p>
                        <div className='mood-select'>
                            <label htmlFor='mood'>How are you feeling ?</label>
                            <select onChange={moodChange} value={mood}>
                                <option value='mood'>Happy</option>
                                <option value='chill'>Chill</option>
                                <option value='mood'>Sad</option>
                                <option value='sleep'>Sleepy</option>
                                <option value='focus'>Focused</option>
                                <option value='workout'>Pumped</option>
                                <option value='romance'>In Love</option>
                                <option value='at_home'>Bored at home</option>
                                <option value='party'>Looking to party</option>
                                <option value='soul'>Nostalgic</option>
                            </select>
                            <button className='create-playlist-btn'
                                onClick= {collectMood}
                            >
                                Create My Playlist
                            </button>
                        </div>
                        <div className='custom-creation'>
                            <p>Want a more customized playlist ? <br />
                                Register and get started
                            </p>
                            <button className='register-btn'>Register</button>
                        </div>
                    </div>  
                    <div className='home-right'>
                        <img src={ headerImage} alt='hero' className='hero-image'/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Home;