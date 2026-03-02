"use client";

import { Trash2 } from "lucide-react";
import { format, isPast, parseISO } from "date-fns";
import type { Todo } from "@/types/database";
import { useTodoStore } from "@/stores/todo-store";

const priorityColors: Record<string, string> = {
  high: "bg-[#E53E3E]",
  medium: "bg-[#ECC94B]",
  low: "bg-[#48BB78]",
};

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();
  const isOverdue =
    todo.due_date && !todo.is_completed && isPast(parseISO(todo.due_date));

  return (
    <div className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 group">
      <input
        type="checkbox"
        checked={todo.is_completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 rounded-md accent-muted-blue cursor-pointer shrink-0"
      />

      <span
        className={`w-2.5 h-2.5 rounded-full shrink-0 ${priorityColors[todo.priority]}`}
        title={`優先度: ${todo.priority === "high" ? "高" : todo.priority === "medium" ? "中" : "低"}`}
      />

      <span
        className={`flex-1 text-sm ${
          todo.is_completed
            ? "line-through text-warm-gray"
            : "text-dark-text"
        }`}
      >
        {todo.title}
      </span>

      {todo.due_date && (
        <span
          className={`text-xs shrink-0 ${
            isOverdue ? "text-red-500 font-medium" : "text-warm-gray"
          }`}
        >
          {format(parseISO(todo.due_date), "M/d")}
        </span>
      )}

      <button
        onClick={() => deleteTodo(todo.id)}
        className="p-1.5 rounded-lg text-warm-gray hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
        aria-label="削除"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
