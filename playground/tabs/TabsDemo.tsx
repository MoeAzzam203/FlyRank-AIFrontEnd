"use client";

import { Tabs } from "./Tabs";

export function TabsDemo() {
	return (
		<div className="tabs-demo">
			<style>{`
				.tabs-demo {
					max-width: 100%;
					padding: 1.25rem;
					border: 1px solid #dbe3ee;
					border-radius: 0.75rem;
					background: #ffffff;
					box-shadow: 0 0.75rem 2rem rgba(15, 23, 42, 0.08);
				}

				.tabs-demo [role="tablist"] {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5rem;
					margin-bottom: 1rem;
				}

				.tabs-demo [role="tab"] {
					padding: 0.6rem 0.9rem;
					border: 1px solid #94a3b8;
					border-radius: 0.375rem;
					background: #f8fafc;
					color: #334155;
					font: inherit;
					font-weight: 600;
					cursor: pointer;
					transition: background-color 120ms ease, border-color 120ms ease,
						color 120ms ease;
				}

				.tabs-demo [role="tab"]:hover {
					border-color: #2563eb;
					background: #eff6ff;
					color: #1d4ed8;
				}

				.tabs-demo [role="tab"][aria-selected="true"] {
					background: #2563eb;
					border-color: #1d4ed8;
					color: white;
				}

				.tabs-demo [role="tab"]:focus-visible {
					outline: 3px solid #93c5fd;
					outline-offset: 2px;
				}

				.tabs-demo [role="tabpanel"] {
					min-height: 7rem;
					padding: 1.25rem;
					border: 1px solid #cbd5e1;
					border-radius: 0.5rem;
					background: #f8fafc;
					color: #334155;
					font-size: 1rem;
					line-height: 1.6;
					overflow-wrap: anywhere;
				}

				.tabs-demo [role="tabpanel"] p {
					margin: 0;
				}
			`}</style>
			<h2 style={{ margin: "0 0 1rem", fontSize: "1.125rem" }}>Tabs example</h2>
			<Tabs
				tabs={[
					{
						id: "overview",
						label: "Overview",
						content: <p>This tab gives a quick overview of the project.</p>,
					},
					{
						id: "features",
						label: "Features",
						content: <p>Explore the main features available in this example.</p>,
					},
					{
						id: "accessibility",
						label: "Accessibility",
						content: <p>Keyboard support and clear semantics make these tabs accessible.</p>,
					},
				]}
			/>
		</div>
	);
}
