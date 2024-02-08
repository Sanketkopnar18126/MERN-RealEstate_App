import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector } from 'react-redux';
import {
   FaBath,
   FaBed,
   FaChair,
   FaMapMarkedAlt,
   FaMapMarkerAlt,
   FaParking,
   FaShare,
} from "react-icons/fa";
import { Contact } from "../Contact/Contact";
export const ListingPage = () => {
   SwiperCore.use([Navigation]);
   const [listing, setlisting] = useState(null);
   const [loading, setloading] = useState(false);
   const [copied, setCopied] = useState(false);
   const [contact, setContact] = useState(false);
   const params = useParams();
   const {currentuser}=useSelector((state)=>state.userdata)
  //  console.log("currentUser",currentuser)
   useEffect(() => {
      const fetchingData = async () => {
         try {
            setloading(true);
            const res = await fetch(`/users/listing/get-listing/${params.id}`);
            const data = await res.json();
            // console.log("datain Listing",data)
            setlisting(data);
            setloading(false);
         } catch (error) {
            console.log("error at show listing in ui", error);
            setloading(false);
         }
      };
      fetchingData();
   }, [params.id]);
   console.log("listing", listing);
   return (
      <>
         {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
         {/* <div>Hi</div>
         <div>{listing?.data?.name}</div> */}
         {listing && (
            <Swiper navigation>
               {listing?.data?.image.map((items) => (
                  <SwiperSlide key={items}>
                     <div
                        className="h-[550px] "
                        style={{
                           background: `url(${items}) center no-repeat `,
                           backgroundSize: "cover",
                        }}
                     ></div>
                  </SwiperSlide>
               ))}
            </Swiper>
         )}

         <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
               className="text-slate-500"
               onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                     setCopied(false);
                  }, 2000);
               }}
            />
         </div>
         {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
               Link copied!
            </p>
         )}

         <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
               {listing?.data?.name}-{" "}
               {listing?.data?.offer
                  ? listing?.data?.discountedPrice?.toLocaleString("en-US")
                  : listing?.data?.regularPrice?.toLocaleString("en-US")}
               {listing?.data?.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
               <FaMapMarkerAlt className="text-green-700" />
               {listing?.data?.address}
            </p>
            <div className="flex gap-4">
               <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing?.data?.type === "rent" ? "For Rent" : "For Sale"}
               </p>
               {listing?.data?.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                     $
                     {+listing?.data?.regularPrice ||
                        0 - +listing?.data?.discountedPrice ||
                        0}{" "}
                     OFF
                  </p>
               )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing?.data?.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing?.data?.bedrooms > 1
                  ? `${listing?.data?.bedrooms} beds `
                  : `${listing?.data?.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing?.data?.bathrooms > 1
                  ? `${listing?.data?.bathrooms} baths `
                  : `${listing?.data?.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing?.data?.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing?.data?.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            
            {/* {currentuser && listing?.data?.userRef !== currentuser?.data?.user?._id&&!contact &&( */}
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>

            {/* )} */}
         {contact && <Contact listing={listing}/>}
         </div>
      </>
   );
};
