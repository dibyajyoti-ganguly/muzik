import { Button } from "./ui/button";
import { Music, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
                Let Your Fans{" "}
                <span className="text-primary">Choose the Beat</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Stream with your community. Creators control the vibe, fans vote
                on the music. Real-time engagement that keeps your audience
                coming back.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 cursor-pointer">
                <Play className="h-5 w-5" />
                Start Streaming
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer">
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Active Creators</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2M+</p>
                <p className="text-sm text-muted-foreground">Fan Votes Daily</p>
              </div>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-4 w-full px-6">
                <div className="rounded-lg bg-card border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        Now Playing
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Voted by 1,234 fans
                      </p>
                    </div>
                    <Music className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-primary rounded-full" />
                    </div>
                    <p className="text-xs text-muted-foreground">2:34 / 4:12</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Next Up - Fan Votes
                  </p>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg bg-card/50 border border-border p-2"
                      >
                        <div className="h-8 w-8 rounded bg-primary/20" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            Song Title
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {234 - i * 50} votes
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
