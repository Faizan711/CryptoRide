import RideSelector from './rideSelector'
import { useContext, useState } from 'react'
import { UberContext } from '../context/uberContext'
import { useRouter } from "next/router";
import { ethers } from 'ethers'

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10 `,
  confirmButton: `bg-gradient-to-br from-blue-400 to-indigo-800 text-white m-4 py-4 transition-colors duration-500 text-center text-xl font-semibold rounded-xl  hover:from-blue-300 hover:to-indigo-900 hover:text-black`,
  modal: `bg-white text-black`
}

const Confirm = () => {

  //code for user modal below
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let rideStatus = true;

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
  } = useContext(UberContext)

  const router = useRouter();

  const storeTripDetails = async (pickup, dropoff) => {
    try {
      console.log(selectedRide);
      await fetch('/api/db/saveTrips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
          status:'booked',
          price: price,
          selectedRide: selectedRide,
        }),
      })
      console.log(currentAccount)
      if (typeof price === 'undefined') {
        console.error('Setting default price value.')
        setPrice(0.002)
        console.log('New Price = ',price);
      }
      let eth_price = BigInt(price*Math.pow(10,18)).toString(16);
      console.log("Eth price = ",eth_price);
      // await metamask.request({
      //   method: 'eth_sendTransaction',
      //   params: [
      //     {
      //       from: currentAccount,
      //       to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
      //       value: eth_price,
      //     },
      //   ],
      // })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.rideSelectorContainer}>
        {pickupCoordinates && dropoffCoordinates && <RideSelector />}
      </div>
      <div className={style.confirmButtonContainer}>
        <div className={style.confirmButtonContainer}>
          <div
            className={style.confirmButton}
            onClick={() => {
              if(currentUser.length === 0){
                router.push('/userlogin');
              };
              if (pickupCoordinates !== undefined && dropoffCoordinates !== undefined) {
                // storeTripDetails(pickup, dropoff);
                openModal();
              }
            }}
          >
            Confirm {selectedRide.service || 'UberX'}
          </div>
        </div>
      </div>
      {rideStatus === true ?
        <>
        <div className={`fixed flex bg-gray-100 flex-row items-center justify-center rounded-2xl p-5 left-52 top-20 h-3/4 w-2/3 z-50 bg-white text-black ${isModalOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white p-10 mr-4 rounded-lg h-full w-1/3">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Driver Details</h3>
            </div>
            <div className="mb-8">
              <p>Driver name</p>
              <p>Driver phone number</p>
            </div>
            
              <button
                className="px-4 py-2 bottom-0 bg-black text-white rounded-3xl hover:bg-gray-600"
                onClick={() => closeModal()}
              >
                Close
              </button>
            
          </div>
          <div className='w-2/3'> map goes here</div>
        </div>
        </>
       :
        <>
          <div className={`fixed flex bg-white flex-row items-center justify-center rounded-2xl p-5 left-1/3 top-1/3 h-1/4 w-1/3 z-50 text-black ${isModalOpen ? 'block' : 'hidden'}`}>
            <span className="mr-2 animate-spin text-3xl">🔄</span>
            <h1 className='text-3xl text-center'>Waiting for Ride to be accepted by Driver</h1>
          </div>
        </>
      }
        
      </div>
    
  )
}

export default Confirm