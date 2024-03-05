import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import {useUser} from './UserProvider';
import { ReactComponent as PauseIcon } from "./assets/pause.svg";
import { ReactComponent as PlayIcon } from "./assets/play.svg";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

function Liked() {

    const [getData,setData] = useState([]);
    const {getUser} = useUser();
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef();
    const navigate = useNavigate();
    const [addedToWatchlist, setAddedToWatchlist] = useState(false);

    const listOfData = async ()=>{
        axios.get('https://academics.newtonschool.co/api/v1/music/favorites/like',
        {
            headers: {
                Authorization: `Bearer ${getUser.token}`,
                projectId: "f104bi07c490",
                "Content-Type": "application/json",
          }
        }
        )
        .then((response)=>{
            console.log(response.data.data.songs);
            setData(response.data.data.songs)
        }).catch((error) => {
            console.log(error);
          })
    }
    const handleMusicClick = (clickedMusic) => {
        console.log(clickedMusic);
        setSelectedMusic(clickedMusic);
      };
    const playPauseAudio = () => {
        setIsPlaying(!isPlaying);
    };
    const [start] = useState("0");
    const [end, setEnd] = useState("0");
    const addToFavorite = async (songId, token) => {
        console.log("58",songId,token)
        if(token){
          const url = `https://academics.newtonschool.co/api/v1/music/favorites/like`;
          return fetch(url, {
          method: "PATCH",
          headers: {
              Authorization: `Bearer ${getUser.token}`,
              projectId: "f104bi07c490",
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ songId }),
          }).then((response) => {
          if (!response.ok) {
              throw new Error("Failed to add to watchlist");
          }
          return response.json();
        });
        }
      };
      const getTime = (duration) => {
        console.log("duration", duration);
        const endTime = Math.ceil(duration);
        let min = Math.floor(endTime / 60);
        let sec = endTime % 60;
        return `${min}:${sec}`;
    };
      useEffect(() => {
        if (audioRef.current) {
        const endTime = getTime(audioRef.current.duration);
        console.log("endTime", endTime);
        setEnd(endTime);
        if (isPlaying) {
            audioRef.current.play();
            console.log("duration", audioRef.current.duration);
        } else {
            audioRef.current.pause();
        }
        }
    }, [isPlaying, audioRef]);
    
    useEffect(()=>{
        listOfData();
    },[])

    return (
        <div className="main-container">
            <div className="spotify-playlists">
                <h2>Liked Songs</h2>
                <div className='list'>
                {
                    getData.map((obj, index) => (
                    <section key={index}>
                        <article>
                        <div className="item" onClick={() => handleMusicClick(obj)}>
                            <img src={obj?.thumbnail} alt={obj?.title} />
                            <div className="play">
                            <span className="fa fa-play"></span>
                            </div>
                            <h4>{obj?.title}</h4>
                            {/* <h5>{obj?.artist.map((item) => item.name).join(" & ")}</h5> */}
                            {/* <p>{obj?.artist[0]?.description}</p> */}
                        </div>
                        </article>
                        {/* <MusicPlayer selectedMusic={selectedMusic} /> */}
                    </section>
                    ))
                }
                </div>
            </div>
            
            {selectedMusic && (
                <section className="music-player">
                    <img src={selectedMusic.thumbnail} alt={selectedMusic.title} height="50" width="50" />
                    {getUser?.status === "success" ? (
                    <>
                        <div className="song-info">
                                <div>{selectedMusic.title}</div>
                                <div title={selectedMusic.artistList} className="artist-list">
                                {selectedMusic.artistList}
                                </div>
                            </div>
                            <button onClick={playPauseAudio} id="play" className="play-pause">
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>
                        <div>{start}</div>
                        <div>{end}</div>
                        <input type="range" name="" id="" max={50} value={5} />
                        <audio src={selectedMusic?.audio_url} ref={audioRef} />
                        {/* <div className="heart-icon" onClick={handleAddToFavorite}>
                            {addedToWatchlist ? <FaHeart /> : <FaRegHeart />}
                        </div> */}
                    </>
                    ) : (
                    <>
                        <p>Please Sign Up First</p>
                        <button onClick={() => navigate("/register")}>SignUp here!</button>
                    </>
                    )}
                </section>
                )}
        </div>
    );
}

export default Liked;
