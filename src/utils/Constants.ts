export class Constants {
  // Player
  public static PLAYER_SPEED = 200

  // Tile codes
  public static SAND_1 = 0
  public static SAND_2 = 1
  public static SAND_UPPER_LEFT_CORNER = 2
  public static SAND_UPPER_RIGHT_CORNER = 3
  public static SAND_LEFT_EDGE = 4
  public static SAND_RIGHT_EDGE = 5
  public static SAND_UPPER_EDGE = 6
  public static SAND_LOWER_LEFT_CORNER = 7
  public static SAND_LOWER_RIGHT_CORNER = 8
  public static SAND_LOWER_EDGE = 9

  public static WET_SAND_TILE = 12
  public static WET_SAND_LEFT_EDGE = 13
  public static WET_SAND_LOWER_EDGE = 14
  public static WET_SAND_RIGHT_EDGE = 15
  public static WET_SAND_UPPER_EDGE = 16
  public static WET_SAND_UPPER_RIGHT_CORNER = 17
  public static WET_SAND_LOWER_LEFT_CORNER = 18
  public static WET_SAND_LOWER_RIGHT_CORNER = 19
  public static WET_SAND_UPPER_LEFT_CORNER = 20
  public static WET_SAND_LOWER_INNER_LEFT_CORNER = 21
  public static WET_SAND_UPPER_INNER_LEFT_CORNER = 22
  public static WET_SAND_UPPER_INNER_RIGHT_CORNER = 23
  public static WET_SAND_LOWER_INNER_RIGHT_CORNER = 24

  public static SHALLOW_OCEAN_TILE = 25
  public static SHALLOW_OCEAN_LOWER_LEFT_CORNER = 26
  public static SHALLOW_OCEAN_LOWER_RIGHT_CORNER = 27
  public static SHALLOW_OCEAN_UPPER_RIGHT_CORNER = 28
  public static SHALLOW_OCEAN_UPPER_LEFT_CORNER = 29
  public static SHALLOW_OCEAN_LOWER_INNER_RIGHT_CORNER = 30
  public static SHALLOW_OCEAN_UPPER_INNER_RIGHT_CORNER = 31
  public static SHALLOW_OCEAN_UPPER_INNER_LEFT_CORNER = 32
  public static SHALLOW_OCEAN_LOWER_INNER_LEFT_CORNER = 33
  public static SHALLOW_OCEAN_LOWER_EDGE = 34
  public static SHALLOW_OCEAN_LEFT_EDGE = 35
  public static SHALLOW_OCEAN_RIGHT_EDGE = 36
  public static SHALLOW_OCEAN_UPPER_EDGE = 37

  public static OCEAN_TILE = 38

  public static GRASS_1 = 39
  public static GRASS_2 = 40
  public static GRASS_3 = 49
  public static GRASS_UPPER_LEFT_CORNER = 41
  public static GRASS_UPPER_RIGHT_CORNER = 42
  public static GRASS_LOWER_RIGHT_CORNER = 43
  public static GRASS_LOWER_LEFT_CORNER = 44
  public static GRASS_UPPER_EDGE = 45
  public static GRASS_RIGHT_EDGE = 46
  public static GRASS_LEFT_EDGE = 47
  public static GRASS_LOWER_EDGE = 48

  public static LAYER_MAPPING = {
    GRASS: {
      tiles: [Constants.GRASS_1, Constants.GRASS_2, Constants.GRASS_3],
      corners: {
        upperLeft: Constants.GRASS_UPPER_LEFT_CORNER,
        upperRight: Constants.GRASS_UPPER_RIGHT_CORNER,
        lowerLeft: Constants.GRASS_LOWER_LEFT_CORNER,
        lowerRight: Constants.GRASS_LOWER_RIGHT_CORNER,
      },
      edges: {
        upper: Constants.GRASS_UPPER_EDGE,
        lower: Constants.GRASS_LOWER_EDGE,
        left: Constants.GRASS_LEFT_EDGE,
        right: Constants.GRASS_RIGHT_EDGE,
      },
    },
    SAND: {
      tiles: [Constants.SAND_1, Constants.SAND_2],
      corners: {
        upperLeft: Constants.SAND_UPPER_LEFT_CORNER,
        upperRight: Constants.SAND_UPPER_RIGHT_CORNER,
        lowerLeft: Constants.SAND_LOWER_LEFT_CORNER,
        lowerRight: Constants.SAND_LOWER_RIGHT_CORNER,
      },
      edges: {
        upper: Constants.SAND_UPPER_EDGE,
        lower: Constants.SAND_LOWER_EDGE,
        left: Constants.SAND_LEFT_EDGE,
        right: Constants.SAND_RIGHT_EDGE,
      },
    },
    WET_SAND: {
      tiles: [Constants.WET_SAND_TILE],
      corners: {
        upperLeft: Constants.WET_SAND_UPPER_LEFT_CORNER,
        upperRight: Constants.WET_SAND_UPPER_RIGHT_CORNER,
        lowerLeft: Constants.WET_SAND_LOWER_LEFT_CORNER,
        lowerRight: Constants.WET_SAND_LOWER_RIGHT_CORNER,
        upperInnerRight: Constants.WET_SAND_UPPER_INNER_RIGHT_CORNER,
        upperInnerLeft: Constants.WET_SAND_UPPER_INNER_LEFT_CORNER,
        lowerInnerRight: Constants.WET_SAND_LOWER_INNER_RIGHT_CORNER,
        lowerInnerLeft: Constants.WET_SAND_LOWER_INNER_LEFT_CORNER,
      },
      edges: {
        upper: Constants.WET_SAND_UPPER_EDGE,
        lower: Constants.WET_SAND_LOWER_EDGE,
        left: Constants.WET_SAND_LEFT_EDGE,
        right: Constants.WET_SAND_RIGHT_EDGE,
      },
    },
    SHALLOW_OCEAN: {
      tiles: [Constants.SHALLOW_OCEAN_TILE],
      corners: {
        upperLeft: Constants.SHALLOW_OCEAN_UPPER_LEFT_CORNER,
        upperRight: Constants.SHALLOW_OCEAN_UPPER_RIGHT_CORNER,
        lowerLeft: Constants.SHALLOW_OCEAN_LOWER_LEFT_CORNER,
        lowerRight: Constants.SHALLOW_OCEAN_LOWER_RIGHT_CORNER,
        upperInnerRight: Constants.SHALLOW_OCEAN_UPPER_INNER_RIGHT_CORNER,
        upperInnerLeft: Constants.SHALLOW_OCEAN_UPPER_INNER_LEFT_CORNER,
        lowerInnerRight: Constants.SHALLOW_OCEAN_LOWER_INNER_RIGHT_CORNER,
        lowerInnerLeft: Constants.SHALLOW_OCEAN_LOWER_INNER_LEFT_CORNER,
      },
      edges: {
        upper: Constants.SHALLOW_OCEAN_UPPER_EDGE,
        lower: Constants.SHALLOW_OCEAN_LOWER_EDGE,
        left: Constants.SHALLOW_OCEAN_LEFT_EDGE,
        right: Constants.SHALLOW_OCEAN_RIGHT_EDGE,
      },
    },
    OCEAN: {
      tiles: [Constants.OCEAN_TILE],
    },
  }

  public static TILE_TYPE_TO_LAYER_MAPPING = {
    OCEAN: 'Ocean',
    SHALLOW_OCEAN: 'Sand',
    WET_SAND: 'Sand',
    SAND: 'Sand',
    GRASS: 'Grass',
  }
  public static LAYERS = ['Ocean', 'Sand', 'Grass']

  // Map sizes
  public static TILE_HEIGHT = 16
  public static TILE_WIDTH = 16
  public static MAP_WIDTH = 200
  public static MAP_HEIGHT = 200
  public static PERLIN_MAP_SCALE = 50
  public static TILE_PERCENTAGE_BREAKDOWNS = [
    {
      tileType: Constants.OCEAN_TILE,
      percentage: 0.55,
    },
    {
      tileType: Constants.SHALLOW_OCEAN_TILE,
      percentage: 0.05,
    },
    {
      tileType: Constants.WET_SAND_TILE,
      percentage: 0.05,
    },
    {
      tileType: Constants.SAND_1,
      percentage: 0.15,
    },
    {
      tileType: Constants.GRASS_3,
      percentage: 0.2,
    },
  ]

  public get MAP_WIDTH_PIXELS() {
    return Constants.TILE_WIDTH * Constants.MAP_WIDTH
  }

  public get MAP_HEIGHT_PIXELS() {
    return Constants.TILE_HEIGHT * Constants.MAP_HEIGHT
  }

  public static getLayer(tileCode: number) {
    let result = ''
    Object.keys(Constants.LAYER_MAPPING).forEach((layer) => {
      const tiles = Constants.LAYER_MAPPING[layer].tiles
      const corners = Constants.LAYER_MAPPING[layer].corners
      const edges = Constants.LAYER_MAPPING[layer].edges
      const allCornerTiles = corners ? Object.keys(corners).map((key) => corners[key]) : []
      const allEdgeTiles = edges ? Object.keys(edges).map((key) => edges[key]) : []
      if (
        tiles.includes(tileCode) ||
        allCornerTiles.includes(tileCode) ||
        allEdgeTiles.includes(tileCode)
      ) {
        result = layer
      }
    })
    return result
  }

  public static getLayerIndex(tileCode: number) {
    const layerOrdering = ['OCEAN', 'SHALLOW_OCEAN', 'WET_SAND', 'SAND', 'GRASS']
    return layerOrdering.indexOf(this.getLayer(tileCode))
  }

  public static getCornerTile(tileCode: number, edgeType: string) {
    const layer = Constants.getLayer(tileCode)
    if (!layer) {
      return tileCode
    }
    const layerConfig = this.LAYER_MAPPING[layer]
    if (!layerConfig.corners) {
      return tileCode
    }
    switch (edgeType) {
      case 'upperRight': {
        return layerConfig.corners.upperRight
      }
      case 'lowerRight': {
        return layerConfig.corners.lowerRight
      }
      case 'upperLeft': {
        return layerConfig.corners.upperLeft
      }
      case 'lowerLeft': {
        return layerConfig.corners.lowerLeft
      }
      case 'upperInnerLeft': {
        if (!layerConfig.corners.upperInnerLeft) return tileCode
        return layerConfig.corners.upperInnerLeft
      }
      case 'upperInnerRight': {
        if (!layerConfig.corners.upperInnerRight) return tileCode
        return layerConfig.corners.upperInnerRight
      }
      case 'lowerInnerRight': {
        if (!layerConfig.corners.lowerInnerRight) return tileCode
        return layerConfig.corners.lowerInnerRight
      }
      case 'lowerInnerLeft': {
        if (!layerConfig.corners.lowerInnerLeft) return tileCode
        return layerConfig.corners.lowerInnerLeft
      }
      default:
        return tileCode
    }
  }

  public static getEdgeTile(tileCode: number, edgeType: string) {
    const layer = Constants.getLayer(tileCode)
    if (!layer) {
      return tileCode
    }
    const layerConfig = this.LAYER_MAPPING[layer]
    if (!layerConfig.edges) {
      return tileCode
    }
    switch (edgeType) {
      case 'upper': {
        return layerConfig.edges.upper
      }
      case 'lower': {
        return layerConfig.edges.lower
      }
      case 'left': {
        return layerConfig.edges.left
      }
      case 'right': {
        return layerConfig.edges.right
      }
      default:
        return tileCode
    }
  }

  public static getElevationConfig() {
    let currElevation = 0
    const elevations: any[] = []
    Constants.TILE_PERCENTAGE_BREAKDOWNS.forEach((tileConfig) => {
      elevations.push({
        ...tileConfig,
        lower: currElevation,
        upper: currElevation + tileConfig.percentage,
      })
      currElevation += tileConfig.percentage
    })
    return elevations
  }

  public static getTileCodeForElevation(elevation: number, elevations: any) {
    for (let i = 0; i < elevations.length; i++) {
      const tileConfig = elevations[i]
      const { lower, upper, tileType } = tileConfig
      if (elevation > lower && elevation <= upper) {
        return tileType
      }
    }
    return 0
  }
}
