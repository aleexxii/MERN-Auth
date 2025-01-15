import { Link } from "react-router-dom";

const SignUp = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl mx-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        <p className="mt-2 text-gray-600">Sign up to get started</p>
      </div>
      
      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200"
        >
          Create Account
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to='/sign-in'>
            <span className="text-blue-500 hover:underline cursor-pointer">
            Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  </div>
  );
};

export default SignUp;
