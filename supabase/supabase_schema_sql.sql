-- /supabase/schema.sql
-- Run this inside the SQL Editor at https://app.supabase.com/project/<your-project>/sql

-- Users table (linked to Clerk UID)
create table users (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text,
  tier text default 'free',
  created_at timestamp default now()
);

-- Hand History
create table hand_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  player_hand text,
  dealer_card text,
  user_action text,
  correct_action text,
  result text,
  true_count int,
  created_at timestamp default now()
);

-- Drill Results
create table drill_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  count_type text,
  correct int,
  total int,
  created_at timestamp default now()
);

-- RLS Policies (basic example)
alter table users enable row level security;
create policy "User can access self"
  on users for select using (clerk_user_id = auth.jwt() ->> 'sub');

alter table hand_history enable row level security;
create policy "Access own hands"
  on hand_history for all using (
    user_id in (select id from users where clerk_user_id = auth.jwt() ->> 'sub')
  );

alter table drill_sessions enable row level security;
create policy "Access own drills"
  on drill_sessions for all using (
    user_id in (select id from users where clerk_user_id = auth.jwt() ->> 'sub')
  );
