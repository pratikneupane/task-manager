import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormSubmit } from "../hooks/useForm";
import { loginSchema } from "../schemas/validation";
import { login } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { LoginCredentials } from "../types";
import axios from "axios";
import TextInput from "../components/TextInput";

export const Login = () => {
  const { login: setUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { register, onSubmit, errors, isLoading } = useFormSubmit<
    typeof loginSchema
  >(
    loginSchema,
    async (credentials: LoginCredentials) => {
      try {
        setError(null);
        const res = await login(credentials);
        setUser(res?.response.user);
        navigate("/");
        return res?.response;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          switch (err.response.status) {
            case 401:
              throw new Error("Invalid email or password");
            case 404:
              throw new Error("User not found");
            default:
              throw new Error("An error occurred during login");
          }
        }
        throw new Error("Network error occurred");
      }
    },
    {
      onError: (error: Error) => {
        setError(error.message);
      },
    }
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <TextInput
            id="email"
            label="Email address"
            type="email"
            placeholder="Email address"
            register={register}
            name="email"
            error={errors.email?.message}
            required
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            name="password"
            error={errors.password?.message}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 outline-none pl-2 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
        <div className="text-center pt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Create New Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
