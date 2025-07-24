import React from 'react';
import { VideoThumbnail } from '@/utils/videoThumbnails';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ThumbnailSelectorProps {
  thumbnails: VideoThumbnail[];
  selectedThumbnail: VideoThumbnail | null;
  onSelect: (thumbnail: VideoThumbnail) => void;
  onConfirm: () => void;
}

const ThumbnailSelector: React.FC<ThumbnailSelectorProps> = ({
  thumbnails,
  selectedThumbnail,
  onSelect,
  onConfirm
}) => {
  if (thumbnails.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No thumbnails captured yet. Start recording to capture thumbnails automatically.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Video Thumbnail</h3>
      <p className="text-sm text-muted-foreground">
        Choose the thumbnail that will appear in the email
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {thumbnails.map((thumbnail) => (
          <Card
            key={thumbnail.id}
            className={`relative cursor-pointer transition-all ${
              selectedThumbnail?.id === thumbnail.id
                ? 'ring-2 ring-primary ring-offset-2'
                : 'hover:ring-1 hover:ring-primary/50'
            }`}
            onClick={() => onSelect(thumbnail)}
          >
            <div className="relative">
              <img
                src={thumbnail.dataUrl}
                alt={`Thumbnail ${thumbnail.id}`}
                className="w-full h-auto rounded-md"
              />
              
              {selectedThumbnail?.id === thumbnail.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-3">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedThumbnail && (
        <div className="flex justify-end">
          <Button onClick={onConfirm}>
            Use Selected Thumbnail
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailSelector;