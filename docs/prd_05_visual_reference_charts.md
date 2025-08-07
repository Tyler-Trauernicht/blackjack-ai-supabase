# PRD: Visual Reference Charts

## Overview
Users can view charts to study blackjack decisions by hand type, dealer upcard, and true count.

## Types of Charts
- Basic strategy charts (hard, soft, pairs)
- Count-based deviation charts

## Data Files
- `/public/data/basicStrategy.json`
- `/public/data/countDeviations.json`

## Features
- Toggle between chart types
- Mobile-optimized layout
- Locked sections for Free tier

## Supabase Usage
- No direct write operations
- Read access may be tracked via logging endpoints for analytics

## Free vs Pro
- Basic charts available to all
- Deviation charts unlocked via Pro

## Future Enhancements
- Dynamic true count overlays
- Per-user chart customization (saved filters)

