import React from 'react';
import { Calendar } from 'lucide-react';

export interface UpdateCardProps {
  title: string;
  content: string;
  date: Date;
  category: string[];
  image?: string;
}

const UpdateCard: React.FC<UpdateCardProps> = ({
                                                 title,
                                                 content,
                                                 date,
                                                 category,
                                                 image
                                               }) => {
  const categoryColors = {
    personal: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    professional: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    travel: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    learning: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  };

  return (
      <article className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {image && (
            <div className="aspect-video overflow-hidden">
              <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover"
              />
            </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
              <div className="flex flex-wrap gap-2">
                  {category.map((cat) => {
                      const catColor = categoryColors[cat] || categoryColors.default;
                      return (
                          <span key={cat} className={`px-3 py-1 rounded-full text-sm font-medium ${catColor}`}>
                            {cat}
                          </span>
                      );
                  })}
              </div>

            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar size={16} className="mr-1" />
              {date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-card-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{content}</p>
        </div>
      </article>
  );
};

export default UpdateCard;