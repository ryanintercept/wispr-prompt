interface DashboardSectionProps {
  children: React.ReactNode;
}

export function DashboardSection({ children }: DashboardSectionProps) {
  return (
    <section id="dashboard" className="py-16 px-4 scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Interactive demo</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text">
            Try it yourself
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
