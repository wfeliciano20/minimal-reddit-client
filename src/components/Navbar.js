import React,{useState} from 'react';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import '../input.css';


const Navbar = () => {
  const [termLocal,setTermLocal] = useState('');

  return (
    <div className={`h-[74px] rounded-2xl grid-area-navbar lg:col-span-3 shadow-xl drop-shadow-2xl `}>
        <div className="flex flex-row justify-around mt-5 md:mt-3 px-5">
          <div className="flex flex-row items-center justify-center">
            <FaReddit className="text-3xl md:text-4xl lg:text-5xl pr-2 text-blue-600"/>
            <p className="text-sm md:text-xl lg:text-2xl">Minimal Reddit</p>
          </div>
          <div className="search flex flex-row">
            <HiOutlineSearch className="text-4xl pr-2 text-blue-600 mt-2 md:mt-3"/>
            <input value={termLocal} onChange={e => setTermLocal(e.target.value)} type="text" placeholder="Search" className=" w-[5rem] md:w-[15rem] rounded-xl border-2 h-10 mt-2 md:mt-3 p-2 border-gray-300 border-solid" />
          </div>
          <div className="w-52 h-[64px]"></div>
        </div> 
    </div>
  )
}

export default Navbar;
