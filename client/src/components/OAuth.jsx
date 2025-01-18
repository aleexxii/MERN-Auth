import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL,
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
        } catch (error) {
            console.error(error);
            
        }
    };

  return (
    <div className="bg-slate-200 font-semibold flex justify-center items-center rounded-lg p-3 uppercase hover:opacity-90"
      onClick={handleGoogleClick}>
      Continue with Google
    </div>
  );
};

export default OAuth;


// 8y9cdlpuw76z2csa