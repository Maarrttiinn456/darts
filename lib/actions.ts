'use server';

import { redirect } from 'next/navigation';
import { LoginFormData, RegisterFormData } from './schemas';
import { createSupabaseServerClient } from './supabase';
import { ActionResponse, Profile } from './types';

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
