"use client";

import { useState } from "react";
import { useAuth, useInvoices } from "@/hooks";
import { EmptyState } from "@/components/ui/empty-state";
import {
    FileText,
    Loader2,
    Download,
    CheckCircle,
    Clock,
    AlertCircle,
    CreditCard,
    RefreshCw,
    FileSpreadsheet
} from "lucide-react";
import { toast } from "sonner";
import { Invoice } from "@/lib/api";

const STATUS_CONFIG = {
    PENDING: {
        label: "En attente",
        icon: Clock,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    },
    PAID: {
        label: "Payée",
        icon: CheckCircle,
        className: "bg-green-500/10 text-green-500 border-green-500/20"
    },
    FAILED: {
        label: "Échouée",
        icon: AlertCircle,
        className: "bg-red-500/10 text-red-500 border-red-500/20"
    },
    REFUNDED: {
        label: "Remboursée",
        icon: RefreshCw,
        className: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
    MTN_MOMO: "MTN Mobile Money",
    ORANGE_MONEY: "Orange Money",
    CARD: "Carte bancaire",
    CASH: "Espèces"
};

export default function InvoicesPage() {
    const { user } = useAuth();
    const isSchoolAdmin = user?.role === "SCHOOL_ADMIN";

    // Use schoolId for school admins, userId for students
    const { invoices, loading, error, refetch, payInvoice, totalPending, totalPaid } = useInvoices(
        isSchoolAdmin && user?.schoolId
            ? { schoolId: user.schoolId }
            : { userId: user?.id }
    );
    const [payingId, setPayingId] = useState<string | null>(null);

    const handlePayInvoice = async (invoiceId: string, method: Invoice['paymentMethod']) => {
        setPayingId(invoiceId);
        try {
            const reference = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            await payInvoice(invoiceId, method, reference);
            toast.success("Paiement effectué avec succès !");
        } catch (err) {
            console.error("Payment failed:", err);
            toast.error("Erreur lors du paiement. Veuillez réessayer.");
        } finally {
            setPayingId(null);
        }
    };

    const handleExportCSV = () => {
        if (invoices.length === 0) {
            toast.error("Aucune facture à exporter");
            return;
        }

        // Create CSV content
        const headers = ["ID", "Client", "Offre", "Montant", "Statut", "Date création", "Date paiement", "Méthode"];
        const rows = invoices.map(inv => [
            inv.id.slice(0, 8),
            inv.booking?.schoolName || "N/A",
            inv.booking?.offerName || "N/A",
            inv.amount.toString(),
            STATUS_CONFIG[inv.status]?.label || inv.status,
            new Date(inv.createdAt).toLocaleDateString('fr-FR'),
            inv.paidAt ? new Date(inv.paidAt).toLocaleDateString('fr-FR') : "",
            inv.paymentMethod ? PAYMENT_METHOD_LABELS[inv.paymentMethod] || inv.paymentMethod : ""
        ]);

        const csvContent = [
            headers.join(";"),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(";"))
        ].join("\n");

        // Create and download blob
        const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `factures_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Export CSV téléchargé !");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-signal animate-spin mx-auto mb-4" />
                    <p className="text-mist">Chargement des factures...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full p-8">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-snow mb-2">Erreur de chargement</h3>
                    <p className="text-mist mb-4">{error}</p>
                    <button
                        onClick={refetch}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-snow font-medium transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    if (invoices.length === 0) {
        return (
            <div className="h-full p-8">
                <EmptyState
                    title="Aucune facture"
                    description={isSchoolAdmin
                        ? "Les factures des réservations confirmées apparaîtront ici."
                        : "Vos factures apparaîtront ici après votre première réservation."}
                    actionLabel={isSchoolAdmin ? undefined : "Rechercher une auto-école"}
                    actionHref={isSchoolAdmin ? undefined : "/search"}
                />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-snow mb-2">
                        {isSchoolAdmin ? "Factures des élèves" : "Mes Factures"}
                    </h1>
                    <p className="text-mist">
                        {isSchoolAdmin
                            ? "Consultez les factures de vos élèves inscrits."
                            : "Gérez vos paiements et consultez l'historique de vos transactions."}
                    </p>
                </div>
                {isSchoolAdmin && (
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-signal hover:bg-signal-dark text-asphalt font-bold transition-all"
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        Exporter CSV
                    </button>
                )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-signal/10">
                            <FileText className="h-5 w-5 text-signal" />
                        </div>
                        <span className="text-sm text-mist">Total factures</span>
                    </div>
                    <p className="text-2xl font-bold text-snow">{invoices.length}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-yellow-500/10">
                            <Clock className="h-5 w-5 text-yellow-500" />
                        </div>
                        <span className="text-sm text-mist">En attente</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-500">{totalPending.toLocaleString()} FCFA</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-green-500/10">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <span className="text-sm text-mist">Payé</span>
                    </div>
                    <p className="text-2xl font-bold text-green-500">{totalPaid.toLocaleString()} FCFA</p>
                </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-4">
                {invoices.map((invoice) => {
                    const statusConfig = STATUS_CONFIG[invoice.status];
                    const StatusIcon = statusConfig.icon;
                    const isPaying = payingId === invoice.id;

                    return (
                        <div
                            key={invoice.id}
                            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                {/* Invoice Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-sm font-mono text-mist/60">#{invoice.id.slice(0, 8)}</span>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.className}`}>
                                            <StatusIcon className="h-3 w-3" />
                                            {statusConfig.label}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-snow mb-1">
                                        {invoice.booking?.schoolName || "Auto-école"}
                                    </h3>
                                    <p className="text-sm text-mist">
                                        {invoice.booking?.offerName || "Formation"} • Créée le {formatDate(invoice.createdAt)}
                                    </p>
                                    {invoice.paidAt && (
                                        <p className="text-xs text-green-400 mt-1">
                                            Payée le {formatDate(invoice.paidAt)} via {PAYMENT_METHOD_LABELS[invoice.paymentMethod!] || invoice.paymentMethod}
                                        </p>
                                    )}
                                </div>

                                {/* Amount & Actions */}
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-signal">{invoice.amount.toLocaleString()} FCFA</p>
                                    </div>

                                    <div className="flex gap-2">
                                        {/* Pay button only for students with pending invoices */}
                                        {!isSchoolAdmin && invoice.status === 'PENDING' && (
                                            <button
                                                onClick={() => handlePayInvoice(invoice.id, 'MTN_MOMO')}
                                                disabled={isPaying}
                                                className="flex items-center gap-2 px-4 py-2 bg-signal hover:bg-signal-dark text-asphalt font-bold rounded-lg transition-all disabled:opacity-50"
                                            >
                                                {isPaying ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <CreditCard className="h-4 w-4" />
                                                )}
                                                Payer
                                            </button>
                                        )}
                                        <button
                                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-mist hover:text-snow transition-colors"
                                            title="Télécharger la facture"
                                        >
                                            <Download className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
