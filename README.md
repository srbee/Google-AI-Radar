# 🛰️ Google AI Radar

A mobile-first GitHub Pages dashboard for tracking Google's AI ecosystem from **official Google sources**.

## Current version

The starter edition provides:

- Latest-first radar layout
- Search
- Category filters
- Direct links to official Google pages
- Mobile-friendly design
- No third-party news dependency

## Official sources

- Google AI: https://ai.google/
- Google AI Products: https://ai.google/products/
- Google Labs: https://labs.google/
- Google AI Blog: https://blog.google/innovation-and-ai/
- Google DeepMind: https://deepmind.google/
- DeepMind Research Projects: https://deepmind.google/research/projects/

## Roadmap

The next major layer is automated ingestion from Google's official RSS/Atom feeds and announcement pages, with:

1. Automatic new-item discovery
2. Deduplication
3. Category classification
4. "New since last visit"
5. Archive/search
6. Retired/replaced project tracking
7. GitHub Actions scheduled refresh

The design deliberately treats Google itself as the primary source ("horse's mouth") and can later add secondary sources as an explicitly separate layer.
