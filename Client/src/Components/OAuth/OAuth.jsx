import { useDispatch } from "react-redux";
import { app } from "../../../firbase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { signInSucsess } from "../../Slice/user.slice";
export const OAuth = () => {
   const dispatch = useDispatch();
   const onClickGoogleSignIn = async () => {
      try {
         const provider = new GoogleAuthProvider();
         const auth = getAuth(app);
         const result = await signInWithPopup(auth, provider);
         console.log("result", result);
         const res = await fetch("/users/google", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               username: result.user.displayName,
               email: result.user.email,
               avatar: result.user.photoURL,
            }),
         });
         const data = await res.json();
         console.log("data",data)
         dispatch(signInSucsess(data));
      } catch (error) {
         console.log("errormmsg", error);
      }
   };
   return (
      <>
         <div className="flex items-center justify-center">
            <button
               onClick={onClickGoogleSignIn}
               type="button"
               className="text-white bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
            >
               Continue with google
            </button>
         </div>
      </>
   );
};
