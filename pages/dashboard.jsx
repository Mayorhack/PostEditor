import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Message from "../components/Message";
import { auth, db } from "../utils/firebase";
import { BsTrash2Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";

const Dashboard = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    else {
      const collectionRef = collection(db, "posts");
      const q = query(collectionRef, where("user", "==", user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return unsubscribe;
    }
  };
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    toast.success("Posts deleted successfully", {
      position: "top-center",
      autoClose: 500,
    });
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <p>Your Posts</p>
      {posts.map((post) => {
        return (
          <Message key={post.id} {...post}>
            <div className="flex gap-4 items-center ">
              <button
                onClick={() => deletePost(post.id)}
                className="flex gap-2 items-center text-pink-600"
              >
                <BsTrash2Fill /> Delete
              </button>
              <Link href={{ pathname: "/posts", query: post }}>
                <button className="flex gap-2 items-center text-teal-600">
                  <FaEdit /> Edit
                </button>
              </Link>
            </div>
          </Message>
        );
      })}
      <button className="" onClick={() => auth.signOut()}>
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
