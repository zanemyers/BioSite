import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface UpdateCardProps {
  title: string;
  content: string;
  date: Date;
  category: string;
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
    personal: 'bg-green-100 text-green-800',
    professional: 'bg-blue-100 text-blue-800',
    travel: 'bg-purple-100 text-purple-800',
    learning: 'bg-orange-100 text-orange-800',
    default: 'bg-gray-100 text-gray-800'
  };

  const categoryColor = categoryColors[category as keyof typeof categoryColors] || categoryColors.default;

  return (
      <article className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {image && (
            <div className="aspect-video overflow-hidden">
              <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
              />
            </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
            {category}
          </span>
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar size={16} className="mr-1" />
              {format(date, 'MMM dd, yyyy')}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-card-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{content}</p>
        </div>
      </article>
  );
};

export default UpdateCard;