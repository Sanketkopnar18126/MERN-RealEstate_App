import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
export const Contact = ({listing}) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
      setMessage(e.target.value);
    };
    console.log("listing in contact",listing.data.userRef)
    useEffect(()=>{
        const fetchUserDetails=async()=>{
            try {
                const res=await fetch(`/users/${listing?.data?.userRef}`)
                // console.log("resp user",res)
                const data=await res.json()
                // console.log("data from user",data )
                setLandlord(data)
            } catch (error) {
                console.log("error occur at get user information from ui: ",error)
            }
        }
        fetchUserDetails()
    },[listing?.data?.userRef])
    // console.log("lasndlord",landlord)
  return (
   <>
         {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord?.data?.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing?.data?.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          to={`mailto:${landlord?.data?.email}?subject=Regarding ${listing?.data?.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )} 
      {/* <div>contact</div> */}
   
   </>
  )
}
