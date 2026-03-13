import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, ExternalLink, Calendar } from 'lucide-react';
import { Button } from './ui/Button';

interface UrlShortenerResultProps {
	originalUrl: string;
	shortUrl: string;
	createdAt: string;
}

export function UrlShortenerResult({ originalUrl, shortUrl, createdAt }: UrlShortenerResultProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(shortUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				className="max-w-xl mx-auto w-full mt-8"
			>
				<div className="glass-panel rounded-2xl p-6 border-l-4 border-l-brand-500 relative overflow-hidden group">
					<div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

					<div className="relative z-10">
						<div className="flex items-start justify-between gap-4 mb-4">
							<div className="overflow-hidden">
								<p className="text-sm text-slate-400 truncate mb-1 flex items-center gap-2">
									<Calendar className="h-3 w-3" />
									{new Date(createdAt).toLocaleDateString()}
								</p>
								<div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
									<span className="truncate max-w-50 hover:text-slate-300 transition-colors">
										{originalUrl}
									</span>
								</div>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
							<a
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex-1 text-lg font-medium text-brand-400 hover:text-brand-300 transition-colors px-3 truncate w-full text-center sm:text-left"
							>
								{shortUrl}
							</a>

							<div className="flex gap-2 w-full sm:w-auto">
								<Button
									onClick={handleCopy}
									variant={copied ? 'primary' : 'secondary'}
									className="flex-1 sm:flex-none"
								>
									{copied ? (
										<>
											<Check className="h-4 w-4 mr-2" />
											Copied
										</>
									) : (
										<>
											<Copy className="h-4 w-4 mr-2" />
											Copy
										</>
									)}
								</Button>
								<a href={shortUrl} target="_blank" rel="noopener noreferrer">
									<Button variant="ghost" size="icon">
										<ExternalLink className="h-4 w-4" />
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
