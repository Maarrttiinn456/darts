'use server';

import { LoginFormData, RegisterFormData } from './schemas';
import { createSupabaseServerClient } from './supabase';
import { ActionResponse } from './types';

export async function handleRegister(
    formData: RegisterFormData,
): Promise<ActionResponse> {
    if (!formData) {
        return { ok: false, message: 'Neplatná data z formuláře' };
    }

    const supabase = await createSupabaseServerClient();

    const { email, password, username, color } = formData;

    const { data: authData, error: authError } = await supabase.auth.signUp({
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

    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
            id: authData.user?.id,
            username,
            color,
        });

    if (profileError) {
        console.error('Profile error:', profileError);
        return { ok: false, message: profileError.message };
    }

    console.log('authData', authData);
    console.log('profileData', profileData);

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
