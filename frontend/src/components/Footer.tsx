export function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">TodoApp</h2>
              <p className="text-gray-400">
                The simplest way to organize your tasks and boost productivity.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
  
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">contact@todoapp.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">123 Main St, City</li>
              </ul>
            </div>
  
            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe for updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-900"
                />
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} TodoApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }