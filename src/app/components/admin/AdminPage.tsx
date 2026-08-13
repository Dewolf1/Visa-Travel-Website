import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Lock, FileText, FileSignature, ArrowLeft } from 'lucide-react';
import { OfferLetterForm } from './OfferLetterForm';
import { EmploymentContractForm } from './EmploymentContractForm';

export const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'offer-letter' | 'employment-contract'>('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1998') { // Simple password gate
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };





  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-gold/20 p-8 rounded-xl w-full max-w-md shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-[#d4af37]" />
            </div>
            <h1 className="text-2xl font-bold text-white font-outfit">Admin Access</h1>
            <p className="text-zinc-400 mt-2 text-center">Enter password to access the Offer Letter Generator.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold/50 transition-colors"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-[#d4af37] hover:bg-[#c5a017] text-black py-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-[1.02]">
              Access Admin Panel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-12 font-inter">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 pb-6 border-b border-zinc-800">
            <h1 className="text-3xl font-bold text-[#d4af37] font-outfit">Admin Dashboard</h1>
            <p className="text-zinc-400 mt-2">Select a tool to generate documents.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div 
              onClick={() => setActiveTab('offer-letter')}
              className="bg-zinc-900/50 border border-zinc-800 hover:border-[#d4af37]/50 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-zinc-800/50 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Offer Letter</h3>
              <p className="text-zinc-400 text-sm">Generate branded offer letters and salary annexures</p>
            </div>
            <div 
              onClick={() => setActiveTab('employment-contract')}
              className="bg-zinc-900/50 border border-zinc-800 hover:border-[#d4af37]/50 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-zinc-800/50 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileSignature className="w-8 h-8 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Employment Contract</h3>
              <p className="text-zinc-400 text-sm">Generate formal multi-page employment contracts</p>
            </div>
            {/* Future PDF generators can be added here */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-inter">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className="mb-6 bg-transparent hover:text-white text-zinc-400 flex items-center gap-2 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        {activeTab === 'offer-letter' && <OfferLetterForm />}
        {activeTab === 'employment-contract' && <EmploymentContractForm />}
      </div>
    </div>
  );
};
