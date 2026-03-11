import { Link, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { Button } from './ui/Button';

export function Navbar() {
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
			<div className="max-w-6xl mx-auto">
				<div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="bg-brand-500/10 p-2 rounded-xl">
							<Link className="h-5 w-5 text-brand-500" />
						</div>
						<span className="font-display font-bold text-xl tracking-tight">Shrink</span>
					</div>

					<div className="flex items-center gap-4">
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block"
						>
							GitHub
						</a>
						<div className="h-4 w-px bg-white/10 hidden sm:block" />
						<ThemeToggle />
						<Button size="sm" className="hidden sm:flex">
							<Sparkles className="w-4 h-4 mr-2" />
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}
