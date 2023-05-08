import Image from 'next/image'
import avatar from '../temp/avatar.jpg'
import logo from "../assets/sitelogo.png"
import { BsPerson } from 'react-icons/bs'
import { useContext } from 'react'
import { UberContext } from '../context/uberContext'
import { useRouter } from "next/router";

const style = {
  wrapper: `h-16 w-full bg-gradient-to-br from-blue-400 to-indigo-800 text-white flex md:justify-around items-center px-60 fixed z-20`,
  leftMenu: `flex gap-3`,
  logo: `text-3xl text-black  flex cursor-pointer mr-16`,
  menuItem: `text-lg text-white font-medium flex items-center mx-4 cursor-pointer `,
  item:`text-lg text-white font-medium flex items-center mx-4 cursor-pointer px-3 transition-colors duration-500 border-black border-2 border-dashed bg-black hover:bg-transparent rounded-3xl hover:rounded-lg`,
  rightMenu: `flex gap-3 items-center`,
  userImageContainer: `mr-2`,
  userImage: `h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer`,
  loginButton: `flex items-center cursor-pointer rounded-full transition-colors duration-500 bg-black hover:bg-transparent px-4 py-1 border-black border-2 border-dashed rounded-3xl hover:rounded-lg`,
  loginText: `ml-2`,
}

const Navbar = () => {
  const router = useRouter();

  const { currentAccount, currentUser } = useContext(UberContext)

  return (
    <div className={style.wrapper}>
      <div className={style.leftMenu}>
        <div>
          <Image
            src={logo}
            width={75}
            height={50}
          />
        </div>
      </div>
      <div className={style.rightMenu}>
        <div className={style.item}>Ride</div>
        <div className={style.item}>Driver</div>
        <div className={style.item}>More</div>
        <div className={style.item}>Help</div>
        <div className={style.menuItem}>{currentUser.name?.split(' ')[0]}</div>
        <div className={style.userImageContainer}>
          <Image
            className={style.userImage}
            alt = 'An Avatar'
            src={avatar}
            width={40}
            height={40}
          />
        </div>
        {currentAccount ? (
          <div>
            {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
          </div>
        ) : (
          <div className={style.loginButton} onClick={() => router.push('/userlogin')}>
            <BsPerson />
            <span className={style.loginText}>Log in</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar