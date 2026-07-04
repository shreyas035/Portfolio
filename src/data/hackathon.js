export const ecoTrack = {
  id: 'ecotrack-hackfest-2026',
  title: 'EcoTrack',
  tagline: 'An AI-powered carbon footprint tracker built for real people, not spreadsheets.',
  event: 'HACKFEST 2026',
  track: 'Sustainability / Climate Tech',
  team: 'Code Cracker',
  institution: 'PVPIT, Pune',
  result: 'All India Top 60',
  date: '2026',
  techStack: ['React', 'FastAPI', 'Scikit-learn', 'Anthropic Claude API'],

  description:
    "EcoTrack is a carbon footprint tracking app that turns everyday habits — commute, diet, electricity use, purchases — into a clear, personal emissions picture. Built with my team, Code Cracker, at HACKFEST 2026 under the Sustainability / Climate Tech track, it placed in the All India Top 60 out of thousands of entries nationwide.",

  problem:
    "Most carbon calculators are static, generic, and forgettable — you fill a form once and never open it again. We wanted something that actually reflects a person's real footprint over time and nudges them toward better choices without feeling preachy.",

  approach:
    "The app collects lifestyle data through a simple, guided flow, then uses a Scikit-learn model to estimate emissions across categories (transport, energy, food, consumption). A FastAPI backend handles the scoring and history tracking, while the Anthropic Claude API powers a conversational layer that explains a user's footprint in plain language and suggests realistic, personalized changes — not just 'use less plastic' but specific, doable swaps based on their actual habits.",

  highlights: [
    'Built and demoed a working full-stack prototype within the hackathon timeframe',
    'Placed All India Top 60 in the Sustainability / Climate Tech track',
    'Iterated through three versions: a single-file React prototype, a full Next.js + FastAPI spec, and a Three.js + Recharts polished demo',
    'Used the Claude API to turn raw emissions numbers into personalized, natural-language recommendations',
  ],

  myRole:
    'Worked across the ML integration and product direction — connecting the Scikit-learn model to the FastAPI backend, shaping how the Claude API explained results to users, and iterating on the UI across versions.',

  links: {
    github: '#',
    demo: '#',
  },
};
