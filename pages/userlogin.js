import React, { useContext, useState } from "react";
import Image from "next/image";
import mapLogo from "../assets/map-bg.png"
import { UberContext } from "../context/uberContext";
import { useRouter } from "next/router";
import { FaEthereum } from 'react-icons/fa';

function userLogin() {
  const router = useRouter();

  const style = {
    wrapper:`h-screen flex flex-row justify-between md:px-36 items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-800 font-readex`,
    card:`bg-black text-white md:w-2/6 shadow-lg p-10 rounded-2xl font-medium`,
    imagecard:`bg-indigo-400 text-black font-2xl md:w-3.5/6 shadow-2xl p-10 rounded-2xl font-medium`,
    signup: `mb-10`,
    login: `flex justify-center`,
    input:`no-underline w-full text-black text-base my-3 p-1.5 border-solid border-2 rounded-md focus:outline-none appearance-none`,
    h3:`text-center text-2xl pb-2 border-b`,
    text:`text-lg text-center my-1`,
    heading:`text-3xl font-bold text-center my-1`,
    address:`w-full text-lg mb-3`,
    metabtn:`my-2 text-lg display:block lg:w-64 bg-gradient-to-tr from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500 flex flex-row items-center justify-center w-full h-10 mx-auto rounded-full font-normal`,
    btn:`  text-lg md:w-64 w-full h-10 rounded-2xl font-normal border-2 border-blue-400 bg-indigo-400 hover:bg-white hover:text-black`,
  }

  const {
    requestToGetCurrentUsersInfo,
    connectWallet,
    currentAccount,
    setCurrentAccount,
  } = useContext(UberContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleConnectClick = async () => {
    await connectWallet();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      name: name,
      phone: Number(phone),
      userWalletAddress: currentAccount,
    };

    try {
      const response = await fetch("/api/db/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(userData);
      console.log(data);
      if (data.message == "success") {
        alert("User created successfully!");
        router.push("/");
        setName("");
        setPhone("");
        setCurrentAccount("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await connectWallet();
    await requestToGetCurrentUsersInfo(currentAccount);
    router.push("/");
  };
  return (
    <div className={style.wrapper}>
      <div className={style.imagecard}>
        <h1 className={style.heading}>CRYPTORIDE</h1>
        <p className={style.text}>The all new decentralized cab booking application.</p>
        <Image alt = 'Map Background'src={mapLogo} height={900} width={600} />
        <h1 className={style.heading}><em>Want a Ride? Sign Up to Book now!</em></h1>
      </div>
      <div className={style.card}>
      <div
        className={style.signup}
      >
        <h3 className={style.h3}>
          User Sign Up
        </h3>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div>
            <input
              placeholder="Enter your name"
              className={style.input}
              type="text"
              required
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
            <input
              placeholder="Enter you number"
              className={style.input}
              type="number"
              required
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleConnectClick} className={style.metabtn}>Connect to Metamask! <FaEthereum/></button>
            <p style={{ textAlign: 'center' }}>If you don't have Metamask,</p>
            <p style={{ textAlign: 'center' }}>please add from extensions!</p>
            <div className={style.text}>
              <label >Wallet Address:</label>
            </div>
            <input
              className={style.address}
              type="text"
              required
              disabled
              autoComplete="off"
              value={currentAccount ? currentAccount : "Not Connected"}
            />
            <div>
              <div className={style.login}>
                <button type="submit" className={style.btn}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr></hr>
      <h3 className={style.text}>Already a user? login below:</h3>
      <div
        className={style.login}
      >
        <button onClick={handleLogin} className={style.btn}>Login with metamask</button>
      </div>
      </div>
    </div>
  );
}

export default userLogin;
