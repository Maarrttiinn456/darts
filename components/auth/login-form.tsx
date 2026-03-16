'use client';

import AuthCard from '@/components/auth/auth-card';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/lib/schemas';
import { LoginFormData } from '@/lib/schemas';
import { Button } from '../ui/button';
import { handleLogin } from '@/lib/actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const result = await handleLogin(data);

        if (result.ok) {
            toast.success(result.message);
            router.push('/');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <AuthCard
            title="Přihlášení"
            description="Zadejte své údaje níže"
            footerContent="Nemáte účet?"
            footerLink="/register"
            footerLinkText="Registrace"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="vas@email.cz"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-destructive">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Heslo</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="off"
                        {...register('password')}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full mt-2 cursor-pointer"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <Loader2 className="size-4 animate-spin" />
                    ) : (
                        'Přihlásit se'
                    )}
                </Button>
            </form>
        </AuthCard>
    );
}
