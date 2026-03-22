import SectionHeader from '@/components/section-header';
import TournamentCard from '@/components/tournament/tournament-card';
import AddTournamentDialog from '@/components/tournament/add-tournament-dialog';
import { createSupabaseServerClient } from '@/lib/supabase';
import StepBack from '@/components/step-back';

export default async function LeagueDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const supabase = await createSupabaseServerClient();

    const leagueId = (await params).id;

    const [{ data: tournaments }, { data: league_members }] = await Promise.all(
        [
            supabase.from('tournaments').select('*').eq('league_id', leagueId),
            supabase
                .from('league_members')
                .select('*')
                .eq('league_id', leagueId),
        ],
    );

    return (
        <div className="space-y-6">
            <StepBack path="/" />

            <SectionHeader heading="Turnaje">
                <AddTournamentDialog />
            </SectionHeader>

            {tournaments?.length === 0 ? (
                <div className="text-center text-gray-500">
                    Žádné turnaje nenalezeny
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tournaments?.map((tournament) => (
                        <TournamentCard
                            key={tournament.id}
                            leagueId={leagueId}
                            {...tournament}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

//potrebuju v vypsat Tournaments s hraci a i jejich skore

//potrebuju league id abych:
//se dotazal na league_members
//se dotazal na tournaments
