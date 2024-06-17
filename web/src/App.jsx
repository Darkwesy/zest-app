import { useState } from 'react';
import { EventsScreen } from './Screens/Events';
import { CadastroScreen } from './Screens/CadastroScreen';
import { EventUpdateScreen } from './Screens/EventUpdate';
import NavBarV0 from './components/component/Navbar';

export function App() {
  const [currentSection, setcurrentSection] = useState('home');

  const handleSectionChange = (section) => {
    setcurrentSection(section);
  };

  return (
    <div className="flex flex-col min-h-screen w-full g-white">
      <nav className="sm:px-6 border-b border-zinc-300">
        <NavBarV0 onSectionChange={handleSectionChange} />
      </nav>
      <main
        className={`flex-1 flex flex-col lg:flex-col gap-6 items-center justify-start 
        ${currentSection === 'home' || currentSection === 'update' ? 'sm:justify-start' : 'sm:justify-center'} 
        my-6  bg-white`}
      >
        {currentSection === 'cadastro' && <CadastroScreen />}
        {currentSection === 'home' && <EventsScreen />}
        {currentSection === 'update' && <EventUpdateScreen />}
      </main>
      <footer className="text-zinc-900 p-4 text-end bg-white">
        <div className="px-6 sm:px-20 py-4 text-xs">&copy; 2024 Thiago Vinicius (@darkwesy)</div>
      </footer>
    </div>
  );
}
