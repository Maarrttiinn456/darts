'use client';

import { createTournament } from '@/lib/actions';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Dialog from '@/components/dialog';

export default function AddTournamentDialog() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const leagueId = params.id;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await createTournament(formData, leagueId);

        if (result.ok) {
            toast.success(result.message);
            console.log(result.tournamentId);
            router.push(
                `/league/${leagueId}/tournament/${result.tournamentId}`,
            );
        } else {
            toast.error(result.message);
        }
    };
    return (
        <Dialog
            heading="Přidat turnaj"
            description="Zadej název turnaje, který chceš přidat."
            buttonText="Přidat turnaj"
            mode="tournament"
            labelText="Vyber turnaj"
            onSubmit={handleSubmit}
        />
    );
}
