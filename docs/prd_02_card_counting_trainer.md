# PRD: Card Counting Trainer (Hi-Lo System)

## Overview
This module helps pro users master the Hi-Lo card counting technique through drills and assessments.

## Features
- Run simulations of 25–100 hands
- User inputs final count
- System validates accuracy
- Option to show/hide running count
- Feedback after each drill

## Supabase Tables Used
- `drill_sessions` — logs hands shown, user-submitted count, and accuracy
- `users` — tracks Pro access via Clerk

## Data
- Hi-Lo logic handled in client-side logic (`countingLogic.ts`)
- Reference chart in `/public/data/countDeviations.json`

## Pro-Only Features
- Unlimited drill sessions
- Real-time feedback on count tracking
- Deviation practice (see PRD 04)

## Future Enhancements
- Voice-assisted drills
- Visual running count overlay

