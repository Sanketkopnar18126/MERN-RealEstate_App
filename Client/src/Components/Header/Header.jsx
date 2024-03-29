import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Profile } from "../../Pages/Profile/Profile";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
export const Header = () => {
   // const [showProfile ,setShowProfile]=useState(true)
   // const [showLogin,setLogin]=useState(true)

   const [currentUser, setCurrentUser] = useState();
   const [showdropProfile, setshowdropProfile] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const { currentuser } = useSelector((state) => state.userdata);
   useEffect(() => {
      setCurrentUser(currentuser);
   }, [currentUser, currentuser]);

   //  console.log("cu",currentUser)
   const onHandleProfileDrop = () => {
      setshowdropProfile(!showdropProfile);
   };
   const navigate = useNavigate();
   const onHandleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      // console.log("urlParams", urlParams);
      urlParams.set("searchTerm", searchTerm);
      // console.log("urlParams2",urlParams)

      const searchQuery = urlParams.toString();
      // console.log("searchQuery",searchQuery)
      navigate(`/search?${searchQuery}`);
   };

   useEffect(()=>{
      const urlParams=new URLSearchParams(location.search)
      const searchTermForm=urlParams.get('searchTerm')
      // console.log("searchTermForm",searchTermForm)
      if(searchTermForm){
         setSearchTerm(searchTermForm)
      }
   },[location.search])
   return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
               <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Flowbite Logo"
               />
               <Link to={'/'} className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Tavalo
               </Link>
            </a>

            {currentUser && (
               <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  <button
                     type="button"
                     onClick={onHandleProfileDrop}
                     className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                     id="user-menu-button"
                     aria-expanded="false"
                     data-dropdown-toggle="user-dropdown"
                     data-dropdown-placement="bottom"
                  >
                     <img
                        className="w-8 h-8 rounded-full"
                        src={currentUser?.data?.user?.avatar}
                        alt="user photo"
                     />
                  </button>

                  {showdropProfile && <Profile />}
               </div>
            )}
            <div
               className="bg-white flex h-[43px] rounded-[20px] p-[11px]"
               onClick={onHandleSubmit}
            >
               <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent focus:outline-none w-24 sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
               <button>
                  <FaSearch className="text-slate-600" />
               </button>
            </div>
            <div
               className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
               id="navbar-user"
            >
               <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                     <NavLink
                        to={"/"}
                        className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        aria-current="page"
                     >
                        Home
                     </NavLink>
                  </li>
                  <li>
                     <NavLink
                        to={"/about"}
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        About
                     </NavLink>
                  </li>

                  {/* <li>
                     <NavLink
                        to={"/Contact"}
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                     >
                        Contact
                     </NavLink>
                  </li> */}
                  {currentUser ? null : (
                     <li>
                        <NavLink
                           to={"/login"}
                           className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                           LogIn
                        </NavLink>
                     </li>
                  )}
               </ul>
            </div>
         </div>
      </nav>
   );
};
