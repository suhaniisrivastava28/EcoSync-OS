import React, { useState } from 'react';
import { CarbonCreditToken } from '../types';
import { Coins, CheckCircle2, Copy, Check, ExternalLink, ShieldCheck, Sparkles, Hash } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EsgLedgerViewProps {
  tokens: CarbonCreditToken[];
  onMintCredit: (newCredit: CarbonCreditToken) => void;
  carbonDelta: number;
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const EsgLedgerView: React.FC<EsgLedgerViewProps> = ({
  tokens,
  onMintCredit,
  carbonDelta,
  isDarkMode,
  themePalette,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleMint = () => {
    const randomHex = Math.random().toString(16).substring(2, 10);
    const newToken: CarbonCreditToken = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      txHash: `0x${randomHex}e9...${Date.now().toString().slice(-4)}`,
      blockHeight: 1894200 + tokens.length + 1,
      validatorNode: 'CAMPUS-VALIDATOR-N1',
      carbonOffsetTons: +(Math.max(4.5, carbonDelta * 0.4)).toFixed(1),
      beneficiaryZone: 'Autonomous Grid Loop',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      verificationBadge: 'Verra VCS-2026',
      status: 'Minted'
    };

    onMintCredit(newToken);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#191614] dark:text-sand-100">
            Immutable ESG Carbon Credit Distribution Token Log
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Decentralized verifiable environmental ledger • Cryptographic green offsets
          </p>
        </div>

        <button
          onClick={handleMint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#191614] text-[#faf6f0] text-xs font-semibold hover:bg-neutral-800 shadow-md transition-all transform hover:scale-102 active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Mint Verified Carbon Credits</span>
        </button>
      </div>

      {/* Ledger Table Container */}
      <div className={`p-6 rounded-32 border transition-all ${
        isDarkMode 
          ? 'bg-neutral-900 border-neutral-800' 
          : themePalette === 'sand'
          ? 'bg-[#faf6f0] border-[#dfc7b2] shadow-soft'
          : 'bg-white border-[#4d928f]/20 shadow-soft'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#191614] dark:text-sand-100">
                Verified On-Chain Carbon Reductions
              </h3>
              <p className="text-[11px] text-neutral-500">
                Consensus verified by campus node cluster
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-neutral-500">Total Tokens Minted:</span>
            <span className="font-bold text-emerald-600">
              {tokens.reduce((acc, t) => acc + t.carbonOffsetTons, 0).toFixed(1)} t CO₂e
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5 text-neutral-400 uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">Transaction Hash</th>
                <th className="pb-3 font-semibold">Block Height</th>
                <th className="pb-3 font-semibold">Validator Node</th>
                <th className="pb-3 font-semibold">Carbon Offset</th>
                <th className="pb-3 font-semibold">Beneficiary Sub-grid</th>
                <th className="pb-3 font-semibold">Verification Audit</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {tokens.map((token) => (
                <tr key={token.id} className="hover:bg-black/2 dark:hover:bg-white/2 transition-colors font-mono">
                  <td className="py-3 font-bold text-[#191614] dark:text-sand-100">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-700 dark:text-emerald-400">{token.txHash}</span>
                      <button
                        onClick={() => handleCopy(token.txHash)}
                        className="p-1 rounded hover:bg-black/5 text-neutral-400 hover:text-black dark:hover:text-white"
                        title="Copy Tx Hash"
                      >
                        {copiedHash === token.txHash ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-sans">
                      {token.timestamp}
                    </span>
                  </td>
                  <td className="py-3 text-neutral-500">#{token.blockHeight}</td>
                  <td className="py-3 text-neutral-600 dark:text-neutral-400 text-[11px]">
                    {token.validatorNode}
                  </td>
                  <td className="py-3 font-bold text-emerald-600">
                    +{token.carbonOffsetTons} t CO₂e
                  </td>
                  <td className="py-3 font-sans text-neutral-600 dark:text-neutral-300">
                    {token.beneficiaryZone}
                  </td>
                  <td className="py-3 font-sans">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[10px] font-semibold">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {token.verificationBadge}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      ● {token.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
