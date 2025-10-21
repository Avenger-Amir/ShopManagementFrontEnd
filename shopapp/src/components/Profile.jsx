// src/components/Profile.jsx
import { User } from "lucide-react"; // Make sure you have `lucide-react` installed

export default function Profile({ userName }) {
    return (
        <div className="inline-flex items-center space-x-2" style={{display: 'flex', alignItems: 'center'}}>
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800 font-medium">
                {userName || 'Guest'}
            </span>
        </div>
    );
}