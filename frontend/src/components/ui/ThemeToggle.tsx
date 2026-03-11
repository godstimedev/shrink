import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { Button } from './Button';
import { motion } from 'framer-motion';

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="relative overflow-hidden"
		>
			<motion.div
				initial={false}
				animate={{
					scale: theme === 'dark' ? 0 : 1,
					rotate: theme === 'dark' ? 90 : 0,
				}}
				transition={{ duration: 0.2 }}
				className="absolute"
			>
				<Sun className="h-5 w-5" />
			</motion.div>
			<motion.div
				initial={false}
				animate={{
					scale: theme === 'dark' ? 1 : 0,
					rotate: theme === 'dark' ? 0 : -90,
				}}
				transition={{ duration: 0.2 }}
				className="absolute"
			>
				<Moon className="h-5 w-5" />
			</motion.div>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
