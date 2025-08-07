# PRD: Tier System & Monetization

## Overview
The app includes multiple user tiers with varying access to features and limits.

## Tiers
### Free
- 10 hands/day in practice
- No card counting
- Limited chart access

### Pro
- Unlimited hands/day
- Full card counting trainer
- Deviation charts and drills
- Detailed stats

## Authentication & Billing
- Managed via **Clerk**
- Billing handled through **Clerk + Stripe**
- Pro status accessible via Clerk JWT

## Supabase Integration
- Usage counts tracked in `hand_history` and `drill_sessions`
- User metadata stored in `users` table

## Upgrade Flow
1. Free user hits daily limit
2. Prompt: upgrade to Pro
3. Redirect to Clerk billing portal
4. JWT claim updates automatically

## Future Enhancements
- Team pricing
- Time-limited promos
- Badges or streak rewards

