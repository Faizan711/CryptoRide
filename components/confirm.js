import RideSelector from './rideSelector'
import { useContext } from 'react'
import { UberContext } from '../context/uberContext'
import { useRouter } from "next/router";
import { ethers } from 'ethers'

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10 `,
  confirmButton: `bg-gradient-to-br from-blue-400 to-indigo-800 text-white m-4 py-4 transition-colors duration-500 text-center text-xl font-semibold rounded-xl  hover:from-blue-300 hover:to-indigo-900 hover:text-black`,
}

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
      console.log(price)
      if (typeof price === 'undefined') {
        console.error('Setting default price value.')
        setPrice(0.002)
        console.log('New Price = ',price);
      }
      let eth_price = BigInt(price*Math.pow(10,18)).toString(16);
      console.log("Eth price = ",eth_price);
      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
            value: eth_price,
          },
        ],
      })
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
              storeTripDetails(pickup, dropoff);
              if(currentUser.length === 0){
                router.push('/userlogin');
              };
            }}
          >
            Confirm {selectedRide.service || 'UberX'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm