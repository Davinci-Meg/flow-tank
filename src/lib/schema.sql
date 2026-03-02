-- profiles テーブル
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  work_duration int default 25,
  break_duration int default 5,
  long_break_duration int default 15,
  sessions_before_long_break int default 4,
  created_at timestamptz default now()
);

-- sessions テーブル
create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  label text,
  duration_minutes int not null,
  completed boolean default false,
  started_at timestamptz default now(),
  completed_at timestamptz
);

-- todos テーブル
create table todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  priority text check (priority in ('high', 'medium', 'low')) default 'medium',
  due_date date,
  is_completed boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- RLS
alter table profiles enable row level security;
alter table sessions enable row level security;
alter table todos enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "Users can view own sessions" on sessions for select using (auth.uid() = user_id);
create policy "Users can insert own sessions" on sessions for insert with check (auth.uid() = user_id);

create policy "Users can view own todos" on todos for select using (auth.uid() = user_id);
create policy "Users can insert own todos" on todos for insert with check (auth.uid() = user_id);
create policy "Users can update own todos" on todos for update using (auth.uid() = user_id);
create policy "Users can delete own todos" on todos for delete using (auth.uid() = user_id);

-- 新規ユーザー時にprofile自動作成
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
