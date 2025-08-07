# PRD: Count-Based Deviations

## Overview
This module teaches players how to deviate from basic strategy using true count triggers (Hi-Lo system).

## Features
- Show simulated hand with true count provided
- Ask user to take the correct action
- Compare user's move to deviation chart
- Feedback shown after action

## Data Source
- `/public/data/countDeviations.json` — includes count-based deviations

## Supabase Usage
- Store results in `drill_sessions`
- Track deviation performance separately
- Link activity to user via `clerk_user_id`

## Free vs Pro
- Deviation mode is Pro-only
- Charts locked behind Pro paywall

## Future Plans
- Dynamic true count simulation (e.g., running count + decks remaining)
- Flashcard-style quizzes on rare deviations

