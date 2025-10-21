import { useState } from 'react';
import { User, ChevronDown } from 'lucide-react'; // Make sure you have `lucide-react` installed
import { Link } from 'react-router-dom'; // Using Link for client-side navigation
import {clearSession, getUserName} from "../util/LocalStorageUtil.js";

// Pass an `onLogout` function as a prop to handle the logout logic
export default function Profile() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const userName = getUserName();
    const onLogout = () => {
        clearSession();
        // Clear user session data from localStorage
        // localStorage.removeItem('sessionId');
        // localStorage.removeItem('userName');
        // Optionally, you can redirect the user to the login page
        // window.location.href = '/consumer/login';
    }
    // If the user is logged in (userName exists)
    if (userName) {
        return (
            <div className="relative">
                {/* Button to toggle the dropdown */}
                <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium hidden sm:block">
            {userName}
          </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                        onMouseLeave={() => setDropdownOpen(false)} // Optional: close on mouse leave
                    >
                        <button
                            onClick={onLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                        {/* You can add other links like "My Account" here */}
                    </div>
                )}
            </div>
        );
    }

    // If the user is not logged in
    return (
        <Link
            to="/consumer/login"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Login
        </Link>
    );
}