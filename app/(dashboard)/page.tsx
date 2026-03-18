import LeagueList from '@/components/league/league-list';
import SectionHeader from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function DashboardPage() {
    return (
        <div className="space-y-4">
            <SectionHeader heading="Všechny ligy">
                <Button variant="default">
                    <Link
                        href="/league/add"
                        className="flex items-center gap-2"
                    >
                        <Plus className="size-4" />
                        Přidat ligu
                    </Link>
                </Button>
            </SectionHeader>
            <Suspense fallback={<div>Loading...</div>}>
                <LeagueList />
            </Suspense>
        </div>
    );
}
