"use client";

import { useState } from "react";
import { useTodoStore } from "@/stores/todo-store";
import { useTranslation } from "@/i18n";
import TodoItem from "./TodoItem";

type Filter = "all" | "active" | "completed";

export default function TodoList() {
  const t = useTranslation();
  const { todos } = useTodoStore();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = todos.filter((todo) => {
    if (filter === "active") return !todo.is_completed;
    if (filter === "completed") return todo.is_completed;
    return true;
  });

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t.todos.filterAll },
    { key: "active", label: t.todos.filterActive },
    { key: "completed", label: t.todos.filterCompleted },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-muted-blue text-white"
                : "bg-surface text-warm-gray hover:bg-beige"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-warm-gray py-8 text-sm">
          {filter === "all"
            ? t.todos.emptyAll
            : filter === "active"
              ? t.todos.emptyActive
              : t.todos.emptyCompleted}
        </p>
      ) : (
        <div className="space-y-2">
          {filtered.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
