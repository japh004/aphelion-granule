import { EmptyState } from "@/components/ui/empty-state";

export default function PlanningPage() {
    return (
        <div className="h-full p-8">
            <EmptyState
                title="Planning"
                description="Votre emploi du temps est vide pour le moment."
                actionLabel="Voir les cours disponibles"
            />
        </div>
    );
}
