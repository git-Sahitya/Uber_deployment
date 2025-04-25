import React from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {  useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";



const Riding = () => {
  const location = useLocation()
  const {ride} = location.state || {}
const {socket} = useContext(SocketContext)
const navigate = useNavigate()

socket.on('ride-ended' , ()=>{
  navigate('/home')
})

  return (
    <div className="h-screen">
      <Link to='/home' className="fixed right-2 top-2  h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className=" text-lg font-medium ri-home-4-line "></i>
        <i className=""></i>
      </Link>

      <div className='h-1/2'>
                <LiveTracking />

            </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">KIA</p>
          </div>
        </div>
        <div className=" flex flex-col gap-2 justify-between items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-1">
              <i className=" text-lg ri-map-pin-range-fill"></i>
              <div>
                <h3 className="text-base font-medium">Destination</h3>
                <p className="text-sm text-gray-600"> {ride?.destination}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <i className=" ri-currency-fill"></i>
              <div>
                <h3 className="  text-base font-medium">₹{ride?.fare}</h3>
                <p className="text-sm text-gray-600"> Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {}}
          className="w-full mt-5 bg-green-500 text-white font-semibold p-2 rounded-lg"
        >
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
