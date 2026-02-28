export default function Home() {
    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700/50 mb-8 shadow-lg backdrop-blur-sm cursor-default hover:bg-slate-800/80 transition-colors">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-medium text-slate-300">A Safe Space to Connect</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    <span className="block text-slate-100">You don't have to</span>
                    <span className="block text-gradient mt-2 pb-2">fight it alone.</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    An anonymous, supportive community for those navigating GAD, OCD, and anxiety.
                    Share your journey, learn strategies, and grow together without judgment.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 transform duration-200">
                        Join the Community
                    </button>
                    <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold transition-all hover:-translate-y-0.5 transform duration-200">
                        Explore Topics
                    </button>
                </div>
            </div>
        </div>
    );
}
