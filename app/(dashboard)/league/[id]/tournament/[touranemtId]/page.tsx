import SectionHeader from '@/components/section-header';
import AddGameDialog from '@/components/game/add-game-dialog';
import { createSupabaseServerClient } from '@/lib/supabase';
import { TournamentGame } from '@/lib/types';
import StepBack from '@/components/step-back';
import TournamentLeaderboard from '@/components/tournament/tournament-leaderboard';
import { LeagueMemberWithProfile } from '@/lib/types';

export default async function TournamentPage({
    params,
}: {
    params: Promise<{ id: string; touranemtId: string }>;
}) {
    const supabase = await createSupabaseServerClient();

    const { id: leagueId, touranemtId: tournamentId } = await params;

    const [
        { data: tournamentGames, error },
        { data: tournament },
        { data: leagueMembers },
    ] = (await Promise.all([
        supabase
            .from('games')
            .select('*, game_results(*, profiles(username, color))')
            .eq('tournament_id', tournamentId)
            .order('created_at', { ascending: false }),
        supabase
            .from('tournaments')
            .select('name')
            .eq('id', tournamentId)
            .single(),
        supabase
            .from('league_members')
            .select('player_id, profiles(id, username, color)')
            .eq('league_id', leagueId),
    ])) as [
        { data: TournamentGame[] | null; error: unknown },
        { data: { name: string } | null; error: unknown },
        {
            data: LeagueMemberWithProfile[] | null;
            error: unknown;
        },
    ];

    if (error) {
        console.error('Error fetching tournament games:', error);
        return <div>Chyba při načítání her.</div>;
    }

    return (
        <div className="space-y-6">
            <StepBack path={`/league/${leagueId}`} />

            <h1 className="text-3xl font-bold">
                Turnaj: {tournament?.name || 'Neznámý turnaj'}
            </h1>

            <TournamentLeaderboard
                tournamentGames={tournamentGames}
                leagueMembers={leagueMembers}
            />

            <SectionHeader heading="Odehrané hry">
                <AddGameDialog />
            </SectionHeader>

            {tournamentGames?.length === 0 ? (
                <div className="text-center text-gray-500">
                    Zatím žádné odehrané hry.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tournamentGames?.map((game) => (
                        <div key={game.id} className="p-4 border rounded">
                            <h3 className="text-lg font-semibold">
                                {game.game_type}
                            </h3>
                            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 text-sm text-gray-400">
                                {game.game_results
                                    .sort((a, b) => a.rank - b.rank)
                                    .map((result) => (
                                        <div key={result.id}>
                                            {result.rank}.{' '}
                                            {result.profiles.username}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
