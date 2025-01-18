import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFail } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();    

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success == false) {
        dispatch(signInFail(data));
        return;
      }
      dispatch(signInSuccess(data));
      // Redirect to home page
      navigate("/");
      // Reset form
      setFormData({ email: "", password: "" });
    } catch (error) {
      dispatch(signInFail(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl mx-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              onChange={handleChange}
            />
            
           
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              value={formData.password}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              onChange={handleChange}
            />
            
          </div>

          <button
            type="button"
            // onClick={onForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Forgot password?
          </button>
          {error && (
              <p className="text-red-500 text-sm mt-1 flex justify-center items-center">{error.message || 'Something went wrong!'}</p>
            )}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {"Don't have an account?"}{" "}
            <Link to="/sign-up">
              <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                Sign Up
              </button>
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
