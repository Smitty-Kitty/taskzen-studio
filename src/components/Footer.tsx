import { CheckSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">TaskFlow</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Made by <span className="font-semibold text-foreground">CHINMAY NANDAWAT</span>
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;