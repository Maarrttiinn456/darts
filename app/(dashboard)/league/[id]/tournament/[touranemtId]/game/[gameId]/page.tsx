import GamePlan from '@/components/game/game-plan';
import { createSupabaseServerClient } from '@/lib/supabase';
import { LeagueMemberWithProfile } from '@/lib/types';

export default async function GamePage({
    params,
}: {
    params: { id: string; touranemtId: string; gameId: string };
}) {
    const supabase = await createSupabaseServerClient();

    const { id, touranemtId, gameId } = await params;

    console.log('leagueId:', id);
    console.log('tournamentId:', touranemtId);
    console.log('gameId:', gameId);

    const { data: players, error } = (await supabase
        .from('league_members')
        .select('player_id, profiles(*)')
        .eq('league_id', id)) as {
        data: LeagueMemberWithProfile[] | null;
        error: unknown;
    };

    console.log('players:', players);

    return (
        <div>
            {players && players.length > 0 ? (
                <GamePlan players={players} gameId={gameId} />
            ) : (
                <p>No players found for this league.</p>
            )}
        </div>
    );
}

//Na strance game page budu mit vypis vsech hraci kteri hraj
//Vsechny musim zapsat do databaze a to do tabulky game_results s body a poradi
//bude tady moznost hru ukoncita tim padem se do games tabulky propise status "completed" a presmeruju me na stranku turnaj z ktereho jsem prisel
