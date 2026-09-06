# Comparing AI Development Workflows: Vague vs. Precise Prompts

## Round One: The Vague Prompt
To test how well the AI handles open-ended requests, I started with a deliberately loose instruction: “Build a settings form with validation for this project.”

The AI delivered a working form, but because it had to guess what I wanted, it bloated the scope. It tacked on several unrequested fields—password confirmation, time zones, email preferences, product updates, and a dark mode toggle—resulting in a massive 375-line page.tsx file.

More importantly, manual review revealed an AI logic bug: the Dark Mode checkbox updated its own visual state when clicked, but it didn't actually change the app's theme. On top of that, it used a basic browser alert() for submission confirmations and skipped writing automated tests altogether. Finally, it had the checkbox for Email notifications tacked on by default. Linting and production builds passed with no issues.

## Round Two: The Precise Prompt
For round two, I wiped the slate clean with a fresh session and a tightly scoped prompt. I explicitly listed the exact file path, the three required fields, custom validation rules, accessibility attributes, responsive layouts, submission/reset behavior, and strict instructions on what not to include. I also requested automated tests and specific verification steps.

This time, the implementation was lean and spot-on. The code dropped from 375 lines down to 178, featuring only the requested Display Name, Email, and Preferred Theme controls. Validation worked as requested, accessibility was properly wired up with aria-describedby and aria-invalid, and the browser alert was replaced with a clean in-page status banner.

The AI also included five automated Vitest tests covering the initial render, validation errors, successful submissions, and state resets. All tests passed alongside linting and build checks. While the overall repo diff was larger due to new testing configs and dependency locks, the feature code itself was far tighter and higher quality.

## Key Takeaways
Front-loading detail into your prompts takes a bit more effort, but it pays off by cutting out feature creep and eliminating guesswork. Clear constraints give you concrete criteria to test against instead of relying on manual sanity checks. Ultimately, getting the most out of AI coding tools isn't about accepting whatever gets generated; it's about setting firm boundaries, enforcing verification, and auditing the output against your original specs.