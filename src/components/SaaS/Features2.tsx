import { motion } from 'framer-motion';
import { SectionHeader } from './shared/SectionHeader';

interface Features2Props {
  darkMode?: boolean;
}

const features = [
  { icon: '🤖', text: 'Custom AI & ML Solutions', desc: 'Tailored AI tools and GPT integrations' },
  { icon: '📈', text: 'Scalable SaaS Architecture', desc: 'Multi-tenant platforms that grow with you' },
  { icon: '💻', text: 'Full-Stack Development', desc: 'End-to-end web application solutions' },
  { icon: '☁️', text: 'Cloud Infrastructure', desc: 'AWS, GCP, and Azure expertise' },
  { icon: '📊', text: 'Real-time Analytics', desc: 'Data-driven insights and dashboards' },
  { icon: '🔒', text: 'Security & Compliance', desc: 'Enterprise-grade security standards' },
  { icon: '⚙️', text: 'DevOps & CI/CD', desc: 'Automated deployment pipelines' },
  { icon: '🛡️', text: '24/7 Support & Maintenance', desc: 'Round-the-clock monitoring and support' },
];

export default function Features2({ darkMode = true }: Features2Props) {
  const borderColor = darkMode ? 'border-slate-800' : 'border-slate-200';
  const hoverBorderColor = darkMode ? 'hover:border-blue-600/50' : 'hover:border-blue-400';
  const hoverBgColor = darkMode ? 'hover:bg-slate-900/80' : 'hover:bg-blue-50';
  const bgColor = darkMode ? 'bg-slate-900/30' : 'bg-slate-50/50';
  const textColor = darkMode ? 'text-white' : 'text-slate-900';
  const mutedColor = darkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <section
      className={`relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 `}
    >

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader
          number="06"
          title="Complete toolkit"
          description="Comprehensive tools and expertise for your digital transformation"
          darkMode={darkMode}
          className="mb-16"
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              viewport={{ once: true, amount: 0.3 }}
              className={`relative h-full p-6 rounded-xl border border-solid transition-all duration-300 overflow-hidden group ${bgColor} ${borderColor} ${hoverBorderColor} ${hoverBgColor}`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-600/5 to-purple-600/5' 
                  : 'bg-gradient-to-br from-blue-400/5 to-purple-400/5'
              }`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div 
                  className="text-4xl mb-4 inline-block"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Text */}
                <h3 className={`font-bold text-base leading-tight mb-2 ${textColor}`}>
                  {feature.text}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${mutedColor}`}>
                  {feature.desc}
                </p>

                {/* Accent line */}
                <div className={`mt-4 h-1 w-8 rounded-full transition-all duration-300 group-hover:w-12 ${
                  darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
