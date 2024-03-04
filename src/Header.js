import { Link } from 'react-router-dom';
import { useUser } from './UserProvider';
// import "./header.css"

function Header() {
  const { getUser, signOutUser } = useUser();

  const onChangeHandler = () => {
    localStorage.removeItem("token");
    signOutUser();
  }
  
  return (<>
        <div className="sidebar">
          <div className="logo">
            <a href="#">
              <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="Logo" />
            </a>
          </div>

          <div className="navigation">
            <ul>
              <li>
                <Link to="/">
                  <span className="fa fa-home"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/premium">
                  <span className="fa fas fa-book"></span>
                  <span>Premium</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="navigation">
            <ul>
              <li>
                <a href="#">
                  <span className="fa fas fa-plus-square"></span>
                  <span>Create Playlist</span>
                </a>
              </li>

              <li>
                <Link to="/liked">
                  <span className="fa fas fa-book"></span>
                  <span>Liked Songs</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="policies">
            <ul>
              <li>
                <a href="#">Cookies</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
            </ul>
          </div>
        </div>
      <div className="">
        <div className="topbar">
          <div className="prev-next-buttons">
            <button type="button" className="fa fas fa-chevron-left"></button>
            <button type="button" className="fa fas fa-chevron-right"></button>
          </div>

          <div className="navbar">
          {/* <SearchBar /> */}
            <ul>
              {!getUser && <> 
                <li>
                  <Link to="/register">SignUp</Link>
                </li>
                <li >
                <Link  to="/login">Login</Link>
              </li>
                </>}
                {getUser && getUser.status == "success" &&  <li>
            <Link to="/" onClick={onChangeHandler}>Logout</Link>
          </li>}
            </ul>
          </div>
        </div>
      </div>

  </>)

}
export default Header;