// src/components/StatsRow/StatsRow.jsx
// Every metric here is clickable — a real dashboard convention. "Members"
// resets filters, "Admins" jumps straight to the admins filter, and
// "Countries" / "Unique skills" surface the underlying breakdown.
import './StatsRow.css';

function StatsRow({ stats, onStatClick }) {
  const items = [
    { id: 'total', label: 'Members', value: stats.total },
    { id: 'admins', label: 'Admins', value: stats.admins },
    { id: 'countries', label: 'Countries', value: stats.countries },
    { id: 'skills', label: 'Unique skills', value: stats.skills },
  ];

  return (
    <div className="stats-row">
      {items.map((item) => (
        <button
          type="button"
          className="stats-row__item"
          key={item.id}
          onClick={() => onStatClick(item.id)}
        >
          <span className="stats-row__value">{item.value}</span>
          <span className="stats-row__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default StatsRow;
