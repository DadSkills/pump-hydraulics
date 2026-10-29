# Pump Operator Hydraulics

Pump discharge pressure and friction loss calculator for fire apparatus driver/operators. Free to use, installs on Android and iPhone, and works with no signal.

**Open the app:** https://dadskills.github.io/pump-hydraulics/

## What it does

### Pump pressure
Pick a hose lay, then set each value with scroll wheels. The pump discharge pressure updates as you go, with a breakdown beside it: nozzle pressure (NP), friction loss (FL), appliance loss (AL) and elevation pressure (EP). Swipe left to see every step of the math.

- **Single line:** one attack line off a discharge
- **Wyed lines:** a supply line to a gated wye feeding two attack lines. The app pumps to the line that needs the most pressure and tells you how much to gate down the other.
- **Master stream:** a portable monitor fed by hose, or a deck gun piped from the pump
- **Standpipe:** supply to the FDC and an attack line from the outlet, with elevation by floor

### Quick calcs
- Friction loss for any hose, flow and length, with a per-100-ft table
- Preconnect pump chart from 50 to 400 ft
- Smooth bore tip flow
- Elevation pressure in feet or floors

### Hydrant
Estimates how much more water a hydrant can supply using the percentage method. Compare static and residual pressure to see how many more lines of the same flow are available.

### Coefficients
Change the friction loss coefficients and rules to match your department. Changes are saved on your device, and one button restores the standard values.

## Install it on your phone
- **Android:** open the link in Chrome, tap ⋮, then **Install app**.
- **iPhone:** open the link in Safari, tap Share, then **Add to Home Screen**.

Open it once with a connection. After that it works offline.

## How the numbers are built
- **Pump discharge pressure:** PDP = NP + FL + AL + EP
- **Friction loss:** FL = C × Q² × L, where Q is flow in hundreds of gpm and L is length in hundreds of feet
- **Smooth bore flow:** GPM = 29.7 × d² × √NP, where d is the tip diameter in inches
- **Nozzle pressure:** fog 100 psi (low-pressure fog 75 or 50), smooth bore handline 50, smooth bore master stream 80
- **Appliances:** 0 psi under 350 gpm, 10 psi at 350 gpm or more. Master stream devices 25 psi. Standpipe systems 25 psi.
- **Elevation:** 0.5 psi per foot, or 5 psi per floor above the first. Basement floors −1 to −5 take 5 psi off per floor.

### Standard friction loss coefficients
| Hose | C |
|---|---|
| ¾″ booster | 1100 |
| 1″ booster | 150 |
| 1½″ | 24 |
| 1¾″ (1½″ couplings) | 15.5 |
| 2″ | 8 |
| 2½″ | 2 |
| 3″ (2½″ couplings) | 0.8 |
| 3″ (3″ couplings) | 0.677 |
| 4″ | 0.2 |
| 4½″ | 0.1 |
| 5″ | 0.08 |
| 6″ | 0.05 |
| Two 2½″, siamesed | 0.5 |
| Three 2½″, siamesed | 0.22 |
| Two 3″ (2½″ couplings), siamesed | 0.2 |
| One 2½″ + one 3″, siamesed | 0.3 |

## Standards
Covers the pump pressure calculations a pumper driver/operator is expected to perform under NFPA 1002, which is now part of NFPA 1010 (2024 edition), chapters 11 and 12. The coefficients and rules are the standard values taught in driver/operator courses. This project is not affiliated with or endorsed by the NFPA.

## Privacy
No accounts, no tracking and no data collection. Your entries and settings are stored only on your own device. Fonts load from Google Fonts the first time the app opens.

## Disclaimer
This is a training and preplanning aid. Always follow your department's pump charts and SOPs, and stay within the rated pressures of your hose and pump. The app is provided as is, without warranty of any kind.

## License
© 2026 Christian Lemire. Licensed under Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 (CC BY-NC-ND 4.0). You're free to use and share it, with credit, for non-commercial purposes. Modified versions may not be distributed. See [LICENSE.md](LICENSE.md).

## Changelog
See [CHANGELOG.md](CHANGELOG.md).
