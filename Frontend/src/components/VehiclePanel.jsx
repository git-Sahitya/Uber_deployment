import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className=" p-2 text-center w-[90%]  absolute top-0 right-2 "
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className=" text-2xl  text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>

      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.selectVehicle('car')
        }}
        className="flex w-full  border-2 border-gray-200 active:border-black   mb-2 rounded-xl p-3  items-center justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">5</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm"> 2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-medium">₹{props.fare.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.selectVehicle('moto')
        }}
        className="flex w-full   border-2 border-gray-200 active:border-black mb-2 rounded-xl p-3  items-center justify-between"
      >
        <img
          className="h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfZk9YnqF1LyugOEqiW3Wot1QKVZhVw202uQ&s"
          alt=""
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm"> 3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-medium">₹{props.fare.moto}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true)
          props.selectVehicle('auto')

        }}
        className="flex w-full   border-2 border-gray-200 active:border-black mb-2 rounded-xl p-3  items-center justify-between"
      >
        <img
          className="h-12 -ml-3"
          src="https://images.cnbctv18.com/uploads/2023/10/uber-auto.jpg"
          alt=""
        />
        <div className=" -ml-3 w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{" "}
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm"> 2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-medium">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
