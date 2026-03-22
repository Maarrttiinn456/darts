import SectionHeader from '@/components/section-header';
import AddGameDialog from '@/components/game/add-game-dialog';
import { createSupabaseServerClient } from '@/lib/supabase';
import { TournamentGame } from '@/lib/types';
import StepBack from '@/components/step-back';

export default async function TournamentPage({
    params,
}: {
    params: Promise<{ id: string; touranemtId: string }>;
}) {
    const supabase = await createSupabaseServerClient();

    const tournamentId = (await params).touranemtId;

    const { data: tournamentGames, error } = (await supabase
        .from('games')
        .select('*, game_results(*, profiles(username, color))')
        .eq('tournament_id ', tournamentId)
        .order('created_at', { ascending: false })) as {
        data: TournamentGame[] | null;
        error: unknown;
    };

    if (error) {
        console.error('Error fetching tournament games:', error);
        return <div>Chyba při načítání her.</div>;
    }

    console.log('Tournament Games:', tournamentGames);

    return (
        <div className="space-y-6">
            <StepBack path={`/league/${(await params).id}`} />

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
                            <div className="flex flex-wrap gap-2 mt-1">
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
