# RecurHub Prelaunch Page Notes

This document summarizes how the `prelaunch/` page is structured, what it is trying to communicate, and which parts of the current HTML/CSS/JS are active.

## Page Goal

The prelaunch page is a long-form registration funnel for a free live training about recurring affiliate income. The primary conversion goal is to get visitors to submit their first name and email address for the webinar seat reservation.

## Core Message

The page pushes one main idea:

- Traditional affiliate marketing resets income every month.
- RecurHub positions recurring commissions as the better model.
- Visitors are invited to reserve a free seat for a live, limited-capacity session.

## Visual Structure

The page uses a strong dark-to-light alternating layout:

1. Fixed top navigation
2. Dark hero section with headline, trust badges, video, and form
3. Problem section
4. Shift/comparison section
5. Audience fit section
6. Math/statistics section
7. Outcomes section
8. Agenda section
9. Final launch urgency section
10. Disclaimer/footer

## Hero Section

The hero is the main attention zone and contains:

- A top badge announcing the free live training
- A headline focused on recurring income
- Supporting copy describing the 60-minute session
- Four trust pills with the date, time, free offer, and limited seats message
- A video embed area
- A lead capture form with first name and email

### Banner Reference From the Image

The image you attached matches the page's urgency/trust messaging pattern. It is effectively a four-item launch info strip:

- Tuesday / date
- 10:00 AM EST / 60 minutes
- 100% free to attend
- Limited seats / filling fast

That same message already appears in the hero trust pills and again in the launch section, so the image can be treated as a compact visual version of the page's registration pitch.

## Section-by-Section Breakdown

### 1. Fixed Nav

- Shows the RecurHub logo
- Displays a live training badge
- Includes a CTA button that jumps to the form

### 2. Hero

- Sets the offer, urgency, and value proposition
- Uses background glow/orb effects and a grid overlay
- Centers the message above the video and form area

### 3. Problem

- Describes why one-time affiliate marketing is frustrating
- Uses four cards to frame common pain points

### 4. Shift / Comparison

- Compares one-time commissions against recurring commissions
- Uses side-by-side cards for the old way vs the RecurHub way

### 5. Audience Fit

- Helps visitors self-identify as a good fit
- Uses six checklist-style cards

### 6. Stats / Math

- Gives the opportunity a numbers-driven angle
- Uses four stat cards

### 7. Outcomes

- Promises concrete deliverables from the session
- Uses six outcome cards

### 8. Agenda

- Lists the live training flow minute by minute
- Uses a numbered vertical list

### 9. Launch CTA

- Reinforces the date and time
- Adds scarcity and the no-recording warning
- Ends with a strong CTA button

### 10. Disclaimer / Footer

- Repeats the brand promise
- Links to legal pages and support
- Provides attribution and copyright text

## Active CSS Patterns

The stylesheet is doing most of the visual work:

- Brand gradient styling
- Alternating dark and light section themes
- Shared section heading styles
- Animated reveal-on-scroll states
- Rounded CTA buttons
- Form card and success state styles
- Fixed nav with blur and scroll state
- Hero background effects and video frame styling
- Responsive grid behavior for tablet and mobile

## Active JavaScript Behavior

The current JavaScript is mostly presentation and form UX:

- Adds scroll-reveal classes with `IntersectionObserver`
- Applies staggered reveal delays to sibling cards
- Toggles the nav's scrolled state on page scroll
- Smooth-scrolls anchor links
- Validates the waitlist form
- Shows a temporary loading state on submit
- Replaces the form with a success panel after submit

## Notes On Implementation

- The HTML contains a few commented-out or placeholder blocks, including an older video placeholder implementation and some JS hooks for FAQ/spots-bar behavior that are not currently used by the markup.
- The page currently uses a Vimeo embed in the hero video area.
- The launch date and time are duplicated in multiple places for reinforcement.
- The copy leans heavily on scarcity, exclusivity, and "live only" messaging.

## Assets Used

The page references several assets under `prelaunch/assets/`, including:

- `logo-white.svg`
- `favicon.png`
- `watch_now_banner.png`
- `bnr-bg.jpg`
- `sub-head-bg.svg`
- `right.png`
- Stat and outcome icons such as `g-1.png`, `one.png`, `two.png`, etc.

## Quick Summary

This prelaunch page is a conversion-focused webinar landing page. Its structure is designed to:

- grab attention fast,
- explain the problem,
- introduce the recurring-income shift,
- prove the opportunity with stats,
- and keep pushing visitors toward the registration form.

