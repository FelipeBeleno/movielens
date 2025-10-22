import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white text-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-6xl font-bold text-blue-500 mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops... la página que buscas no existe.
      </motion.p>

      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition"
      >
        Volver al inicio
      </Link>
    </motion.div>
  );
};

export default NotFound;
