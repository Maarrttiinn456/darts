'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from '@/lib/schemas';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { handleRegister } from '@/lib/actions';
import AuthCard from '@/app/(auth)/_components/auth-card';

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        const result = await handleRegister(data);

        console.log(result);
        //Zde budu zobrazovat toast s hláškou výsledku
        if (result.ok) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <AuthCard
            title="Registrace"
            description="Zadejte své údaje níže"
            footerContent="Už máte účet?"
            footerLinkText="Přihlásit se"
            footerLink="/login"
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
                    <Label htmlFor="username">Uživatelské jméno</Label>
                    <Input
                        id="username"
                        type="text"
                        {...register('username')}
                        placeholder="vaše_jméno"
                    />
                    {errors.username && (
                        <p className="text-destructive">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Heslo</Label>
                    <Input
                        id="password"
                        type="password"
                        {...register('password')}
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="text-destructive">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="color">Vyberte si barvu</Label>
                    <Input
                        id="color"
                        type="color"
                        {...register('color')}
                        className="h-10 cursor-pointer px-2 py-1"
                        defaultValue="#6366f1"
                    />
                    {errors.color && (
                        <p className="text-destructive">
                            {errors.color.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full mt-2 cursor-pointer">
                    Vytvořit účet
                </Button>
            </form>
        </AuthCard>
    );
}
