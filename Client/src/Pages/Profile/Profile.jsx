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
import { NavLink } from "react-router-dom";

export const Profile = () => {
   const fileref = useRef(null);

   const [data, setdata] = useState();

   const { currentuser } = useSelector((state) => state.userdata);

   const [avatarFile, setavatarfile] = useState(undefined);

   const [filePercent, setfilepercent] = useState(0);

   const [error, seterror] = useState(false);

   const [formData, setFormData] = useState({});

   console.log("form", formData);

   // console.log("pro", currentuser);

   console.log(filePercent);
   useEffect(() => {
      setdata(currentuser);
      if (avatarFile) {
         onHandleAvatar(avatarFile);
      }
   }, [currentuser, avatarFile]);
   // console.log("da", data);

   console.log("file", avatarFile);

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
               {data?.data?.user?.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
               {data?.data?.user?.email}
            </span>
            <div className="flex mt-4 md:mt-6">
               <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               >
                  SignOut
               </a>
               <NavLink
                  to={'/updateprofile'}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
               >
                  Update Profile
               </NavLink>
            </div>
         </div>
      </div>
   );
};
