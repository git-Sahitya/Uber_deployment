import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className=" p-2 text-center w-[90%]  absolute top-0 right-2 "
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className=" text-2xl  text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available! </h3>
      <div className="flex items-center justify-between p-2 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 w-11 rounded-full object-cover"
            src="https://img.freepik.com/free-vector/organic-flat-dia-motorista-illustration_23-2148961409.jpg?uid=R193013355&ga=GA1.1.1896811457.1729647436&semt=ais_hybrid"
            alt=""
          />
          <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname }</h2>
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
              <p className="text-sm text-gray-600"> {props.ride?.destination}</p>
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
        <div className="flex w-full items-center justify-around mt-4">
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="  bg-gray-300 text-gray-700 font-semibold p-3 px-8 rounded-lg"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide()
            }}
            className="  bg-green-500 text-white font-semibold p-3 px-8 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
