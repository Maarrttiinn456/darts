import SectionHeader from '@/components/section-header';
import TournamentCard from '@/components/tournament/tournament-card';
import AddTournamentDialog from '@/components/tournament/add-tournament-dialog';
import { createSupabaseServerClient } from '@/lib/supabase';
import StepBack from '@/components/step-back';
import { Tournament, LeagueMember } from '@/lib/types';
import LeagueLeaderboard from '@/components/league/league-leaderboard';

export default async function LeagueDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const supabase = await createSupabaseServerClient();

    const leagueId = (await params).id;

    const [{ data: tournaments }, { data: league }, { data: leagueMembers }] =
        (await Promise.all([
            supabase
                .from('tournaments')
                .select(
                    '*, games(*, game_results(*, profiles(username, color)))',
                )
                .eq('league_id', leagueId),
            supabase.from('leagues').select('name').eq('id', leagueId).single(),
            supabase
                .from('league_members')
                .select('player_id, profiles(id, username, color)')
                .eq('league_id', leagueId),
        ])) as [
            { data: Tournament[] | null; error: unknown },
            { data: { name: string } | null; error: unknown },
            { data: LeagueMember[] | null; error: unknown },
        ];

    return (
        <div className="space-y-6">
            <StepBack path="/" />

            <h1 className="text-3xl font-bold">
                Liga: {league?.name || 'Neznámý turnaj'}
            </h1>

            <LeagueLeaderboard
                leagueMembers={leagueMembers}
                tournaments={tournaments}
            />

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
