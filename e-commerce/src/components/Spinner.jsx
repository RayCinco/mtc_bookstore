import { motion } from "framer-motion";

function Spinner() {
  return (
    <motion.div
      className="flex items-center justify-center min-h-[400px] p-10 z-50 relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </motion.div>
  );
}

export default Spinner;
