// Create this component if it doesn't exist, e.g., in /src/components/Navbar.jsx
import { Link } from "react-router-dom";
import Profile from "./Profile";

export default function Navbar({ userName, setShowFilters }) {
    return (
        <nav className="bg-red-500 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            {/* Main container for centering and padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ✅ Flexbox container to align items horizontally */}
                <div className="flex justify-between items-center h-16" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px'}}>

                    {/* Logo on the left */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            E-Shop
                        </Link>
                    </div>

                    {/* ✅ Group of links on the right */}
                    <div className="flex items-center space-x-6" style={{display: 'flex', alignItems: 'center'}}>
                        <Profile userName={userName} />

                        <button
                            onClick={() => setShowFilters((prev) => !prev)}
                            className="text-gray-600 font-medium hover:text-indigo-600 transition"
                        >
                            Filters
                        </button>

                        <Link
                            to="/cart"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-sm"
                        >
                            Cart
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}