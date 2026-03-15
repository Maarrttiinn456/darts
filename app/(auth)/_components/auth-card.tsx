import {
    CardDescription,
    CardTitle,
    CardHeader,
    CardContent,
    Card,
    CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';

export default function AuthCard({
    title,
    description,
    footerContent,
    footerLinkText = 'Přihlásit se',
    footerLink,
    children,
}: {
    title: string;
    description: string;
    footerContent: string;
    footerLinkText: string;
    footerLink: string;
    children: React.ReactNode;
}) {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl font-bold tracking-tight text-center">
                    {title}
                </CardTitle>
                <CardDescription className="text-center">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter className="flex justify-center gap-1">
                {footerContent} <Link href={footerLink}> {footerLinkText}</Link>
            </CardFooter>
        </Card>
    );
}
