"use client";

import { Calendar, Clock, BookOpen, Star, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useBookings, useAuth, useStudentProgress } from "@/hooks";

export function StudentDashboard() {
    const { user } = useAuth();
    const { bookings, loading: bookingsLoading } = useBookings(user?.id);
    const { progress, loading: progressLoading } = useStudentProgress();

    const isLoading = bookingsLoading || progressLoading;

    // Use real data if available, fallback to defaults
    const codeProgress = progress?.codeProgress ?? 0;
    const codeSubtitle = progress
        ? `${progress.codeExamsCompleted} examens blancs sur ${progress.codeTotalExams}`
        : "Chargement...";

    const conduiteProgress = progress?.conduiteProgress ?? 0;
    const conduiteSubtitle = progress
        ? `${progress.conduiteHoursCompleted}h sur ${progress.conduiteTotalHours}h effectuées`
        : "Chargement...";

    const nextExamDate = progress?.nextExamDate ?? "Non planifié";
    const nextExamFormatted = nextExamDate !== "Non planifié"
        ? new Date(nextExamDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
        : nextExamDate;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-snow">Bonjour, {user?.firstName} !</h2>
                    <p className="text-mist">Voici le suivi de votre formation.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/search" className="px-4 py-2 rounded-xl bg-signal hover:bg-signal-dark text-asphalt font-bold shadow-[0_0_15px_rgba(255,193,7,0.2)] transition-all">
                        Trouver une auto-école
                    </Link>
                </div>
            </div>

            {/* Progress Grid */}
            <div className="grid gap-4 md:grid-cols-3">
                <ProgressCard
                    title="Code de la route"
                    progress={codeProgress}
                    color="text-signal"
                    icon={BookOpen}
                    subtitle={codeSubtitle}
                    loading={progressLoading}
                />
                <ProgressCard
                    title="Conduite"
                    progress={conduiteProgress}
                    color="text-blue-400"
                    icon={Clock}
                    subtitle={conduiteSubtitle}
                    loading={progressLoading}
                />
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 flex flex-col justify-center">
                    <p className="text-sm text-mist mb-1">Prochain cours / examen</p>
                    <p className="text-xl font-bold text-snow">{nextExamFormatted}</p>
                    {progress?.nextExamType && (
                        <span className="text-xs text-signal font-bold mt-1">{progress.nextExamType}</span>
                    )}
                    <Link href="/search" className="text-signal text-sm font-bold flex items-center gap-1 mt-2 hover:underline">
                        Prendre rendez-vous <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-snow">Mes Réservations Récentes</h3>
                    <Link href="/dashboard/bookings" className="text-sm text-signal hover:underline">Voir tout</Link>
                </div>

                {bookingsLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-signal"></div>
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.slice(0, 3).map((booking) => (
                            <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-signal/10 flex items-center justify-center text-signal">
                                        <Calendar className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-snow">{booking.school.name}</div>
                                        <div className="text-sm text-mist">{booking.offer.name}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:text-right gap-4">
                                    <div>
                                        <div className="text-sm text-snow">{new Date(booking.date).toLocaleDateString('fr-FR')}</div>
                                        <div className="text-xs text-mist">{booking.time || "Heure à confirmer"}</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${booking.status === 'CONFIRMED'
                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                        {booking.status === 'CONFIRMED' ? 'Confirmé' : 'En attente'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <p className="text-mist mb-4">Vous n&apos;avez pas encore de réservation.</p>
                        <Link href="/search" className="text-signal font-bold hover:underline">
                            Explorer les auto-écoles
                        </Link>
                    </div>
                )}
            </div>

            {/* Quick Tips */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-gradient-to-br from-signal/20 to-asphalt rounded-2xl p-6 border border-signal/30">
                    <h3 className="font-bold text-snow flex items-center gap-2 mb-3">
                        <Star className="h-5 w-5 text-signal fill-signal" /> Conseil du jour
                    </h3>
                    <p className="text-mist text-shm">
                        Pensez à réviser vos panneaux de signalisation au moins 15 minutes chaque jour pour être prêt pour l&apos;examen théorique.
                    </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <h3 className="font-bold text-snow mb-3">Documents utiles</h3>
                    <div className="space-y-2">
                        <p className="text-sm text-mist hover:text-signal cursor-pointer">📄 Guide du candidat au permis B</p>
                        <p className="text-sm text-mist hover:text-signal cursor-pointer">📄 Liste des pièces à fournir</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProgressCard({ title, progress, color, icon: Icon, subtitle, loading }: {
    title: string;
    progress: number;
    color: string;
    icon: any;
    subtitle: string;
    loading?: boolean;
}) {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <span className="font-bold text-snow">{title}</span>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-mist">
                    <span>Progression</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-signal transition-all duration-1000`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-xs text-mist pt-1">{subtitle}</p>
            </div>
        </div>
    );
}
