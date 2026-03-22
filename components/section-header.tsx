type SectionHeaderProps = {
    heading: string;
    children: React.ReactNode;
};

export default function SectionHeader({
    heading,
    children,
}: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight font-heading">
                {heading}
            </h1>
            {children}
        </div>
    );
}
