import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              MovieLens
            </span>
          </Link>

          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`text-lg font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              Inicio
            </Link>

            <Link
              to="/populars"
              className={`text-lg font-medium transition-colors ${
                location.pathname === '/populars'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              Populares
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
