import React, { useContext, useState } from "react";
import { UberContext } from "../context/uberContext";
import { useRouter } from "next/router";
function userLogin() {
  const router = useRouter();
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
    requestToGetCurrentUsersInfo(currentAccount);
    router.push("/");
  };
  return (
    <div>
      <div
        className="Signup"
        style={{ border: "1px solid black", display: "inline-block" }}
      >
        <h3>
          <b>Sign Up</b>
        </h3>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
            </div>
            <input
              type="text"
              required
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              <label>Phone:</label>
            </div>
            <input
              type="number"
              required
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div>
              <label>Wallet Address:</label>
            </div>
            <input
              type="text"
              required
              disabled
              autoComplete="off"
              value={currentAccount ? currentAccount : "Not Connected"}
            />
            <div>
              <button onClick={handleConnectClick}>Connect to Wallet</button>
              <div>
                <button type="submit">
                  Submit
                </button>
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
        <button onClick={handleLogin}>Click to Login with metamask</button>
      </div>
    </div>
  );
}

export default userLogin;
