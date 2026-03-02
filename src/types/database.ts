export type Priority = "high" | "medium" | "low";

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  work_duration: number;
  break_duration: number;
  long_break_duration: number;
  sessions_before_long_break: number;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  label: string | null;
  duration_minutes: number;
  completed: boolean;
  started_at: string;
  completed_at: string | null;
}

export interface Todo {
  id: string;
  user_id: string;
  title: string;
  priority: Priority;
  due_date: string | null;
  is_completed: boolean;
  sort_order: number;
  created_at: string;
}
