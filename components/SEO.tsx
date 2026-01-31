
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
}

/**
 * SEO Component for dynamic head management.
 * Integrated with the Airtable/OpenAI engine metadata requirements.
 */
export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  type = 'website' 
}) => {
  const siteName = 'The Clarity Vault';
  const brandColor = '#db7f20'; // Brand accent color
  
  // Handling loading/fallback state as requested
  const displayTitle = title ? `${title} | ${siteName}` : `Loading... | ${siteName}`;
  const displayDescription = description || 'A premium directory and resource hub for marketing automation, AI tools, and growth performance curated for high-level strategists.';

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="theme-color" content={brandColor} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      
      {/* Canonical Link (Placeholder - would usually be dynamic) */}
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};
