import React, { useContext, useState, useEffect } from "react";
import { UberContext } from "../context/uberContext";

const AvailableRides = ({ initialRides }) => {
  const [rides, setRides] = useState(initialRides);
  const [isVisible, setIsVisible] = useState(true);

  const { createLocationCoordinatePromise } = useContext(UberContext);

  const handleReject = (index) => {
    setRides((initialRides) => initialRides.filter((ride, i) => i !== index));
    
  };

  const handleConfirm = (index) => {
    (async () => {
      await Promise.all([
        createLocationCoordinatePromise(rides[index].pickup, "pickup"),
        createLocationCoordinatePromise(rides[index].dropoff, "dropoff"),
      ]);
      await fetch(`api/db/changeRideStatus?_id=${rides[index]._id}&status=waiting`)
    })();
    setIsVisible(false);
  }

  useEffect(() => {
    setRides(initialRides);
  }, [initialRides]);

  useEffect(() => {
    setRides(rides);
  }, [rides]);

  return (
    <>
    {isVisible && (<div className="bg-slate-50 p-4 max-h-96 rounded-lg shadow-lg fixed bottom-0 right-0 mb-8 mr-8 overflow-scroll">
      <h2 className="text-lg font-medium text-center mb-4 border-b-2">AVAILABLE RIDES</h2>
      {Array.isArray(rides) && rides.length > 0 ? (
        rides.filter((ride) => Object.keys(ride).some(key => !!ride[key])).map((ride, index) => (
          <div key={index} className="flex flex-col justify-between items-center mb-2">
            <div className="flex flex-row">
              <div className="pr-1 border-r-2">
                <h5 className="text-gray-800 font-semibold text-center">From:</h5>
                <p>{ride.pickup}</p>
              </div>
              <div className="pl-1">
                <h5 className="text-gray-800 font-semibold text-center">To:</h5>
                <p>{ride.dropoff}</p>
              </div>
              
              {/* <p className="text-gray-800 font-semibold">
                {ride.pickup} to {ride.dropoff}
              </p> */}
              <p className="text-gray-600">{ride.passenger_phone}</p>
              {/* <hr className="mt-2"/> */}
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Fare: <span className="text-red-600"> {ride.price}</span></p>
              <p className="text-gray-800 font-semibold">Status: <span className="text-green-500">{ride.status}</span></p>
            </div>
            <div>
              <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mr-2"
              onClick={() => handleConfirm(index)}>
                Confirm
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                onClick={() => handleReject(index)}
              >
                Reject
              </button>
              <hr className="mt-2"/>
            </div>
          </div>
        ))
      ) : (
        <p>No rides available.</p>
      )}
    </div>)}
    </>
  );
};

export default AvailableRides;
