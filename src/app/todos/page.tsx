"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTodoStore } from "@/stores/todo-store";
import type { Priority } from "@/types/database";
import TodoList from "@/components/todo/TodoList";
import Button from "@/components/ui/Button";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";

export default function TodosPage() {
  const { addTodo } = useTodoStore();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTodo(trimmed, priority, dueDate || undefined);
    setTitle("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <AuthGuard>
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-heading mb-6">ToDoリスト</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-surface rounded-xl p-4 mb-6 space-y-3"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="新しいToDoを入力..."
              className="flex-1 bg-off-white rounded-lg px-3 py-2 text-sm text-dark-text placeholder:text-warm-gray focus:outline-none focus:ring-2 focus:ring-muted-blue transition-all"
            />
            <Button type="submit" size="sm" disabled={!title.trim()}>
              <Plus size={16} />
            </Button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="bg-off-white rounded-lg px-3 py-1.5 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-muted-blue"
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-off-white rounded-lg px-3 py-1.5 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-muted-blue"
            />
          </div>
        </form>

        <TodoList />
      </div>
    </AppLayout>
    </AuthGuard>
  );
}
