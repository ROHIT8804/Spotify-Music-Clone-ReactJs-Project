import { Link } from 'react-router-dom';
function Premium() {
    return (
        <div className="premium-container">
            <div className="top-bar">Get Premium free for 1 Month</div>
            <div className="top-1">Just ₹119/month after. Debit and credit cards accepted. Cancle anytime.</div>
            <div className="top-2">
            <Link to="/commingSoon">
                <button>Get Premium Individual</button>
            </Link>
            <Link to="/commingSoon">
                <button>View all plans</button>
            </Link>
            </div>
            <div className="top-3">
                <img src="https://i.gadgets360cdn.com/large/Spotify_premium_mini_1608035539485.jpg" alt="Premium Image" />
            </div>
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
        </div>
    );
}

export default Premium;
