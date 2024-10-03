import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import * as api from "../../utils/api";
import { getCurrentUser, login, register } from "../../utils/auth";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

function App() {
  const navigate = useNavigate();

  // State Management
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: "",
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modal Handlers
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openDeleteConfirmModal = (item) => {
    setItemToDelete(item);
    setActiveModal("delete");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // User Handlers
  const handleRegister = ({ name, email, avatar, password }) => {
    register({ name, email, avatar, password })
      .then(() => {
        return login({ email, password });
      })
      .then((loginRes) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, avatar });
        localStorage.setItem("jwt", loginRes.token);
        navigate("/");
        setActiveModal("");
      })
      .catch((err) => {
        if (err.status === 409) {
          console.error("User already exists, Please use a different email");
        } else {
          console.error("Error registering user", err);
        }
      });
  };

  const handleLoginSuccess = (res) => {
    const { email, name, avatar, _id } = res || {};

    console.log("Login response", res);

    if (!email || !name || !avatar || !_id) {
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser({ name, avatar, _id });
    fetchClothingItems();
    navigate("/profile");
    console.log("User data after login", { email, name, avatar, _id });
  };

  const handleUpdateSuccess = (updatedUser) => {
    setIsLoading(true);
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...updatedUser.data,
    }));
    setIsLoading(false);
  };

  const updateUserProfile = ({ name, avatar }) => {
    setIsLoading(true);
    return api
      .updateUserProfile({ name, avatar })
      .then((res) => {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          name: res.data.name,
          avatar: res.data.avatar,
        }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setIsLoading(false);
      });
  };

  // Item Handlers
  const onAddItem = (values) => {
    setIsLoading(true);
    api
      .addItem(values)
      .then((item) => {
        setClothingItems((prevItems) => [item.data, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchClothingItems = () => {
    api
      .getItems()
      .then(({ data }) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Error fetching clothing items", err);
      });
  };

  const handleDeleteItem = (item) => {
    if (!item || !item._id) {
      console.error("Invalid item for deletion", item);
      return;
    }

    api
      .deleteItem(item._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((i) => i._id !== item._id)
        );
        closeActiveModal();
        setItemToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting this item", error);
      });
  };

  const handleCardLike = ({ itemId, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.log("No token found, please login");
      return;
    }
    console.log(
      "Liking/unliking card:",
      itemId,
      "Current Like Status:",
      isLiked
    );

    const apiCall = isLiked ? api.removeCardLike : api.addCardLike;

    apiCall({ itemId })
      .then((updatedItem) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId ? updatedItem.data : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating like status", err);
      });
  };

  // Effects
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
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser({
            name: data.data.name,
            avatar: data.data.avatar,
            _id: data.data._id,
          });
        })
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  useEffect(() => {
    if (currentUser._id) {
      fetchClothingItems();
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("is Logged In", isLoggedIn);
  }, [isLoggedIn]);

  // Temperature Unit Toggle
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  return (
    <CurrentUserContext.Provider
      value={{ currentUser: currentUser || null, setCurrentUser }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              openLoginModal={openLoginModal}
              openRegisterModal={openRegisterModal}
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
                    isLoggedIn={isLoggedIn}
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
                      updateUserProfile={updateUserProfile}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                      isLoading={isLoading}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegisterSuccess={handleRegister}
            openLoginModal={openLoginModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLoginSuccess={handleLoginSuccess}
            openRegisterModal={openRegisterModal}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
            onAddItem={onAddItem}
            isLoading={isLoading}
          />
          <ItemModal
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            openDeleteConfirmModal={openDeleteConfirmModal}
            handleDeleteItem={handleDeleteItem}
            isLoggedIn={isLoggedIn}
          />
          <DeleteConfirmModal
            isOpen={activeModal === "delete"}
            handleCloseClick={closeActiveModal}
            onDelete={handleDeleteItem}
            card={itemToDelete}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
