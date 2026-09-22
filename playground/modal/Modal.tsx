"use client";

import { useEffect, useId, useRef } from "react";
import type React from "react";

export type ModalProps = {
	open: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
};

const focusableSelector = [
	"a[href]",
	"area[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[contenteditable=\"true\"]",
	"[tabindex]:not([tabindex=\"-1\"])",
].join(",");

export function Modal({ open, onClose, title, children }: ModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const previousFocusedElementRef = useRef<HTMLElement | null>(null);
	const hasCapturedFocusRef = useRef(false);
	const onCloseRef = useRef(onClose);
	const titleId = useId();

	useEffect(() => {
		onCloseRef.current = onClose;
	}, [onClose]);

	useEffect(() => {
		if (!open) {
			previousFocusedElementRef.current?.focus();
			previousFocusedElementRef.current = null;
			hasCapturedFocusRef.current = false;
			return;
		}

		if (!hasCapturedFocusRef.current) {
			previousFocusedElementRef.current =
				document.activeElement instanceof HTMLElement
					? document.activeElement
					: null;
			hasCapturedFocusRef.current = true;
		}

		const dialog = dialogRef.current;
		const closeButton = closeButtonRef.current;
		const previousBodyOverflow = document.body.style.overflow;

		document.body.style.overflow = "hidden";

		closeButton?.focus();

		const getFocusableElements = () =>
			dialog
				? Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
				: [];

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onCloseRef.current();
				return;
			}

			if (event.key !== "Tab" || !dialog) {
				return;
			}

			const focusableElements = getFocusableElements();
			if (focusableElements.length === 0) {
				event.preventDefault();
				return;
			}

			const currentIndex = focusableElements.indexOf(
				document.activeElement as HTMLElement,
			);

			if (event.shiftKey) {
				if (currentIndex <= 0) {
					event.preventDefault();
					focusableElements[focusableElements.length - 1].focus();
				}
			} else if (
				currentIndex === -1 ||
				currentIndex === focusableElements.length - 1
			) {
				event.preventDefault();
				focusableElements[0].focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousBodyOverflow;
		};
	}, [open]);

	if (!open) {
		return null;
	}

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 1000,
				display: "grid",
				placeItems: "center",
				padding: "1rem",
				backgroundColor: "rgba(15, 23, 42, 0.6)",
			}}
		>
			<div
				ref={dialogRef}
				className="modal-dialog"
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				tabIndex={-1}
				style={{
					width: "min(100%, 32rem)",
					maxHeight: "calc(100vh - 2rem)",
					overflowY: "auto",
					padding: "1.5rem",
					backgroundColor: "white",
					color: "#0f172a",
					borderRadius: "0.5rem",
					boxShadow: "0 1.5rem 4rem rgba(15, 23, 42, 0.25)",
				}}
			>
				<style>{`
					.modal-dialog :focus-visible {
						outline: 3px solid #2563eb;
						outline-offset: 2px;
					}
				`}</style>
				<div
					style={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
						gap: "1rem",
					}}
				>
					<h2 id={titleId} style={{ margin: 0 }}>
						{title}
					</h2>
					<button
						ref={closeButtonRef}
						type="button"
						onClick={onClose}
						aria-label="Close dialog"
						onFocus={(event) => {
							event.currentTarget.style.outline = "3px solid #2563eb";
							event.currentTarget.style.outlineOffset = "2px";
						}}
						onBlur={(event) => {
							event.currentTarget.style.outline = "";
							event.currentTarget.style.outlineOffset = "";
						}}
						style={{
							flexShrink: 0,
							padding: "0.25rem 0.5rem",
							border: "1px solid #cbd5e1",
							borderRadius: "0.25rem",
							backgroundColor: "white",
							color: "#0f172a",
							cursor: "pointer",
						}}
					>
						Close
					</button>
				</div>
				<div style={{ marginTop: "1rem" }}>{children}</div>
			</div>
		</div>
	);
}
