import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-white bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150";

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

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
                {token && (
                  <>
                    <NavLink to="/cars" end className={linkClasses}>
                      Car List
                    </NavLink>
                    
                    <NavLink to="/edit/1" className={linkClasses}>
                      Car Form
                    </NavLink>
                  </>
                )}
                
                <NavLink to="/not-found" className={linkClasses}>
                  Not Found
                </NavLink>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-4 flex items-baseline space-x-4">
                
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 cursor-pointer"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink to="/login" end className={linkClasses}>
                      Login
                    </NavLink>
                    
                    <NavLink to="/register" className={linkClasses}>
                      Register
                    </NavLink>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;