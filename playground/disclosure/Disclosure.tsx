"use client";

import { useId, useState } from "react";
import type React from "react";

export type DisclosureProps = {
	title: string;
	children: React.ReactNode;
};

export function Disclosure({ title, children }: DisclosureProps) {
	const [isOpen, setIsOpen] = useState(false);
	const contentId = useId();

	return (
		<div>
			<style>{`
				.disclosure-trigger:focus-visible {
					outline: 3px solid #2563eb;
					outline-offset: 3px;
				}
			`}</style>
			<button
				type="button"
				className="disclosure-trigger"
				aria-expanded={isOpen}
				aria-controls={contentId}
				onClick={() => setIsOpen((open) => !open)}
				style={{
					display: "flex",
					alignItems: "center",
					gap: "0.5rem",
					padding: "0.5rem 0.75rem",
					border: "1px solid #94a3b8",
					borderRadius: "0.375rem",
					backgroundColor: "white",
					color: "#0f172a",
					cursor: "pointer",
				}}
			>
				<span aria-hidden="true">{isOpen ? "−" : "+"}</span>
				{title}
			</button>
			<div id={contentId} hidden={!isOpen}>
				{children}
			</div>
		</div>
	);
}
