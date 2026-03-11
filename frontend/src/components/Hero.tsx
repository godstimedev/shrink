import { motion } from 'framer-motion';

export function Hero() {
	return (
		<div className="relative pt-32 pb-20 text-center px-6">
			{/* Background Glow */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-500/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative z-10"
			>
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-brand-300 mb-6">
					<span className="relative flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
					</span>
					Now faster than ever
				</div>

				<h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight mb-6">
					Shorten Your Links <br />
					<span className="text-gradient">Expand Your Reach</span>
				</h1>

				<p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
					Transform long, ugly URLs into short, memorable links. Track clicks, analyze data, and manage
					your brand with our premium URL shortener.
				</p>
			</motion.div>
		</div>
	);
}
