import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getSession } from "../lib/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const AddTodo = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Fetch session on mount
  useEffect(() => {
    (async () => {
      const { data, error } = await getSession();
      if (!data) {
        navigate("/");
      } else if (error) {
        console.error("Session error:", error);
      } else if (data?.user?.id) {
        setUserId(data.user.id);
      }
    })();
  }, [navigate]);

  const onSubmit = async (data1: z.infer<typeof schema>) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/post`, {
        title: data1.title,
        content: data1.content,
        userId,
      });

      console.log("Todo added:", response.data);
      reset(); // clear form
      alert("✅ Todo added successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("❌ Failed to add todo!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Add a New Todo
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              placeholder="Enter title"
              className={`border w-full p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              {...register("content")}
              id="content"
              rows={4}
              placeholder="Write your todo details..."
              className={`border w-full p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all disabled:opacity-70"
          >
            {isSubmitting ? "Adding..." : "Add Todo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
