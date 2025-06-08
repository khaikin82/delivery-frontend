// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-700">
          Order & Delivery System
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-blue-500">
            Login
          </Link>
          <Link to="/register" className="text-gray-600 hover:text-blue-500">
            Register
          </Link>
          <Link to="/admin" className="text-gray-600 hover:text-blue-500">
            Admin
          </Link>
          <Link to="/customer" className="text-gray-600 hover:text-blue-500">
            Customer
          </Link>
          <Link to="/delivery" className="text-gray-600 hover:text-blue-500">
            Delivery
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
