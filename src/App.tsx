import axios from "axios";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  password: string;
}

function App() {
  const { register, handleSubmit } = useForm<FormData>();

  const signUp = async (data: FormData) => {
    console.log("signUp");
    const response = await axios.post(
      "https://hono-prisma-turso-1.vercel.app/",
      {
        name: data.name,
        email: data.email,
        password: data.password,
      }
    );
    console.log(response.data);
  };

  return (
    <div>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(signUp)}>
          <label htmlFor="name">Name:</label>
          <input {...register("name")} type="text" name="name" id="name" />
          <br />
          <label htmlFor="email">Email:</label>
          <input {...register("email")} type="text" name="email" id="email" />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            {...register("password")}
            type="password"
            name="password"
            id="password"
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default App;
