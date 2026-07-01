// src/components/Topbar/Topbar.jsx
import './Topbar.css';

function Topbar({ query, onQueryChange, onAddClick, onExportClick, resultCount, totalCount }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__mark">R</span>
        <div>
          <h1 className="topbar__title">Roster</h1>
          <p className="topbar__subtitle">Team directory</p>
        </div>
      </div>

      <div className="topbar__search">
        <svg
          className="topbar__search-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          className="topbar__search-input"
          placeholder="Search by name, role, skill, or location…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          aria-label="Search team members"
        />
        {query && (
          <button
            type="button"
            className="topbar__search-clear"
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="topbar__actions">
        {query && (
          <span className="topbar__result-count">
            {resultCount} of {totalCount}
          </span>
        )}
        <button type="button" className="topbar__export-btn" onClick={onExportClick} title="Export current view as CSV">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v8M7 9L4 6M7 9l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.5 11v1.5A1.5 1.5 0 0 0 3 14h8a1.5 1.5 0 0 0 1.5-1.5V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Export
        </button>
        <button type="button" className="topbar__add-btn" onClick={onAddClick}>
          <span className="topbar__add-icon" aria-hidden="true">+</span>
          Add member
        </button>
      </div>
    </header>
  );
}

export default Topbar;
