import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-gray-800 p-4 text-white fixed w-full top-0 z-10 sticky shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h2 className="text-xl font-bold text-blue-400">New World League</h2>
                <div className="hidden md:flex space-x-4">
                    <NavLink
                        to="/wars"
                        className={({ isActive }) =>
                            isActive
                                ? 'px-3 py-2 bg-gray-700 rounded'
                                : 'px-3 py-2 hover:bg-gray-600 rounded'
                        }
                    >
                        Wars
                    </NavLink>
                    <NavLink
                        to="/companies"
                        className={({ isActive }) =>
                            isActive
                                ? 'px-3 py-2 bg-gray-700 rounded'
                                : 'px-3 py-2 hover:bg-gray-600 rounded'
                        }
                    >
                        Companies
                    </NavLink>
                    <NavLink
                        to="/players"
                        className={({ isActive }) =>
                            isActive
                                ? 'px-3 py-2 bg-gray-700 rounded'
                                : 'px-3 py-2 hover:bg-gray-600 rounded'
                        }
                    >
                        Player Stats
                    </NavLink>
                </div>
                {/* Mobile Menu Button */}
                <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
            {/* Mobile Menu */}
            <div className={`md:hidden bg-gray-800 p-4 ${isOpen ? 'block' : 'hidden'}`}>
                <NavLink
                    to="/wars"
                    className={({ isActive }) =>
                        isActive ? 'block px-3 py-2 bg-gray-700 rounded mb-2' : 'block px-3 py-2 rounded mb-2 hover:bg-gray-600'
                    }
                    onClick={toggleMenu}
                >
                    Wars
                </NavLink>
                <NavLink
                    to="/companies"
                    className={({ isActive }) =>
                        isActive ? 'block px-3 py-2 bg-gray-700 rounded mb-2' : 'block px-3 py-2 rounded mb-2 hover:bg-gray-600'
                    }
                    onClick={toggleMenu}
                >
                    Companies
                </NavLink>
                <NavLink
                    to="/players"
                    className={({ isActive }) =>
                        isActive ? 'block px-3 py-2 bg-gray-700 rounded mb-2' : 'block px-3 py-2 rounded mb-2 hover:bg-gray-600'
                    }
                    onClick={toggleMenu}
                >
                    Player Stats
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
