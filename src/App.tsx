// import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "./lib/auth";
import SignIn from "./components/SignIn";

const schema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const signUpData = async (data1: z.infer<typeof schema>) => {
    console.log("signUp");
    // const response = await axios.post(
    //   "https://hono-prisma-turso-1.vercel.app/",
    //   data
    // );
    console.log(data1);

    const { data, error } = await signUp.email({
      email: data1.email,
      name: data1.name,
      password: data1.password,
    });
    console.log("data=", data, "error=", error);
  };

  return (
    <div>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(signUpData)}>
          <label htmlFor="name">Name:</label>
          <input {...register("name")} type="text" name="name" id="name" />
          {errors.name && <p>{errors.name.message}</p>}
          <br />
          <label htmlFor="email">Email:</label>
          <input {...register("email")} type="text" name="email" id="email" />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <label htmlFor="password">Password:</label>
          {errors.password && <p>{errors.password.message}</p>}
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
      <hr />
      <SignIn />
    </div>
  );
}

export default App;
