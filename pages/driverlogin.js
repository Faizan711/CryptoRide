import React, { useContext, useEffect, useState } from "react";
import { UberContext } from "../context/uberContext";
import { useRouter } from "next/router";
import { FaEthereum } from 'react-icons/fa';

function driverLogin() {
  const router = useRouter();

  const [carList, setCarList] = useState([]);

  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    walletAddress: "",
    address: "",
    aadhar: "",
    car_number: "",
    car_model: "",
  });

  //usestate to manage login/signup between tabs
  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => {
    setDriver({
      name: "",
      phone: "",
      walletAddress: "",
      address: "",
      aadhar: "",
      car_number: "",
      car_model: "",
    });
    setActiveTab(tab);
    console.log(activeTab);
  };

  const style = {
    wrapper:`h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-800 font-readex`,
    card:`bg-black flex flex-col text-white md:w-2/6 shadow-lg p-10 rounded-2xl font-medium`,
    tab:`flex flex-row w-full justify-between border-b mb-2`,
    login:`text-center text-xl w-1/2 border-r hover:bg-gray-600`,
    signup:`text-center text-xl w-1/2 hover:bg-gray-600`,
    btndiv:`flex justify-center`,
    input:`no-underline w-full text-black text-base my-3 p-1 border-solid border-2 rounded-md focus:outline-none appearance-none`,
    metabtn:`my-2 text-lg display:block lg:w-64 bg-gradient-to-tr from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500 flex flex-row items-center justify-center w-full h-10 mx-auto rounded-full font-normal`,
    btn:`  text-lg md:w-64 w-full h-10 rounded-2xl font-normal border-2 border-blue-400 bg-indigo-400 hover:bg-white hover:text-black`,
    select:`w-full text-black focus:outline-none no-underline appearance-none`,
  }

  useEffect(() => {
    const fetchCarList = async () => {
      try {
        const response = await fetch("/api/db/getRideTypes");
        const data = await response.json();
        setCarList(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCarList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(driver);
    try {
      const response = await fetch("/api/db/createDriver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      });
      const data = await response.json();
      console.log(data);
      // if (data.message == "success") {
      //   alert("Driver created successfully!");
      //   router.push("/");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnectClick = async (event) => {
    event.preventDefault();
    await connectWallet();
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `/api/db/getDriverInfo?walletAddress=${driver.walletAddress}&phone=${driver.phone}`
      );
      const data = await response.json();
      //console.log(data.data);
      const tempdriverdata = {
        name: data.data.name,
        phone: data.data.phone,
        address: data.data.address,
        walletAddress: data.data.walletAddress,
        aadhar: data.data.aadhar,
        car_number: data.data.car_number,
        car_model: data.data.car_model._ref,
      };
      setDriver(tempdriverdata);
    } catch (error) {
      console.error(error);
    }
  };
  const connectWallet = async () => {
    if (!window.ethereum) return;
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (addressArray.length > 0) {
        setDriver((prevState) => ({
          ...prevState,
          walletAddress: addressArray[0],
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={style.wrapper}>
      {/* <div>
        //TODO: Make sure to reset driver when switching from signup to login
        and vice verse as both the forms use the same object to store user
        entered information.
      </div> */}
      <div className={style.card}>
        <div className={style.tab}>
          <div className={style.login} onClick={() => handleTabClick('login')} ><button>Login</button></div>
          <div className={style.signup} onClick={() => handleTabClick('signup')}><button>Sign Up</button></div>
        </div>
        {activeTab === "signup"?
        <div>
              <div
            className="Signup"
          >
            
            <div className="signup form">
              <form onSubmit={handleSubmit}>
                
                <input
                  placeholder="Enter your name"
                  className={style.input}
                  type="text"
                  required
                  autoComplete="off"
                  value={driver.name}
                  onChange={(e) =>
                    setDriver((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
                
                <input
                  placeholder="Enter your number"
                  className={style.input}
                  type="number"
                  required
                  autoComplete="off"
                  value={driver.phone}
                  onChange={(e) =>
                    setDriver((prevState) => ({
                      ...prevState,
                      phone: e.target.value,
                    }))
                  }
                />
                
                <input
                  placeholder="Enter your Address"
                  className={style.input}
                  type="text"
                  required
                  autoComplete="off"
                  value={driver.address}
                  onChange={(e) =>
                    setDriver((prevState) => ({
                      ...prevState,
                      address: e.target.value,
                    }))
                  }
                />
                
                <input
                  placeholder="Enter Aadhar number"
                  className={style.input}
                  type="number"
                  required
                  autoComplete="off"
                  value={driver.aadhar}
                  onChange={(e) =>
                    setDriver((prevState) => ({
                      ...prevState,
                      aadhar: e.target.value,
                    }))
                  }
                />
                
                <input
                  placeholder="Enter Car number"
                  className={style.input}
                  type="text"
                  required
                  autoComplete="off"
                  value={driver.car_number}
                  onChange={(e) =>
                    setDriver((prevState) => ({
                      ...prevState,
                      car_number: e.target.value,
                    }))
                  }
                />
                <div>
                  <label>Car Model:</label>
                </div>
                <select
                  className={style.select}
                  required
                  value={driver.car_model}
                  onChange={(e) =>
                    setDriver((prevState) => ({
                      ...prevState,
                      car_model: e.target.value,
                    }))
                  }
                >
                  <option value="">Select a car</option>
                  {carList.map((car, index) => (
                    <option key={index} value={car._id}>
                      {car.service}
                    </option>
                  ))}
                </select>
                <button onClick={handleConnectClick} className={style.metabtn}>
                  Connect to Wallet <FaEthereum/>
                </button>
                <div>
                  <label>Wallet Address:</label>
                </div>
                <input
                  className={style.input}
                  type="text"
                  required
                  disabled
                  autoComplete="off"
                  value={
                    driver.walletAddress ? driver.walletAddress : "Not Connected"
                  }
                />
                <div>
                  <div className={style.btndiv}>
                    <button type="submit" className={style.btn}>Sign up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>:
        <div>
          <div
        className="Login"
      >
        
        <div className="login form">
          <form onSubmit={handleLogin}>
            <div>
              <label>Phone:</label>
            </div>
            <input
              className={style.input}
              type="number"
              required
              autoComplete="off"
              value={driver.phone}
              onChange={(e) =>
                setDriver((prevState) => ({
                  ...prevState,
                  phone: e.target.value,
                }))
              }
            />
            <div>
              <button onClick={handleConnectClick} className={style.metabtn}>Connect to Wallet <FaEthereum/></button>
            </div>
            <div>
              <label>Wallet Address:</label>
            </div>
            <input
              className={style.input}
              type="text"
              required
              disabled
              autoComplete="off"
              value={
                driver.walletAddress ? driver.walletAddress : "Not Connected"
              }
            />
            <div className={style.btndiv}>
              <button type="submit" className={style.btn}>Login</button>
            </div>
          </form>
        </div>
      </div>
        </div>}
      </div>
    </div>
  );
}

export default driverLogin;
