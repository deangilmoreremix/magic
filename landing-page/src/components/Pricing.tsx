/**
 * Pricing Component
 * Three pricing tiers with center highlighted
 */

import { motion } from 'framer-motion';
import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small teams getting started',
    features: [
      '3 team members',
      '100 AI conversations/month',
      'Basic workflow templates',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$49',
    period: '/user/month',
    description: 'Best for growing teams with advanced needs',
    features: [
      'Unlimited team members',
      'Unlimited AI conversations',
      'Advanced workflows',
      'Custom integrations',
      'Priority support',
      'Analytics dashboard',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific requirements',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom AI model training',
      'On-premise deployment',
      'SLA guarantee',
      '24/7 phone support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="pricing section">
      <div className="container">
        <div className="section-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that fits your team's needs</p>
        </div>

        <div className="grid grid-3 pricing-grid">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`pricing-card card ${plan.popular ? 'pricing-card-popular' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && <span className="popular-badge">Most Popular</span>}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-amount">{plan.price}</span>
                {plan.period && <span className="price-period">{plan.period}</span>}
              </div>
              <p className="plan-description">{plan.description}</p>
              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="plan-feature">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-block`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;