import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Fallback page for unknown routes.  Offers a link back to the home
 * page to help users recover from navigation errors.
 */
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 space-y-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-lg">The page you're looking for doesn't exist.</p>
      <Link to="/" className="underline text-primary">
        Return to home
      </Link>
    </div>
  );
};

export default NotFound;