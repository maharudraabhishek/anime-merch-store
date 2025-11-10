import React from 'react';

/**
 * The footer appears at the bottom of every page.  It contains a
 * copyright message and simple navigation links.  Additional links
 * could be added here (e.g. contact, privacy policy, GitHub repo).
 */
const Footer = () => {
  return (
    <footer className="bg-card text-foreground border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto py-6 text-center text-sm">
        <p>
          © {new Date().getFullYear()} AnimeMerch by Your Name. Built as a portfolio
          project.
        </p>
        <p>
          <a
            href="https://github.com/yourusername/anime-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            View source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;