# Unique planetary images

The original repository had 48 image files, with no identical Git blob hashes. The visible duplication was in rendering assignments: all 15 additional moons and all four additional dwarf planets used the same procedural lunar crater map. The 26 exoplanets reused four generic maps.

Each of those 45 bodies now has a separately generated, original surface/atmosphere texture, used on its own 3-D mesh and in its full-size image. The existing Earth Moon map and ten Sun/major-planet portraits and maps are preserved. Existing credited telescope photographs are preserved.

New full-size portraits are rendered on demand by Three.js at **3840 × 2160**. Source texture detail is **1774 × 887**, generated with OpenAI Image Generation and packaged as JPEG at quality 92. These are 4K renders from lower-resolution generated maps, not native 4K spacecraft photographs. The generated asset sheet used during concept review is not used in the application.

AI reconstructions use characteristic surface types (Io's sulfur and volcanism, Europa's cracks, Ceres' salts, Titan's amber atmosphere, Charon's red polar region). They are illustrations, not navigational maps or exact scientific reconstructions. Haumea, Makemake and Eris do not have resolved global surface maps; their detailed geography is conjectural. All exoplanet surface/cloud appearances are speculative. Gas giants and Titan show atmospheres rather than invented cratered rocky surfaces. Phobos and Deimos use irregular ellipsoidal geometry; Haumea retains its elongated shape.

## Scientific references

- [NASA: dwarf planets](https://science.nasa.gov/dwarf-planets/)
- [NASA: Haumea](https://science.nasa.gov/dwarf-planets/haumea/)
- [NASA: Io](https://science.nasa.gov/jupiter/jupiter-moons/io/)
- [NASA: Europa](https://science.nasa.gov/jupiter/jupiter-moons/europa/europa-facts/)
- [NASA: Titan](https://science.nasa.gov/saturn/moons/titan/facts/)
- [Canadian Space Agency: dwarf planets and unresolved Eris surface](https://www.asc-csa.gc.ca/eng/astronomy/solar-system/dwarf-planets.asp)

## Verification

`body-image-manifest.json` records each replacement body's filename, source and output dimensions, byte count and SHA-256 checksum. `node verify-images.cjs` verifies complete catalog coverage, distinct file assignments and image bytes, preservation of the original portraits, and removal of shared moon/exoplanet texture assignments. Browser checks verify the generated images and full-size viewer.
