import { CheckSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background to-muted/20 mt-auto overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 pointer-events-none" />
      
      <div className="container relative mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-3 group">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <CheckSquare className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-lg text-foreground">TaskFlow</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs text-center md:text-left">
              Streamline your productivity with elegant task management
            </p>
          </div>
          
          {/* Copyright & Credits Section */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground/80">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <span className="text-xs text-muted-foreground">Made with</span>
              <span className="text-primary animate-pulse">♥</span>
              <span className="text-xs text-muted-foreground">by</span>
              <span className="font-bold text-sm bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CHINMAY NANDAWAT
              </span>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="flex gap-8">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 relative group"
            >
              Privacy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 relative group"
            >
              Terms
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;