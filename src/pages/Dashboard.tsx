import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  category: string | null;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth?mode=login");
        return;
      }
      setUser(session.user);
      fetchTasks();
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth?mode=login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks((data || []) as Task[]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch tasks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Omit<Task, "id" | "user_id" | "created_at" | "updated_at">) => {
    try {
      const { error } = await supabase.from("tasks").insert([
        {
          ...taskData,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task created successfully",
      });
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, "id" | "user_id" | "created_at" | "updated_at">) => {
    if (!editingTask) return;

    try {
      const { error } = await supabase
        .from("tasks")
        .update(taskData)
        .eq("id", editingTask.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      setEditingTask(null);
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = statusFilter === "all" 
    ? tasks 
    : tasks.filter(task => task.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation isAuthenticated={!!user} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation isAuthenticated={!!user} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks efficiently
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="todo">To Do</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              {statusFilter === "all" 
                ? "No tasks yet. Create your first task to get started!" 
                : `No ${statusFilter === "in-progress" ? "in progress" : statusFilter} tasks`}
            </p>
            {statusFilter === "all" && (
              <Button onClick={() => setIsFormOpen(true)} variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Task
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      <TaskForm
        open={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;