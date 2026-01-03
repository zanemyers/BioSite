import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UpdateCard from '../components/UpdateCard';

export default function Updates() {
  const updates = [
    {
      title: 'Started Learning Machine Learning',
      content: 'Began my journey into machine learning and AI. Currently working through Andrew Ng\'s course and building my first neural network projects. Excited to explore how AI can enhance web applications!',
      date: new Date('2026-01-15'),
      category: 'learning',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop'
    },
    {
      title: 'Promoted to Senior Developer',
      content: 'Thrilled to announce my promotion to Senior Full Stack Developer! Looking forward to mentoring junior developers and leading more complex projects. Grateful for the trust and support from my team.',
      date: new Date('2026-01-10'),
      category: 'professional'
    },
    {
      title: 'Weekend Trip to Yosemite',
      content: 'Spent an amazing weekend hiking in Yosemite National Park. The views were absolutely breathtaking, and it was the perfect way to disconnect and recharge. Nature always provides the best inspiration for creativity.',
      date: new Date('2026-01-05'),
      category: 'travel',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
    },
    {
      title: 'Launched New Portfolio Website',
      content: 'Finally launched my redesigned portfolio website! Built with React, TypeScript, and Tailwind CSS. The new design better showcases my projects and includes a blog section for sharing my thoughts on development.',
      date: new Date('2025-12-28'),
      category: 'professional',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop'
    },
    {
      title: 'Completed React Advanced Patterns Course',
      content: 'Just finished an intensive course on advanced React patterns including compound components, render props, and custom hooks. Already applying these patterns in my current projects with great results.',
      date: new Date('2025-12-20'),
      category: 'learning'
    },
    {
      title: 'Adopted a Rescue Dog',
      content: 'Meet Luna, my new rescue dog! She\'s a 2-year-old Golden Retriever mix who loves long walks and playing fetch. Having a furry companion has already brought so much joy to my daily routine.',
      date: new Date('2025-12-15'),
      category: 'personal',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop'
    },
    {
      title: 'Speaking at Local Tech Meetup',
      content: 'Had the opportunity to speak about "Building Accessible React Components" at our local React meetup. Great turnout and fantastic questions from the audience. Love sharing knowledge with the community!',
      date: new Date('2025-12-10'),
      category: 'professional'
    },
    {
      title: 'Holiday Season Reflections',
      content: 'As the year comes to an end, I\'m reflecting on all the growth and experiences of 2025. Grateful for new friendships, professional achievements, and the continuous journey of learning. Excited for what 2026 will bring!',
      date: new Date('2025-12-05'),
      category: 'personal'
    }
  ];

  const categories = ['all', 'professional', 'personal', 'learning', 'travel'];
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredUpdates = selectedCategory === 'all'
      ? updates
      : updates.filter(update => update.category === selectedCategory);

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

            {/* Newsletter Signup */}
            <section className="mt-16">
              <div className="bg-card rounded-lg shadow-lg p-8 text-center">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Want to be notified when I share new updates? Subscribe to get the latest news
                  about my projects, travels, and learning journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  />
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
  );
}