import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
export const ListingPage = () => {
   SwiperCore.use([Navigation]);
   const [listing, setlisting] = useState(null);
   const [loading, setloading] = useState(false);
   const params = useParams();
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
      </>
   );
};
