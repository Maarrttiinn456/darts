import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tournament, LeagueMember } from '@/lib/types';

type LeagueLeaderboardProps = {
    leagueMembers: LeagueMember[] | null;
    tournaments: Tournament[] | null;
};

export default function LeagueLeaderboard({
    leagueMembers,
    tournaments,
}: LeagueLeaderboardProps) {
    // Pro každého hráče spočítej celkové body přes všechny turnaje
    const playerTotals = leagueMembers
        ?.map((member) => {
            const allResults =
                tournaments?.flatMap((tournament) =>
                    tournament.games.flatMap((game) =>
                        game.game_results
                            .filter((r) => r.player_id === member.player_id)
                            .map((r) => ({
                                ...r,
                                game_type: game.game_type,
                                tournament_name: tournament.name,
                            })),
                    ),
                ) ?? [];

            const totalPoints = allResults.reduce(
                (sum, r) => sum + r.points_earned,
                0,
            );

            return {
                profile: member.profiles,
                totalPoints,
                gamesPlayed: allResults.length,
                results: allResults,
            };
        })
        .sort((a, b) => b.totalPoints - a.totalPoints);

    // Unikátní typy her přes všechny turnaje
    const gameTypes = [
        ...new Set(
            tournaments?.flatMap((t) => t.games.map((g) => g.game_type)) ?? [],
        ),
    ];

    // Body podle typu hry pro každého hráče
    const playerStatsByGameType = playerTotals?.map((player) => ({
        ...player,
        pointsByGameType: gameTypes.reduce(
            (acc, gameType) => {
                acc[gameType] = player.results
                    .filter((r) => r.game_type === gameType)
                    .reduce((sum, r) => sum + r.points_earned, 0);
                return acc;
            },
            {} as Record<string, number>,
        ),
    }));

    return (
        <div className="bg-muted p-4 rounded-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Hráč</TableHead>
                        <TableHead>Celkem bodů</TableHead>
                        <TableHead>Počet her</TableHead>
                        {gameTypes.map((gameType) => (
                            <TableHead key={gameType}>{gameType}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {playerStatsByGameType?.map((player) => (
                        <TableRow key={player.profile.id}>
                            <TableCell className="font-semibold">
                                {player.profile.username}
                            </TableCell>
                            <TableCell>{player.totalPoints}</TableCell>
                            <TableCell>{player.gamesPlayed}</TableCell>
                            {gameTypes.map((gameType) => (
                                <TableCell key={gameType}>
                                    {player.pointsByGameType[gameType] || '-'}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
