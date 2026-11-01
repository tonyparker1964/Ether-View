# Ether's View

An interactive journey through the universe, by **Ether**. Begin at the Big Bang, set to Ether's song *The Big Bang · Zero Point Genesis*, then explore on your own: the planets on their real orbits, moons, dwarf planets and asteroids, other star systems (including double-sun worlds), constellations, nebulae, black holes and the Milky Way.

## Features

- **The Big Bang:** a particle simulation of the universe's history, from inflation through the birth of the Sun and planets to the cosmic web, timed to the song, with faint quantum strings linking galaxies and worlds.
- **Living planets:** Saturn's rings orbit at their own speeds, with spokes, shadows and the north polar hexagon storm; Jupiter's bands flow around a turning Great Red Spot; Earth's clouds drift and change.
- **Your music:** add songs from your device to the playlist; they stay in your browser.
- **Real sky positions:** the Sun, Moon and planets for any date, with a sky report (conjunctions, oppositions, planet parades, Moon phase) and astrological aspects.
- **Planet meanings:** archetypes, signs, rulerships, days, metals, chakras and Solfeggio tones, from Ether's Field.
- **Time travel:** step or jump by seconds up to terayears, from the Big Bang to 100 trillion years ahead.
- **Star systems:** single and double-sun systems such as TRAPPIST-1, Kepler-90, Kepler-16 ("Tatooine") and Kepler-47.
- **Quantum strings:** a vibrating, music-reactive web of light joining every body, in each body's own color or by astrological aspect.
- **Movable panels, layers, search and a zoom slider.**

## Run it

Open the site on GitHub Pages, or serve the folder locally (textures don't load from `file://`):

```
python3 -m http.server
```

then visit http://localhost:8000.

## Credits

- Planet and Sun images and music: Ether.
- Moon surface map: © 2010–2017 [Solar System Scope](https://www.solarsystemscope.com/textures/), based on NASA imagery, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Planet positions: NASA JPL approximate Keplerian elements. Star, nebula, black-hole and exoplanet values from published catalogs.
- 3D rendering: [three.js](https://threejs.org) (MIT), loaded from cdnjs.
- Nebulae and the Pleiades use credited telescope observations, with source links in each details panel. Telescope filters may produce enhanced or assigned colors. Astrological meanings are offered for reflection.

## Verification

Run `node verify.cjs` for orbital geometry, quantum-string precision and exact-name search regressions. JPL short-range elements are fitted for 1800–2050; deep-time positions remain illustrative.

## Telescope image sources

- [orion](https://science.nasa.gov/asset/hubble/orion-nebula-2/) — NASA, ESA, M. Robberto (STScI/ESA) and the Hubble Space Telescope Orion Treasury Project Team.
- [lagoon](https://science.nasa.gov/asset/hubble/lagoon-nebula-visible-light-view/) — NASA, ESA, and STScI.
- [crab](https://science.nasa.gov/asset/hubble/crab-nebula-3/) — NASA, ESA, and the Hubble Heritage Team (STScI/AURA).
- [trifid](https://science.nasa.gov/asset/hubble/trifid-nebula-wide-field-camera-3-image/) — NASA, ESA, STScI; Image Processing: Joseph DePasquale (STScI).
- [rosette](https://science.nasa.gov/asset/hubble/dark-clouds-in-rosette-nebula/) — NASA, ESA, STScI; Image Processing: Joseph DePasquale (STScI).
- [carina](https://science.nasa.gov/asset/hubble/carina-nebula/) — NOAO, AURA, NSF, and N. Smith (University of Arizona).
- [tarantula](https://science.nasa.gov/asset/webb/tarantula-nebula-nircam-image/) — NASA, ESA, CSA, STScI, Webb ERO Production Team.
- [pleiades](https://science.nasa.gov/asset/hubble/hubble-refines-distance-to-the-pleiades-star-cluster/) — NASA, ESA and AURA/Caltech.
- [northamerica](https://science.nasa.gov/photojournal/the-case-of-the-disappearing-continent/) — NASA/JPL-Caltech.
- [catseye](https://science.nasa.gov/asset/hubble/cats-eye-nebula/) — NASA, ESA, and the Hubble Heritage Team (STScI/AURA).
- [horsehead](https://science.nasa.gov/asset/hubble/the-horsehead-nebula/) — NASA, NOAO, ESA and the Hubble Heritage Team (STScI/AURA); K. Noll, C. Luginbuhl, F. Hamilton.
- [eagle](https://science.nasa.gov/asset/hubble/eagle-nebula-pillars-of-creation/) — NASA, ESA, and the Hubble Heritage Team (STScI/AURA).
- [ring](https://science.nasa.gov/asset/hubble/hubble-captures-a-ring/) — NASA, ESA, and the Hubble Heritage (STScI/AURA)-ESA/Hubble Collaboration.
- [helix](https://science.nasa.gov/asset/hubble/the-helix-nebula-a-gaseous-envelope-expelled-by-a-dying-star/) — NASA, ESA, C.R. O'Dell (Vanderbilt University), M. Meixner and P. McCullough (STScI).

NASA web renditions are bundled locally; the Tarantula image is encoded as JPEG for download size. The renderer preserves image proportions and fades display edges. Cloud depth, moon/exoplanet phases, deep time and black-hole models remain illustrative. Planet and Sun artwork is preserved.
