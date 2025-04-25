import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import _ from "lodash";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    navigate("/riding", { state: { ride } });
  });

  // Auto Suggestion address add some delay

  const fetchPickupSuggestions = useRef(
    _.debounce(async (value) => {
      if (!value.trim()) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(response.data);
      } catch (error) {
        if (error.response?.status === 429) {
          alert("Too many requests. Please wait a moment and try again.");
        } else {
          console.error(
            "Error fetching suggestions:",
            error.response?.data || error.message
          );
        }
      }
    }, 2000) // Increased debounce delay to 2000ms (2 sec)
  ).current;

  const fetchDestinationSuggestions = useRef(
    _.debounce(async (value) => {
      if (!value.trim()) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDestinationSuggestions(response.data);
      } catch (error) {
        if (error.response?.status === 429) {
          alert("Too many requests. Please wait a moment and try again.");
        } else {
          console.error(
            "Error fetching suggestions:",
            error.response?.data || error.message
          );
        }
      }
    }, 2000) // Increased debounce delay to 2000ms (2 sec)
  ).current;

  // Input change handlers
  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    fetchPickupSuggestions(e.target.value); // Call the debounced function
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    fetchDestinationSuggestions(e.target.value); // Call the debounced function
  };

  // Cleanup debounce functions on component unmount
  useEffect(() => {
    return () => {
      fetchPickupSuggestions.cancel();
      fetchDestinationSuggestions.cancel();
    };
  }, []);

  // end autoSuggestion

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // for Search panel open
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: " 70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: " 0%",
          padding: 0,
          // opacity : 0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  // For vehicle panel open
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );
  // Confirm Ride
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  // found vehicle
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  // Waiting For  driver
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  const findTrip = async () => {
    console.log("findTrip called");
    setVehiclePanel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Fare response:", response.data);
      setFare({
        auto: response.data.auto || 0,
        car: response.data.car || 0,
        moto: response.data.moto || 0,
      });
    } catch (error) {
      console.error(
        "Error fetching fare:",
        error.response?.data || error.message
      );
      alert("Failed to fetch fare. Please try again.");
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Ride created successfully:", response.data);
    } catch (error) {
      console.error(
        "Error creating ride:",
        error.response?.data || error.message
      );
      alert("Failed to create ride. Please try again.");
    }
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://logospng.org/download/uber/logo-uber-4096.png"
        alt=""
      />
     <div
      className={`h-[68%] w-full transition-all duration-300 ${
        panelOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <LiveTracking />
    </div>
      <div className=" flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] relative bg-white p-6">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-[10%] bg-gray-600 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg  w-full mt-5 "
              type="text"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              placeholder="Add a pick-up loaction"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg  w-full mt-3 "
              type="text"
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Add a destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-gray-700 text-lg text-white px-2 py-2 rounded-lg mt-6 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-[0] bg-white   ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full  bg-white py-10 px-3 pt-15"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full  bg-white  py-6 px-3 pt-15"
      >
        <ConfirmRide
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full  bg-white  py-6 px-3 pt-15"
      >
        <LookingForDriver
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0   bg-white  py-6 px-3 pt-15"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
