"use client";

import { useState } from "react";
import { Modal } from "./Modal";

export function ModalDemo() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<style>{`
				.modal-demo-primary,
				.modal-demo-secondary {
					padding: 0.6rem 1rem;
					border-radius: 0.375rem;
					font: inherit;
					cursor: pointer;
					transition: background-color 120ms ease, border-color 120ms ease;
				}

				.modal-demo-primary {
					border: 1px solid #1d4ed8;
					background: #2563eb;
					color: white;
				}

				.modal-demo-primary:hover {
					background: #1d4ed8;
				}

				.modal-demo-secondary {
					border: 1px solid #64748b;
					background: white;
					color: #0f172a;
				}

				.modal-demo-secondary:hover {
					border-color: #334155;
					background: #f1f5f9;
				}

				.modal-demo-primary:focus-visible,
				.modal-demo-secondary:focus-visible,
				.modal-demo-input:focus-visible {
					outline: 3px solid #93c5fd;
					outline-offset: 2px;
				}

				.modal-demo-label {
					display: grid;
					gap: 0.375rem;
					margin-bottom: 1rem;
				}

				.modal-demo-input {
					padding: 0.6rem 0.75rem;
					border: 1px solid #94a3b8;
					border-radius: 0.375rem;
					font: inherit;
					color: #0f172a;
					background: white;
				}
			`}</style>
			<button
				type="button"
				className="modal-demo-primary"
				onClick={() => setOpen(true)}
			>
				Open modal
			</button>
			<Modal open={open} onClose={() => setOpen(false)} title="Test modal">
				<label className="modal-demo-label">
					Text input
					<input className="modal-demo-input" type="text" />
				</label>
				<button className="modal-demo-secondary" type="button">
					Secondary button
				</button>
			</Modal>
		</>
	);
}
