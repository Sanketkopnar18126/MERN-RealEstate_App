import { useState } from "react";
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firbase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const CreateListing = () => {
   const [files, setfiles] = useState([]);
   // console.log(files)
   const [formData, setFormData] = useState({
      image: [],
      name: "",
      description: "",
      address: "",
      type: "rent",
      bedrooms: "1",
      bathrooms: "1",
      regularPrice: "50",
      discountPrice: "0",
      offer: false,
      parking: false,
      furnished: false,
   });
   const[error,seterror]=useState(false)

   const onHandleChange = (e) => {
      if (e.target.id == "rent" || e.target.id == "sale") {
         setFormData({ ...formData, type: e.target.id });
      }

      if (
         e.target.id == "parking" ||
         e.target.id == "furnished" ||
         e.target.id == "offer"
      ) {
         setFormData({ ...formData, [e.target.id]: e.target.checked });
      }

      if (
         e.target.id == "name" ||
         e.target.id == "description" ||
         e.target.id == "address" ||
         e.target.type == "number"
      ) {
         setFormData({ ...formData, [e.target.id]: e.target.value });
      }
   };
   const [imgUploadError, setimgUploadError] = useState(false);
   const [uploading, setUploading] = useState(false);
   const [loading, setloading] = useState(false);

   const {currentuser}=useSelector((state)=>state.userdata)
   // console.log("currentUser",currentuser)
   const navigate=useNavigate()
   const onUploadImg = () => {
      if (files.length > 0 && files.length + formData.image.length < 7) {
         setUploading(true);
         const store = [];
         for (let i = 0; i < files.length; i++) {
            store.push(storeImg(files[i]));
         }

         Promise.all(store)
            .then((url) => {
               setFormData({
                  ...formData,
                  image: formData.image.concat(url),
               });
               setimgUploadError(false);
               setUploading(false);
            })
            .catch((error) => {
               setimgUploadError(`img upload fail 2 mb max`);
               // console.log("error",error)
            });
      } else {
         setimgUploadError("upload max 7 img");
         setUploading(false);
      }
   };
   const storeImg = async (file) => {
      return new Promise((resolve, reject) => {
         const storage = getStorage(app);
         const fileName = new Date().getTime() + file.name;
         console.log("fileName", fileName);
         const storageRef = ref(storage, fileName);
         console.log("storageRef", storageRef);
         const uploadTask = uploadBytesResumable(storageRef, file);
         console.log("uploadTask", uploadTask);
         uploadTask.on(
            "state_changed",

            (snapshot) => {
               const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log(`upload ${progress}%done`);
            },
            (error) => {
               reject(error);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                  resolve(downloadUrl);
               });
            }
         );
      });
   };

   const onHandleDeleteImg = (index) => {
      setFormData({
         ...formData,
         image: formData.image.filter((_, i) => i !== index),
      });
   };

   const onHandleSubmit = async (e) => {
      e.preventDefault();
      try {
         if(formData.image.length<1){
           return seterror("You have to upload max 3 img")
         }
         setloading(true);
         const res = await fetch("/users/listing/create", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({...formData,userRef:currentuser?.data?.user?._id}),
         });
         console.log("formData", formData);
         console.log("res",res);

         // Check if the response status is in the range 200-299
         // if (!res.ok) {
         //    throw new Error(`HTTP error! Status: ${res.status}`);
         // }

         // Parse the response data
         const data = await res.json();
         console.log("data",data);
         setloading(false)
         navigate(`/listing/${data?.data?._id}`)
      } catch (error) {
         console.log("error", error);
         console.log("error at doctype")
         // seterror(error)
         setloading(false);
      }
   };

   return (
      <>
         <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
               Create a Listing
            </h1>
            <form
               onSubmit={onHandleSubmit}
               className="flex flex-col sm:flex-row gap-4"
            >
               <div className="flex flex-col gap-4 flex-1">
                  <input
                     type="text"
                     placeholder="Name"
                     className="border p-3 rounded-lg"
                     id="name"
                     maxLength="62"
                     minLength="10"
                     required
                     onChange={onHandleChange}
                     value={formData.name}
                  />
                  <textarea
                     type="text"
                     placeholder="Description"
                     className="border p-3 rounded-lg"
                     id="description"
                     required
                     onChange={onHandleChange}
                     value={formData.description}
                  />
                  <input
                     type="text"
                     placeholder="Address"
                     className="border p-3 rounded-lg"
                     id="address"
                     required
                     onChange={onHandleChange}
                     value={formData.address}
                  />
                  <div className="flex gap-6 flex-wrap">
                     <div className="flex gap-2">
                        <input
                           type="checkbox"
                           id="sale"
                           className="w-5"
                           onChange={onHandleChange}
                           checked={formData.type == "sale"}
                        />
                        <span>Sell</span>
                     </div>
                     <div className="flex gap-2">
                        <input
                           type="checkbox"
                           id="rent"
                           className="w-5"
                           onChange={onHandleChange}
                           checked={formData.type == "rent"}
                        />
                        <span>Rent</span>
                     </div>
                     <div className="flex gap-2">
                        <input
                           type="checkbox"
                           id="parking"
                           className="w-5"
                           onChange={onHandleChange}
                           checked={formData.parking}
                        />
                        <span>Parking spot</span>
                     </div>
                     <div className="flex gap-2">
                        <input
                           type="checkbox"
                           id="furnished"
                           className="w-5"
                           onChange={onHandleChange}
                           checked={formData.furnished}
                        />
                        <span>Furnished</span>
                     </div>
                     <div className="flex gap-2">
                        <input
                           type="checkbox"
                           id="offer"
                           className="w-5"
                           onChange={onHandleChange}
                           checked={formData.offer}
                        />
                        <span>Offer</span>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-6">
                     <div className="flex items-center gap-2">
                        <input
                           type="number"
                           id="bedrooms"
                           min="1"
                           max="10"
                           required
                           className="p-3 border border-gray-300 rounded-lg"
                           onChange={onHandleChange}
                           value={formData.bedrooms}
                        />
                        <p>Beds</p>
                     </div>
                     <div className="flex items-center gap-2">
                        <input
                           type="number"
                           id="bathrooms"
                           min="1"
                           max="10"
                           required
                           className="p-3 border border-gray-300 rounded-lg"
                           onChange={onHandleChange}
                           value={formData.bathrooms}
                        />
                        <p>Baths</p>
                     </div>
                     <div className="flex items-center gap-2">
                        <input
                           type="number"
                           id="regularPrice"
                           min="50"
                           max="10000000"
                           required
                           className="p-3 border border-gray-300 rounded-lg"
                           onChange={onHandleChange}
                           value={formData.regularPrice}
                        />
                        <div className="flex flex-col items-center">
                           <p>Regular price</p>

                           <span className="text-xs">($ / month)</span>
                        </div>
                     </div>

                  {formData.offer&&(
                        <div className="flex items-center gap-2">
                        <input
                           type="number"
                           id="discountPrice"
                           min="0"
                           max="10000000"
                           required
                           className="p-3 border border-gray-300 rounded-lg"
                           onChange={onHandleChange}
                           value={formData.discountPrice}
                        />
                        <div className="flex flex-col items-center">
                           <p>Discounted price</p>

                           <span className="text-xs">($ / month)</span>
                        </div>
                     </div>
                  )}
                  </div>
               </div>
               <div className="flex flex-col flex-1 gap-4">
                  <p className="font-semibold">
                     Images:
                     <span className="font-normal text-gray-600 ml-2">
                        The first image will be the cover (max 6)
                     </span>
                  </p>
                  <div className="flex gap-4">
                     <input
                        className="p-3 border border-gray-300 rounded w-full"
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={(e) => setfiles(e.target.files)}
                     />
                     <button
                        type="button"
                        onClick={onUploadImg}
                        className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                     >
                        {uploading ? "uploading...." : "upload"}
                     </button>
                  </div>
                  <p className="text-red-700 text-sm">
                     {imgUploadError && imgUploadError}
                  </p>

                  {formData.image.length > 0 &&
                     formData.image.map((itms, index) => (
                        <div
                           key={index}
                           className="flex justify-between p-3 border items-center"
                        >
                           <img
                              src={itms}
                              alt="listing image"
                              className="w-20 h-20 object-contain rounded-lg"
                           />
                           <button
                              type="button"
                              onClick={() => onHandleDeleteImg(index)}
                              className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                           >
                              Delete
                           </button>
                        </div>
                     ))}
                  <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                     {loading ? "Creating....." : "Create Listing"}
                  </button>
                  {error && <p className='text-red-700 text-sm'>{error}</p>}
               </div>
            </form>
         </main>
      </>
   );
};
