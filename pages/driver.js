import Navbar from "../components/driverNavbar";
import Map from "../components/driverMap";
import AvailableRides from "../components/rideDisplay";
import { useContext, useEffect, useState } from "react";
import { UberContext } from "../context/uberContext";

const style = {
  wrapper: `h-screen w-screen flex flex-col font-readex`,
  main: `h-screen w-screen flex-1 z-10 absolute`,
  mapContainer: `flex-1 w-full h-full`,
  rideRequestContainer: `h-screen w-[400px] ml-[1rem] py-[3rem] absolute top-0 left-0 flex flex-col justify-end z-20`,
  rideRequest: `h-full max-h-[700px] bg-white rounded-lg flex flex-col overflow-scroll`,
};

export default function Home() {
  const [rides, setRides] = useState([]);
  const { driver } = useContext(UberContext);
  useEffect(() => {
    const fetchDriverRides = async () => {
      try {
        const response = await fetch(
          `/api/db/getDriverRides?car_model=${driver?.car_model}`
        );
        const data = await response.json();
        setRides(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDriverRides();
  }, [rides]);

  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.main} id="map">
        <Map />
      </div>
      <div>
        {rides.length > 0 ? (
          <div className="fixed bottom-0 right-0 p-4 z-30">
            <AvailableRides initialRides={rides} />
          </div>
        ):(
          <div className="fixed bottom-0 right-0 p-4 z-30">
            <AvailableRides />
          </div>
        )}
      </div>
    </div>
  );
}
