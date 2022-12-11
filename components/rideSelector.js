import React from 'react'
import Image from 'next/image'
import uberX from '../assets/rides/uberX.png'
import uberXL from '../assets/rides/uberXL.png'
import uberSelect from '../assets/rides/uberSelect.png'
import uberBlackSuv from '../assets/rides/uberBlackSuv.png'
import uberBlack from '../assets/rides/uberBlack.png'

const style = {}

const carList = [
    {
        name:"uberX",
        iconUrl: uberX,
        priceMultiplier:1,
    },
    {
        name:"uberXL",
        iconUrl: uberXL,
        priceMultiplier:1,
    },
    {
        name:"uberSelect",
        iconUrl: uberSelect,
        priceMultiplier:1,
    },
    {
        name:"uberBlackSuv",
        iconUrl: uberBlackSuv,
        priceMultiplier:1,
    },
    {
        name:"uberBlack",
        iconUrl: uberBlack,
        priceMultiplier:1,
    },
]

export const RideSelector = () => {
  return (
    <div className={style.wrapper}>
        <div className={style.title}>Choose a ride or swipe up for more.</div>
        <div className={style.carList}>
            {carList.map((car, index) => (
                <div className={style.car}>
                    <Image
                    src={car.iconUrl}
                    height={50}
                    width={50}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}
