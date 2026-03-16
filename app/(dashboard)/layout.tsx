import Header from '@/components/header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="container mt-6">{children}</div>
        </>
    );
}
