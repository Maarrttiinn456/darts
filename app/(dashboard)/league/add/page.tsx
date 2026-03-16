import LeagueForm from '@/components/league/league-form';

import { createSupabaseServerClient } from '@/lib/supabase';
import { Profile } from '@/lib/types';

export default async function LeagueAddPage() {
    const supabase = await createSupabaseServerClient();

    const { data: players, error } = await supabase
        .from('profiles')
        .select('*')
        .returns<Profile[]>();

    if (error) console.error(error);
    if (!players) return <div>Nepodařilo se načíst hráče</div>;

    return (
        <div className="flex items-center justify-center">
            <LeagueForm players={players} />
        </div>
    );
}
