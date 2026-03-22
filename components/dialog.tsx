'use client';

import {
    Dialog as DialogUI,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
} from '@/components/ui/select';

type DialogProps = {
    mode: 'game' | 'tournament';
    heading: string;
    description: string;
    buttonText: string;
    labelText: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    gameTypeOptions?: { id: string; label: string }[];
};

export default function Dialog({
    mode,
    heading,
    description,
    buttonText,
    labelText,
    onSubmit,
    gameTypeOptions,
}: DialogProps) {
    const actualDate = new Date().toLocaleDateString('cs-CZ');

    return (
        <DialogUI>
            <DialogTrigger render={<Button variant="default" />}>
                <Plus className="size-4" />
                {buttonText}
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{heading}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <FieldGroup>
                        {mode === 'game' ? (
                            <Field>
                                <Label htmlFor="name-1">{labelText}</Label>
                                <Select id="game-type" name="game-type">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Vyber hru" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {gameTypeOptions?.map((option) => (
                                            <SelectGroup key={option.id}>
                                                <SelectItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        ) : (
                            <Field>
                                <Label htmlFor="name-1">{labelText}</Label>
                                <Input
                                    id="name-1"
                                    name="name"
                                    defaultValue={actualDate}
                                />
                            </Field>
                        )}
                    </FieldGroup>
                    <DialogFooter className="mt-4">
                        <DialogClose render={<Button variant="outline" />}>
                            Zrušit
                        </DialogClose>
                        <Button type="submit">Přidat</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogUI>
    );
}
