

# Valentine's Quest 💕

A romantic, interactive web experience with a premium feel, elegant typography, and playful interactions.

## Design & Styling
- **Color palette**: Soft blush pinks, deep raspberry reds, and crisp white
- **Typography**: Dancing Script for headers, Quicksand for body text (Google Fonts)
- **Background**: Subtle floating heart particles throughout the entire experience
- **Images**: High-quality Unsplash romantic/dreamy photos (golden hour, polaroids, starlit skies)

## Phase 1: The Locked Gate
- Full-screen landing page with a blurred romantic background
- Elegant password input with the hint "Our favorite secret word" (password: `pizza`)
- On correct entry, the gate slides up with a smooth cinematic transition revealing the journey beneath
- Wrong password shows a gentle shake animation

## Phase 2: The Journey (Vertical Scroll Story)
Three milestone sections, each with scroll-triggered fade-in and slide-up animations:
1. **"Where it began"** — Polaroid-style framed image with a romantic caption
2. **"The Laughs"** — Circular image with playful memory text
3. **"The Moment I Knew"** — Polaroid-style image with heartfelt caption

Each milestone appears beautifully as the user scrolls down the page.

## Phase 3: The Proposal
- A dramatic "Will you be my Valentine?" section
- **"No" button**: Evasive — runs away from the cursor/touch, impossible to click
- **"YES" button**: Triggers a massive heart-shaped confetti explosion (using canvas-confetti library)
- After confetti, transitions to a beautiful success card with a final romantic message

## Technical Details
- Fully mobile-responsive design
- canvas-confetti library for the confetti explosion
- Intersection Observer for scroll-triggered animations
- CSS transitions for the gate reveal

