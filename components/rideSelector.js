import React from 'react'
import Image from 'next/image'
import uberX from '../assets/rides/uberX.png'
import uberXL from '../assets/rides/uberXL.png'
import uberSelect from '../assets/rides/uberSelect.png'
import uberBlackSuv from '../assets/rides/uberBlackSuv.png'
import uberBlack from '../assets/rides/uberBlack.png'
import ethLogo from '../assets/eth-logo.png'

const style = {
    wrapper: `h-full flex flex-col`,
    title: `text-gray-500 text-center text-xs py-2 border-b`,
    carList: `flex flex-col flex-1 y-overflow-scroll`,
    car: `flex p-3 m-2 items-center border-2 border-white`,
    selectedCar: `border-2 border-black flex p-3 m-2 items-center`,
    carImage: `h-14`,
    carDetails: `ml-2 flex-1`,
    service: `font-medium`,
    time: `text-xs text-blue-500`,
    priceContainer: `flex items-center`,
    price: `mr-[-0.8rem]`,
}

const carList = [
    {
        name:"uberX",
        iconUrl: uberX,
        priceMultiplier:1,
    },
    {
        name:"uberXL",
        iconUrl: uberXL,
        priceMultiplier:2,
    },
    {
        name:"uberSelect",
        iconUrl: uberSelect,
        priceMultiplier:1.5,
    },
    {
        name:"uberBlackSuv",
        iconUrl: uberBlackSuv,
        priceMultiplier:3,
    },
    {
        name:"uberBlack",
        iconUrl: uberBlack,
        priceMultiplier:2,
    },
]

const basePrice = 1542;

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
                    <div className={style.carDetails}>
                        <div className={style.service}>{car.name}</div>
                        <div className={style.time}>5 min Away</div>
                    </div>
                    <div className={style.priceContainer}>
                        <div className={style.price}>
                            {((basePrice / 10 ** 5)* car.priceMultiplier).toFixed(5)}
                        </div>
                        <Image src={ethLogo} height={40} width={40}/>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
