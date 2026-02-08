import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from '../pages/Landing/Landing';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import CreateTenant from '../pages/CreateTenant/CreateTenant';
import Dashboard from '../pages/Dashboard/Dashboard';

import { LawList, LawDetail, ArticleView, AmendmentTimeline, LawDiff } from '../modules/laws';
import { CaseCreate, CaseOverview, CaseIssues, StrengthPoints, ChallengePoints, PrecedentLinks } from '../modules/cases';
import { Templates, DraftEditor, ClauseCompare, VersionHistory } from '../modules/drafting';
import { ResearchSearch, ResearchWorkspace } from '../modules/research';
import { AdminPlaceholder } from '../modules/admin';

import CaseIntake from '../pages/CaseIntake/CaseIntake';
import Draft from '../pages/Draft/Draft';
import Judgments from '../pages/Judgments/Judgments';

import { isLoggedIn } from '../store/auth';

function Private({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-tenant" element={<CreateTenant />} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />

      {/* Legacy routes (unchanged) */}
      <Route path="/case-intake" element={<Private><CaseIntake /></Private>} />
      <Route path="/draft" element={<Private><Draft /></Private>} />
      <Route path="/judgments" element={<Private><Judgments /></Private>} />

      {/* Laws module */}
      <Route path="/laws" element={<Private><LawList /></Private>} />
      <Route path="/laws/:id" element={<Private><LawDetail /></Private>} />
      <Route path="/laws/:id/article/:number" element={<Private><ArticleView /></Private>} />
      <Route path="/laws/:id/amendments" element={<Private><AmendmentTimeline /></Private>} />
      <Route path="/laws/:id/diff/:versionA/:versionB" element={<Private><LawDiff /></Private>} />

      {/* Cases module */}
      <Route path="/cases/create" element={<Private><CaseCreate /></Private>} />
      <Route path="/cases/:caseId" element={<Private><CaseOverview /></Private>} />
      <Route path="/cases/:caseId/issues" element={<Private><CaseIssues /></Private>} />
      <Route path="/cases/:caseId/strengths" element={<Private><StrengthPoints /></Private>} />
      <Route path="/cases/:caseId/challenges" element={<Private><ChallengePoints /></Private>} />
      <Route path="/cases/:caseId/precedents" element={<Private><PrecedentLinks /></Private>} />

      {/* Drafting module */}
      <Route path="/drafting/templates" element={<Private><Templates /></Private>} />
      <Route path="/drafting/editor" element={<Private><DraftEditor /></Private>} />
      <Route path="/drafting/compare" element={<Private><ClauseCompare /></Private>} />
      <Route path="/drafting/versions" element={<Private><VersionHistory /></Private>} />

      {/* Research module */}
      <Route path="/research" element={<Private><ResearchSearch /></Private>} />
      <Route path="/research/workspace" element={<Private><ResearchWorkspace /></Private>} />

      {/* Admin */}
      <Route path="/admin" element={<Private><AdminPlaceholder /></Private>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
