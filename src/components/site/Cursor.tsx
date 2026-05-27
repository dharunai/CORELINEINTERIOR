import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Small dot (instant) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-accent hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: mousePosition.x === -100 ? 0 : (isHovering ? 0 : 1),
        }}
        transition={{ type: "tween", duration: 0 }}
      />
      
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-accent/60 hidden md:block"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: mousePosition.x === -100 ? 0 : 1,
          backgroundColor: isHovering ? "rgba(200, 155, 94, 0.1)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  );
}
