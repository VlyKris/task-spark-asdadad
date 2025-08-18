import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TodoItem } from "./TodoItem";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

interface TodoListProps {
  userId: string;
}

export function TodoList({ userId }: TodoListProps) {
  const todos = useQuery(api.todos.list, { userId });

  if (todos === undefined) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-white/60 backdrop-blur-sm rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Circle className="h-16 w-16 text-purple-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No todos yet
        </h3>
        <p className="text-gray-500">
          Add your first todo item to get started!
        </p>
      </motion.div>
    );
  }

  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const totalCount = todos.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Your Todos
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          {completedCount} of {totalCount} completed
        </div>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence>
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
