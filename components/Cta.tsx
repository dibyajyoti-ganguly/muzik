import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="p-12 text-center border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Ready to Empower Your Community?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of creators who are building engaged communities
            through fan-powered music selection.
          </p>
          <Button size="lg" className="gap-2">
            Start Your Free Stream <ArrowRight className="h-5 w-5" />
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default Cta;
