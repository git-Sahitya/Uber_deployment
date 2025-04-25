import React , {useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext)
  return (
    <div>
       <div className="flex items-center justify-between ">
          <div className="flex items-center justify-start gap-4">
            <img className="h-10 w-10 rounded-full object-cover" src="https://img.freepik.com/free-vector/organic-flat-dia-motorista-illustration_23-2148961409.jpg?uid=R193013355&ga=GA1.1.1896811457.1729647436&semt=ais_hybrid" alt="" />
            <h4 className="text-lg font-medium capitalize ">{captain.fullname.firstname + ' ' + captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">$9.43</h4>
            <p className="text-sm  text-gray-500">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-8 items-start">
          <div className="text-center">
            <i className=" text-3xl  font-thin  ri-timer-2-line"></i>
            <h5 className="text-lg font-medium">10.5</h5>
            <p className="text-sm text-gray-600"> Hours Online</p>
          </div>
          <div className="text-center mr-2">
            <i className=" text-3xl font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">30</h5>
            <p className="text-sm text-gray-600"> KiloMeter</p>
          </div>
          <div className="text-center">
            <i className=" text-3xl font-thin ri-wallet-2-line"></i>
            <h5 className="text-lg font-medium">18.74</h5>
            <p className="text-sm text-gray-600"> Dollar</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails
