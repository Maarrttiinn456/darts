import LeagueList from '@/components/league/league-list';
import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Všechny ligy
                </h1>
                <Button variant="default">
                    <Link
                        href="/league/add"
                        className="flex items-center gap-2"
                    >
                        <Plus className="size-4" />
                        Přidat ligu
                    </Link>
                </Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <LeagueList />
            </Suspense>
        </div>
    );
}
