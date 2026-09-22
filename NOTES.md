# Accessibility Component Notes

## Custom components

The playground contains hand-built implementations of:

- Modal
- Tabs
- Disclosure

The components were implemented without a component library and were tested with keyboard-only interaction.

### Custom Modal

The custom Modal implements:

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby`
- Initial focus when opened
- Tab and Shift+Tab focus trapping
- Escape to close
- Focus restoration to the trigger
- Body scroll locking while open

### Custom Tabs

The custom Tabs implements:

- `role="tablist"`
- `role="tab"`
- `role="tabpanel"`
- `aria-selected`
- `aria-controls`
- `aria-labelledby`
- Roving `tabIndex`
- Arrow Left/Right navigation
- Home/End navigation
- Enter/Space activation
- Wrapping keyboard navigation

### Custom Disclosure

The custom Disclosure implements:

- A native button as the trigger
- `aria-expanded`
- `aria-controls`
- Expand/collapse with Enter and Space
- Hidden content when collapsed
- A visible expanded/collapsed indicator

## shadcn/ui comparison

The generated shadcn components use Radix UI primitives underneath them. The generated `dialog.tsx` and `tabs.tsx` files mainly provide a composable API and styling around those primitives.

### Gap 1: Dialog behavior and composition

The custom Modal is a single focused implementation and manually manages its accessibility behavior, including focus trapping, focus restoration, Escape handling, and body scroll locking.

The shadcn Dialog is split into reusable pieces such as `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogClose`, `DialogTitle`, and `DialogDescription`. The underlying Radix Dialog primitive handles the interaction behavior, while shadcn adds the composition and styling layer.

This makes the shadcn version more reusable for different dialog structures, while the custom version is smaller and easier to understand for this specific exercise.

### Gap 2: Tabs flexibility

The custom Tabs implements the keyboard behavior needed for the assignment, but its API is intentionally small: it accepts a list of tabs and manages the active tab internally.

The shadcn Tabs wraps the Radix Tabs primitive and exposes additional capabilities such as horizontal and vertical orientation. The generated component also supports styling variants and state-based styling.

This means the custom implementation covers the required behavior but has a narrower API than the reusable Radix-based implementation.

### Gap 3: Styling and composition

The custom components keep most of their styling in the playground/demo code.

The generated shadcn components separate primitive behavior from reusable styling and composition. For example, the Tabs component uses `class-variance-authority` for variants, while the Dialog exposes separate header, footer, title, description, overlay, portal, and close components.

## Takeaway

Building the components by hand made the accessibility requirements and keyboard behavior explicit. Using shadcn/Radix provides a more reusable primitive with additional composition and interaction capabilities.

For this assignment, the custom versions were useful for understanding the underlying patterns, while the generated shadcn components demonstrate how a mature accessible primitive can package those patterns for reuse.
