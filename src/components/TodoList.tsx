import axios from "axios";
import { useEffect, useState } from "react";
import { getSession } from "../lib/auth";

import { useNavigate } from "react-router-dom";

export interface UserDataI {
  name: string;
  posts: Post[];
}

export interface Post {
  title: string;
  content: string;
  id: string;
}

const TodoList = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDataI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getTodoData = async () => {
    const { data, error } = await getSession();
    if (!data) {
      navigate("/");
    }

    try {
      const todoData = await axios.get(
        `${import.meta.env.VITE_URL}/posts/${data?.user.id}`
      );
      setUser(todoData.data);
    } catch (error1) {
      console.log(error1);
      console.log(error?.message);

      setError("Failed to load user data 😢");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTodoData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg text-gray-700 font-medium animate-pulse">
          Loading user data...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No user data found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col items-center">
      {/* User Info */}
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-md p-6 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          👋 Welcome, {user.name}
        </h2>
        <p className="text-gray-600">Here are your latest posts</p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {user.posts && user.posts.length > 0 ? (
          user.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200 p-5 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-3">{post.content}</p>
              <p className="text-xs text-gray-400">Post ID: {post.id}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No posts available.
          </p>
        )}
      </div>

      {/* Refresh button */}
      <div className="mt-10">
        <button
          onClick={getTodoData}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-all"
        >
          Refresh 🔄
        </button>
      </div>
    </div>
  );
};

export default TodoList;
