import SectionHeader from '@/components/section-header';
import TournamentCard from '@/components/tournament/tournament-card';
import AddDialog from '@/components/add-dialog';

const PLACEHOLDER_TOURNAMENTS = [
    {
        id: 'tour-1',
        name: 'Jarní liga – kolo 1',
        date: '8. března 2025',
        players: [
            { position: 1, username: 'Marek Novák', color: '#f59e0b' },
            { position: 2, username: 'Pavel Šimek', color: '#3b82f6' },
            { position: 3, username: 'Tomáš Blaha', color: '#10b981' },
            { position: 4, username: 'Lukáš Král', color: '#ef4444' },
            { position: 5, username: 'Jan Dvořák', color: '#8b5cf6' },
        ],
    },
    {
        id: 'tour-2',
        name: 'Jarní liga – kolo 2',
        date: '22. března 2025',
        players: [
            { position: 1, username: 'Tomáš Blaha', color: '#10b981' },
            { position: 2, username: 'Marek Novák', color: '#f59e0b' },
            { position: 3, username: 'Jan Dvořák', color: '#8b5cf6' },
            { position: 4, username: 'Lukáš Král', color: '#ef4444' },
            { position: 5, username: 'Pavel Šimek', color: '#3b82f6' },
        ],
    },
    {
        id: 'tour-3',
        name: 'Jarní liga – kolo 3',
        date: '5. dubna 2025',
        players: [
            { position: 1, username: 'Pavel Šimek', color: '#3b82f6' },
            { position: 2, username: 'Lukáš Král', color: '#ef4444' },
            { position: 3, username: 'Marek Novák', color: '#f59e0b' },
            { position: 4, username: 'Jan Dvořák', color: '#8b5cf6' },
            { position: 5, username: 'Tomáš Blaha', color: '#10b981' },
        ],
    },
];

export default async function LeagueDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <div className="space-y-6">
            <SectionHeader heading="Turnaje">
                <AddDialog />
            </SectionHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PLACEHOLDER_TOURNAMENTS.map((tournament) => (
                    <TournamentCard
                        key={tournament.id}
                        leagueId={id}
                        {...tournament}
                    />
                ))}
            </div>
        </div>
    );
}
