import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
   signInFailed,
   signInSucsess,
   signInStart,
} from "../../Slice/user.slice.js";
import { OAuth } from "../../Components/OAuth/OAuth.jsx";
export const Login = () => {
   const [userData, setuserdata] = useState({
      email: "",
      password: "",
   });
   // const [loading, setloading] = useState(false);
   const { loading } = useSelector((state) => state.userdata);
   const [showbtn, setshowbtn] = useState(true);
   const { email, password } = userData;

   // console.log(userData)
   // const setPassword=(e)=>{
   //    setuserdata({...userData,password:e.target.value});
   //    console.log(password)
   // }
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const onHandleLogin = async (e) => {
      e.preventDefault();
      try {
         // setloading(true)
         dispatch(signInStart());
         setshowbtn(false);
         const res = await fetch("/users/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
         });
         const data = await res.json();
         // console.log(data.mssg);
         dispatch(signInSucsess(data));
         // console.log(data)
         // setloading(false)
         setshowbtn(true);
         setuserdata({
            email: "",
            password: "",
         });
         navigate("/");
      } catch (error) {
         dispatch(signInFailed(error.mssg));
         setshowbtn(true);
      }
   };
   return (
      <section className="bg-gray-50 ">
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                     Login to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
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
                           onChange={(e) =>
                              setuserdata((prev) => ({
                                 ...prev,
                                 email: e.target.value,
                              }))
                           }
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
                           onChange={(e) =>
                              setuserdata((prev) => ({
                                 ...prev,
                                 password: e.target.value,
                              }))
                           }
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
                     {showbtn && (
                        <div className="flex justify-center items-center mt-1">
                           <button
                              type="button"
                              onClick={onHandleLogin}
                              className="text-white w-[165px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                           >
                              LogIn
                           </button>
                        </div>
                     )}
                     <OAuth />

                     {loading && (
                        <div
                           role="status"
                           className="relative top-[0px] left-[170px]"
                        >
                           <svg
                              aria-hidden="true"
                              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                 fill="currentColor"
                              />
                              <path
                                 d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                 fill="currentFill"
                              />
                           </svg>
                        </div>
                     )}
                     <p className="text-sm font-light text-blue-800 ">
                        Don’t have an account yet?{" "}
                        <NavLink
                           to={"/signup"}
                           className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                           Sign up
                        </NavLink>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};
