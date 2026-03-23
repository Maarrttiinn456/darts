'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { handleUpdateSettings } from '@/lib/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type SettingsFormProps = {
    username: string;
    color: string;
};

export default function SettingsForm({ username, color }: SettingsFormProps) {
    const router = useRouter();

    const [currentUsername, setCurrentUsername] = useState(username);
    const [currentColor, setCurrentColor] = useState(color);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('username', currentUsername);
        formData.append('color', currentColor);

        const result = await handleUpdateSettings(formData);
        if (result.ok) {
            toast.success(result.message);
            router.refresh(); // ← donutí server komponentu znovu fetchnout
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="space-y-4">
            <Label
                htmlFor="username"
                className="text-xs uppercase font-semibold text-muted-foreground"
            >
                Uživatelské jméno
            </Label>
            <Input
                id="username"
                type="text"
                value={currentUsername}
                onChange={(e) => setCurrentUsername(e.target.value)}
                className="h-12 text-base bg-muted border-transparent focus-visible:border-primary focus-visible:bg-background transition-colors"
            />
            <Label
                htmlFor="color"
                className="text-xs uppercase font-semibold text-muted-foreground"
            >
                Barva profilu
            </Label>
            <Input
                id="color"
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="h-12 text-base bg-muted border-transparent focus-visible:border-primary focus-visible:bg-background transition-colors"
            />
            <Button
                onClick={handleSubmit}
                className="h-12 w-full font-heading font-bold tracking-wide text-base"
            >
                Uložit změny
            </Button>
        </div>
    );
}
