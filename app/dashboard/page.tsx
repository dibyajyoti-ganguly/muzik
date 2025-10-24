/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Music } from "lucide-react";
import { VideoPlayer } from "@/components/dashboard/video-player";
import { VideoSubmissionForm } from "@/components/dashboard/Form";
import { QueueList } from "@/components/dashboard/queue-list";
import Redirect from "@/components/Redirect";
import Navbar from "@/components/Navbar";

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

export default function Dashboard() {
  Redirect();

  const [queue, setQueue] = useState<Stream[]>([]);
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [userUpvotes, setUserUpvotes] = useState<Set<string>>(new Set());
  const creatorId = "bc9e321a-bb8e-4b18-be17-08d0030d6d4d";

  const fetchUserUpvotes = async (streams: Stream[]) => {
    try {
      const response = await fetch("/api/user/upvotes");
      if (response.ok) {
        const upvotedStreamIds = await response.json();
        setUserUpvotes(new Set(upvotedStreamIds));
      }
    } catch (error) {
      console.error("[v0] Error fetching user upvotes:", error);
    }
  };

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await fetch(`/api/streams?creatorId=${creatorId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setQueue(data);
          await fetchUserUpvotes(data);
          if (data.length > 0) {
            setCurrentVideoId(data[0].extractedId);
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching streams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
  }, [creatorId]);

  const handleAddVideo = async (url: string) => {
    try {
      const response = await fetch("/api/streams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId,
          url,
        }),
      });

      if (response.ok) {
        // Refetch streams after adding
        const streamsResponse = await fetch(
          `/api/streams?creatorId=${creatorId}`
        );
        const updatedStreams = await streamsResponse.json();
        setQueue(updatedStreams);
      }
    } catch (error) {
      console.error("[v0] Error adding video:", error);
    }
  };

  const handleVoteChange = async () => {
    try {
      const streamsResponse = await fetch(
        `/api/streams?creatorId=${creatorId}`
      );
      const updatedStreams = await streamsResponse.json();
      setQueue(updatedStreams);
      await fetchUserUpvotes(updatedStreams);
    } catch (error) {
      console.error("[v0] Error refreshing after vote:", error);
    }
  };

  const handlePlayNext = (extractedId: string) => {
    setCurrentVideoId(extractedId);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <Music className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading streams...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Left Column - Video Player and Submission */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden border-border/50">
              <div className="aspect-video bg-black w-full">
                <VideoPlayer videoId={currentVideoId} />
              </div>
            </Card>

            {/* Video Submission Form */}
            <VideoSubmissionForm onAddVideo={handleAddVideo} />
          </div>

          {/* Right Column - Queue */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                Queue
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {queue.length} video{queue.length !== 1 ? "s" : ""} waiting
              </p>
            </div>
            <QueueList
              queue={queue}
              userUpvotes={userUpvotes}
              onPlayNext={handlePlayNext}
              onVoteChange={handleVoteChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
