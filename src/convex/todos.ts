import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("todos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: { text: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
      userId: args.userId,
    });
  },
});

export const toggle = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    
    return await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("todos"), text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});
