import  { useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Navbar = () => {

    
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearch = () => {

    }


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

                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex items-center flex-1 max-w-md mx-8"
                    >
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar películas..."
                            className="w-full px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                        >
                            🔍
                        </button>
                    </form>

                    <div className="flex items-center space-x-4">
                        {
                            /*
                            <DarkModeToggle />
                            */
                        }
                    </div>


                    <form
                        onSubmit={handleSearch}
                        className="md:hidden mt-4 flex items-center"
                    >
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar películas..."
                            className="w-full px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                        >
                            🔍
                        </button>
                    </form>

                </div>
            </div>

        </motion.nav>
    )
}

export default Navbar