import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../lib/auth";
// import { useEffect, useState } from "react";
// import { getSession } from "../lib/auth";

const Navbar = () => {
  const navigate = useNavigate();
  //   const [buttonDisable, setButtonDisable] = useState(false);

  //   useEffect(() => {
  //     (async () => {
  //       const { data } = await getSession();
  //       if (!data) {
  //         setButtonDisable(true);
  //         console.log(buttonDisable);
  //       }
  //     })();
  //   }, [buttonDisable]);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/");
        },
      },
    });
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-center gap-6 text-indigo-600 font-medium">
      <Link to="/">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/todos">Todos</Link>
      <Link to="/addtodo">Add Todo</Link>
      <button onClick={handleSignOut}>Sign Out</button>
    </nav>
  );
};

export default Navbar;
