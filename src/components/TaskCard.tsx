import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  category: string | null;
  created_at: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const priorityColors = {
    low: "bg-secondary text-secondary-foreground",
    medium: "bg-primary/10 text-primary",
    high: "bg-accent text-accent-foreground",
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
            {task.description && (
              <CardDescription className="line-clamp-2">{task.description}</CardDescription>
            )}
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="h-8 w-8"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{statusLabels[task.status]}</Badge>
          <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
          {task.category && <Badge variant="secondary">{task.category}</Badge>}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;