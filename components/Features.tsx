import { Users, Radio, Zap } from "lucide-react";
import { Card } from "./ui/card";

const Features = () => {
  return (
    <section
      id="features"
      className="px-4 py-20 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">
            Powerful Features for Creators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build an engaged community around your music.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Fan Voting",
              description:
                "Let your audience vote on the next track in real-time. Build deeper connections through interactive streaming.",
            },
            {
              icon: Radio,
              title: "Live Streaming",
              description:
                "Stream directly to your fans with crystal-clear audio. Monetize your streams and grow your fanbase.",
            },
            {
              icon: Zap,
              title: "Instant Analytics",
              description:
                "Track voting patterns, fan engagement, and trending songs. Make data-driven decisions for your streams.",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="p-6 border-border/50 hover:border-primary/50 transition-colors group"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
