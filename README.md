# Ether's View

An interactive journey through the universe, by **Ether**. Begin at the Big Bang, set to Ether's song *The Big Bang · Zero Point Genesis*, then explore on your own: the planets on their real orbits, moons, dwarf planets and asteroids, other star systems (including double-sun worlds), constellations, nebulae, black holes and the Milky Way.

## Features

- **The Big Bang:** a particle simulation of the universe's history, from inflation to the cosmic web, timed to the song.
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
- Horsehead, Eagle, Ring, Helix and Cat’s Eye images are telescope observations, credited with source links in their details panels. Other nebula images remain illustrations. Telescope filters may produce enhanced or assigned colors. Astrological meanings are offered for reflection.

## Verification

Run `node verify.cjs` for orbital geometry, quantum-string precision and exact-name search regressions. The JPL short-range elements are fitted for 1800–2050; deep-time positions are illustrative.

## Telescope image sources

- [Cat’s Eye](https://science.nasa.gov/asset/hubble/cats-eye-nebula/) — NASA, ESA, Hubble Heritage Team (STScI/AURA).
- [Horsehead](https://science.nasa.gov/asset/hubble/the-horsehead-nebula/) — NASA, NOAO, ESA, Hubble Heritage Team (STScI/AURA); K. Noll, C. Luginbuhl, F. Hamilton.
- [Eagle](https://science.nasa.gov/asset/hubble/eagle-nebula-pillars-of-creation/) — NASA, ESA, Hubble Heritage Team (STScI/AURA).
- [Ring](https://science.nasa.gov/asset/hubble/hubble-captures-a-ring/) — NASA, ESA, Hubble Heritage (STScI/AURA)-ESA/Hubble Collaboration.
- [Helix](https://science.nasa.gov/asset/hubble/the-helix-nebula-a-gaseous-envelope-expelled-by-a-dying-star/) — NASA, ESA, C.R. O’Dell (Vanderbilt University), M. Meixner and P. McCullough (STScI).

The downloaded NASA web renditions are bundled locally. The 3D renderer preserves their aspect ratio and fades their edges; downloaded images are otherwise unchanged.
