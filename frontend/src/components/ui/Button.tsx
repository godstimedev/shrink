import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
	variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
	size?: 'sm' | 'md' | 'lg' | 'icon';
	isLoading?: boolean;
	children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props },
		ref,
	) => {
		const variants = {
			primary:
				'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/20 border-transparent',
			secondary: 'bg-white/10 hover:bg-white/20 text-white border-white/10 border backdrop-blur-sm',
			ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border-transparent',
			danger:
				'bg-red-500/10 hover:bg-red-500/20 text-red-200 border-red-500/20 border hover:border-red-500/40',
		};

		const sizes = {
			sm: 'h-8 px-3 text-xs rounded-lg',
			md: 'h-10 px-4 py-2 text-sm rounded-xl',
			lg: 'h-12 px-6 text-base rounded-xl',
			icon: 'h-10 w-10 p-2 rounded-xl',
		};

		return (
			<motion.button
				ref={ref}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				className={cn(
					'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 disabled:pointer-events-none disabled:opacity-50',
					variants[variant],
					sizes[size],
					className,
				)}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						<span>Loading...</span>
					</>
				) : (
					children
				)}
			</motion.button>
		);
	},
);

Button.displayName = 'Button';
