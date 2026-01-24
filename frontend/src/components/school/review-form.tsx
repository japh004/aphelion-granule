"use client";

import { useState } from "react";
import { Star, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { CreateReviewPayload } from "@/lib/api";
import Link from "next/link";

interface ReviewFormProps {
    schoolId: string;
    onSubmit: (payload: CreateReviewPayload, userId: string) => Promise<unknown>;
    isAuthenticated: boolean;
    userId?: string;
}

export function ReviewForm({ schoolId, onSubmit, isAuthenticated, userId }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated || !userId) {
            toast.error("Vous devez être connecté pour laisser un avis");
            return;
        }

        if (rating === 0) {
            toast.error("Veuillez sélectionner une note");
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({
                schoolId,
                rating,
                comment: comment.trim() || undefined
            }, userId);

            toast.success("Merci pour votre avis !");
            setRating(0);
            setComment("");
        } catch (error) {
            console.error("Failed to submit review:", error);
            const errorMessage = error instanceof Error ? error.message : "Erreur lors de l'envoi";

            // Check if user already reviewed
            if (errorMessage.includes("already") || errorMessage.includes("déjà")) {
                toast.error("Vous avez déjà laissé un avis pour cette auto-école");
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-signal/5 border border-signal/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-mist text-center">
                    <Link href="/login" className="text-signal font-semibold hover:underline">
                        Connectez-vous
                    </Link>
                    {" "}pour laisser un avis sur cette auto-école.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-semibold text-snow mb-3">Donnez votre avis</h3>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                    >
                        <Star
                            className={`h-7 w-7 transition-colors ${star <= (hoverRating || rating)
                                    ? "text-signal fill-signal"
                                    : "text-white/20"
                                }`}
                        />
                    </button>
                ))}
                <span className="ml-2 text-sm text-mist">
                    {rating > 0 ? (
                        rating === 5 ? "Excellent !" :
                            rating === 4 ? "Très bien" :
                                rating === 3 ? "Bien" :
                                    rating === 2 ? "Passable" : "Décevant"
                    ) : "Sélectionnez une note"}
                </span>
            </div>

            {/* Comment */}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Partagez votre expérience (optionnel)..."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-snow text-sm placeholder:text-mist/50 focus:outline-none focus:border-signal/30 resize-none"
                rows={3}
            />

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-signal hover:bg-signal-dark text-asphalt font-bold py-2.5 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <Send className="h-4 w-4" />
                        Publier mon avis
                    </>
                )}
            </button>
        </form>
    );
}
