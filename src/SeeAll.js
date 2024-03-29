import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import {useUser} from './UserProvider';
import { ReactComponent as PlayIcon } from "./assets/play.svg";
import { ReactComponent as PauseIcon } from "./assets/pause.svg";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useParams } from "react-router-dom"

function SeeAll() {

  const [getList, setList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef();
  const navigate = useNavigate();
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const {filterValue} = useParams()

  const {getUser} = useUser();
  useEffect(() => {
    onFilterSelection();
  }, [])
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

const addToFavorite = async (songId, token) => {
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

const handleAddToFavorite = () => {
  addToFavorite(selectedMusic?._id, getUser.status == "success")
  .then((data) => {
      setAddedToWatchlist(true);
      console.log("Successfully added to watchlist!", data);
  })
  .catch((error) => {
      console.error("Failed to add to watchlist:", error);
  });
};
  const handleMusicClick = (clickedMusic) => {
    setSelectedMusic(clickedMusic);
  };
  const playPauseAudio = () => {
    setIsPlaying(!isPlaying);
};
const [start] = useState("0");
const [end, setEnd] = useState("0");
  const onFilterSelection=async ()=>{
    const queryString={
      featured:filterValue
    }
    axios.get('https://academics.newtonschool.co/api/v1/music/song',{params:{
      filter:JSON.stringify(queryString)
    }}).then((response)=>{
      setList(response.data.data);
    }).catch((error)=>{
              console.log(error)
    })
  }

  return (
  <div className="main-container">
  <div className="spotify-playlists">
    <h2>Spotify Playlists</h2>
    <div className='list'>
      {
        getList.map((obj, index) => (
          <section key={index}>
            <article>
              <div className="item" onClick={() => handleMusicClick(obj)}>
                <img src={obj?.thumbnail} alt={obj?.title} />
                <div className="play">
                  <span className="fa fa-play"></span>
                </div>
                <h4>{obj?.title}</h4>
                <h5>{obj?.artist.map((item) => item.name).join(" & ")}</h5>
              </div>
            </article>
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
          <div className="heart-icon" onClick={handleAddToFavorite}>
            {addedToWatchlist ? <FaHeart /> : <FaRegHeart />}
          </div>
      </>
    ) : (
      <>
        <p>Please Sign Up First</p>
        <button onClick={() => navigate("/register")}>SignUp here!</button>
      </>
    )}
  </section>
)}
<footer className="footer">
  	 <div className="container">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><a >about us</a></li>
  	 				<li><a >our services</a></li>
  	 				<li><a>privacy policy</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Communities</h4>
  	 			<ul>
  	 				<li><a >For Artists</a></li>
  	 				<li><a>Developers</a></li>
  	 				<li><a>Advertising</a></li>
  	 				<li><a>Investors</a></li>
  	 				<li><a>Vendors</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>Useful links</h4>
  	 			<ul>
  	 				<li><a >Support</a></li>
  	 				<li><a>Free Mobile App</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>follow us</h4>
  	 			<div className="social-links">
  	 				<a href="https://www.facebook.com/SpotifyIndia/?brand_redir=6243987495"><i className="fab fa-facebook-f"></i></a>
  	 				<a href="https://twitter.com/Spotify"><i className="fab fa-twitter"></i></a>
  	 				<a href="https://www.instagram.com/spotify/"><i className="fab fa-instagram"></i></a>
  	 				<a href="https://www.linkedin.com/company/spotify/"><i className="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
  </div>)

}
export default SeeAll;