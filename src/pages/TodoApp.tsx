import { useAuth } from "@/hooks/use-auth";
import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { UserButton } from "@/components/auth/UserButton";
import { motion } from "framer-motion";
import { CheckSquare, Sparkles } from "lucide-react";

export function TodoApp() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        }}
      ></div>
      
      <div className="relative z-10">
        <header className="p-6">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <CheckSquare className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  TodoMagic
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                </h1>
                <p className="text-white/80 text-sm">
                  Organize your tasks beautifully
                </p>
              </div>
            </motion.div>
            <UserButton />
          </div>
        </header>

        <main className="px-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <AddTodo userId={user._id} />
              <TodoList userId={user._id} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}