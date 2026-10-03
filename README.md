# 🛰️ Google AI Radar

A mobile-first GitHub Pages dashboard for tracking Google's AI ecosystem from **official Google sources**.

## What it does

- **Automatic updates** from Google's official AI Blog and Google DeepMind RSS feeds.
- Keeps a rolling archive of up to 500 official items.
- Search across the archive.
- Filter by Products, Models, Labs, DeepMind, Research, Science, Developer and History.
- Marks items **NEW** until you mark them read on your device.
- Links directly to the original Google source.
- Includes an official Google Labs directory for experiments such as Flow Music, Flow, Stitch, Pomelli, Disco, Opal and Jules.
- Runs as a static GitHub Pages site; the updater runs in GitHub Actions.

Google Labs is Google's home for AI experiments, and its current directory includes Flow Music and other experiments. citeturn0search3

## Automatic data sources

The updater uses:

- Google AI Blog RSS: https://blog.google/innovation-and-ai/technology/ai/rss/
- Google DeepMind RSS: https://deepmind.google/blog/rss.xml
- Google Labs directory: https://labs.google/
- Google DeepMind research: https://deepmind.google/research/

The public-facing radar deliberately keeps the **horse's-mouth principle**: the feed items come from Google's own domains.

## GitHub Actions

Workflow:

`.github/workflows/update-radar.yml`

It runs every 6 hours, can be started manually from **Actions → Update Google AI Radar**, and also runs when the workflow file changes.

The action writes the generated archive to:

`data.json`

## GitHub Pages

Enable Pages with:

**Settings → Pages → Deploy from a branch → main → /(root)**

The site then follows the normal GitHub Pages URL for this repository.

## Important limitation

Google does not expose one public, comprehensive feed containing every AI product, experiment, research project and lifecycle change. The radar therefore combines automated official feeds with curated official directories. That is intentional: completeness is improved without silently introducing third-party reporting.
