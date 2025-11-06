import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Target, Zap, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
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
      icon: Target,
      title: "Stay Organized",
      description: "Keep all your tasks in one place with intuitive categorization and priority levels.",
    },
    {
      icon: Zap,
      title: "Work Efficiently",
      description: "Quick task creation and updates help you stay focused on what matters most.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your tasks are protected with enterprise-level security and encryption.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation isAuthenticated={!!user} />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <CheckSquare className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About TaskFlow</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              TaskFlow is a modern task management application designed to help you stay organized,
              productive, and focused on achieving your goals. Built with cutting-edge technology
              for a seamless experience across all your devices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-card to-secondary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We believe that effective task management shouldn't be complicated. TaskFlow was
                created to provide a simple yet powerful solution for individuals and teams who want
                to take control of their productivity.
              </p>
              <p>
                Whether you're managing personal projects, work assignments, or team collaborations,
                TaskFlow gives you the tools you need to succeed without the unnecessary complexity.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;