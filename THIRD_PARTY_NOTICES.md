# Third-party notices

## Remotion and Remotion Agent Skills

- Remotion packages: version 4.0.539, https://github.com/remotion-dev/remotion
- Official skills: https://github.com/remotion-dev/skills, commit `30d4553ecd46fbc5212fd0ff006ae43af522158b`.
- The skills were installed as project-local reference files under `.agents/skills/`. They retain their upstream contents and attribution. Remotion itself is subject to its own company/product license, not this repository's MIT license.

## RemotionUI

- Upstream: https://github.com/riaz37/remotion-ui
- Commit: `0aecaca2b61a167992e1205d10e4da16d8a71331`; CLI 0.9.1.
- MIT, copyright 2026 RemotionUI. Full notice: `assets/licenses/RemotionUI-MIT.txt`.
- Copied primitives: `masked-slide-reveal`, `typewriter`, `path-draw`, `spring-in`, and their resolved library dependencies.
- Local modifications: Arabic-safe mask line height and an optional style override on `MaskedSlideReveal`. The rest of the film's scene design, editorial wipe, and composition are original project code.

## Google Fonts, distributed by Fontsource

All three families originate in Google Fonts and are distributed under SIL Open Font License 1.1. WOFF2 files are self-hosted so rendering needs no external font requests.

- IBM Plex Sans Arabic — copyright IBM Corp.; `@fontsource/ibm-plex-sans-arabic` 5.3.0.
- Space Grotesk — The Space Grotesk Project Authors; `@fontsource-variable/space-grotesk` 5.3.0.
- JetBrains Mono — The JetBrains Mono Project Authors; `@fontsource-variable/jetbrains-mono` 5.3.0.

Original notices are preserved in `assets/licenses/*-OFL.txt`.

## Simple Icons

`simple-icons` 16.36.0. The package is CC0-1.0; company names, logos, and trademarks remain the property of their respective owners. Inclusion does not imply endorsement. Source URLs for every exported SVG are in `public/icons/manifest.json`. Package notice: `assets/licenses/Simple-Icons-CC0.txt`.

## Original assets

The six scene layouts, film spark mark, motion choreography, grain texture, and synthesized soundtrack were created for this project. The spark is an original film graphic, not the official Arena logo. No external music samples, stock video, or copied social-media video assets are included.

## Render-only tooling

`@sparticuz/chromium` supplies an optional Linux browser binary. Chromium and its bundled libraries retain their upstream licenses. The optional bootstrap builds Mozilla NSPR from https://github.com/mozilla/nspr (MPL-2.0). These tools are not embedded in the exported film; runtime downloads/builds stay outside Git.
