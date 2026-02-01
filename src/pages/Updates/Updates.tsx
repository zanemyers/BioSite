import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UpdateCard from '../../components/UpdateCard';
import { updates } from './updateEntries'

export default function Updates() {

  const categories = ['all', 'professional', 'personal', 'learning', 'travel'];
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredUpdates =
      selectedCategory === 'all'
          ? updates : updates.filter(update =>
              update.category.includes(selectedCategory)
          );


  return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">Life Updates</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A glimpse into my journey - professional milestones, personal adventures,
                learning experiences, and everything in between.
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-card text-foreground hover:bg-secondary border border-border'
                        }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
              </div>
            </div>

            {/* Updates Grid */}
            <div className="space-y-8">
              {filteredUpdates.map((update, index) => (
                  <UpdateCard
                      key={index}
                      title={update.title}
                      content={update.content}
                      date={update.date}
                      category={update.category}
                      image={update.image}
                  />
              ))}
            </div>

            {/* Empty State */}
            {filteredUpdates.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No updates found for this category.</p>
                </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
  );
}