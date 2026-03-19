import SectionHeader from '@/components/section-header';
import TournamentCard from '@/components/tournament/tournament-card';
import AddTournamentDialog from '@/components/tournament/add-tournament-dialog';
import { createSupabaseServerClient } from '@/lib/supabase';

export default async function LeagueDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const supabase = await createSupabaseServerClient();

    const leagueId = (await params).id;

    return (
        <div className="space-y-6">
            <SectionHeader heading="Turnaje">
                <AddTournamentDialog />
            </SectionHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/**
                {PLACEHOLDER_TOURNAMENTS.map((tournament) => (
                    <TournamentCard
                        key={tournament.id}
                        leagueId={id}
                        {...tournament}
                    />
                ))}
                     */}
            </div>
        </div>
    );
}

//potrebuju v vypsat Tournaments s hraci a i jejich skore

//potrebuju league id abych:
//se dotazal na league_members
//se dotazal na tournaments
