# PRD: Basic Strategy Practice

## Overview
This module allows users to practice blackjack hands using basic strategy rules. It presents random scenarios and offers immediate feedback.

## Features
- Randomly generated player and dealer hands
- Action options: Hit, Stand, Double, Split, Surrender
- Immediate feedback on user's action
- Usage limits for free-tier users
- Performance tracking via Supabase

## Data
- Strategy chart sourced from `/public/data/basicStrategy.json`
- Hand logs stored in `hand_history` table

## Supabase Tables Used
- `hand_history` — logs each hand, user ID, correct action, action taken, and result
- `users` — associates Clerk user ID for auth and analytics

## Free vs Pro
- Free users: 10 hands/day
- Pro users: unlimited hands

## Future Enhancements
- Visual animations for cards
- In-game hints for new users

