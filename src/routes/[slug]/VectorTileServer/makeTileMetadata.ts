// See https://kervel.github.io/gis/2024/01/12/publishing-mvt-to-esri-javascript.html
const earth_circumference = 40075016.686; // in meters
const tile_size = 512; // in pixels, only 512 supported.
const dpi = 96;
// const dpi = (96 / 256) * tile_size; // i got this constant from the fact that 256x256 raster tiles usually correspodn with 96DPI. So i just scaled it to the tile size.
const meters_per_inch = 0.0254;

function makeZoomLevels(minzoom: number, maxzoom: number) {
	// Calculate Resolution and Scale for each zoom level / Level of detail
	const zooms = [];
	for (let i = minzoom; i <= maxzoom; i++) {
		// resolution for zoom level 0 is so that the whole earth fits into one tile.
		const resolution = earth_circumference / (tile_size * Math.pow(2, i));
		// the scale is now easily computed: just take the resolution, convert it to inch and then multiply by the DPI.
		const resolution_inch = resolution / meters_per_inch;
		const scale = resolution_inch * dpi;

		zooms.push({
			level: i,
			resolution: resolution,
			scale: scale
		});
	}
	return zooms;
}

export default function makeTileMetadata(tile_json: any) {
	const lods = makeZoomLevels(tile_json.minzoom, tile_json.maxzoom);
	const extent = {
		xmin: -20037507.842788246,
		ymin: -20037508.342787,
		xmax: 20037507.842788246,
		ymax: 20037508.342787
	};
	const spatialReference = {
		wkid: 102100,
		latestWkid: 3857
	};

	const service_json = {
		currentVersion: 10.7,
		name: tile_json.name || 'MapTiles',
		capabilities: 'TilesOnly',
		type: 'indexedVector',
		defaultStyles: 'resources/styles',
		tiles: tile_json.tiles,
		exportTilesAllowed: false,
		initialExtent: {
			...extent,
			spatialReference
		},
		fullExtent: {
			...extent,
			spatialReference
		},
		minScale: lods[0].scale,
		maxScale: lods[lods.length - 1].scale,
		tileInfo: {
			rows: tile_size,
			cols: tile_size,
			dpi: Math.round(dpi),
			format: 'pbf',
			origin: {
				x: extent.ymin,
				y: extent.ymax
			},
			spatialReference,
			lods
		},
		resourceInfo: {
			styleVersion: 8,
			tileCompression: 'gzip',
			cacheInfo: {
				storageInfo: {
					packetSize: 128,
					storageFormat: 'compactV2'
				}
			}
		}
	};
	return service_json;
}
