import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-white bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150";

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-xl">Cars Client App</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/cars" end className={linkClasses}>
                  Car List
                </NavLink>
                
                <NavLink to="/cars/1" className={linkClasses}>
                  Car Details
                </NavLink>
                
                <NavLink to="/edit/1" className={linkClasses}>
                  Car Form
                </NavLink>
                
                <NavLink to="/not-found" className={linkClasses}>
                  Not Found
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;