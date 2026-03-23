import SettingsForm from '@/components/settings/settings-form';
import StepBack from '@/components/step-back';
import { createSupabaseServerClient } from '@/lib/supabase';
import { getUser } from '@/lib/supabase';

export default async function SettingsPage() {
    const user = await getUser();

    const supabase = await createSupabaseServerClient();

    const { data: profile } = await supabase
        .from('profiles')
        .select('username, color')
        .eq('id', user?.id)
        .single();

    return (
        <div className="space-y-6">
            <StepBack />
            <h1 className="font-heading text-4xl font-bold tracking-tight">
                Nastavení
            </h1>
            <SettingsForm
                username={profile?.username ?? ''}
                color={profile?.color ?? '#000000'}
            />
        </div>
    );
}
