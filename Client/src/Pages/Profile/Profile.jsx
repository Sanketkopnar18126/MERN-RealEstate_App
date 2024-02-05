import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../../../firbase";
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import { Link, NavLink } from "react-router-dom";
// import { signOut } from "../../Slice/user.slice";

export const Profile = () => {
   // const navigate=useNavigate()
   // const dispatch=useDispatch()
   const fileref = useRef(null);

   const [data, setdata] = useState();

   let { currentuser } = useSelector((state) => state.userdata);
   // const updatedata = useSelector((state) => state.updateUser);
   // console.log("d", updatedata);
   const [avatarFile, setavatarfile] = useState(undefined);

   const [filePercent, setfilepercent] = useState(0);

   const [error, seterror] = useState(false);

   const [formData, setFormData] = useState({});
   const [userListings, setUserListings] = useState([]);
   // console.log("form", formData);

   // console.log("pro", currentuser);

   // console.log(filePercent);

   useEffect(() => {
      setdata(currentuser);

      if (avatarFile) {
         onHandleAvatar(avatarFile);
      }
   }, [currentuser, avatarFile, data]);
   // console.log("da", data);

   // console.log("file", avatarFile);

   const onHandleSignOut = async () => {
      try {
         const res = await fetch("/users/logout");

         console.log("User successfully logged out");
         // Redirect after logout
         const data = await res.json();
         console.log("data", data?.data);

         // navigate('/login');
      } catch (error) {
         console.log("Fetch error:", error);
      }
   };

   const onHandleAvatar = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setfilepercent(Math.round(progress));
         },
         (error) => {
            seterror(true);
            console.log("error", error);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
               setFormData({ ...formData, avatar: downloadURL })
            );
         }
      );
   };
   /*
    * firbase add some rules
    * allow read;
    * allow write :if request.resource.size<2*1024*1024&& request.resource.contentType.matches('image/.*')
    */

   const onHandleShowUserListings = async () => {
      try {
         const res = await fetch(
            `/users/listings/${currentuser?.data?.user?._id}`
         );
         const data = await res.json();
         // console.log(data);
         setUserListings(data);
      } catch (error) {
         console.log("error occur at show listings", error);
      }
   };
   console.log("userListings",userListings)
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
            <input
               onChange={(e) => setavatarfile(() => e.target.files[0])}
               type="file"
               ref={fileref}
               hidden
               accept="image/*"
            />
            <img
               className="w-24 h-24 mb-3 rounded-full shadow-lg "
               onClick={() => fileref.current.click()}
               src={data?.data?.user?.avatar || formData?.avatar}
               alt="Bonnie image"
            />

            <p className="text-sm self-center">
               {error ? (
                  <span className="text-red-700">
                     Error Image upload (image must be less than 2 mb)
                  </span>
               ) : filePercent > 0 && filePercent < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
               ) : filePercent === 100 ? (
                  <span className="text-green-700">
                     Image successfully uploaded!
                  </span>
               ) : (
                  ""
               )}
            </p>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
               {data?.data.user.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
               {data?.data.user.email}
            </span>
            <div className="flex mt-4 md:mt-6">
               <button
                  onClick={onHandleSignOut}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               >
                  SignOut
               </button>
               <NavLink
                  to={"/updateprofile"}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
               >
                  Update Profile
               </NavLink>
            </div>
            <NavLink
               to={"/listing/create"}
               className="underline mt-4 hover:text-red-500 text-blue-700"
            >
               Create Listing
            </NavLink>



            <button
               onClick={onHandleShowUserListings}
               className="underline mt-4 hover:text-red-500 text-blue-700"
            >
               Show Listings
            </button>
            {userListings&&(
     <div className='flex flex-col gap-4'>
     <h1 className='text-center mt-7 text-2xl font-semibold'>
       Your Listings
     </h1>
     {userListings.data?.map((item) => (
      // console.log("item",item)
      
  
       <div
         key={item._id}
         className='border rounded-lg p-3 flex justify-between items-center gap-4'
       >
         <Link to={`/listing/${item._id}`}>
           <img
             src={item.image[0]}
             alt='listing cover'
             className='h-16 w-16 object-contain'
           />
         </Link>
         <Link
           className='text-slate-700 font-semibold  hover:underline truncate flex-1'
           to={`/listing/${item._id}`}
         >
           <p>{item.name}</p>
         </Link>

         <div className='flex flex-col item-center'>
           <button
             
             className='text-red-700 uppercase'
           >
             Delete
           </button>
           <Link to={`/update-listing/${item._id}`}>
             <button className='text-green-700 uppercase'>Edit</button>
           </Link>
         </div>
       </div>
     ))}
   </div>
            )}
         </div>
      </div>
   );
};
