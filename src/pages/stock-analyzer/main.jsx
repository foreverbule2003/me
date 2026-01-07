import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameBoyShell } from '../../components/GameBoyShell.jsx';
import '../../index.css';  // Tailwind CSS
import '../../../assets/gb-theme.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
