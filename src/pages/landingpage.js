
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/LandingPage.css";
import Modal from "react-modal";
import logo from "../assets/logo2.png";
import skill1 from "../assets/blacksing.png";
import skill2 from "../assets/designer2.png";
import skill3 from "../assets/photo.png";
import skill4 from "../assets/painterft.png";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");

const LandingPage = ({ setCurrentUsername }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (Username) {
      setCurrentUsername(Username); // Met à jour le nom d'utilisateur dans l'état principal
      closeSignIn(); // Ferme la fenêtre modale après connexion
      navigate("/home");
    } else {
      alert("Veuillez entrer un nom d'utilisateur !");
    }
  };

  const skills = [
    {
      image: skill1,
      title: "Singing",
      description: "Learn singing techniques from experts.",
    },
    {
      image: skill2,
      title: "Designing",
      description: "Improve your design skills with peer feedback.",
    },
    {
      image: skill3,
      title: "Photography",
      description: "Master photography through skill exchange.",
    },
    {
      image: skill4,
      title: "Painting",
      description: "Explore painting styles from other users.",
    },
  ];

  return (
    <div className="landing-page">
      {isMobile ? (
        <section className="mobile-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }} // Navigation activée
            pagination={{ clickable: true }} // Pagination cliquable
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={500} // Vitesse de transition
            loop={true} // Boucle infinie
            spaceBetween={50} // Espacement entre les slides
            slidesPerView={1} // Une seule slide visible
            className="swiper-container"
          >
            {skills.map((skill, index) => (
              <SwiperSlide key={index}>
                <div className="slider-item">
                  <div className="slider-image">
                    <img
                      src={skill.image}
                      alt={skill.title}
                      className="slider-image"
                    />
                  </div>
                  <div className="slider-text">
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* Ajout des boutons de navigation */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <button className="button signup" onClick={openSignUp}>
              Sign Up
            </button>
            <button className="button signin" onClick={openSignIn}>
              Sign In
            </button>
          </div>
        </section>
      ) : (
        <>
          <header className="headerlp">
            <div className="logo-container">
              <img
                src={logo}
                alt="Logo"
                className="skill-image"
                style={{ height: "3.5rem", width: "3.5rem" }}
              />
              <h1 style={{ fontSize: "1.3rem" }}>SkillSphere</h1>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <button className="button signup" onClick={openSignUp}>
                Sign Up
              </button>
              <button className="button signin" onClick={openSignIn}>
                Sign In
              </button>
            </div>
          </header>
          <section className="hero">
            <h2 style={{ marginTop: 0 }}>Share and Learn New Skills</h2>
            <p>
              Connect with others to exchange valuable knowledge and expertise!
            </p>
            <div className="hero-buttons">
              <button className="button primary" onClick={openSignUp}>
                Get Started
              </button>
            </div>
            <div className="images-container">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`image-wrapper ${
                    index === 0 || index === skills.length - 1
                      ? "extremity"
                      : ""
                  }`}
                >
                  <img src={skill.image} alt={skill.title} className="image" />
                </div>
              ))}
            </div>
            <div className="background-shapes">
              <div className="shape shape1"></div>
              <div className="shape shape2"></div>
              <div className="shape shape3"></div>
              <div className="shape shape4"></div>
              <div className="shape shape5"></div>
              <div className="shape shape6"></div>
              <div className="shape shape7"></div>
            </div>
          </section>
        </>
      )}

      <Modal
        isOpen={isSignUpOpen}
        onRequestClose={closeSignUp}
        className="modal modal-signup"
        overlayClassName="overlay"
      >
        <div className="headermodal">
          <h2>Sign Up</h2>
          <IoClose size={35} className="close" onClick={closeSignUp} />
        </div>
        <form>
          <label>Username:</label>
          <input type="text" placeholder="Enter username" required />

          <label>Age:</label>
          <input type="number" placeholder="Enter your age" required />

          <label>Sexe:</label>
          <select required>
            <option value="">Select</option>
            <option value="Femme">Femme</option>
            <option value="Homme">Homme</option>
          </select>

          <label>Password:</label>
          <input type="password" placeholder="Enter password" required />
          <div className="signupin">
            <button type="submit" className="button primary">
              Sign Up
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isSignInOpen}
        onRequestClose={closeSignIn}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="headermodal">
          <h2>Sign In</h2>
          <IoClose size={35} className="close" onClick={closeSignIn} />
        </div>
        <form>
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password:</label>
          <input type="password" placeholder="Enter password" required />
          <div className="signupin">
            <button
              type="submit"
              className="button primary"
              onClick={handleClick}
            >
              Sign In
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LandingPage;
