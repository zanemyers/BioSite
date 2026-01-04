import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UpdateCard from '../components/UpdateCard';

export default function Updates() {
  const updates = [
    {
      title: 'Job Search',
      content: (
          "I began exploring new opportunities in October, looking for the right role to pursue after our return from Uganda. " +
          "Over the past few months, I’ve had several interviews and remain hopeful for the right fit. That said, the online " +
          "application process has been challenging and, at times, disheartening. I’ve submitted close to 100 applications, " +
          "often receiving only automated confirmations. I’m grateful for the few responses I’ve received, even if they were " +
          "simply to indicate that the role had been filled or that other candidates were a better fit. And while I don’t " +
          "have a solution, it’s clear that there must be a more effective and human-centered way to connect talent " +
          "with opportunity."
      ),
      date: new Date('2026-01-3'),
      category: ['learning', 'professional'],
      image: '/update_images/job-hunt.jpg'
    },
    {
      title: 'Uganda',
      content: (
          "My wife and I lived in Uganda for much of 2025. She was completing her clinical fellowship in " +
          "Speech Pathology with Hope Speaks, while I worked with Rescue River—an organization that supports " +
          "women who have survived trafficking or abuse by providing employment, teaching life skills, and offering " +
          "discipleship.\n\nA few weeks before we left, we had the opportunity to visit a conservation center, where " +
          "we were able to interact with some of the animals, including the lion cub I’m holding above. We’ve been " +
          "back in the U.S. for about a month and a half now, and we’ve found ourselves missing the tropical climate " +
          "just a little 😅."
      ),
      date: new Date('2026-01-3'),
      category: ['personal', 'travel'],
      image: '/update_images/ug.jpeg'
    },
  ];

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