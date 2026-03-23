import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { LogoutButton } from './auth/logout-button';
import { getUser } from '@/lib/supabase';
import { createSupabaseServerClient } from '@/lib/supabase';

export default async function Header() {
    const user = await getUser();

    const supabase = await createSupabaseServerClient();

    const { data: profile } = await supabase
        .from('profiles')
        .select('username, color')
        .eq('id', user?.id)
        .single();

    return (
        <header className="border-b border-border bg-card">
            <div className="container">
                <div className="flex h-14 items-center justify-between">
                    {/* Název aplikace */}
                    <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">
                        <Link href="/">DartsApp</Link>
                    </h1>

                    {/* Pravá část – barva uživatele + přihlášení */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            {profile?.username}
                        </span>
                        <div className="flex items-center gap-2">
                            <Link href="/settings">
                                <Button variant="outline" size="icon">
                                    <Settings className="size-4" />
                                </Button>
                            </Link>
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
