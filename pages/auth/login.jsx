import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    user ? route.push("/") : null;
  }, [user]);
  return (
    <div className="shadow-xl mt-32 rounded-lg p-10 text-gray-700">
      <h2 className="text-2xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          className="bg-gray-700 text-white p-4 rounded-lg w-full flex font-medium align-middle gap-2"
          onClick={GoogleLogin}
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
