/**
 * CTA Section Component
 * Final call-to-action before footer
 */

import { motion } from 'framer-motion';
import './CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section section section-dark">
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Ready to Transform Your Workflow?</h2>
          <p>Join 500+ enterprises already building with Magic.</p>
          <div className="cta-actions">
            <button className="btn btn-primary btn-lg">
              Start Free Trial
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#" className="cta-link">Schedule a Demo →</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;