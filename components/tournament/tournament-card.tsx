import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Eye, Medal } from 'lucide-react';

type TournamentPlayer = {
    position: number;
    username: string;
    color: string;
};

type TournamentCardProps = {
    id: string;
    leagueId: string;
    name: string;
    date: string;
    players: TournamentPlayer[];
};

const positionStyle: Record<number, string> = {
    1: 'text-yellow-500',
    2: 'text-slate-400',
    3: 'text-amber-600',
};

export default function TournamentCard({
    id,
    leagueId,
    name,
    date,
    players,
}: TournamentCardProps) {
    return (
        <Card className="w-full max-w-sm flex flex-col">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {date}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-1.5">
                    {players.map(({ position, username, color }) => (
                        <li
                            key={position}
                            className="text-sm flex items-center gap-2"
                        >
                            <span
                                className={`w-5 text-xs font-bold shrink-0 ${positionStyle[position] ?? 'text-muted-foreground'}`}
                            >
                                {position <= 3 ? (
                                    <Medal className="size-3.5 inline" />
                                ) : (
                                    `${position}.`
                                )}
                            </span>
                            <span
                                className="size-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: color }}
                            />
                            <span
                                className={
                                    position <= 3
                                        ? 'font-medium'
                                        : 'text-muted-foreground'
                                }
                            >
                                {username}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    <Link
                        href={`/league/${leagueId}/tournament/${id}`}
                        className="flex items-center gap-2"
                    >
                        <Eye className="size-4" />
                        Detail turnaje
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
