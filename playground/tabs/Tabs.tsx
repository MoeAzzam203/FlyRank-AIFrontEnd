"use client";

import { useId, useRef, useState } from "react";
import type React from "react";

export type TabItem = {
	id: string;
	label: string;
	content: React.ReactNode;
};

export type TabsProps = {
	tabs: readonly TabItem[];
};

export function Tabs({ tabs }: TabsProps) {
	const [activeTabId, setActiveTabId] = useState<string | undefined>(
		tabs[0]?.id,
	);
	const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const tabsId = useId();

	const currentActiveTabId = tabs.some((tab) => tab.id === activeTabId)
		? activeTabId
		: tabs[0]?.id;

	const focusTab = (index: number) => {
		const nextIndex = (index + tabs.length) % tabs.length;
		tabRefs.current[nextIndex]?.focus();
	};

	const handleTabKeyDown = (
		event: React.KeyboardEvent<HTMLButtonElement>,
		index: number,
		tabId: string,
	) => {
		if (tabs.length === 0) {
			return;
		}

		switch (event.key) {
			case "ArrowRight":
				event.preventDefault();
				focusTab(index + 1);
				break;
			case "ArrowLeft":
				event.preventDefault();
				focusTab(index - 1);
				break;
			case "Home":
				event.preventDefault();
				focusTab(0);
				break;
			case "End":
				event.preventDefault();
				focusTab(tabs.length - 1);
				break;
			case "Enter":
			case " ":
				event.preventDefault();
				setActiveTabId(tabId);
				break;
		}
	};

	return (
		<div>
			<div role="tablist" aria-label="Tabs">
				{tabs.map((tab, index) => {
					const tabId = `${tabsId}-tab-${index}`;
					const panelId = `${tabsId}-panel-${index}`;
					const isActive = tab.id === currentActiveTabId;

					return (
						<button
							key={tab.id}
							ref={(element) => {
								tabRefs.current[index] = element;
							}}
							id={tabId}
							type="button"
							role="tab"
							aria-selected={isActive}
							aria-controls={panelId}
							tabIndex={isActive ? 0 : -1}
							onClick={() => setActiveTabId(tab.id)}
							onKeyDown={(event) =>
								handleTabKeyDown(event, index, tab.id)
							}
						>
							{tab.label}
						</button>
					);
				})}
			</div>

			{tabs.map((tab, index) => {
				const tabId = `${tabsId}-tab-${index}`;
				const panelId = `${tabsId}-panel-${index}`;
				const isActive = tab.id === currentActiveTabId;

				return (
					<div
						key={tab.id}
						id={panelId}
						role="tabpanel"
						aria-labelledby={tabId}
						hidden={!isActive}
					>
						{tab.content}
					</div>
				);
			})}
		</div>
	);
}
