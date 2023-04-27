import RideSelector from './RideSelector'
import { useContext } from 'react'
import { UberContext } from '../context/uberContext'
import { ethers } from 'ethers'

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
}

const Confirm = () => {
  const {
    currentAccount,
    pickup,
    dropoff,
    price,
    setPrice,
    selectedRide,
    pickupCoordinates,
    dropoffCoordinates,
    metamask,
  } = useContext(UberContext)

  const storeTripDetails = async (pickup, dropoff) => {
    try {
      await fetch('/api/db/saveTrips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          userWalletAddress: currentAccount,
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
            onClick={() => storeTripDetails(pickup, dropoff)}
          >
            Confirm {selectedRide.service || 'UberX'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm