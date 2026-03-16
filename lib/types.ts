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
