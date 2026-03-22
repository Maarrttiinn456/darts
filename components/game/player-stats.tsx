'use client';

import { useState } from 'react';
import { Profile } from '@/lib/types';
import { getContrastColor } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

export default function PlayerStats({
    profile,
    onChange,
}: {
    profile: Profile;
    onChange: (playerId: string, newScore: number) => void;
}) {
    const [score, setScore] = useState(0);

    const handleScoreChange = (newScore: number) => {
        setScore(newScore);
        onChange(profile.id, newScore);
    };

    return (
        <div
            className="flex-1 rounded-sm"
            style={{
                backgroundColor: profile.color,
                color: getContrastColor(profile.color),
            }}
        >
            <div className="grid grid-cols-12 h-full">
                <div
                    className="col-span-3 flex items-center justify-center"
                    onClick={() => handleScoreChange(score - 1)}
                >
                    <Minus className="cursor-pointer" />
                </div>
                <div className="col-span-6 h-full">
                    <div className="flex flex-col justify-between items-center h-full py-[2vh]">
                        <div>{profile.username}</div>
                        <div className="text-[clamp(3rem,4vh,9rem)]">
                            {score}
                        </div>
                        <div className="text-[clamp(1rem,1vh,3rem)]">
                            20 bodů
                        </div>
                    </div>
                </div>
                <div
                    className="col-span-3 flex items-center justify-center"
                    onClick={() => handleScoreChange(score + 1)}
                >
                    <Plus className="cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
