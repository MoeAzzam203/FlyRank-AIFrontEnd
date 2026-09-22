import Link from "next/link";
import type React from "react";
import "../globals.css";

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
				<div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-6 text-base leading-7 sm:px-6 sm:py-10 lg:px-8">
					<header className="space-y-5 border-b border-slate-200 pb-7">
						<div className="space-y-2">
							<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
								Accessibility Playground
							</h1>
							<p className="max-w-2xl text-slate-600">
								Hand-built accessibility primitives for this assignment.
							</p>
						</div>
						<nav aria-label="Accessibility playground">
							<ul className="flex flex-wrap gap-2 p-0" style={{ listStyle: "none" }}>
								<li>
									<Link
										href="/playground/modal"
										className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
									>
										Modal
									</Link>
								</li>
								<li>
									<Link
										href="/playground/tabs"
										className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
									>
										Tabs
									</Link>
								</li>
								<li>
									<Link
										href="/playground/disclosure"
										className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 shadow-sm transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
									>
										Disclosure
									</Link>
								</li>
							</ul>
						</nav>
					</header>
					<div className="mt-8 border-t border-slate-200 pt-8 sm:mt-10 sm:pt-10">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
