'use client';

import { useState } from 'react';
import { GameResults, type LeagueMemberWithProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { deleteGame, submitGameResults } from '@/lib/actions';
import PlayerStats from '@/components/game/player-stats';
import { toast } from 'sonner';

type GamePlanProps = {
    players: LeagueMemberWithProfile[];
    gameId: string;
};

export default function GamePlan({ players, gameId }: GamePlanProps) {
    const router = useRouter();

    const [playerScores, setPlayerScores] = useState<GameResults[]>(() =>
        players.map((player) => ({ playerId: player.profiles.id, score: 0 })),
    );

    const playerProfiles = players.map((player) => player.profiles);

    const handleScoreChange = (playerId: string, newScore: number) => {
        setPlayerScores((prev) => {
            const exists = prev.some((p) => p.playerId === playerId);
            if (exists) {
                return prev.map((p) =>
                    p.playerId === playerId ? { ...p, score: newScore } : p,
                );
            }
            return [...prev, { playerId, score: newScore }];
        });
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (
            confirm(
                'Opravdu chcete ukončit tuto hru? Výsledky budou uloženy a hra nebude možné dále upravovat.',
            )
        ) {
            const result = await submitGameResults(gameId, playerScores);

            if (result.ok) {
                toast.success('Hra úspěšně ukončena a výsledky uloženy');
                router.back();
            } else {
                toast.error(
                    'Došlo k chybě při ukládání výsledků: ' + result.message,
                );
            }
        }
    };

    const goBack = async () => {
        if (
            confirm('Opravdu chcete zrušit tuto hru? Výsledky nebudou uloženy.')
        ) {
            const result = await deleteGame(gameId);

            if (result.ok) {
                toast.success('Hra úspěšně zrušena');
                router.back();
            } else {
                toast.error('Došlo k chybě při rušení hry: ' + result.message);
            }
        }
    };

    return (
        <div
            className="flex flex-col gap-4"
            style={{ height: 'calc(100svh - 105px)' }}
        >
            {playerProfiles.map((profile) => (
                <PlayerStats
                    key={profile.id}
                    profile={profile}
                    onChange={handleScoreChange}
                />
            ))}

            <div className="flex gap-4 bg-muted p-4 rounded-sm">
                <Button
                    variant="destructive"
                    size={'lg'}
                    className="flex-1"
                    onClick={goBack}
                >
                    Zrušit
                </Button>
                <Button
                    variant="default"
                    size={'lg'}
                    className="flex-1"
                    onClick={handleSubmit}
                >
                    Vyhodnotit
                </Button>
            </div>
        </div>
    );
}
