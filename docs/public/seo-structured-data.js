// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SKAYA',
  url: 'https://skaya.org',
  logo: 'https://skaya.org/logo.png',
  description: 'Leading software development company specializing in custom web development, mobile apps, AI/ML solutions, SaaS platforms, and Web3 blockchain development.',
  sameAs: [
    'https://twitter.com/skaya_org',
    'https://github.com/skaya-org',
    'https://discord.gg/skaya-org'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['English']
  }
};

// WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SKAYA',
  url: 'https://skaya.org',
  description: 'Leading software development company specializing in custom web development, mobile apps, AI/ML solutions, SaaS platforms, and Web3 blockchain development.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://skaya.org/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

// Professional Service Schema
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SKAYA Software Development',
  image: 'https://skaya.org/logo.png',
  '@id': 'https://skaya.org',
  url: 'https://skaya.org',
  priceRange: '$$',
  sameAs: [
    'https://twitter.com/skaya_org',
    'https://github.com/skaya-org'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150'
  }
};

// Service Offerings Schema
const serviceListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Service',
      name: 'Custom Web Development',
      description: 'Professional custom web application development services',
      provider: { '@type': 'Organization', name: 'SKAYA' }
    },
    {
      '@type': 'Service',
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile application development',
      provider: { '@type': 'Organization', name: 'SKAYA' }
    },
    {
      '@type': 'Service',
      name: 'AI & Machine Learning Solutions',
      description: 'Custom AI and ML solutions for business automation',
      provider: { '@type': 'Organization', name: 'SKAYA' }
    },
    {
      '@type': 'Service',
      name: 'SaaS Platform Development',
      description: 'Scalable SaaS platform development and deployment',
      provider: { '@type': 'Organization', name: 'SKAYA' }
    },
    {
      '@type': 'Service',
      name: 'Web3 & Blockchain Development',
      description: 'Decentralized application and blockchain solutions',
      provider: { '@type': 'Organization', name: 'SKAYA' }
    }
  ]
};

// Inject schemas into page
function injectStructuredData() {
  const schemas = [organizationSchema, websiteSchema, serviceSchema, serviceListSchema];
  
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStructuredData);
} else {
  injectStructuredData();
}
