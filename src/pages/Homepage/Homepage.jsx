import React, { useState ,useEffect ,useRef} from "react";
import NavBar from "../../components/NavBar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import logo from "../../assets/northsquare.jpeg";
import './Homepage.css';
import { useNavigate } from "react-router-dom";


function Homepage() {

const cafesRef = useRef(null);
const navigate = useNavigate();
const [cafes,setCafes] = useState([]);

useEffect(() => {
    fetch('http://localhost:5000/api/cafes')
        .then((response) => response.json())
        .then((data) => setCafes(data))
        .catch((error) => console.error('Error fetching cafes:', error));
}, []);


const scrollLeft = () => {
    if (cafesRef.current) {
        cafesRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
};

const scrollRight = () => {
    if (cafesRef.current) {
        cafesRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
};

// Handle cafe click to navigate to the Menu page
const handleCafeClick = () => {
    navigate(`/menu`); // Programmatically navigate to the '/menu' page
};

  return (
    <>
      <NavBar />
      <div className="cafes-list">
            <h1>Top Restaurants</h1>
            <div className="cafes-cont-wrapper">
                <button className="arrow left" onClick={scrollLeft}>&#9664;</button>
                <div className="cafes-cont" ref={cafesRef}>

                    {/* Cafe 1 */}
                    <div className="cafe1" onClick={handleCafeClick}>
                        <img className="cafe1-img" src={logo} alt="North Square" />
                        <div className="cafe1-det">
                            <h2>North Square</h2>
                            <p>North Indian | Chinese | Fast Food</p>
                        </div>
                    </div>


                    {/* Cafe 2 */}
                    <div className="cafe1">
                        <img className="cafe1-img" src={logo} alt="Another Cafe" />
                        <div className="cafe1-det">
                            <h2>Gazibo-1</h2>
                            <p>Italian | Continental | Desserts</p>
                        </div>
                    </div>

                    {/* Cafe 3 */}
                    <div className="cafe1">
                        <img className="cafe1-img" src={logo} alt="Cafe 3" />
                        <div className="cafe1-det">
                            <h2>Gazibo-2</h2>
                            <p>Mexican | Fast Food</p>
                        </div>
                    </div>

                    {/* Cafe 4 */}
                    <div className="cafe1">
                        <img className="cafe1-img" src={logo} alt="Cafe 4" />
                        <div className="cafe1-det">
                            <h2>Lassi House</h2>
                            <p>Chinese | Thai | Fast Food</p>
                        </div>
                    </div>

                    {/* Cafe 5 */}
                    <div className="cafe1">
                        <img className="cafe1-img" src={logo} alt="Cafe 5" />
                        <div className="cafe1-det">
                            <h2>Dakshin</h2>
                            <p>Indian | Biryani | Fast Food</p>
                        </div>
                    </div>

                    {/* Cafe 6 */}
                    <div className="cafe1">
                        <img className="cafe1-img" src={logo} alt="Cafe 6" />
                        <div className="cafe1-det">
                            <h2>Awin</h2>
                            <p>Continental | American | Fast Food</p>
                        </div>
                    </div>

                    {/* Cafe 7 */}
                    <div className="cafe1">
                        <img className="cafe1-img" src={logo} alt="Cafe 7" />
                        <div className="cafe1-det">
                            <h2>North Square-II</h2>
                            <p>Japanese | Sushi | Fast Food</p>
                        </div>
                    </div>

                    {/* Cafe 8 */}
                    <div className="cafe1">
                        <img className="cafe1-img" src={logo} alt="Cafe 8" />
                        <div className="cafe1-det">
                            <h2>North Square-III</h2>
                            <p>Cool Drinks | Fresh Juice | Waffles </p>
                        </div>
                    </div>
                </div>
                <button className="arrow right" onClick={scrollRight}>&#9654;</button>
            </div>
        </div>

      <Footer />
    </>
  );
}

export default Homepage;
