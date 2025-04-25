import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    //setVehiclePanel(true)
    // setPanelOpen(false)
  };

  return (
    
    <div className="mt-8">
      
      {/* This is just a sample data */}

      {suggestions && suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={()=>
            handleSuggestionClick(elem.description)}
          className="flex items-center border-1 p-2  border-gray-200 active:border-black rounded-lg gap-2 mt-1 justify-start"
        >
          <h2 className=" bg-[#eee] h-7 w-8 flex items-center justify-center   rounded-full">
            <i className="ri-map-pin-2-line "></i>
          </h2>
          <h4 className="font-normal">{elem.description}</h4>
        </div>
       

      ))}
       
    </div>
  );
};

export default LocationSearchPanel;
