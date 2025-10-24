/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, AlertCircle } from "lucide-react";
import { useState } from "react";

interface VideoSubmissionFormProps {
  onAddVideo: (url: string) => void;
}

export function VideoSubmissionForm({ onAddVideo }: VideoSubmissionFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{
    extractedId: string;
    title: string;
    thumbnail: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const YT_Regex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&].*)?$/;

  const extractVideoId = (youtubeUrl: string): string | null => {
    const match = youtubeUrl.match(YT_Regex);
    return match ? match[1] : null;
  };

  const handlePreview = async () => {
    setError("");
    setPreview(null);

    const videoId = extractVideoId(url.trim());
    if (!videoId) {
      setError("Invalid YouTube URL or video ID");
      return;
    }

    setLoading(true);
    try {
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      const title = `Video ${videoId.substring(0, 5)}`;

      setPreview({
        extractedId: videoId,
        title,
        thumbnail,
      });
    } catch (err) {
      setError("Failed to load video preview");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (preview) {
      onAddVideo(url.trim());
      setUrl("");
      setPreview(null);
    }
  };

  return (
    <Card className="p-6 border-border/50">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Add Video to Queue
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {/* URL Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Paste YouTube URL or video ID..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            onKeyPress={(e) => e.key === "Enter" && handlePreview()}
            className="flex-1 text-sm"
          />
          <Button
            onClick={handlePreview}
            disabled={!url.trim() || loading}
            className="gap-2 w-full sm:w-auto"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Preview</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-2 sm:p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Video Preview */}
        {preview && (
          <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border/50">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <img
                src={preview.thumbnail || "/placeholder.svg"}
                alt={preview.title}
                className="h-24 sm:h-20 w-full sm:w-32 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">
                  {preview.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Video ID: {preview.extractedId}
                </p>
              </div>
            </div>
            <Button onClick={handleSubmit} className="w-full gap-2 text-sm">
              <Plus className="h-4 w-4" />
              Add to Queue
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
