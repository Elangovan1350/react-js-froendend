import { Link, useNavigate } from "react-router-dom";
import { getSession, signOut } from "../lib/auth";
import { useSignOut } from "../store.ts/authStore";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { isSignOut, turnSignOut } = useSignOut();

  useEffect(() => {
    (async () => {
      const { data } = await getSession();
      if (!data) {
        turnSignOut();
      }
    })();
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
          turnSignOut();
        },
      },
    });
  };

  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-center gap-6">
      <Link
        to="/"
        className="hover:bg-indigo-700 px-3 py-1 rounded transition-colors"
      >
        Sign In
      </Link>
      <Link
        to="/signup"
        className="hover:bg-indigo-700 px-3 py-1 rounded transition-colors"
      >
        Sign Up
      </Link>
      <Link
        to="/todos"
        className="hover:bg-indigo-700 px-3 py-1 rounded transition-colors"
      >
        Todos
      </Link>
      <Link
        to="/addtodo"
        className="hover:bg-indigo-700 px-3 py-1 rounded transition-colors"
      >
        Add Todo
      </Link>

      <button
        onClick={handleSignOut}
        disabled={isSignOut}
        className={`hover:bg-red-600  ${
          isSignOut ? "bg-red-500/30" : "bg-red-500"
        }  px-3 py-1 rounded transition-colors disabled:opacity-60`}
      >
        {isSignOut ? "Sign out" : "Sign Out"}
      </button>
    </nav>
  );
};

export default Navbar;
