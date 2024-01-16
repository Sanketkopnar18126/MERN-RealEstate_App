import { useState } from "react";

export const SignUp = () => {
   const [userData,setuserData]=useState({
      username:"",
      email:"",
      password:""
   })
   const {email,password,username}=userData

   return (
      <section className="bg-gray-50 ">
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                     Create your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">

                  <div>
                        <label
                           htmlFor="email"
                           className="block mb-2 text-sm font-medium text-black "
                        >
                           Username
                        </label>
                        <input
                           type="text"
                           name="username"
                           id="username"
                           value={username}
                           placeholder="Enter username"
                           onChange={(e)=>{setuserData((prev)=>({...prev,username:e.target.value}))}}
                           className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                           required=""
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="email"
                           className="block mb-2 text-sm font-medium text-black "
                        >
                           Your email
                        </label>
                        <input
                           type="email"
                           name="email"
                           id="email"
                           value={email}
                           onChange={(e)=>setuserData((prev)=>({...prev,email:e.target.value}))}
                           placeholder="name@gmail.com"
                           className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                           required=""
                        />
                     </div>
                     <div>
                        <label
                           htmlFor="password"
                           className="block mb-2 text-sm font-medium text-black "
                        >
                           Password
                        </label>
                        <input
                           type="password"
                           name="password"
                           id="password"
                           value={password}
                           onChange={(e)=>setuserData((prev)=>({...prev,password:e.target.value}))}
                           placeholder="••••••••"
                           className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                           required=""
                        />
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-start">
                           <div className="flex items-center h-5">
                              <input
                                 id="remember"
                                 aria-describedby="remember"
                                 type="checkbox"
                                 className="w-4 h-4 border border-gray-300 rounded bg-gray-50    "
                                 required=""
                              />
                           </div>
                           <div className="ml-3 text-sm">
                              <label
                                 htmlFor="remember"
                                 className="text-blue-800 "
                              >
                                 Remember me
                              </label>
                           </div>
                        </div>
                        <a
                           href="#"
                           className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                           Forgot password?
                        </a>
                     </div>
                     <div className="flex justify-center items-center mt-1">
                        <button
                           type="button"
                           className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                           LogIn
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};
