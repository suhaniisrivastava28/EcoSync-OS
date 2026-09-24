import React from 'react';

// Illustration of student sitting on ground with backpack
export const SittingStudentIllustration: React.FC<{ className?: string }> = ({ className = "w-40 h-40" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="100" cy="180" rx="65" ry="8" fill="#d7bc9d" fillOpacity="0.4" />
    
    {/* Backpack on ground */}
    <rect x="52" y="115" width="34" height="42" rx="10" fill="#cfb195" stroke="#191614" strokeWidth="3" />
    <path d="M60 115 V102 C60 98 78 98 78 102 V115" stroke="#191614" strokeWidth="3" fill="none" />
    <path d="M56 135 H82" stroke="#191614" strokeWidth="2.5" />
    <circle cx="69" cy="144" r="2.5" fill="#191614" />
    
    {/* Student body sitting hugging knees */}
    {/* Hair */}
    <path d="M125 58 C120 40 100 42 96 56 C90 56 86 64 88 72 C91 80 97 82 101 82 C108 92 122 92 128 80 C134 78 136 68 132 60 Z" fill="#191614" />
    {/* Head */}
    <circle cx="112" cy="68" r="14" fill="#f5ebe0" stroke="#191614" strokeWidth="2.5" />
    {/* Glasses / Face details */}
    <circle cx="108" cy="68" r="4.5" stroke="#191614" strokeWidth="2" fill="none" />
    <circle cx="118" cy="68" r="4.5" stroke="#191614" strokeWidth="2" fill="none" />
    <path d="M112.5 68 H113.5" stroke="#191614" strokeWidth="2" />
    <path d="M109 76 C112 78 116 78 118 76" stroke="#191614" strokeWidth="2" strokeLinecap="round" />
    
    {/* Torso / Oversized sweatshirt */}
    <path d="M96 85 C96 85 88 120 86 132 C96 138 128 138 138 132 C134 116 128 85 128 85 Z" fill="#e9dacb" stroke="#191614" strokeWidth="3" />
    <path d="M104 85 C108 90 116 90 120 85" stroke="#191614" strokeWidth="2.5" fill="none" />
    
    {/* Hugging arms */}
    <path d="M92 100 C88 110 94 135 116 134 C128 134 136 120 134 100" stroke="#191614" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M92 100 C88 110 94 135 116 134 C128 134 136 120 134 100" stroke="#f5ebe0" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Folded legs / knees */}
    <path d="M88 132 C82 145 88 168 110 168 C124 168 130 156 128 140" stroke="#191614" strokeWidth="3.5" fill="#2a1a0f" />
    <path d="M108 140 C116 150 134 168 148 168 C158 168 160 156 142 136" stroke="#191614" strokeWidth="3.5" fill="#191614" />
    
    {/* Sneakers */}
    <path d="M102 168 C96 168 94 176 104 176 H118 C122 176 122 168 116 168 Z" fill="#faf6f0" stroke="#191614" strokeWidth="2.5" />
    <path d="M142 168 C136 168 134 176 144 176 H158 C162 176 162 168 156 168 Z" fill="#faf6f0" stroke="#191614" strokeWidth="2.5" />
  </svg>
);

// Illustration of student walking with backpack and headphones
export const WalkingStudentIllustration: React.FC<{ className?: string }> = ({ className = "w-40 h-40" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="105" cy="185" rx="55" ry="6" fill="#d7bc9d" fillOpacity="0.4" />
    
    {/* Cap / Beanie */}
    <path d="M92 38 C90 32 98 28 108 28 C118 28 126 32 124 38 Z" fill="#191614" />
    <path d="M88 38 H128" stroke="#191614" strokeWidth="3" strokeLinecap="round" />
    
    {/* Head & Face */}
    <circle cx="106" cy="48" r="12" fill="#f5ebe0" stroke="#191614" strokeWidth="2.5" />
    {/* Headphones */}
    <path d="M94 44 C94 36 118 36 118 44" stroke="#191614" strokeWidth="3.5" fill="none" />
    <rect x="91" y="44" width="5" height="10" rx="2" fill="#7f5539" stroke="#191614" strokeWidth="2" />
    <rect x="116" y="44" width="5" height="10" rx="2" fill="#7f5539" stroke="#191614" strokeWidth="2" />
    {/* Eye / smile */}
    <circle cx="111" cy="48" r="1.5" fill="#191614" />
    <path d="M109 54 C112 55 115 54 116 53" stroke="#191614" strokeWidth="1.5" strokeLinecap="round" />

    {/* Backpack straps & pack */}
    <rect x="74" y="65" width="22" height="46" rx="8" fill="#7f5539" stroke="#191614" strokeWidth="3" transform="rotate(-6 74 65)" />
    <path d="M96 66 C100 82 98 106 94 114" stroke="#191614" strokeWidth="3" fill="none" />
    
    {/* Jacket / Hoodie */}
    <path d="M94 62 C104 62 120 64 126 72 C128 88 126 108 122 122 C112 124 96 122 90 120 C88 106 88 78 94 62 Z" fill="#cfb195" stroke="#191614" strokeWidth="3" />
    
    {/* Walking Arm */}
    <path d="M116 74 L134 94 L142 90" stroke="#191614" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="143" cy="89" r="4" fill="#f5ebe0" stroke="#191614" strokeWidth="2" />
    
    {/* Walking Legs */}
    {/* Back Leg */}
    <path d="M96 120 L84 154 L74 176" stroke="#191614" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M68 177 C66 177 64 182 72 182 H84 C88 182 86 177 82 177 Z" fill="#faf6f0" stroke="#191614" strokeWidth="2.5" />
    
    {/* Forward Leg */}
    <path d="M114 122 L132 150 L146 172" stroke="#191614" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M142 172 C138 172 136 178 144 178 H158 C162 178 162 172 156 172 Z" fill="#faf6f0" stroke="#191614" strokeWidth="2.5" />
  </svg>
);
