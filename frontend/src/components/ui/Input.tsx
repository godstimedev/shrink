import React from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	containerClassName?: string;
	icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, containerClassName, label, error, icon, ...props }, ref) => {
		return (
			<div className={cn('flex flex-col gap-1.5 w-full', containerClassName)}>
				{label && <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
				<div className="relative group">
					<input
						ref={ref}
						className={cn(
							'flex h-12 w-full rounded-xl border border-slate-200/20 bg-white/5 px-4 py-2',
							'text-base ring-offset-brand-950 file:border-0 file:bg-transparent',
							'file:text-sm file:font-medium placeholder:text-slate-500',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:border-brand-500',
							'disabled:cursor-not-allowed disabled:opacity-50',
							'transition-all duration-200 ease-in-out',
							'hover:border-slate-200/40 hover:bg-white/10',
							icon && 'pl-11',
							error && 'border-red-500/50 focus-visible:ring-red-500/50 focus-visible:border-red-500',
							className,
						)}
						{...props}
					/>
					{icon && (
						<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-400 transition-colors">
							{icon}
						</div>
					)}
				</div>
				<AnimatePresence>
					{error && (
						<motion.p
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -5 }}
							className="text-xs text-red-400 font-medium ml-1"
						>
							{error}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		);
	},
);

Input.displayName = 'Input';
