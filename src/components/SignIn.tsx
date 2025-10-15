import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "../lib/auth";

const schema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const signInData = async (data1: z.infer<typeof schema>) => {
    console.log(data1);
    // Call your sign-in function here
    const { data, error } = await signIn.email({
      email: data1.email,
      password: data1.password,
    });
    console.log("data=" + JSON.stringify(data));
    console.log("error=" + JSON.stringify(error));
  };
  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(signInData)}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
