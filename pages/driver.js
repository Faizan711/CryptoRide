import Navbar from "../components/driverNavbar";
import Map from "../components/map";
import AvailableRides from "../components/rideDisplay";
const rides = [
    {
      pickup: "Kolkata",
      dropoff: "Howrah",
      price: 0.2,
      passenger:"Passenger 1",
      passenger_phone:9221212132
    },
    {
        pickup: "Airpot",
        dropoff: "Aliah University",
        price: 0.5,
        passenger:"Passenger 2",
        passenger_phone:567168045
      }
  ];
const style = {
  wrapper: `h-screen w-screen flex flex-col`,
  main: `h-screen w-screen flex-1 z-10 absolute`,
  mapContainer: `flex-1 w-full h-full`,
  rideRequestContainer: `h-screen w-[400px] ml-[1rem] py-[3rem] absolute top-0 left-0 flex flex-col justify-end z-20`,
  rideRequest: `h-full max-h-[700px] bg-white rounded-lg flex flex-col overflow-scroll`,
};

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.main} id="map">
        <Map />
      </div>
      <div className="fixed bottom-0 right-0 p-4 z-20">
        <AvailableRides initialRides={rides}/>
      </div>
    </div>
  );
}
