import Image from "next/image";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl md:min-h-[400px]">
            <div className="relative w-48 h-48 mb-6">
                <Image
                    src="/dashboard_welcome_dark.png"
                    alt="Empty state illustration"
                    fill
                    className="object-contain"
                />
            </div>
            <h3 className="text-xl font-bold text-snow mb-2">{title}</h3>
            <p className="text-mist max-w-sm mb-6">{description}</p>
            {actionLabel && (
                <button onClick={onAction} className="px-6 py-3 rounded-xl bg-signal hover:bg-signal-dark text-asphalt font-bold transition-all">
                    {actionLabel}
                </button>
            )}
        </div>
    );
}
