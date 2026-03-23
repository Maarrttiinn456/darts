import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TournamentGame } from '@/lib/types';
import { LeagueMemberWithProfile } from '@/lib/types';

type TournamentLeaderboardProps = {
    tournamentGames: TournamentGame[] | null;
    leagueMembers: LeagueMemberWithProfile[] | null;
};

export default function TournamentLeaderboard({
    tournamentGames,
    leagueMembers,
}: TournamentLeaderboardProps) {
    // Unikátní typy her
    const gameTypes = [
        ...new Set(tournamentGames?.map((g) => g.game_type) ?? []),
    ];

    const playerStats = leagueMembers
        ?.map((member) => {
            const results =
                tournamentGames?.flatMap((game) =>
                    game.game_results
                        .filter((r) => r.player_id === member.player_id)
                        .map((r) => ({
                            ...r,
                            game_type: game.game_type,
                        })),
                ) ?? [];

            const pointsByGameType = gameTypes.reduce(
                (acc, gameType) => {
                    const gameResults = results.filter(
                        (r) => r.game_type === gameType,
                    );
                    acc[gameType] = gameResults.reduce(
                        (sum, r) => sum + r.points_earned,
                        0,
                    );
                    return acc;
                },
                {} as Record<string, number>,
            );

            return {
                profile: member.profiles,
                totalPoints: results.reduce(
                    (sum, r) => sum + r.points_earned,
                    0,
                ),
                gamesPlayed: results.length,
                pointsByGameType,
            };
        })
        .sort((a, b) => b.totalPoints - a.totalPoints);

    return (
        <div className="bg-muted p-4 rounded-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Hráč</TableHead>
                        <TableHead>Celkem bodů</TableHead>
                        {gameTypes.map((gameType) => (
                            <TableHead key={gameType}>{gameType}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {playerStats?.map((player) => (
                        <TableRow key={player.profile.id}>
                            <TableCell className="font-semibold">
                                {player.profile.username}
                            </TableCell>
                            <TableCell>{player.totalPoints}</TableCell>
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
