
# Vault Engineering Blueprint
## Awwwards-Level Art Direction, Technical Research Notes & Codex Implementation Guide

> Goal: Transform the Vault from floating cards into an infinite archival installation.

## Creative Vision
The Vault is an infinite museum archive rather than a gallery. There are no visible walls, floors, or ceilings. Users should feel surrounded by valuable documents suspended in darkness.

### Emotional goals
- Mystery
- Prestige
- Craftsmanship
- Curiosity
- Calm confidence

## Environment
- Infinite world volume (~50×50×50m)
- No visible boundaries
- Exponential fog
- Background gradient:
  - Center RGB(26,24,22)
  - Mid RGB(10,10,10)
  - Edge RGB(2,2,2)
- Subtle vignette and volumetric haze

## Spatial Composition
Target:
- 180–250 logical document instances
- 40–70 clearly visible
- Remaining managed with LOD and instancing

Depth layers:
1. Foreground framing
2. Interactive layer
3. Supporting layer
4. Archive layer
5. Void layer

Avoid rows, grids and symmetry.
Prefer clustered layouts using Poisson-disc or blue-noise sampling.

## Documents
Geometry:
- Rounded rectangle
- 4–8 mm thickness
- Chamfered edges

Material:
- MeshPhysicalMaterial
- Metalness: 0
- Roughness: 0.72–0.82
- Subtle paper normal map
- AO map
- Slight clearcoat

## Lighting
Use:
- Ambient fill
- Warm key light
- Cool rim light
- Cursor spotlight

Spotlight:
- Narrow cone (~18°)
- Penumbra 0.8
- Decay 2
- Distance 8–10m
- Inertia 40–80 ms
- Volumetric beam

Documents must remain readable even outside the flashlight.

## Motion
Every document:
- ±2–5 cm translation
- ±0.5–2° rotation
- 15–30 second cycle
- Random phase

## Hover
- Move toward camera
- Increase illumination
- Reveal metadata
- Slow idle motion
- Rotate slightly toward user

## Click
1. Pause
2. Camera eases forward
3. Background dims
4. DOF increases
5. Document centers
6. PDF unfolds
7. Reverse on close

## Atmosphere
- GPU-instanced dust
- ACES tone mapping
- Subtle bloom
- Film grain
- Exponential fog

## Camera
- 35mm equivalent
- FOV 32–38°
- Tiny breathing motion

## Performance
- InstancedMesh
- Frustum culling
- LOD
- Lazy loading
- Adaptive quality

Target:
- 60 FPS desktop
- 30 FPS mobile

# Definitive Codex Prompt

Read every specification before editing.

Redesign ONLY the Vault chapter while preserving the architecture.

Replace the sparse floating layout with an infinite archival installation composed of clustered, depth-layered document panels.

Implement approximately 180–250 document instances using InstancedMesh and LOD so the archive surrounds the camera in every direction.

Use five depth layers (foreground framing, interaction layer, supporting layer, archive layer and void layer). Compose the scene deliberately using clustered distributions instead of grids or random scattering.

Implement physically based paper materials using MeshPhysicalMaterial with subtle fibre normals, edge bevels and realistic roughness.

Construct a cinematic lighting rig with ambient fill, warm key light, cool rim light and a cursor-controlled physically based spotlight. The spotlight must have inertia, a volumetric cone, soft penumbra and exponential falloff.

Documents should never disappear into darkness; silhouettes and edges must always remain readable.

Add atmospheric fog, dust particles, restrained bloom, ACES tone mapping and subtle film grain.

Every document should float independently with slow sine-based translation and rotation.

Hovering should move the document toward the camera, increase lighting, slow idle motion and reveal metadata.

Clicking a document should trigger a cinematic focus sequence culminating in an unfolding high-resolution PDF viewer rather than an abrupt modal.

Preserve smooth performance through instancing, frustum culling, lazy loading and adaptive quality scaling.

The final experience should resemble a premium museum archive rather than a collection of UI cards. Every interaction must feel physically believable, elegant and worthy of an Awwwards-quality interactive experience.
