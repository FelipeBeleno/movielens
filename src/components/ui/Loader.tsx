import { motion } from "framer-motion";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50">
            <motion.div
                className="w-14 h-14 border-4 border-t-transparent border-blue-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                }}
            />
            <motion.p
                className="text-gray-300 text-sm tracking-wide mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Cargando...
            </motion.p>
        </div>
    );
};

export default Loader;
