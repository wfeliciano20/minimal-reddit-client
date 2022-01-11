import React,{useState, useEffect} from 'react';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';   
import { selectSearchTerm, setSearchTerm} from '../features/reddit/redditSlice';
import '../input.css';


const Navbar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const [termLocal,setTermLocal] = useState('');

  useEffect(() => {
    setTermLocal(searchTerm);
  },[searchTerm])

  const onSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(termLocal));
  }
  return (
    <div className={`h-[74px] rounded-xl grid-area-navbar lg:col-span-3 border-b-2 shadow-lg`}>
        <div className="flex flex-row justify-around mt-5 md:mt-3 px-5">
          <div className="flex flex-row items-center justify-center">
            <FaReddit className="text-3xl md:text-4xl lg:text-5xl pr-2 text-blue-600"/>
            <p className="text-sm md:text-xl lg:text-2xl">Minimal Reddit</p>
          </div>
          <div className="search flex flex-row">
            <form className="flex flex-row" onSubmit={onSearchSubmit}>
              <button type='submit' onSubmit={onSearchSubmit} aria-label="Search" className="mb-1">
                  <HiOutlineSearch className="text-3xl md:text-4xl pr-2 text-blue-600 "/>
              </button>
              <input value={termLocal} onChange={e => setTermLocal(e.target.value)} type="text" placeholder="Search" className=" w-[5rem] md:w-[15rem] rounded-xl border-2 h-10 mt-2 md:mt-2 p-2 border-gray-300 border-solid" />
            </form>
          </div>
          <div className="w-52 h-[64px]"></div>
        </div> 
    </div>
  )
}

export default Navbar;
