import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Scroller = () => {
  const targetRef = useRef();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });

  // Transformations based on scroll progress
  const rotateX = useTransform(scrollYProgress, [0, 1], [12.1159, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        rotateX,
        perspective: 1200,
        transformStyle: "preserve-3d",
        scale: 1,
      }}
      className=" w-full h-full flex justify-center items-center p-5"
    >
      <motion.div
        style={{
          rotateX,
          perspective: 1200,
          transformStyle: "preserve-3d",
          scale: 1,
        }}
        className="relative  p-5 border-2 border-black rounded-lg overflow-hidden w-[80%] h-[80vh]"
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
};

export default Scroller;
