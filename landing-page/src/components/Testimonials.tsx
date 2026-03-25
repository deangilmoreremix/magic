/**
 * Testimonials Component
 * Customer testimonials and social proof
 */

import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    quote: "Magic transformed how our team works with AI. We've automated 60% of our routine tasks and freed up time for strategic work.",
    author: "Sarah Chen",
    title: "CTO",
    company: "TechCorp",
    avatar: "https://i.pravatar.cc/80?img=1",
  },
  {
    id: 2,
    quote: "The visual workflow builder is incredibly intuitive. Our non-technical team can now create complex AI pipelines.",
    author: "Michael Park",
    title: "Product Lead",
    company: "Innovate Inc",
    avatar: "https://i.pravatar.cc/80?img=2",
  },
  {
    id: 3,
    quote: "Magic IM's knowledge base has become our company's brain. Everyone uses it to find information instantly.",
    author: "Emily Rodriguez",
    title: "Head of Operations",
    company: "ScaleUp",
    avatar: "https://i.pravatar.cc/80?img=3",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-header">
          <h2>Trusted by Industry Leaders</h2>
          <p>See what our customers have to say about Magic</p>
        </div>

        <div className="grid grid-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <blockquote className="testimonial-quote">
                "{testimonial.quote}"
              </blockquote>
              <div className="testimonial-author">
                <img src={testimonial.avatar} alt={testimonial.author} className="author-avatar" />
                <div className="author-info">
                  <span className="author-name">{testimonial.author}</span>
                  <span className="author-title">{testimonial.title} at {testimonial.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;