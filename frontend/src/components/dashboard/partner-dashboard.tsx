"use client";

import { Users, CreditCard, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePartnerStats, usePartnerBookings } from "@/hooks";

interface PartnerDashboardProps {
    user: any;
}

export function PartnerDashboard({ user }: PartnerDashboardProps) {
    const { stats, loading: statsLoading, error: statsError } = usePartnerStats();
    const { bookings, loading: bookingsLoading, error: bookingsError } = usePartnerBookings();

    if (statsLoading || bookingsLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-4 border-signal/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-signal border-t-transparent animate-spin"></div>
                </div>
                <p className="text-mist font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">Chargement des données...</p>
            </div>
        );
    }

    if (statsError || bookingsError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-red-500/5 rounded-[2rem] border border-red-500/10 text-center">
                <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-black text-snow mb-2">Une erreur est survenue</h3>
                <p className="text-mist max-w-sm mb-6">{statsError || bookingsError}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-red-500 text-white font-bold rounded-xl text-xs uppercase"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-snow uppercase tracking-tight">Tableau de bord</h2>
                    <p className="text-mist font-bold">Ravi de vous revoir, {user.firstName} ! Voici les performances de votre école.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-snow text-xs font-black uppercase tracking-widest hover:border-signal/30 transition-all">Exporter</button>
                    <button className="px-5 py-2.5 rounded-xl bg-signal hover:bg-signal-dark text-asphalt text-xs font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(255,193,7,0.2)] transition-all">+ Inscription</button>
                </div>
            </div>

            {/* Profile Status Banner */}
            <div className="bg-signal/10 border border-signal/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-signal/5 blur-[100px] rounded-full group-hover:bg-signal/10 transition-colors duration-1000" />

                <div className="relative h-32 w-32 shrink-0 hidden md:block">
                    <Image
                        src="/dashboard_welcome_dark.png"
                        alt="Welcome"
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                    <h3 className="text-xl font-black text-snow mb-2">Votre profil est incomplet à 20%</h3>
                    <p className="text-sm text-mist mb-6 font-medium leading-relaxed max-w-xl">
                        Ajoutez votre logo et vos horaires pour obtenir le badge <span className="text-signal font-bold">&quot;Vérifié&quot;</span> et gagner la confiance de <span className="text-snow">3x plus d&apos;élèves</span> ce mois-ci.
                    </p>
                    <button className="px-6 py-3 rounded-xl bg-signal hover:bg-signal-dark text-asphalt text-xs font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl">
                        Compléter mon profil
                    </button>
                </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Chiffre d'Affaires"
                    value={stats?.revenue || "0 FCFA"}
                    sub={`+${stats?.revenueGrowth}% ce mois`}
                    icon={CreditCard}
                    uprising={true}
                />
                <KpiCard
                    title="Inscriptions"
                    value={stats?.enrollments?.toString() || "0"}
                    sub={`+${stats?.enrollmentGrowth} cette semaine`}
                    icon={Users}
                    uprising={true}
                />
                <KpiCard
                    title="Taux de réussite"
                    value={stats?.successRate || "0%"}
                    sub="-2% vs mois dernier"
                    icon={TrendingUp}
                    uprising={false}
                />
                <KpiCard
                    title="Leçons à venir"
                    value={stats?.upcomingLessons?.toString() || "0"}
                    sub="Aujourd'hui"
                    icon={Calendar}
                    uprising={true}
                />
            </div>

            {/* Recent Activity / Quick Actions */}
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/5 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-snow uppercase tracking-widest">Dernières Réservations</h3>
                        <Link href="/dashboard/bookings" className="text-[10px] font-black text-signal uppercase tracking-widest hover:underline">Voir tout</Link>
                    </div>
                    <div className="space-y-6">
                        {bookings.length > 0 ? bookings.slice(0, 3).map((item, i) => (
                            <div key={item.id} className="flex items-center justify-between p-4 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/[0.07] hover:border-white/10 transition-all cursor-pointer">
                                <div>
                                    <div className="font-black text-snow group-hover:text-signal transition-colors">Inscription #{item.id.substring(0, 8)}</div>
                                    <div className="text-[10px] text-mist font-bold uppercase tracking-wider">{item.offer.name} • {new Date(item.date).toLocaleDateString('fr-FR')}</div>
                                </div>
                                <StatusBadge status={item.status === 'CONFIRMED' ? 'Confirmé' : 'En attente'} />
                            </div>
                        )) : (
                            <div className="text-center py-10 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                <p className="text-xs text-mist font-bold uppercase tracking-widest">Aucune réservation</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] border border-white/5 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-snow uppercase tracking-widest">Planning du jour</h3>
                        <Link href="/dashboard/planning" className="text-[10px] font-black text-signal uppercase tracking-widest hover:underline text-right">Calendrier complet</Link>
                    </div>
                    <div className="space-y-6">
                        {[
                            { time: "08:00 - 10:00", activity: "Cours de Code (Salle A)", instr: "Jean-Pierre" },
                            { time: "10:30 - 12:30", activity: "Conduite (Yaris 1234)", instr: "Junior" },
                            { time: "14:00 - 16:00", activity: "Conduite (Yaris 1234)", instr: "Junior" },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start p-4 rounded-3xl bg-white/5 border border-white/5">
                                <div className="bg-signal/10 text-signal px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap border border-signal/20 shadow-lg shadow-signal/5">
                                    {item.time}
                                </div>
                                <div>
                                    <div className="font-black text-snow">{item.activity}</div>
                                    <div className="text-[10px] text-mist font-bold uppercase tracking-widest mt-1">Moniteur: {item.instr}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, sub, icon: Icon, uprising }: { title: string, value: string, sub: string, icon: any, uprising: boolean }) {
    return (
        <div className="bg-white/[0.03] backdrop-blur-md rounded-[2rem] border border-white/5 p-7 group hover:border-signal/30 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-mist uppercase tracking-widest">{title}</span>
                <div className="p-2 rounded-xl bg-white/5 text-mist group-hover:text-signal transition-colors group-hover:scale-110 duration-500">
                    <Icon className="h-4 w-4" />
                </div>
            </div>
            <div className="text-2xl font-black text-snow mb-1 tracking-tight">{value}</div>
            <div className="flex items-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${uprising ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
                <p className={`text-[10px] ${uprising ? 'text-green-400' : 'text-red-400'} font-black uppercase tracking-widest`}>
                    {sub}
                </p>
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const isConfirmed = status === "Confirmé";
    return (
        <span className={`text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest border ${isConfirmed
            ? "bg-green-500/10 text-green-400 border-green-500/20"
            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
            }`}>
            {status}
        </span>
    )
}
