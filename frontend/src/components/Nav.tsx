export function Nav() {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              {/* Logo */}
              <div className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-900 text-lg">TodoApp</span>
              </div>
              {/* Primary Nav */}
              <div className="hidden md:flex items-center space-x-1">
                <a href="#" className="py-4 px-2 text-gray-900 font-semibold hover:text-blue-500 transition duration-300">Home</a>
                <a href="#" className="py-4 px-2 text-gray-900 font-semibold hover:text-blue-500 transition duration-300">About</a>
                <a href="#" className="py-4 px-2 text-gray-900 font-semibold hover:text-blue-500 transition duration-300">Contact</a>
              </div>
            </div>
            {/* Secondary Nav */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300">
                Sign In
              </button>
            </div>
            {/* Mobile button */}
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }