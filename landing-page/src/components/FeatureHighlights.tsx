/**
 * Feature Highlights Component
 * Zigzag alternating layout showcasing product features
 */

import { motion } from 'framer-motion';
import './FeatureHighlights.css';

const features = [
  {
    id: 'autonomous-agents',
    title: 'AI That Thinks and Acts',
    description: 'Super Magic understands natural language instructions, breaks down complex tasks, and executes them autonomously with self-correction capabilities.',
    points: [
      'Natural language task understanding',
      'Autonomous planning and execution',
      'Self-correction and learning',
      'Multi-agent collaboration',
    ],
    image: '/landing-page/super-magic-feature.png',
    accent: '#FF6B4A',
  },
  {
    id: 'visual-workflow',
    title: 'Build Complex Workflows Visually',
    description: 'Magic Flow provides an intuitive drag-and-drop interface for creating sophisticated AI pipelines without writing a single line of code.',
    points: [
      'Drag-and-drop node interface',
      '50+ pre-built components',
      'Real-time debugging',
      'Version control and history',
    ],
    image: '/landing-page/magic-flow-feature.png',
    accent: '#2DD4BF',
  },
  {
    id: 'knowledge-hub',
    title: "Your Organization's AI Brain",
    description: 'Magic IM transforms your documents into an intelligent knowledge base that powers AI-assisted conversations and Q&A.',
    points: [
      'Document ingestion and indexing',
      'Semantic search across all knowledge',
      'AI-powered Q&A',
      'Team collaboration features',
    ],
    image: '/landing-page/magic-im-feature.png',
    accent: '#6366F1',
  },
];

const FeatureHighlights = () => {
  return (
    <section className="feature-highlights section">
      <div className="container">
        {features.map((feature, index) => (
          <motion.article
            key={feature.id}
            className={`feature-item ${index % 2 === 1 ? 'feature-item-reverse' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="feature-content">
              <h2 className="feature-title">{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-points">
                {feature.points.map((point, i) => (
                  <li key={i} className="feature-point">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10L8 13L15 6" stroke={feature.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="feature-image">
              <div className="feature-image-wrapper" style={{ '--accent': feature.accent } as React.CSSProperties}>
                <img src={feature.image} alt={feature.title} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default FeatureHighlights;