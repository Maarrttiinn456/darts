'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/lib/actions'; // server action

export function LogoutButton() {
    return (
        <form action={logoutAction}>
            <Button variant="outline" size="icon" type="submit">
                <LogOut className="size-4" />
            </Button>
        </form>
    );
}
