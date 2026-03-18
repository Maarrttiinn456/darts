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
import { Plus } from 'lucide-react';

export default function AddDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger>
                    <Button variant="default">
                        <Plus className="size-4" />
                        Přidat turnaj
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Přidat turnaj</DialogTitle>
                        <DialogDescription>
                            Zadej název turnaje, který chceš přidat.
                        </DialogDescription>
                    </DialogHeader>
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
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Zrušit</Button>
                        </DialogClose>
                        <Button type="submit">Přidat</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
