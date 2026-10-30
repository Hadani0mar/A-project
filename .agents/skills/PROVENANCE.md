# Installed skills provenance

Downloaded from the official https://github.com/remotion-dev/skills repository on 2026-10-30.

Upstream commit: `30d4553ecd46fbc5212fd0ff006ae43af522158b` (4.0.539).

The project includes the five skills relevant to this film: best practices, create, markup, render, and studio. Their documentation is reference material, not executable project code. The upstream `remotion-best-practices` directory includes its bundled topic references; sibling skill directories provide direct entry points.

To update using the official distributor:

```bash
npx skills add remotion-dev/skills
```

Review upstream diffs before replacing local reference files. The film uses the installed 4.0.539 APIs; all Remotion npm packages are pinned to the same version.

RemotionUI source components were installed separately with its CLI and are located in `src/remotion/primitives/` and `src/remotion/lib/`. See `THIRD_PARTY_NOTICES.md` at the repository root for attribution and local changes.
