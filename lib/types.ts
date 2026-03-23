export type ActionResponse = {
    ok: boolean;
    message: string;
};

export type Profile = {
    id: string;
    username: string;
    color: string;
    created_at: string;
};

export type League = {
    id: string;
    name: string;
    created_at: string;
    league_members: { player: Profile }[];
};

export type LeagueMemberWithProfile = {
    player_id: string;
    profiles: Profile;
};

export type GameResults = {
    playerId: string;
    score: number;
};

export type GameResult = {
    id: string;
    game_id: string;
    player_id: string;
    rank: number;
    points_earned: number;
    profiles: Pick<Profile, 'username' | 'color'>;
};

export type TournamentGame = {
    id: string;
    tournament_id: string;
    game_type: string;
    created_at: string;
    game_results: GameResult[];
};

export type Tournament = {
    id: string;
    league_id: string;
    name: string;
    date: string;
    status: string;
    games: TournamentGame[];
};

export type LeagueMember = {
    player_id: string;
    profiles: Pick<Profile, 'id' | 'username' | 'color'>;
};
