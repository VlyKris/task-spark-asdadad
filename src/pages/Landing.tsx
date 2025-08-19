import { useAuth } from "@/hooks/use-auth";
import { AuthButton } from "@/components/auth/AuthButton";
import { Navigate } from "react-router";
import { motion } from "framer-motion";
import { CheckSquare, Sparkles, Zap, Heart, Star } from "lucide-react";

export function Landing() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        }}
      ></div>
      
      <div className="relative z-10">
        <header className="p-6">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <CheckSquare className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-white flex items-center gap-2">
                TodoMagic
                <Sparkles className="h-5 w-5 text-yellow-300" />
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AuthButton />
            </motion.div>
          </nav>
        </header>

        <main className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Organize Your Life
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Beautifully
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                The most beautiful and intuitive todo app that makes task management 
                feel like magic. Get things done with style.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <AuthButton />
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                  <span>Free forever • No credit card required</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl w-fit mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
                <p className="text-white/80">
                  Add, edit, and complete todos instantly with our blazing fast interface.
                </p>
              </div>

              <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl w-fit mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Beautiful Design</h3>
                <p className="text-white/80">
                  Enjoy a stunning glass-morphism design that makes productivity beautiful.
                </p>
              </div>

              <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl w-fit mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Magical Experience</h3>
                <p className="text-white/80">
                  Smooth animations and delightful interactions make every task enjoyable.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-white/90 text-sm font-medium">
                  Join thousands of productive users
                </span>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}