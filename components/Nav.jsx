import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const Nav = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-6">
      <Link href={"/"}>
        <button className="text-lg font-medium">Creative Thoughts</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user ? (
          <Link href={"/auth/login"}>
            <li className="py-2 px-4 text-white bg-cyan-500 rounded-lg ml-8">
              Join Now
            </li>
          </Link>
        ) : (
          <div className="flex items-center gap-6">
            <Link
              href={"/posts"}
              className="bg-cyan-500 text-white py-2 px-4 font-medium rounded-lg"
            >
              Post
            </Link>
            <Link href={"/dashboard"}>
              <img
                src={user.photoURL}
                alt="user_image"
                className="w-12 rounded-full "
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
