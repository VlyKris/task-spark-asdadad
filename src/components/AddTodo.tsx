import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface AddTodoProps {
  userId: string;
}

export function AddTodo({ userId }: AddTodoProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const createTodo = useMutation(api.todos.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim() === "") {
      toast.error("Please enter a todo item");
      return;
    }

    setIsLoading(true);
    try {
      await createTodo({ text: text.trim(), userId });
      setText("");
      toast.success("Todo added successfully!");
    } catch (error) {
      toast.error("Failed to add todo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm"
        disabled={isLoading}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </motion.form>
  );
}
