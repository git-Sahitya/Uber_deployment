import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className=" p-2 text-center w-[90%]  absolute top-0 right-2 "
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className=" text-2xl  text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride </h3>
      <div className=" flex flex-col gap-2 justify-between items-center">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className=" text-lg ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-base font-medium">B/54</h3>
              <p className="text-sm text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-1">
            <i className=" text-lg ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-base font-medium">Lane no.9</h3>
              <p className="text-sm text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className=" ri-currency-fill"></i>
            <div>
              <h3 className="  text-base font-medium"> ₹{props.fare[props.vehicleType]}</h3>
              <p className="text-sm text-gray-600"> Cash Cash</p>
            </div>
          </div>
        </div>
        <button onClick={()=>{
        props.setVehicleFound(true)
        props.setConfirmRidePanel(false)
        props.createRide(true)
        }} className="w-full mt-5 bg-green-500  text-white font-semibold p-2 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
