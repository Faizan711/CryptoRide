import React, { useState } from "react";

const AvailableRides = ({ initialRides }) => {
  const [rides, setRides] = useState(initialRides);

  const handleReject = (index) => {
    setRides((prevRides) => prevRides.filter((ride, i) => i !== index));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg fixed bottom-0 right-0 mb-8 mr-8">
      <h2 className="text-lg font-medium mb-4">Available Rides</h2>
      {rides.map((ride, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <div>
            <p className="text-gray-800 font-semibold">{ride.pickup} to {ride.dropoff}</p>
            <p className="text-gray-600">{ride.passenger_phone}</p>
          </div>
          <div>
            <p className="text-gray-800 font-semibold">{ride.price}</p>
            <p className="text-gray-600">{ride.passenger}</p>
          </div>
          <div>
            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded mr-2">
              Confirm
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
              onClick={() => handleReject(index)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableRides;
