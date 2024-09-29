import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as api from "../../utils/api";
import { getCurrentUser, login, register } from "../../utils/auth";
function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegister = ({ name, email, avatar, password }) => {
    register({ name, email, avatar, password })
      .then((res) => {
        return login({ email, password });
      })
      .then((loginRes) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, avatar });
        localStorage.setItem("jwt", loginRes.token);
        navigate("/");
        setIsRegisterModalOpen(false);
      })
      .catch((err) => {
        if (err.status === 409) {
          console.error("User already exists, Please use a different email");
        } else {
          console.error("Error registering user", err);
        }
      });
  };

  const handleUpdateSuccess = (updatedUser) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedUser.data,
    }));
  };

  const handleLoginSuccess = (res) => {
    const { email, name, avatar } = res || {};

    console.log("Login response", res);

    if (!email || !name || !avatar) {
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser({ name, avatar });
    navigate("/");
    console.log("User data after login", { email, name, avatar });
  };

  const onAddItem = (values) => {
    api
      .addItem(values)
      .then((item) => {
        setClothingItems((prevItems) => [item.data, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item", err);
      });
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    console.log("token before deleteing", token);

    api
      .deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting this item", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    console.log("token", token);
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error("Error adding card like", err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.error("Error removing card like", err));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then(({ data }) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Error fetching clothing items", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser({ name: data.data.name, avatar: data.data.avatar });
        })
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  useEffect(() => {
    console.log("is Logged In", isLoggedIn);
  }, [isLoggedIn]);

  //console.log(currentTemperatureUnit);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              setRegisterModalOpen={setIsRegisterModalOpen}
              setLoginModalOpen={setIsLoginModalOpen}
              isLoggedIn={isLoggedIn}
              onUpdateSuccess={handleUpdateSuccess}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      setIsLoggedIn={setIsLoggedIn}
                      onUpdateSuccess={handleUpdateSuccess}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
            onRegisterSuccess={handleRegister}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            handleDeleteItem={handleDeleteItem}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
