import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string('Email je povinný').email('Neplatný email'),
    username: z
        .string('Uživatelské jméno je povinné')
        .min(3, 'Uživatelské jméno musí mít alespoň 3 znaky')
        .max(20, 'Maximálně 20 znaků')
        .regex(/^[a-zA-Z0-9_]+$/, 'Pouze písmena, čísla a podtržítko')
        .refine((value) => value.length > 0, {
            message: 'Uživatelské jméno je povinné',
        }),
    password: z
        .string('Heslo je povinné')
        .min(5, 'Heslo musí mít alespoň 5 znaků'),
    color: z
        .string('Barva je povinná')
        .regex(/^#[0-9a-fA-F]{6}$/, 'Neplatná barva'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string('Email je povinný').email('Neplatný email'),
    password: z.string('Heslo je povinné'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
