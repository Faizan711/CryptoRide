import RideSelector from "./rideSelector";
import { use, useContext, useEffect, useState } from "react";
import { UberContext } from "../context/uberContext";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10 `,
  confirmButton: `bg-gradient-to-br from-blue-400 to-indigo-800 text-white m-4 py-4 transition-colors duration-500 text-center text-xl font-semibold rounded-xl  hover:from-blue-300 hover:to-indigo-900 hover:text-black`,
};

const Confirm = () => {
  const {
    currentAccount,
    currentUser,
    pickup,
    dropoff,
    price,
    setPrice,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,
  } = useContext(UberContext);

  const [rideStatus, setRideStatus] = useState(null);
  const [rideId, setRideId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClickBlocked, setIsClickBlocked] = useState(false);
  const [driverDetails, setDriverDetails] = useState();

  const openModal = () => {
    setIsModalOpen(true);
    setIsClickBlocked(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsClickBlocked(false);
  };

  const confirmButtonContainerClasses = isClickBlocked ? "confirmButtonContainer hidden" : "confirmButtonContainer";

  useEffect(() => {
    if (rideId !== null) {
      //console.log(rideId)
      getRideStatus();

      const interval = setInterval(() => {
        getRideStatus();
        
      }, 7000);

      return () => {
        clearInterval(interval);
      };
    }

    


  }, [rideId]);

  // const myFunction = () => {
  //   setTimeout(getDriverDetails, 20000); // Delayed function will be called after 10 seconds
  // };

  // const getDriverDetails = async() => {
  //   try {
  //     const response = await fetch(`/api/db/getRideDriver?id=${rideId}`);
  //     let data = await response.json();
  //     console.log(data);
  //     setDriverDetails(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const getRideStatus = async (id) => {
    try {
      console.log(rideId);
      const response = await fetch(`/api/db/checkRideStatus?id=${rideId}`);
      let data = await response.json();
      setRideStatus(data.data[0].status);
      console.log(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const storeTripDetails = async (pickup, dropoff) => {
    try {
      setRideStatus("booked");
      const newRideId = `${currentAccount}-${Date.now()}`;
      setRideId(newRideId);
      // myFunction();
      await fetch("/api/db/saveTrips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newRideId,
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          status: "booked",
          price: price,
          selectedRide: selectedRide,
        }),
      });
      
      console.log("Ride id = " + rideId);
      console.log(price);
      if (typeof price === "undefined") {
        console.error("Setting default price value.");
        setPrice(0.002);
        console.log("New Price = ", price);
      }
      let eth_price = BigInt(price * Math.pow(10, 18)).toString(16);
      console.log("Eth price = ", eth_price);
      await metamask.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
            value: eth_price,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropoffCoordinates && <RideSelector />}
      </div>
      <div className={confirmButtonContainerClasses}>
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => {
              storeTripDetails(pickup, dropoff);
              openModal();
              if (currentUser.length === 0) {
                router.push("/userlogin");
              }
            }}
          >
            Confirm {selectedRide.service || "UberX"}
          </div>
          {/* {rideStatus === "booked" && (
            <div className="loader">Waiting for driver confirmation...</div>
          )}
          {rideStatus === "ongoing" && ( // Render different content based on rideStatus
            <div className="info">Ride in progress...</div>
          )}
          {rideStatus === "completed" && ( // Render different content based on rideStatus
            <div className="info">Ride completed!</div>
          )} */}
          
        </div>
      </div>
      {rideStatus === 'booked' ? (
          <>
            <div className={`fixed flex bg-white flex-row items-center justify-center rounded-2xl p-5 left-1/3 top-1/3 h-1/4 w-1/3 z-50 text-black ${isModalOpen ? 'block' : 'hidden'}`}>
              <span className="mr-2 animate-spin text-3xl">🔄</span>
              <h1 className='text-3xl text-center'>Waiting for Ride to be accepted by Driver</h1>
            </div>
          </>
        ) : rideStatus === 'waiting' || rideStatus === 'ongoing' || rideStatus === 'completed' ? (
          <>
            <div className={`fixed flex bg-gray-100 flex-row items-center justify-center rounded-2xl p-5 left-4 top-20 h-4/5 w-1/3 z-50 bg-white text-black ${isModalOpen ? 'block' : 'hidden'}`}>
              <div className="bg-white p-10 mr-4 rounded-lg h-full w-full">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Driver Details</h3>
                </div>
                <div className="mb-8">
                  <h4 className="text-bold">Driver name</h4>
                  <p>Ian Mante</p>
                  <h4 className="text-bold">phone number</h4>
                  <p>9856475819</p>
                </div>
                <button
                  className="px-4 py-2 bottom-0 bg-black text-white rounded-3xl hover:bg-gray-600"
                  onClick={() => closeModal()}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div></div>
          </>
        )}

    </div>
  );
};

export default Confirm;
