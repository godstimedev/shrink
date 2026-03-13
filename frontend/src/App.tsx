import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { UrlShortenerForm } from './components/UrlShortenerForm';
import { UrlShortenerResult } from './components/UrlShortenerResult';
import { UrlResult } from './types/UrlShortener.types';

function App() {
	const [result, setResult] = useState<UrlResult | null>(null);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="min-h-screen font-body selection:bg-brand-500/30 selection:text-brand-200 overflow-x-hidden transition-colors duration-300">
				<Navbar />

				<main className="relative min-h-screen flex flex-col items-center justify-center p-6">
					{/* Decorative Elements */}
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
						<div className="absolute top-[20%] right-[10%] w-72 h-72 bg-brand-500/10 rounded-full blur-[100px]" />
						<div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
					</div>

					<div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
						<Hero />

						<UrlShortenerForm setResult={setResult} />

						{result && (
							<UrlShortenerResult
								originalUrl={result.originalURL}
								shortUrl={result.shortURL}
								createdAt={result.createdAt}
							/>
						)}
					</div>
				</main>

				<Footer />
			</div>
		</ThemeProvider>
	);
}

export default App;
