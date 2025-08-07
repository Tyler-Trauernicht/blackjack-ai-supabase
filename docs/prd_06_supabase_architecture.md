# PRD: Supabase Architecture Overview

## Stack Overview
- Supabase for database, RLS, and analytics
- Clerk for auth (JWT-based)
- Stripe via Clerk for billing

## Tables
### `users`
- `clerk_user_id`: string
- `email`: string
- `created_at`: timestamp

### `hand_history`
- `clerk_user_id`: FK
- `player_hand`: string
- `dealer_card`: string
- `action_taken`: string
- `correct_action`: string
- `result`: boolean
- `created_at`: timestamp

### `drill_sessions`
- `clerk_user_id`: FK
- `total_hands`: int
- `submitted_count`: int
- `correct_count`: int
- `created_at`: timestamp

## RLS (Row-Level Security)
- Enabled for all tables
- Policies based on matching `clerk_user_id`
- JWT passed via Clerk session contains `sub` claim used in RLS

## API Integration
- Supabase client (`lib/supabaseClient.ts`)
- Logging via `lib/api.ts`

## Future Enhancements
- Add table for user stats summary
- Add analytics events for feature usage

