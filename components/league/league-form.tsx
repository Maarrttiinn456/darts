'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Profile } from '@/lib/types';
import { createLeague } from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LeagueForm({ players }: { players: Profile[] }) {
    const [name, setName] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
    const router = useRouter();

    const handleSelectedPlayers = (playerId: string) => {
        console.log(playerId);
        setSelectedPlayers((prev) => {
            const isInAray = prev.includes(playerId);

            if (isInAray) {
                return prev.filter((player) => player !== playerId);
            } else {
                return [...prev, playerId];
            }
        });
    };

    const handleSubmit = async () => {
        const result = await createLeague(name, selectedPlayers);

        if (result.ok) {
            toast.success('Liga byla úspěšně vytvořena');
            router.push('/');
        } else {
            toast.error('Nepodařilo se vytvořit ligu');
        }
    };

    return (
        <div className="w-full max-w-lg space-y-8">
            {/* Hlavička */}
            <div className="space-y-1">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                    Nová liga
                </p>
                <h1 className="font-heading text-4xl font-bold tracking-tight">
                    Vytvoř ligu
                </h1>
            </div>

            {/* Název */}
            <div className="space-y-2">
                <Label
                    htmlFor="name"
                    className="text-xs tracking-widest uppercase font-semibold text-muted-foreground"
                >
                    Název ligy
                </Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="např. Zimní liga 2025"
                    className="h-12 text-base bg-muted border-transparent focus-visible:border-primary focus-visible:bg-background transition-colors"
                />
            </div>

            <div className="space-y-4">
                <Label className="text-xs tracking-widest uppercase font-semibold text-muted-foreground">
                    Hráči
                </Label>
                <div className="grid grid-cols-2 gap-2">
                    {players?.map((player) => (
                        <div
                            key={player.id}
                            className="flex items-center gap-3 bg-muted rounded-lg px-4 h-12 cursor-pointer hover:bg-accent transition-colors"
                        >
                            <Checkbox
                                id={player.id}
                                onCheckedChange={() =>
                                    handleSelectedPlayers(player.id)
                                }
                                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <Label
                                htmlFor={player.id}
                                className="text-sm font-medium cursor-pointer flex-1"
                            >
                                {player.username}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex gap-3">
                <Link href="/" className="block flex-1 w-full">
                    <Button variant="outline" className="w-full h-12">
                        Zrušit
                    </Button>
                </Link>
                <Button
                    className="flex-[2] h-12 font-heading font-bold tracking-wide text-base"
                    onClick={handleSubmit}
                >
                    Vytvořit ligu
                </Button>
            </div>
        </div>
    );
}
