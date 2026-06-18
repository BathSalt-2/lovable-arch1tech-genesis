import React, { useState } from 'react';
import { GenesisApp } from './components/GenesisApp';
import './index.css';
import SkillsLibraryTab from './SkillsLibraryTab';
import SyntheticDataForgeTab from './SyntheticDataForgeTab';

const tabs = [
  { id: 'skills', label: '⚡ Skills Library' },
  { id: 'sdg', label: '🗄️ Synthetic Data Forge' },
];

export default function App() {
  return <GenesisApp />;
}
