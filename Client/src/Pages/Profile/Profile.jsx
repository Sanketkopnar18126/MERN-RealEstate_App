import { useSelector } from "react-redux";

export const Profile = () => {

   const{currentuser}=useSelector((state)=>state.userdata)
   // console.log("pro",currentuser)
   return (

      <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 absolute top-[65px] right-[13px] w-[301px] ">
         <div className="flex justify-end px-4 pt-4">
            <button
               id="dropdownButton"
               data-dropdown-toggle="dropdown"
               className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
               type="button"
            >
               {/* <span className="sr-only">Open dropdown</span>
               <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
               >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
               </svg> */}
            </button>
         </div>
         <div className="flex flex-col items-center pb-10">
            <img
               className="w-24 h-24 mb-3 rounded-full shadow-lg "
               src={currentuser.data.avatar}
               alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {currentuser.data.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentuser.data.email}
            </span>
            <div className="flex mt-4 md:mt-6">
               <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               >
              SignOut
               </a>
               <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
               >
                  Update Profile
               </a>
            </div>
         </div>
      </div>
   );
};
