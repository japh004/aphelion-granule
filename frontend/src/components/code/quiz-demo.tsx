"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

const SAMPLE_QUESTION = {
    question: "Quelle est la vitesse maximale autorisée en agglomération au Cameroun ?",
    options: [
        { id: "a", text: "40 km/h", correct: false },
        { id: "b", text: "60 km/h", correct: true },
        { id: "c", text: "50 km/h", correct: false },
        { id: "d", text: "80 km/h", correct: false },
    ]
};

export function QuizDemo() {
    const [selected, setSelected] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = () => {
        if (selected) setHasSubmitted(true);
    };

    const isCorrect = selected === "b";

    return (
        <div className="w-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-signal via-signal/50 to-signal" />

            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-mist">Question Démo</span>
                <span className="text-sm font-bold text-signal bg-signal/10 px-3 py-1 rounded-full border border-signal/20">Thème: Vitesse</span>
            </div>

            <h3 className="text-xl font-bold text-snow mb-8 leading-relaxed">
                {SAMPLE_QUESTION.question}
            </h3>

            <div className="space-y-3 mb-8">
                {SAMPLE_QUESTION.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => !hasSubmitted && setSelected(option.id)}
                        disabled={hasSubmitted}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center
                            ${hasSubmitted && option.correct
                                ? "border-green-500 bg-green-500/10 text-green-400"
                                : hasSubmitted && selected === option.id && !option.correct
                                    ? "border-red-500 bg-red-500/10 text-red-400"
                                    : selected === option.id
                                        ? "border-signal bg-signal/10 text-snow shadow-[0_0_15px_rgba(255,193,7,0.2)]"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/5 text-mist"
                            }
                        `}
                    >
                        <span className="font-medium">{option.text}</span>
                        {hasSubmitted && option.correct && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {hasSubmitted && selected === option.id && !option.correct && <XCircle className="h-5 w-5 text-red-500" />}
                    </button>
                ))}
            </div>

            {!hasSubmitted ? (
                <button
                    onClick={handleSubmit}
                    className="w-full bg-signal hover:bg-signal-dark text-asphalt font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(255,193,7,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selected}
                >
                    Valider ma réponse
                </button>
            ) : (
                <div className={`p-4 rounded-xl text-center ${isCorrect ? "bg-green-500/10 border border-green-500/30 text-green-400" : "bg-red-500/10 border border-red-500/30 text-red-400"}`}>
                    <p className="font-bold mb-1">
                        {isCorrect ? "Bravo ! C'est la bonne réponse." : "Oups ! La bonne réponse était 60 km/h."}
                    </p>
                    <p className="text-sm opacity-90">En ville, la vitesse est limitée à 60 km/h sauf indication contraire.</p>
                </div>
            )}
        </div>
    );
}
