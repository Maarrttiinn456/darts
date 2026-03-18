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
import { Eye } from 'lucide-react';
import { League } from '@/lib/types';

export default function LeagueCard({
    id,
    name,
    league_members: players,
}: League) {
    return (
        <Card className="w-full max-w-sm flex flex-col">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{players.length} hráčů</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <ul className="space-y-1">
                    {players.map(({ player }) => (
                        <li
                            key={player.id}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                            <span
                                className="size-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: player.color }}
                            />
                            {player.username}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    <Link
                        href={`/league/${id}`}
                        className="flex items-center gap-2"
                    >
                        <Eye className="size-4" />
                        Zobrazit detail
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
