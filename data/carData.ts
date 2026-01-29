export const temerarioData = {
  name: "Temerario",
  fullName: "Lamborghini Temerario",
  tagline: "The First HPEV Super Sports Car",

  specs: {
    engine: {
      type: "Twin-Turbo V8 + 3 Electric Motors",
      displacement: "4.0L",
      power: "920 CV",
      torque: "730 Nm",
      redline: "10,000 RPM",
    },
    performance: {
      acceleration: "2.7s",
      accelerationLabel: "0-100 km/h",
      topSpeed: "340 km/h",
      weight: "1,690 kg",
      powerToWeight: "545 CV/tonne",
    },
    transmission: "8-speed DCT",
    drivetrain: "AWD with torque vectoring",
  },

  design: {
    highlights: [
      "Hexagonal Design Theme",
      "Y-Shaped Lighting Signature",
      "Forged Carbon Fiber Monocoque",
      "Active Aerodynamic System",
    ],
  },

  features: [
    {
      icon: "Zap",
      title: "Twin-Turbo V8",
      description: "4.0L engine with 10,000 RPM redline, 800 CV",
    },
    {
      icon: "Gauge",
      title: "Triple Electric Motors",
      description: "Two front axle + one rear integrated, 120 kW total",
    },
    {
      icon: "Wind",
      title: "Active Aerodynamics",
      description: "1,500 kg downforce at 280 km/h",
    },
    {
      icon: "Cpu",
      title: "LDVI 2.0",
      description: "Predictive vehicle dynamics integration",
    },
  ],

  statsGrid: [
    { value: "2.7s", label: "0-100 km/h" },
    { value: "340", label: "km/h Top Speed" },
    { value: "1,690", label: "kg Weight" },
    { value: "920", label: "CV Power" },
  ],
};

export type TemerarioData = typeof temerarioData;
