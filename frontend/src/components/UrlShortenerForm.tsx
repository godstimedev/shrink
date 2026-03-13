import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, ArrowRight, Wand2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useShorten } from '../hooks/useShorten';
import { GeneralChangeEventType } from '../types/ChangeEvent.types';
import { UrlResult } from '../types/UrlShortener.types';

type PropTypes = {
	setResult: React.Dispatch<React.SetStateAction<UrlResult | null>>;
};

export const UrlShortenerForm = (props: PropTypes) => {
	const { setResult } = props;

	const [formData, setFormData] = useState({
		url: '',
		customAlias: '',
	});

	const [error, setError] = useState('');
	const handleChange: GeneralChangeEventType = (event, name, value) => {
		name = event?.target.name || name || '';
		value = event?.target.value || value || '';

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const { mutate, isPending, isError } = useShorten();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setResult(null);

		mutate(formData, {
			onSuccess: (data) => {
				setResult(data);
			},
			onError: (err: any) => {
				setError(err?.response?.data?.error);
			},
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.2, duration: 0.5 }}
			className="max-w-xl mx-auto w-full"
		>
			<div className="glass-panel p-2 rounded-2xl sm:rounded-3xl shadow-xl shadow-black/20">
				<form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 sm:p-2">
					<div className="flex flex-col sm:flex-row gap-2">
						<div className="flex-1">
							<Input
								placeholder="Paste your long link here..."
								name="url"
								value={formData.url}
								onChange={handleChange}
								icon={<Link2 className="h-4 w-4" />}
								className="h-12 sm:h-14 bg-white/5 border-transparent focus:bg-white/10"
								containerClassName="w-full"
								required
							/>
						</div>
						<Button
							type="submit"
							size="lg"
							isLoading={isPending}
							className="h-12 sm:h-14 rounded-xl px-8 w-full sm:w-auto shrink-0"
						>
							Shorten
							{!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
						</Button>
					</div>

					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						className="overflow-hidden"
					>
						<div className="pt-2">
							<Input
								placeholder="Custom alias (optional)"
								name="customAlias"
								value={formData.customAlias}
								onChange={handleChange}
								icon={<Wand2 className="h-4 w-4" />}
								className="h-10 bg-transparent border-slate-200/10 focus:border-brand-500/50"
							/>
						</div>
					</motion.div>

					{isError && error && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-red-400 text-sm px-2 mt-1"
						>
							{error}
						</motion.p>
					)}
				</form>
			</div>
		</motion.div>
	);
};
