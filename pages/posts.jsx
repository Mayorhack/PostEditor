import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";

const Posts = () => {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState({ description: "" });
  const route = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!posts.description) {
      toast.error("Description cannot be empty", {
        autoClose: 1500,
        position: "top-center",
      });
      return;
    }
    if (posts.description.length > 300) {
      toast.error("Toast must not be more than 300", {
        autoClose: 1500,
        position: "top-center",
      });
      return;
    }
    if (!posts.id) {
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...posts,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      toast.success("Post added successfully", {
        position: "top-center",
        autoClose: 1600,
      });
    } else {
      const docRef = doc(db, "posts", posts.id);
      await updateDoc(docRef, {
        description: posts.description,
        timestamp: serverTimestamp(),
      });
      toast.success("Post updated successfully", {
        position: "top-center",
        autoClose: 1600,
      });
    }

    setPosts({ description: "" });
    return Router.push("/");
  };
  const checkUser = async () => {
    if (!loading) return;
    if (!user) return Router.push("/auth/login");
  };

  useEffect(() => {
    checkUser();
    if (route.query.id) setPosts({ ...route.query });
  }, [user, loading]);

  return (
    <div className="my-20 max-w-md mx-auto p-12">
      <form onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold">
          {posts.id ? "Update " : "Create a new "} post
        </h1>
        <label htmlFor="description" className="mt-3 mb-2 block font-medium">
          Description
        </label>
        <textarea
          className="text-white w-full bg-gray-800 h-48 rounded-lg block p-2 outline-none"
          name="description"
          id=""
          value={posts.description}
          cols="30"
          rows="10"
          onChange={(e) =>
            setPosts((prev) => {
              return {
                ...prev,
                description: e.target.value,
              };
            })
          }
        ></textarea>
        <p
          className={`my-2 text-cyan-600 ${
            posts.description.length > 300 ? "text-red-600" : null
          } `}
        >
          {posts.description.length}/300
        </p>
        <button
          type="submit"
          className="w-full bg-cyan-500 py-2 rounded-lg text-white font-medium text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Posts;
