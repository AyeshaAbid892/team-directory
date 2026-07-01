// src/App.jsx
import { useState } from 'react';
import Topbar from './components/Topbar/Topbar.jsx';
import StatsRow from './components/StatsRow/StatsRow.jsx';
import FilterTabs from './components/FilterTabs/FilterTabs.jsx';
import SortMenu from './components/SortMenu/SortMenu.jsx';
import ViewToggle from './components/ViewToggle/ViewToggle.jsx';
import MemberGrid from './components/MemberGrid/MemberGrid.jsx';
import MemberDrawer from './components/MemberDrawer/MemberDrawer.jsx';
import AddMemberModal from './components/AddMemberModal/AddMemberModal.jsx';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.jsx';
import Toast from './components/Toast/Toast.jsx';
import { useTeamDirectory } from './hooks/useTeamDirectory.js';
import { downloadMembersCsv } from './utils/exportCsv.js';
import './App.css';

function App() {
  const {
    members,
    totalCount,
    stats,
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
    sortBy,
    setSortBy,
    following,
    toggleFollow,
    addMember,
    updateMember,
    removeMember,
  } = useTeamDirectory();

  // UI-only state: what's open, what layout, and the currently viewed/edited person.
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null); // member object, or null
  const [openProfileId, setOpenProfileId] = useState(null);
  const [pendingDeleteMember, setPendingDeleteMember] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const openProfileMember = members.find((m) => m.id === openProfileId) || null;

  const handleAddSubmit = (formValues) => {
    const newMember = addMember(formValues);
    setAddModalOpen(false);
    setToastMessage(`${newMember.name} was added to the directory.`);
  };

  const handleEditSubmit = (formValues) => {
    const updated = updateMember(editingMember.id, formValues);
    setEditingMember(null);
    setToastMessage(`${updated.name}'s profile was updated.`);
  };

  const handleToggleFollow = (id, name) => {
    const wasFollowing = following.has(id);
    toggleFollow(id);
    setToastMessage(wasFollowing ? `Unfollowed ${name}.` : `Now following ${name}.`);
  };

  const handleSkillClick = (skill) => {
    setQuery(skill);
    setOpenProfileId(null);
  };

  const handleStatClick = (statId) => {
    if (statId === 'total') {
      setActiveFilter('all');
      setQuery('');
    } else if (statId === 'admins') {
      setActiveFilter('admins');
    } else if (statId === 'countries') {
      setToastMessage(`Team spans: ${stats.countryList.join(', ')}.`);
    } else if (statId === 'skills') {
      setToastMessage(`Top skills: ${stats.skillList.slice(0, 6).join(', ')}.`);
    }
  };

  const handleConfirmDelete = () => {
    removeMember(pendingDeleteMember.id);
    setToastMessage(`${pendingDeleteMember.name} was removed from the directory.`);
    setPendingDeleteMember(null);
    setOpenProfileId(null);
  };

  const handleExport = () => {
    downloadMembersCsv(members, 'team-directory.csv');
    setToastMessage(`Exported ${members.length} member${members.length === 1 ? '' : 's'} to CSV.`);
  };

  return (
    <div className="app">
      <Topbar
        query={query}
        onQueryChange={setQuery}
        onAddClick={() => setAddModalOpen(true)}
        onExportClick={handleExport}
        resultCount={members.length}
        totalCount={totalCount}
      />

      <main className="app__main">
        <StatsRow stats={stats} onStatClick={handleStatClick} />

        <div className="app__toolbar">
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
          <div className="app__toolbar-right">
            <SortMenu value={sortBy} onChange={setSortBy} />
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>

        <MemberGrid
          members={members}
          following={following}
          onToggleFollow={handleToggleFollow}
          onOpen={(member) => setOpenProfileId(member.id)}
          onSkillClick={handleSkillClick}
          query={query}
          onClearSearch={() => setQuery('')}
          layout={viewMode}
        />
      </main>

      <MemberDrawer
        member={openProfileMember}
        isFollowing={openProfileMember ? following.has(openProfileMember.id) : false}
        onClose={() => setOpenProfileId(null)}
        onToggleFollow={handleToggleFollow}
        onEdit={(member) => {
          setOpenProfileId(null);
          setEditingMember(member);
        }}
        onDeleteRequest={(member) => setPendingDeleteMember(member)}
        onSkillClick={handleSkillClick}
      />

      <AddMemberModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddSubmit}
      />

      <AddMemberModal
        open={Boolean(editingMember)}
        member={editingMember}
        onClose={() => setEditingMember(null)}
        onSubmit={handleEditSubmit}
      />

      <ConfirmDialog
        open={Boolean(pendingDeleteMember)}
        title="Remove team member?"
        description={
          pendingDeleteMember
            ? `${pendingDeleteMember.name} will be permanently removed from the directory. This can't be undone.`
            : ''
        }
        confirmLabel="Remove"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteMember(null)}
      />

      <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />
    </div>
  );
}

export default App;
