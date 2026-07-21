// data.js — the full program as structured data.
// Editing your program later means editing this file only.

const PROGRAM = {
  meta: {
    title: "V-Taper Program",
    subtitle: "5-Day Hypertrophy · PPL + Upper/Lower",
    tagline: "Every muscle 2×/week. Side delts 3×. Priorities first, when you're fresh. Each lift carries its own reps-in-reserve target.",
    footer: "5-Day V-Taper Program · Run 8–12 weeks",
  },

  days: [
    {
      id: "push",
      dow: "MON",
      name: "Push",
      focus: "<b>Upper chest · side delts · triceps.</b> Incline first — your #1 chest priority gets you freshest.",
      exercises: [
        { name: "Incline Barbell Press (30°)", scheme: "4 × 6–9", rest: "3 min", rir: "1–2", note: "Heavy upper-chest driver. Alt: incline DB / Smith." },
        { name: "Flat / Slight-Decline DB Press", scheme: "3 × 8–12", rest: "2–3 min", rir: "1–2", note: "Mid + lower pec fullness. Deep stretch at the bottom." },
        { name: "Low-to-High Cable Fly", scheme: "3 × 12–15", rest: "90 s", rir: "0–1", note: "Upper-chest isolation, constant tension. Alt: pec deck." },
        { name: "Machine Shoulder Press", scheme: "3 × 8–12", rest: "2 min", rir: "1–2", note: "Front-delt loading without stabiliser fatigue." },
        { name: "Cable Lateral Raise", scheme: "4 × 12–20", rest: "60–90 s", rir: "0–1", note: "Width — priority. Tension at the bottom dumbbells miss. Last set to failure." },
        { name: "Overhead Cable Triceps Extension", scheme: "3 × 10–15", rest: "90 s", rir: "0–1", note: "Long head at full stretch — 2/3 of triceps mass." },
        { name: "Triceps Pressdown", scheme: "2 × 12–15", rest: "60 s", rir: "0", note: "Lateral-head finisher. Take both sets to failure." },
      ],
    },
    {
      id: "pull",
      dow: "TUE",
      name: "Pull",
      focus: "<b>Lat width · back thickness · rear delts · biceps · abs.</b>",
      exercises: [
        { name: "Wide-Grip Pull-Up (weighted)", scheme: "4 × 6–10", rest: "3 min", rir: "1–2", note: "The V-taper cornerstone — vertical pull. Add weight past 10 clean reps. Alt: wide lat pulldown." },
        { name: "Chest-Supported Row", scheme: "3 × 8–12", rest: "2–3 min", rir: "1–2", note: "Horizontal pull. Elbows 45°, pull to lower ribs. Mid-back thickness, zero lower-back fatigue." },
        { name: "Single-Arm Lat Pulldown", scheme: "3 × 10–15", rest: "90 s", rir: "0–1", note: "Lats at long length; fixes side-to-side imbalance." },
        { name: "Reverse Pec Deck", scheme: "3 × 15–20", rest: "60 s", rir: "0–1", note: "Rear delts — the 3D shoulder look." },
        { name: "Incline Dumbbell Curl", scheme: "3 × 8–12", rest: "90 s", rir: "0–1", note: "Biceps long head at max stretch." },
        { name: "Hammer Curl", scheme: "2 × 10–15", rest: "60 s", rir: "0–1", note: "Brachialis — arm width from the side." },
        { name: "Cable Crunch", scheme: "3 × 10–15", rest: "60 s", rir: "0–1", note: "Weighted abs. Add load over time — train them like any muscle." },
      ],
    },
    {
      id: "legs",
      dow: "WED",
      name: "Legs A",
      focus: "<b>Quads · hamstrings · calves · lower abs.</b> Thursday is a full rest day.",
      exercises: [
        { name: "Hack Squat or Back Squat", scheme: "4 × 6–10", rest: "3 min", rir: "1–2", note: "Primary quad builder. Alt: deep leg press." },
        { name: "Romanian Deadlift", scheme: "3 × 8–10", rest: "3 min", rir: "2", note: "Hams + glutes at long length. Leave 2 in the tank — spare the lower back." },
        { name: "Leg Extension", scheme: "3 × 12–15", rest: "90 s", rir: "0–1", note: "Quad detail — the only lift that fully shortens the rectus femoris." },
        { name: "Seated Leg Curl", scheme: "3 × 10–15", rest: "90 s", rir: "0–1", note: "Seated beats lying for hamstring growth." },
        { name: "Standing Calf Raise", scheme: "4 × 10–15", rest: "60–90 s", rir: "0–1", note: "Pause 1–2 s in the deep stretch. No bouncing." },
        { name: "Hanging Leg Raise", scheme: "3 × 10–15", rest: "60 s", rir: "0–1", note: "Lower abs. Slow the negative to progress." },
      ],
    },
    {
      id: "upper",
      dow: "FRI",
      name: "Upper",
      focus: "<b>Full upper body — chest &amp; back get real work, delts &amp; arms get the pump.</b> Keeps every upper muscle at a true 2×/week and your chest full all week.",
      exercises: [
        { name: "Standing Barbell OHP", scheme: "4 × 6–10", rest: "3 min", rir: "1–2", note: "Heavy delt overload — first lift, progress it hard." },
        { name: "Incline Dumbbell Press", scheme: "3 × 8–12", rest: "2–3 min", rir: "1–2", note: "Chest #2 — upper-chest bias again, DB variation of Monday. Alt: weighted dip." },
        { name: "Chest-Supported Row", scheme: "3 × 8–12", rest: "2 min", rir: "1–2", note: "Back #2 — horizontal thickness. Squeeze, chest tall. Alt: seated cable row." },
        { name: "Dumbbell Lateral Raise", scheme: "4 × 12–20", rest: "60–90 s", rir: "0–1", note: "2nd heavy side-delt session. Last set: drop set." },
        { name: "High-to-Low Cable Fly", scheme: "2 × 12–15", rest: "60 s", rir: "0–1", note: "Lower/sternal chest — the piece that fills out the bottom of the pec. To failure. Alt: dip." },
        { name: "EZ-Bar Curl", scheme: "3 × 8–12", rest: "no rest ↓", rir: "0–1", note: "Heavy biceps slot of the week.", superset: "start" },
        { name: "Skull Crusher (EZ bar)", scheme: "3 × 10–12", rest: "90 s", rir: "0–1", note: "Long-head stretch. Curl → crusher, then rest.", superset: "end" },
        { name: "Rope Face Pull", scheme: "2 × 15–20", rest: "60 s", rir: "1", note: "Rear delts + shoulder health under 5 pressing days." },
      ],
    },
    {
      id: "lower",
      dow: "SAT",
      name: "Lower B",
      focus: "<b>Posterior chain · unilateral quads · calves · abs</b> + a light 3rd side-delt hit. Sunday rest.",
      exercises: [
        { name: "Leg Press", scheme: "4 × 10–15", rest: "2–3 min", rir: "1–2", note: "Quad session #2, higher reps, less systemic fatigue." },
        { name: "Bulgarian Split Squat", scheme: "3 × 8–12 /leg", rest: "2 min", rir: "1–2", note: "Glutes + quads, fixes imbalances." },
        { name: "Lying Leg Curl", scheme: "3 × 10–15", rest: "90 s", rir: "0–1", note: "Hamstrings #2, different angle from seated." },
        { name: "Seated Calf Raise", scheme: "4 × 12–20", rest: "60 s", rir: "0–1", note: "Soleus — the head standing raises miss." },
        { name: "Cable Lateral Raise (light)", scheme: "3 × 15–20", rest: "60 s", rir: "1", note: "Free 3rd weekly side-delt exposure, low fatigue." },
        { name: "Weighted Decline Crunch", scheme: "3 × 10–15", rest: "60 s", rir: "0–1", note: "Abs session #2 — progressive overload like any muscle." },
      ],
    },
  ],

  schedule: [
    { day: "Mon", session: "Push", rest: false },
    { day: "Tue", session: "Pull", rest: false },
    { day: "Wed", session: "Legs A", rest: false },
    { day: "Thu", session: "Rest", rest: true },
    { day: "Fri", session: "Upper", rest: false },
    { day: "Sat", session: "Lower B", rest: false },
    { day: "Sun", session: "Rest", rest: true },
  ],

  rules: [
    { n: "01", title: "Double progression", body: "Start at the bottom of the rep range at the listed RIR. Add reps weekly. When every set hits the top → add 2.5 kg (upper) / 5 kg (lower) and reset to the bottom." },
    { n: "02", title: "Reps in reserve", body: "Each lift shows its RIR target. Heavy compounds sit at 1–2 RIR to manage fatigue; isolations (laterals, curls, flys, extensions, abs) run 0–1 RIR — the last set to true failure. Never grind a heavy barbell press to failure." },
    { n: "03", title: "Deload every 6th week", body: "Half the sets, ~60–70% load, 4+ RIR. Then resume where you left off." },
    { n: "04", title: "Stalled 2–3 weeks?", body: "Check sleep and food first, then switch to the listed alternative." },
    { n: "05", title: "Beat the logbook", body: "Every session, beat at least one set from last week — a rep or 2.5 kg. That is the whole game." },
    { n: "06", title: "Eat to grow, stay shredded", body: "Small surplus (~200–400 kcal), ~1.8–2.2 g protein/kg. Abs are trained 3×/week here, but they show up in the kitchen — grow slowly, don't bulk over them." },
  ],
};
