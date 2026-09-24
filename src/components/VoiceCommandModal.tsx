import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, Terminal, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

interface VoiceCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCommand: (command: 'show-analytics' | 'show-dashboard' | 'optimize-grid' | 'show-incidents' | 'show-ledger') => void;
  isDarkMode: boolean;
  themePalette: 'sand' | 'eco';
}

export const VoiceCommandModal: React.FC<VoiceCommandModalProps> = ({
  isOpen,
  onClose,
  onExecuteCommand,
  isDarkMode,
  themePalette,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check SpeechRecognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setFeedback('Listening... Speak a command');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript.toLowerCase().trim();
      setTranscript(text);

      if (event.results[current].isFinal) {
        parseAndExecute(text);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
      setFeedback(`Voice input: ${event.error === 'not-allowed' ? 'Microphone blocked. Use quick commands below.' : event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    setTranscript('');
    setFeedback('Listening... Speak clearly');
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const parseAndExecute = (text: string) => {
    const clean = text.toLowerCase();
    
    if (clean.includes('show analytics') || clean.includes('go to resource') || clean.includes('resource') || clean.includes('analytics')) {
      setFeedback('Recognized: "Show Analytics" → Switching to Resource Allocation Matrix');
      onExecuteCommand('show-analytics');
      setTimeout(onClose, 1200);
    } else if (clean.includes('show dashboard') || clean.includes('dashboard') || clean.includes('telemetry') || clean.includes('home')) {
      setFeedback('Recognized: "Show Dashboard" → Switching to Telemetry Control Grid');
      onExecuteCommand('show-dashboard');
      setTimeout(onClose, 1200);
    } else if (clean.includes('optimize grid') || clean.includes('optimize') || clean.includes('green') || clean.includes('eco mode')) {
      setFeedback('Recognized: "Optimize Grid" → Rebalancing parameters to 100% Green Peak!');
      onExecuteCommand('optimize-grid');
      setTimeout(onClose, 1400);
    } else if (clean.includes('incident') || clean.includes('alert') || clean.includes('safety')) {
      setFeedback('Recognized: "Show Incidents" → Navigating to AI Incident Dispatch Hub');
      onExecuteCommand('show-incidents');
      setTimeout(onClose, 1200);
    } else if (clean.includes('ledger') || clean.includes('token') || clean.includes('credit')) {
      setFeedback('Recognized: "Show Ledger" → Navigating to ESG Carbon Token Ledger');
      onExecuteCommand('show-ledger');
      setTimeout(onClose, 1200);
    } else {
      setFeedback(`Heard "${text}" (No matching voice trigger. Try one below)`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full max-w-lg rounded-32 p-6 sm:p-7 shadow-2xl border transition-all ${
        isDarkMode 
          ? 'bg-neutral-900 border-neutral-800 text-sand-100' 
          : themePalette === 'sand'
          ? 'bg-[#faf6f0] border-[#dfc7b2] text-[#191614]'
          : 'bg-white border-[#4d928f]/30 text-[#1e293b]'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-neutral-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold">
              Voice Command OS
            </h3>
            <p className="text-xs text-neutral-500">
              Hands-free smart campus accessibility & telemetry dispatch
            </p>
          </div>
        </div>

        {/* Big Interactive Mic Button */}
        <div className="text-center my-6">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`relative mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
              isListening
                ? 'bg-rose-500 text-white scale-105 shadow-rose-500/40'
                : 'bg-[#191614] text-[#faf6f0] hover:scale-105 shadow-md hover:bg-neutral-800'
            }`}
          >
            {isListening && (
              <span className="absolute inset-0 rounded-full border-4 border-rose-400 animate-ping opacity-75" />
            )}
            {isListening ? (
              <MicOff className="w-10 h-10 animate-pulse" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>

          <p className="mt-4 text-xs font-semibold tracking-wide uppercase text-neutral-500">
            {isListening ? 'Listening for speech input...' : 'Click to start voice command'}
          </p>

          {/* Transcript / Feedback Bubble */}
          <div className="mt-3 min-h-[48px] px-4 py-2 rounded-20 bg-black/5 dark:bg-white/5 flex items-center justify-center text-xs font-mono">
            {transcript ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                "{transcript}"
              </span>
            ) : feedback ? (
              <span className="text-neutral-600 dark:text-neutral-300">
                {feedback}
              </span>
            ) : (
              <span className="text-neutral-400 italic">
                Say: "Optimize grid", "Show analytics", or "Show dashboard"
              </span>
            )}
          </div>
        </div>

        {/* Fallback Command List (Typography Fallback) */}
        <div className="border-t border-black/10 dark:border-white/10 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Interactive Voice Triggers / Fallback Click
            </span>
            <span className="text-[10px] text-emerald-600 font-mono">
              Web Speech API Native
            </span>
          </div>

          <div className="space-y-1.5">
            {[
              {
                spoken: '"Show analytics" or "Go to resource"',
                desc: 'Switches SPA to Resource Allocation Matrix',
                action: () => {
                  parseAndExecute('show analytics');
                }
              },
              {
                spoken: '"Show dashboard"',
                desc: 'Switches SPA back to Telemetry Control Grid',
                action: () => {
                  parseAndExecute('show dashboard');
                }
              },
              {
                spoken: '"Optimize grid"',
                desc: 'Resets sliders to Max Green + Unlocks Achievement',
                action: () => {
                  parseAndExecute('optimize grid');
                }
              },
              {
                spoken: '"Show incidents"',
                desc: 'Opens AI Incident Dispatch Hub',
                action: () => {
                  parseAndExecute('incident');
                }
              }
            ].map((cmd, idx) => (
              <button
                key={idx}
                onClick={cmd.action}
                className="w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between group hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10"
              >
                <div>
                  <span className="font-mono font-bold text-neutral-800 dark:text-sand-100 group-hover:text-emerald-600">
                    {cmd.spoken}
                  </span>
                  <p className="text-[10px] text-neutral-500">{cmd.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {!recognitionSupported && (
          <div className="mt-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Browser speech recognition restricted. You can click any trigger above to execute commands instantly!</span>
          </div>
        )}
      </div>
    </div>
  );
};
