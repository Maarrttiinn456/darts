'use client';

import Dialog from '@/components/dialog';
import { createGame } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GAME_TYPES } from '@/constants/game-types';

export default function AddGameDialog() {
    const params = useParams<{ touranemtId: string; id: string }>();
    const router = useRouter();
    const tournamentId = params.touranemtId;
    const leagueId = params.id;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await createGame(formData, tournamentId);

        if (result.ok) {
            toast.success(result.message);

            console.log('leagueId:', leagueId);

            router.push(
                `/league/${leagueId}/tournament/${tournamentId}/game/${result.gameId}`,
            );
        } else {
            toast.error(result.message);
        }
    };

    const gameTypeOptions = GAME_TYPES.map(
        (gameType: { id: string; label: string }) => ({
            id: gameType.id,
            label: gameType.label,
        }),
    );

    return (
        <Dialog
            heading="Přidat hru"
            description="Vyber hru, kterou chceš přidat."
            buttonText="Přidat hru"
            gameTypeOptions={gameTypeOptions}
            mode="game"
            labelText="Vyber hru"
            onSubmit={handleSubmit}
        />
    );
}

//Na vytvoření hry potřebuji
//typ hry
//turnajId
