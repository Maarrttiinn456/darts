'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTournament } from '@/lib/actions';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
        <Dialog>
            <DialogTrigger render={<Button variant="default" />}>
                <Plus className="size-4" />
                Přidat turnaj
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Přidat turnaj</DialogTitle>
                    <DialogDescription>
                        Zadej název turnaje, který chceš přidat.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Název ligy</Label>
                            <Input
                                id="name-1"
                                name="name"
                                defaultValue="Pedro Duarte"
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="mt-4">
                        <DialogClose render={<Button variant="outline" />}>
                            Zrušit
                        </DialogClose>
                        <Button type="submit">Přidat</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
