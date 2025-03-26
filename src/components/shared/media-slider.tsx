"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MediaItem {
  type: "image" | "video";
  title: string;
  src: string;
  thumbnail?: string;
}

interface MediaSliderProps {
  items: MediaItem[];
  className?: string;
}

export function MediaSlider({ items, className }: MediaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleVideoClick = (item: MediaItem) => {
    if (item.type === "video") {
      setSelectedVideo(item);
      setShowVideoModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className={cn("relative", className)}>
      <div ref={sliderRef} className="flex overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-full"
              onClick={() => item.type === "video" && handleVideoClick(item)}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={
                    item.type === "video"
                      ? item.thumbnail || item.src
                      : item.src
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer group">
                    <div className="size-16 rounded-full bg-white/80 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="h-8 w-8 text-primary fill-primary" />
                    </div>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-background/80 backdrop-blur-sm z-10"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-background/80 backdrop-blur-sm z-10"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </>
      )}

      {/* Pagination dots */}
      {items.length > 1 && (
        <div className="flex justify-center gap-1 mt-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "size-2 rounded-full transition-colors",
                index === currentIndex
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="relative w-full max-w-4xl mx-4 overflow-hidden">
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-2 z-10 size-8 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="aspect-video w-full">
              <iframe
                src={selectedVideo.src}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
