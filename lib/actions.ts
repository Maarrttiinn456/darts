'use server';

import { redirect } from 'next/navigation';
import { LoginFormData, RegisterFormData } from './schemas';
import { createSupabaseServerClient } from './supabase';
import { ActionResponse, GameResults } from './types';
import { revalidatePath } from 'next/cache';

export async function handleRegister(
    formData: RegisterFormData,
): Promise<ActionResponse> {
    if (!formData) {
        return { ok: false, message: 'Neplatná data z formuláře' };
    }

    const supabase = await createSupabaseServerClient();

    const { email, password, username, color } = formData;

    const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username, color },
        },
    });

    if (authError) {
        console.error('Auth error:', authError);
        return { ok: false, message: authError.message };
    }

    //uživatel se zapíše do tabulky profiles v supabase pomocí triggeru

    return { ok: true, message: 'Účet byl úspěšně vytvořen' };
}

export async function handleUpdateSettings(
    formData: FormData,
): Promise<ActionResponse> {
    const username = formData.get('username') as string;
    const color = formData.get('color') as string;

    const supabase = await createSupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false, message: 'Nejsi přihlášen' };

    const { error } = await supabase
        .from('profiles')
        .update({ username, color })
        .eq('id', user.id);

    if (error) return { ok: false, message: error.message };

    revalidatePath('/');
    return { ok: true, message: 'Nastavení bylo úspěšně aktualizováno' };
}

export async function handleLogin(
    formData: LoginFormData,
): Promise<ActionResponse> {
    if (!formData) {
        return { ok: false, message: 'Neplatná data z formuláře' };
    }

    const supabase = await createSupabaseServerClient();

    const { email, password } = formData;

    const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (authError) {
        console.error('Auth error:', authError);
        return { ok: false, message: authError.message };
    }

    return { ok: true, message: 'Jste příhlášen' };
}

export async function logoutAction() {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect('/login');
}

export async function createLeague(
    leagueName: string,
    players: string[],
): Promise<ActionResponse> {
    const supabase = await createSupabaseServerClient();

    const { data: league, error: leagueError } = await supabase
        .from('leagues')
        .insert({ name: leagueName })
        .select()
        .single();

    if (leagueError) {
        return { ok: false, message: leagueError.message };
    }

    const { error: membersError } = await supabase
        .from('league_members')
        .insert(
            players.map((playerId) => ({
                league_id: league.id,
                player_id: playerId,
            })),
        );

    if (membersError) {
        return { ok: false, message: membersError.message };
    }

    return { ok: true, message: 'Liga úspěšně vytvořena' };
}

export async function createTournament(
    formData: FormData,
    leagueId: string,
): Promise<ActionResponse & { tournamentId?: string }> {
    const name = formData.get('name') as string;

    if (!name) {
        return { ok: false, message: 'Vyplňte prosím název turnaje' };
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from('tournaments')
        .insert({ league_id: leagueId, name: name })
        .select()
        .single();

    if (error) {
        console.log(error.message);
        return {
            ok: false,
            message: error.message,
        };
    }

    return {
        ok: true,
        message: 'Turnaj úspěšně vytvořen',
        tournamentId: data.id,
    };
}

export async function createGame(
    formData: FormData,
    tournamentId: string,
): Promise<ActionResponse & { gameId?: string }> {
    const gameType = formData.get('game-type') as string;

    if (!gameType) {
        return { ok: false, message: 'Vyberte prosím typ hry' };
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from('games')
        .insert({ tournament_id: tournamentId, game_type: gameType })
        .select()
        .single();

    if (error) {
        console.log(error.message);
        return { ok: false, message: error.message };
    }

    return {
        ok: true,
        message: 'Hra úspěšně vytvořena',
        gameId: data.id,
    };
}

export async function submitGameResults(
    gameId: string,
    results: GameResults[],
): Promise<ActionResponse> {
    const ranked = [...results]
        .sort((a, b) => b.score - a.score)
        .map((result, index) => ({
            ...result,
            rank: index + 1,
        }));

    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from('game_results').insert(
        ranked.map((result) => ({
            game_id: gameId,
            player_id: result.playerId,
            points_earned: result.score,
            rank: result.rank,
        })),
    );

    if (error) {
        console.error('Error submitting game results:', error);
        return { ok: false, message: error.message };
    }

    revalidatePath(`/league`);
    return { ok: true, message: 'Výsledky úspěšně uloženy' };
}

export async function deleteGame(gameId: string): Promise<ActionResponse> {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.from('games').delete().eq('id', gameId);

    if (error) {
        console.error('Error deleting game:', error);
        return { ok: false, message: error.message };
    }

    revalidatePath(`/league`);
    return { ok: true, message: 'Hra úspěšně smazána' };
}
