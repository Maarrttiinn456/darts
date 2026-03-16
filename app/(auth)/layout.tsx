export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container">
            <div className="flex h-screen w-full items-center justify-center">
                {children}
            </div>
        </div>
    );
}
