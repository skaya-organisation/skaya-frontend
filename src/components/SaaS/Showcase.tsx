import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EyeIcon from '@mui/icons-material/Visibility';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import PreviewModal from './PreviewModal';
import SectionHeader from './shared/SectionHeader';
import Scales from '../ui/Scales';

interface ShowcaseProps {
  darkMode?: boolean;
}

const projects = [
  {
    id: 1,
    title: 'AI Content Generator',
    category: 'AI Tool',
    description: 'Intelligent content creation platform powered by advanced AI models',
    image: 'https://images.unsplash.com/photo-1677442d019cecf8d5a594b4e1d0b5c5?w=600&h=400&fit=crop',
    url: '#',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 2,
    title: 'Daandi Kaanthi',
    category: 'Travel & Tours',
    description: 'Himalayan trekking, cultural tours, and adventure experiences across India and Nepal',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    url: 'https://d3lmku1w7sc1t1.cloudfront.net',
    color: 'from-green-600 to-emerald-600',
  },
  {
    id: 3,
    title: 'Dream Day Events',
    category: 'Event Design',
    description: 'Professional event decor and celebration design creating unforgettable moments',
    image: 'https://d2fjlprsic5zwu.cloudfront.net/',
    url: 'https://d2fjlprsic5zwu.cloudfront.net/',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 4,
    title: 'Enterprise Dashboard',
    category: 'Web App',
    description: 'Comprehensive business intelligence and reporting dashboard',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=600&h=400&fit=crop',
    url: '#',
    color: 'from-orange-600 to-red-600',
  },
];

export default function Showcase({ darkMode = true }: ShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleProjectSelect = useCallback((project: typeof projects[0]) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
    }),
    []
  );

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          number="05-SHOWCASE"
          title="Featured projects"
          description="Explore some of our recent work across AI, SaaS, and enterprise applications"
          darkMode={darkMode}
          className="mb-12"
        />


        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group h-full"
            >
              <div className="absolute left-0 right-0  h-8 lg:flex items-start justify-center group/scales-top">
                <div className="w-full h-full pointer-events-auto">
                  <Scales size={6} darkMode={darkMode} orientation="diagonal" />
                </div>
              </div>
              <div
                className={`relative h-full rounded-lg border overflow-hidden transition-all duration-300 ${darkMode
                  ? 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-4 left-4"
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold backdrop-blur-md ${darkMode
                        ? 'bg-slate-900/80 text-slate-300 border border-slate-700'
                        : 'bg-white/80 text-slate-700 border border-slate-300'
                        }`}
                    >
                      {project.category}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.15 }}
                    className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'
                      }`}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.2 }}
                    className={`text-sm mb-6 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                  >
                    {project.description}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.25 }}
                    className="flex gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleProjectSelect(project)}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 border ${darkMode
                        ? 'bg-slate-900/50 hover:bg-slate-900/70 text-white border-slate-700 hover:border-slate-600'
                        : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 hover:border-slate-400'
                        }`}
                    >
                      <EyeIcon className="w-4 h-4" />
                      Preview
                    </motion.button>
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 border bg-gradient-to-r ${project.color} text-white`}
                    >
                      <OpenInNewIcon className="w-4 h-4" />
                      Live
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-lg font-semibold transition-all border ${darkMode
              ? 'bg-slate-900/30 hover:bg-slate-900/50 text-white border-slate-800 hover:border-slate-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300 hover:border-slate-400'
              }`}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        title={selectedProject?.title || ''}
        description={selectedProject?.description}
        previewUrl={selectedProject?.image}
        darkMode={darkMode}
      />
    </section>
  );
}
