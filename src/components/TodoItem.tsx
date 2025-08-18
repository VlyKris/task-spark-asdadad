import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface TodoItemProps {
  todo: {
    _id: Id<"todos">;
    text: string;
    isCompleted: boolean;
  };
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  
  const toggleTodo = useMutation(api.todos.toggle);
  const removeTodo = useMutation(api.todos.remove);
  const updateTodo = useMutation(api.todos.update);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
      toast.success(todo.isCompleted ? "Todo marked as incomplete" : "Todo completed!");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async () => {
    try {
      await removeTodo({ id: todo._id });
      toast.success("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const handleSave = async () => {
    if (editText.trim() === "") {
      toast.error("Todo text cannot be empty");
      return;
    }
    
    try {
      await updateTodo({ id: todo._id, text: editText.trim() });
      setIsEditing(false);
      toast.success("Todo updated");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
      />
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 border-purple-200 focus:border-purple-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
          />
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            className="border-gray-300 hover:bg-gray-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 ${
              todo.isCompleted
                ? "line-through text-gray-500"
                : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </motion.div>
  );
}
