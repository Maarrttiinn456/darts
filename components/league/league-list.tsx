import { createSupabaseServerClient } from '@/lib/supabase';
import LeagueCard from './league-card';
import { League } from '@/lib/types';

export default async function LeagueList() {
    const supabase = await createSupabaseServerClient();

    const { data: leagues, error } = (await supabase.from('leagues').select(`
        *,
        league_members(
            player:profiles(*)
        )
    `)) as { data: League[] | null; error: unknown };

    console.log(leagues);

    if (error) {
        console.error(error);
        return <div>Nepodařilo se načíst ligy</div>;
    }

    if (!leagues || leagues.length === 0) {
        return (
            <div className="text-center text-gray-500">
                Žádné ligy nenalezeny
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leagues?.map((league) => {
                return <LeagueCard key={league.id} {...league} />;
            })}
        </div>
    );
}
