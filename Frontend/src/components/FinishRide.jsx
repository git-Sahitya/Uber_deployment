import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate()
  
  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

        rideId: props.ride._id


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
        navigate('/captain-home')
    }

}
  return (
    <div>
      <h5
        className=" p-2 text-center w-[90%]  absolute top-0 right-2 "
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className=" text-2xl  text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between p-2 border-1 bg-amber-100 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-11 rounded-full object-cover"
            src="https://img.freepik.com/free-vector/organic-flat-dia-motorista-illustration_23-2148961409.jpg?uid=R193013355&ga=GA1.1.1896811457.1729647436&semt=ais_hybrid"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-medium">2.2Km</h5>
      </div>
      <div className=" flex flex-col gap-2 justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className=" text-lg ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-base font-medium">Pickup</h3>
              <p className="text-sm text-gray-600"> {props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className=" text-lg ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-base font-medium">Destination</h3>
              <p className="text-sm text-gray-600">
                {" "}
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" ri-currency-fill"></i>
            <div>
              <h3 className="  text-base font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600"> Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            className="w-full flex justify-center   mt-4 bg-green-500 text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>
          <p className="text-xs text-red-400 mt-5 text-center">
            Click on finish ride if you have completed the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
