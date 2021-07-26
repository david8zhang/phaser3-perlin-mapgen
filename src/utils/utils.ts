export const inverseLerp = (a: number, b: number, v: number) => {
  return (v - a) / (b - a)
}

export const seededRandom = (min: number, max: number, seed: number) => {
  max = max || 1
  min = min || 0

  seed = (seed * 9301 + 49297) % 233280
  const rnd = seed / 233280.0

  return Math.round(min + rnd * (max - min))
}
