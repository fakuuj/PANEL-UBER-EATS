import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  iconBg: string;
  accentColor: string;
  badge?: string;
  badgeColor?: string;
  chart?: React.ReactNode;
}

export default function StatCard({
  title, value, subtitle, trend, trendLabel, icon, iconBg, accentColor, badge, badgeColor, chart
}: StatCardProps) {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <div className="card-premium p-5 relative overflow-hidden group cursor-default">
      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${accentColor}08 0%, transparent 60%)` }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        {badge && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: badgeColor ? `${badgeColor}20` : 'rgba(16,185,129,0.15)',
              color: badgeColor || '#34D399',
              border: `1px solid ${badgeColor ? badgeColor + '30' : 'rgba(16,185,129,0.3)'}`,
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="mb-1">
        <p className="text-xs font-medium mb-1.5" style={{ color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </p>
        <p className="text-2xl font-800 text-white animate-count-up" style={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
          {value}
        </p>
      </div>

      {chart && <div className="my-3">{chart}</div>}

      <div className="flex items-center gap-2 mt-2">
        {trend !== undefined && (
          <div
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-semibold"
            style={{
              background: isPositive ? 'rgba(16,185,129,0.15)' : isNegative ? 'rgba(244,63,94,0.15)' : 'rgba(100,116,139,0.15)',
              color: isPositive ? '#34D399' : isNegative ? '#FB7185' : '#94A3B8',
            }}
          >
            {isPositive ? <TrendingUp size={10} /> : isNegative ? <TrendingDown size={10} /> : <Minus size={10} />}
            {Math.abs(trend)}%
          </div>
        )}
        {subtitle && (
          <p className="text-xs" style={{ color: '#475569' }}>{subtitle}</p>
        )}
        {trendLabel && (
          <p className="text-xs" style={{ color: '#475569' }}>{trendLabel}</p>
        )}
      </div>
    </div>
  );
}
