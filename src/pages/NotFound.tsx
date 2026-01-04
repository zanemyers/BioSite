import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center">
        {/* Large 404 Text */}
        <h1 className="text-6xl font-bold text-foreground mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Oops! Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          We can't seem to find the page you're looking for.
        </p>

        <Link
            to="/"
            className="inline-block bg-foreground text-background font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Back to Homepage
        </Link>
      </section>
  );
};

export default NotFound;
