'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function StepBack({ path }: { path: string }) {
    const router = useRouter();

    return (
        <div onClick={() => router.push(path)}>
            <ArrowLeft className="h-6" />
        </div>
    );
}
