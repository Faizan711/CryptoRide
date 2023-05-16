import React from 'react'
import { useState } from 'react';
import Image from "next/image";
import carousel from "../assets/carousel.jpg";
import { IoIosArrowBack } from 'react-icons/io';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaTelegram, FaDiscord } from 'react-icons/fa';

function More() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log({ name, email, message });
      // Add your code for submitting the form data here
    };

const style = {
    wrapper:`h-screen h-full bg-gradient-to-br pt-4 pb-10 from-blue-400 to-indigo-800 font-readex`,
    back:`text-lg text-white font-medium flex flex-row w-24 items-center mx-10 cursor-pointer px-3 transition-colors duration-500 border-black border-2 border-dashed bg-black hover:bg-transparent rounded-3xl hover:roundedspan`,
    about:`mx-auto w-4/5 bg-black p-5 mb-10 mt-5 rounded-xl text-white`,
    heading:`text-3xl font-bold text-center text-white`,
    text:`text-lg text-normal italic px-10 mt-4`,
    reviews:`mx-auto w-4/5 my-10 rounded-xl text-white flex justify-center`,
    social:`mx-auto w-2/5 p-5 mt-10 bg-black rounded-xl text-white flex justify-center space-x-4`,
    contact:`mx-auto w-2/5 p-5 px-10 my-5 bg-black rounded-xl text-white`,
}

const handleGoBack = () => {
    window.history.back();
};

  return (
    <div className={style.wrapper}>
        <span className={style.back} onClick={handleGoBack}><IoIosArrowBack/>Back</span>
        <div>
            <h2 className={style.heading}>About Us</h2>
        </div>
        <div className={style.about}>
            
            <p className={style.text}>
            Welcome to our decentralized cab booking website! We are a team of three friends who came together to create a platform that revolutionizes the traditional cab booking industry. As final year students, we wanted to use our knowledge and skills to develop a solution that addresses the challenges faced by both customers and drivers. Our aim is to provide a safe, reliable, and efficient ride-hailing experience for everyone.
            </p>
            <p className={style.text}>
            Our team comprises of individuals with diverse backgrounds and expertise in software development, data analysis, and customer service. We believe in using cutting-edge technology to enhance our platform's functionality while ensuring a seamless user experience. Our focus is on providing value to our customers through competitive pricing, convenient booking options, and excellent customer support.
            </p>
            <p className={style.text}>
            At our core, we are driven by a passion for innovation, a commitment to customer satisfaction, and a desire to make a positive impact on the transportation industry. We believe that our decentralized cab booking platform is a step towards a more sustainable and equitable future for both customers and drivers. Join us on this journey towards a better way of booking cabs!
            </p>
        </div>
        <div>
            <h2 className={style.heading}>User Reviews</h2>
        </div>
        <div className={style.reviews}>
            <Image alt="carousel" src={carousel} height={900} width={800} />
        </div>
        <div>
            <h2 className={style.heading}>Got Any Question? Contact Us</h2>
        </div>
        <div className={style.contact}>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
                <label className="block text-white font-bold mb-2" htmlFor="name">
                Name
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white font-bold mb-2" htmlFor="email">
                Email
                </label>
                <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="mb-8">
                <label className="block text-white font-bold mb-2" htmlFor="message">
                Message
                </label>
                <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Send Message
            </button>
        </form>
        </div>
        <div className={style.social}>
            <h3 className="text-lg font-semibold">FOLLOW US :</h3>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-6 h-6 text-blue-500 hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-6 h-6 text-blue-500 hover:text-white" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="w-6 h-6 text-blue-500 hover:text-white" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="w-6 h-6 text-blue-500 hover:text-white" />
            </a>
            <a href="https://www.telegram.com/" target="_blank" rel="noopener noreferrer">
                <FaTelegram  className="w-6 h-6 text-blue-500 hover:text-white" />
            </a>
            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                <FaDiscord   className="w-6 h-6 text-blue-500 hover:text-white" />
            </a>
        </div>
    </div>
  )
}

export default More