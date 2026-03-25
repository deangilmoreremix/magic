/**
 * Integration Partners Component
 * Logo carousel showing partner integrations
 */

import './IntegrationPartners.css';

const partners = [
  { id: 'openai', name: 'OpenAI', logo: '⬡' },
  { id: 'anthropic', name: 'Anthropic', logo: '◇' },
  { id: 'google', name: 'Google', logo: '◉' },
  { id: 'microsoft', name: 'Microsoft', logo: '⬡' },
  { id: 'aws', name: 'AWS', logo: '◇' },
  { id: 'wecom', name: 'WeCom', logo: '◉' },
  { id: 'dingtalk', name: 'DingTalk', logo: '⬡' },
  { id: 'feishu', name: 'Feishu', logo: '◇' },
];

const IntegrationPartners = () => {
  return (
    <section className="integration-partners section">
      <div className="container">
        <div className="section-header">
          <h2>Seamless Integrations</h2>
          <p>Connect with the AI models and tools you already use</p>
        </div>

        <div className="partners-carousel">
          <div className="partners-track">
            {[...partners, ...partners].map((partner, index) => (
              <div key={`${partner.id}-${index}`} className="partner-logo">
                <span className="partner-icon">{partner.logo}</span>
                <span className="partner-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationPartners;