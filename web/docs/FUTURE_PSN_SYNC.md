# Future Feature: PSN Trophy Sync

## Overview

Automatically sync a user's PlayStation trophy progress by fetching data from Sony's PSN API. Users would simply enter their PSN username, and their completed trophies would be marked automatically in Trophy Journey.

## How It Works

### Data Source

Sony has an undocumented API for trophy data (the same source PSNProfiles uses). The community has reverse-engineered and documented it:
- [PlayStation Trophies API Documentation](https://andshrew.github.io/PlayStation-Trophies/)
- [psn-api npm package](https://github.com/achievements-app/psn-api)

### Authentication Model

**Two levels of auth:**

1. **App-Level Auth (Required)**
   - Trophy Journey needs ONE PSN account to authenticate API requests
   - Generate an NPSSO token by logging into PlayStation.com
   - This acts as our "API key" - stored server-side, never exposed to users

2. **User Identification (Simple)**
   - Users only provide their **PSN username** (Online ID)
   - No login required from users
   - Their profile must be set to **public** for data access

### Available Data

The PSN API provides:
- `getUserTitles()` - All games a user has played with trophy summaries
- `getUserTrophiesEarnedForTitle()` - Earned trophies for a specific game
- `getTitleTrophies()` - Complete trophy list for any game
- PS5 games include **progress percentage** toward unearned trophies

## Technical Requirements

### Backend Service Needed

Cannot be done client-side only because:
- NPSSO tokens must be kept secret (not in browser JS)
- Tokens expire and need server-side refresh
- API calls should be proxied to handle rate limits

**Options:**
1. Next.js API routes (simplest, keeps everything in one app)
2. Separate backend service (more scalable)
3. Serverless functions (Vercel, AWS Lambda)

### Database Considerations

May need to cache:
- User PSN ID associations
- Last sync timestamps
- Rate limit tracking

Could use:
- Vercel KV / Redis for caching
- Simple JSON file storage initially
- Full database if user accounts are added later

## User Experience

### Sync Flow

1. User navigates to a game page
2. Clicks "Sync with PSN" button
3. Enters their PSN username (first time only, saved to localStorage)
4. App fetches their trophy data for that game
5. Completed trophies are automatically checked off
6. Checklist items within trophies remain manual (PSN doesn't track these)

### Privacy Notes

- Only works for **public PSN profiles**
- User must opt-in to sync
- We only read data, never write to PSN
- PSN username stored locally, not on our servers (v1)

## Implementation Phases

### Phase 1: Basic Sync
- Add `psn-api` package
- Create API route for trophy fetching
- Add "Sync with PSN" button on game pages
- Match PSN trophies to our trophy IDs
- Mark matched trophies as complete

### Phase 2: Enhanced UX
- Remember PSN username in localStorage
- Show sync status and last synced time
- Handle errors gracefully (private profile, rate limits)
- Add manual refresh button

### Phase 3: Auto-Sync (Optional)
- Periodic background sync
- Push notifications for new trophy unlocks
- Sync across all games user has played

## Code Example

```typescript
// lib/psn.ts
import {
  exchangeNpssoForAccessCode,
  exchangeAccessCodeForTokens,
  getUserTrophiesEarnedForTitle
} from 'psn-api';

export async function syncUserTrophies(psnUsername: string, gameNpId: string) {
  // Authenticate with our app's NPSSO token
  const auth = await getAppAuth(); // Server-side only

  // Fetch user's earned trophies
  const { trophies } = await getUserTrophiesEarnedForTitle(
    auth,
    psnUsername,
    gameNpId,
    { npServiceName: 'trophy' }
  );

  // Return earned trophy IDs
  return trophies
    .filter(t => t.earned)
    .map(t => t.trophyId);
}
```

## Challenges & Considerations

1. **Trophy ID Matching**: PSN uses numeric IDs, we use `gold-001` format. Need mapping.
2. **Game ID Lookup**: Need to store PSN's `npCommunicationId` for each game in our JSON.
3. **Rate Limits**: Sony may rate limit requests. Need caching strategy.
4. **Token Refresh**: NPSSO tokens expire. Need automated refresh mechanism.
5. **Error Handling**: Private profiles, network errors, invalid usernames.

## Resources

- [psn-api Documentation](https://psn-api.achievements.app/)
- [PlayStation Trophies GitHub](https://github.com/andshrew/PlayStation-Trophies)
- [PSN API v2 Docs](https://github.com/andshrew/PlayStation-Trophies/blob/master/docs/APIv2.md)

## Status

**Not yet implemented** - Documented for future development.
