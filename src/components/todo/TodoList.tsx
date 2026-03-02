"use client";

import { useState } from "react";
import { useTodoStore } from "@/stores/todo-store";
import TodoItem from "./TodoItem";

type Filter = "all" | "active" | "completed";

export default function TodoList() {
  const { todos } = useTodoStore();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = todos.filter((todo) => {
    if (filter === "active") return !todo.is_completed;
    if (filter === "completed") return todo.is_completed;
    return true;
  });

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "全て" },
    { key: "active", label: "未完了" },
    { key: "completed", label: "完了済み" },
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
            ? "ToDoがありません。上のフォームから追加してください。"
            : filter === "active"
              ? "未完了のToDoはありません。"
              : "完了済みのToDoはありません。"}
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
