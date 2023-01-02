import React from 'react'
import { RideSelector } from './rideSelector'

const style = {
    wrapper: `flex-1 h-full flex flex-col justify-between`,
    rideSelectorContainer: `h-full flex flex-col y-overflow-scroll`,
    confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
    confirmButton: `bg-slate-400 text-black rounded-md font-semibold hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 m-4 py-4 text-center text-xl`,
}

export const Confirm = () => {

    const storeTripDetails = async () => {

    }
  return (
    <div className={style.wrapper} >
        <div className={style.rideSelectorContainer}>
            <RideSelector/>
        </div>
        <div className={style.confirmButtonContainer}>
            <div className={style.confirmButton} onClick={() => storeTripDetails()}>Confirm Ride</div>
        </div>
    </div>
  )
}
