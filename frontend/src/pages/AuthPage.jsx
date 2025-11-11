import React, { useState } from "react";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-5 sm:mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
        </h2>

        {/* Form */}
        <form className="space-y-3 sm:space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full px-4 py-2 border rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-indigo-700 transition-all duration-300 shadow-lg"
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-3 sm:my-4">
          <span className="text-gray-500 text-xs sm:text-sm">
            {isLogin ? "Don't have an account?" : "Already registered?"}
          </span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleMode}
          className="w-full py-2 border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold text-sm sm:text-base hover:bg-indigo-50 transition-all duration-300"
        >
          {isLogin ? "Create an Account" : "Login Instead"}
        </button>
      </motion.div>
    </div>
  );
};

export default AuthPage;
