import { useNavigate } from "react-router-dom";

export default function LoginSelection() {
  const navigate = useNavigate();

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
        {/* Navbar */}
        <nav className="bg-white shadow-md px-8 py-4 w-full flex justify-between items-center">
          <div
              className="text-2xl font-bold text-green-600 cursor-pointer"
              onClick={() => navigate("/")}
          >
            🛍️ ShopEase
          </div>
          <div className="space-x-6">
            <button
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-green-600"
            >
              Home
            </button>
            <button
                onClick={() => navigate("/signup")}
                className="text-gray-700 hover:text-green-600"
            >
              Signup
            </button>
          </div>
        </nav>

        {/* Login Selection */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome! Choose your login
          </h2>

          <div className="flex flex-col gap-4">
            <button
                onClick={() => navigate("/consumer_login")}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              Consumer Login
            </button>
            <button
                onClick={() => navigate("/merchant_login")}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              Merchant Login
            </button>
            <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Home
            </button>
            <button
                onClick={() => navigate("/signup")}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 transition-all"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
  );
}
