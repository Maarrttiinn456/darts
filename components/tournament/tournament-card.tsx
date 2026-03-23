import Link from 'next/link';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

type TournamentCardProps = {
    id: string;
    leagueId: string;
    name: string;
    date: string;
};

export default function TournamentCard({
    id,
    leagueId,
    name,
}: TournamentCardProps) {
    return (
        <Card className="w-full max-w-sm flex flex-col">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-1.5"></ul>
            </CardContent>
            <CardFooter>
                <Link
                    href={`/league/${leagueId}/tournament/${id}`}
                    className="flex items-center gap-2 w-full"
                >
                    <Button variant="outline" className="w-full">
                        <Eye className="size-4" />
                        Detail turnaje
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
