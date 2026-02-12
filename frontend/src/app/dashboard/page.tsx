"use client";

import { useAuth } from "@/hooks";
import { PartnerDashboard } from "@/components/dashboard/partner-dashboard";
import { StudentDashboard } from "@/components/dashboard/student-dashboard";
import { VisitorDashboard } from "@/components/dashboard/visitor-dashboard";

export default function DashboardPage() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-4 border-signal/10"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-signal border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (user?.role === 'SCHOOL_ADMIN') {
        return <PartnerDashboard user={user} />;
    }

    if (user?.role === 'VISITOR') {
        return <VisitorDashboard user={user} />;
    }

    return <StudentDashboard />;
}

