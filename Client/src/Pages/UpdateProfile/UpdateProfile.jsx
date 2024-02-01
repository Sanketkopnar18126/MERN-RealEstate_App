import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserSuccess } from "../../Slice/updateUser.slice.js";

export const UpdateProfile = () => {
   const [userData, setuserdata] = useState({
      username: "",
      email: "",
   });
   const { email, username } = userData;
   // console.log(userData)
   const { currentuser } = useSelector((state) => state.userdata);
   const navigate = useNavigate();
   const dispatch=useDispatch()
   // get Id
   // console.log(currentuser)
   // console.log("userId",userId.currentuser.data.user)
   const onHandleUpdateProfile = async (e) => {
      e.preventDefault();

      try {
         const res = await fetch(
            `/users/update/${currentuser?.data?.user?._id}`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(userData),
            }
         );

         const data = await res.json();
         console.log("data", data);
dispatch(updateUserSuccess(data))
         setuserdata({
            email: "",
            username: "",
         });
         navigate("/");
      } catch (error) {
         console.log("error", error);
      }
   };

   return (
      <section className="bg-gray-50 ">
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                     Update Profile
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
                           value={username}
                           onChange={(e) =>
                              setuserdata((prev) => ({
                                 ...prev,
                                 username: e.target.value,
                              }))
                           }
                           placeholder="Enter your username"
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

                     <div className="flex justify-center items-center mt-1">
                        <button
                           type="button"
                           onClick={onHandleUpdateProfile}
                           className="text-white w-[165px] bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                           Update Profile
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};
