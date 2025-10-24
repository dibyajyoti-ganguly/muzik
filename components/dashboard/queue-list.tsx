/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Play } from "lucide-react";
import { useState } from "react";

interface Stream {
  id: string;
  extractedId: string;
  title: string;
  thumbnail: string;
  url: string;
  userId: string;
  type: string;
  _count?: {
    upvotes: number;
  };
}

interface QueueListProps {
  queue: Stream[];
  userUpvotes: Set<string>;
  onPlayNext: (extractedId: string) => void;
  onVoteChange: () => void;
}

export function QueueList({
  queue,
  userUpvotes,
  onPlayNext,
  onVoteChange,
}: QueueListProps) {
  const [votingId, setVotingId] = useState<string | null>(null);
  const sortedQueue = [...queue].sort(
    (a, b) => (b._count?.upvotes || 0) - (a._count?.upvotes || 0)
  );

  const handleVote = async (streamId: string, voteType: "up" | "down") => {
    setVotingId(streamId);
    try {
      const endpoint =
        voteType === "up" ? "/api/streams/upvotes" : "/api/streams/downvotes";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId }),
      });

      if (response.ok) {
        onVoteChange();
      }
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setVotingId(null);
    }
  };

  return (
    <div className="space-y-2">
      {sortedQueue.map((item, index) => (
        <Card
          key={item.id}
          className="p-2 sm:p-3 border-border/50 hover:border-primary/50 transition-colors group"
        >
          <div className="flex gap-2 sm:gap-3 items-start sm:items-center">
            {/* Rank Badge */}
            <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
              {index + 1}
            </div>

            {/* Thumbnail */}
            <img
              src={
                item.thumbnail ? JSON.parse(item.thumbnail) : "/placeholder.svg"
              }
              alt={item.title}
              className="h-12 w-16 sm:h-12 sm:w-20 rounded object-cover flex-shrink-0"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-xs sm:text-sm line-clamp-2">
                {item.title}
              </p>
            </div>

            {/* Vote Buttons - Stack on mobile */}
            <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
              <Button
                size="sm"
                variant={userUpvotes.has(item.id) ? "default" : "ghost"}
                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                onClick={() => handleVote(item.id, "up")}
                disabled={votingId === item.id}
              >
                <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                onClick={() => handleVote(item.id, "down")}
                disabled={votingId === item.id}
              >
                <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            {/* Play Button - Hidden on mobile, show on sm and up */}
            <Button
              size="sm"
              variant="outline"
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0 hidden sm:flex opacity-0 sm:opacity-100 group-hover:opacity-100 transition-opacity bg-transparent"
              onClick={() => onPlayNext(item.extractedId)}
            >
              <Play className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </Card>
      ))}

      {queue.length === 0 && (
        <Card className="p-6 sm:p-8 text-center border-border/50">
          <p className="text-sm sm:text-base text-muted-foreground">
            No videos in queue yet
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Add a video to get started
          </p>
        </Card>
      )}
    </div>
  );
}
