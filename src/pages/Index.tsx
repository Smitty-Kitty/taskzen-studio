import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, ListTodo, Zap, Shield, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const features = [
    {
      icon: ListTodo,
      title: "Organize Everything",
      description: "Keep track of all your tasks with categories, priorities, and status updates.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create, update, and manage tasks in seconds with our intuitive interface.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-level security.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation isAuthenticated={!!user} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
          <div className="container relative mx-auto px-4 py-24 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary-foreground/10 rounded-full backdrop-blur-sm">
                <CheckSquare className="h-5 w-5" />
                <span className="text-sm font-medium">Production-Ready Task Management</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Organize Your Work,
                <br />
                Amplify Your Productivity
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
                A modern, full-stack task management solution with authentication,
                real-time updates, and beautiful design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
                  <Button variant="hero" size="lg" className="text-lg px-8">
                    {user ? "Go to Dashboard" : "Get Started Free"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Stay Productive
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built with modern technologies for a seamless, secure, and delightful experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto text-center bg-gradient-to-br from-card to-primary/5 border-2 border-primary/10">
              <CardHeader className="space-y-4 pb-8">
                <CardTitle className="text-3xl md:text-4xl font-bold">
                  Ready to Get Started?
                </CardTitle>
                <CardDescription className="text-lg">
                  Join thousands of users who are managing their tasks more effectively with TaskFlow.
                  Sign up now and start organizing your work today.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <Link to={user ? "/dashboard" : "/auth?mode=signup"}>
                  <Button size="lg" className="text-lg px-8">
                    {user ? "Go to Dashboard" : "Create Free Account"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
