import React, { useContext, useEffect, useState } from "react";
import { UberContext } from "../context/uberContext";
import { useRouter } from "next/router";

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
    <div>
      <div>
        //TODO: Make sure to reset driver when switching from signup to login
        and vice verse as both the forms use the same object to store user
        entered information.
      </div>
      <div
        className="Signup"
        style={{ border: "1px solid black", display: "inline-block" }}
      >
        <h3>
          <b>Sign Up</b>
        </h3>
        <div className="signup form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
            </div>
            <input
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
            <div>
              <label>Phone:</label>
            </div>
            <input
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
              <label>Address:</label>
            </div>
            <input
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
            <div>
              <label>Aadhar Number:</label>
            </div>
            <input
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
            <div>
              <label>Car Number:</label>
            </div>
            <input
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
            <div>
              <label>Wallet Address:</label>
            </div>
            <input
              type="text"
              required
              disabled
              autoComplete="off"
              value={
                driver.walletAddress ? driver.walletAddress : "Not Connected"
              }
            />
            <div>
              <button onClick={handleConnectClick}>Connect to Wallet</button>
              <div>
                <button type="submit">Sign up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="Login"
        style={{ border: "1px solid black", display: "inline-block" }}
      >
        <h3>
          <b>Login</b>
        </h3>
        <div className="login form">
          <form onSubmit={handleLogin}>
            <div>
              <label>Phone:</label>
            </div>
            <input
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
              <label>Wallet Address:</label>
            </div>
            <input
              type="text"
              required
              disabled
              autoComplete="off"
              value={
                driver.walletAddress ? driver.walletAddress : "Not Connected"
              }
            />
            <div>
              <button onClick={handleConnectClick}>Connect to Wallet</button>
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default driverLogin;
