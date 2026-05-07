import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            author
            jobTitle
            location
            email
            github
            linkedin
            keywords
          }
        }
      }
    `,
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    author,
    jobTitle,
    location,
    email,
    github,
    linkedin,
    keywords,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    keywords: keywords.join(', '),
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: author,
        url: siteUrl,
        image: seo.image,
        email: `mailto:${email}`,
        jobTitle,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ottawa',
          addressRegion: 'Ontario',
          addressCountry: 'CA',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Concordia University',
          sameAs: 'https://www.concordia.ca/',
        },
        sameAs: [linkedin, github],
        knowsAbout: [
          'Backend Engineering',
          'Distributed Systems',
          'Production AI Workflows',
          'LLM Agents',
          'Retrieval-Augmented Generation',
          'Identity and Access Management',
          'Observability',
          'Event-Driven Architecture',
          'Kubernetes',
          'Kafka',
          'Go',
          'Java',
          'Python',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Thales',
          sameAs: 'https://cpl.thalesgroup.com/',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: defaultTitle,
        description: defaultDescription,
        inLanguage: 'en-CA',
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${seo.url}#profile`,
        url: seo.url,
        name: seo.title,
        description: seo.description,
        inLanguage: 'en-CA',
        mainEntity: {
          '@id': `${siteUrl}/#person`,
        },
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
      },
    ],
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${defaultTitle}`}>
      <html lang="en" />
      <link rel="canonical" href={seo.url} />

      <meta name="description" content={seo.description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="image" content={seo.image} />
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content={location} />
      <meta name="ICBM" content="45.4215, -75.6972" />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_CA" />
      <meta property="profile:first_name" content="Varshap" />
      <meta property="profile:last_name" content="Walia" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
};
