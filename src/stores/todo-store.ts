import { create } from "zustand";
import type { Todo, Priority } from "@/types/database";

interface TodoState {
  todos: Todo[];
  addTodo: (title: string, priority: Priority, dueDate?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],

  addTodo: (title, priority, dueDate) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      user_id: "local",
      title,
      priority,
      due_date: dueDate || null,
      is_completed: false,
      sort_order: Date.now(),
      created_at: new Date().toISOString(),
    };
    set((state) => ({ todos: [todo, ...state.todos] }));
  },

  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
      ),
    }));
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  updateTodo: (id, updates) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    }));
  },
}));
