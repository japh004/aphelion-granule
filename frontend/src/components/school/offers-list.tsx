import { Offer } from "@/lib/api";
import { Check, Clock } from "lucide-react";

interface OffersListProps {
    offers?: Offer[];
    onSelectOffer?: (offer: Offer) => void;
}

export function OffersList({ offers, onSelectOffer }: OffersListProps) {
    if (!offers || offers.length === 0) return null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-snow mb-6">Nos Formules</h2>
            <div className="grid gap-4">
                {offers.map((offer) => (
                    <div key={offer.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-signal/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-snow">{offer.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock className="h-4 w-4 text-signal" />
                                    <span className="text-xs text-mist">
                                        {offer.hours} heures de conduite
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-signal">{offer.price.toLocaleString()} FCFA</span>
                            </div>
                        </div>

                        {offer.description && (
                            <p className="text-mist text-sm mb-4">{offer.description}</p>
                        )}

                        {/* Features (if provided by API in future) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                            {(offer as any).features?.map((feat: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-mist">
                                    <Check className="h-4 w-4 text-signal" />
                                    {feat}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => onSelectOffer?.(offer)}
                            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-white/5 border border-signal/30 text-signal font-bold hover:bg-signal/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Choisir cette formule
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
