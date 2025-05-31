import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectData = [
  { id: 1, project: 'FABRIC', location: 'UNITED KINGDOM', category: 'DESIGN', year: '2023', image: '/img/1.jpg' },
  { id: 2, project: 'XVWR', location: 'HONGKONG', category: 'UI/UX', year: '2021', image: '/img/2.jpg' },
  { id: 3, project: 'HUNTERS', location: 'AMSTERDAM', category: 'DEV', year: '2018', image: '/img/3.jpg' },
  { id: 4, project: 'CREATE BASE', location: 'NEW ZEALAND', category: 'BRANDING', year: '2022', image: '/img/4.jpg' },
  { id: 5, project: 'REYNOTES', location: 'ICELAND', category: 'UI/UX', year: '2019', image: '/img/5.jpg' },
];

export default function ProjectTable() {
  const [activeImage, setActiveImage] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const tableRef = useRef(null);

  const handleMouseMove = (e) => {
    if (tableRef.current) {
      const rect = tableRef.current.getBoundingClientRect();
      // Calculate position relative to the table
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div className="relative w-full h-screen bg-neutral-200 flex items-center justify-center overflow-hidden">
      <div 
        ref={tableRef} 
        className="relative w-3/4 max-w-4xl"
        onMouseMove={handleMouseMove}
      >
        {/* Header Row */}
        <div className="grid grid-cols-4 border-b border-neutral-400 py-4 text-neutral-600 font-light">
          <div>PROJECT</div>
          <div>LOCATION</div>
          <div>CATEGORY</div>
          <div>YEAR</div>
        </div>
        
        {/* Project Rows */}
        {projectData.map((project) => (
          <motion.div
            key={project.id}
            className="grid grid-cols-4 border-b border-neutral-400 py-6 cursor-pointer"
            onMouseEnter={() => setActiveImage(project.id)}
            onMouseLeave={() => setActiveImage(null)}
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="font-normal">{project.project}</div>
            <div>{project.location}</div>
            <div>{project.category}</div>
            <div>{project.year}</div>
          </motion.div>
        ))}
        
        {/* Floating Image */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 100
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="w-48 h-48 bg-black rounded-md overflow-hidden">
                <img 
                  src={projectData.find(p => p.id === activeImage)?.image} 
                  alt="Project image" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}