import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Music, ArrowRight } from "lucide-react";

const Navbar = () => {
  const session = useSession();
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Muzik</span>
          </div>
          <div className="hidden gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {session.data?.user && (
              <Button
                className="gap-2 cursor-pointer"
                onClick={() => signOut()}
              >
                Logout <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {!session.data?.user && (
              <Button className="gap-2 cursor-pointer" onClick={() => signIn()}>
                Sign In <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
