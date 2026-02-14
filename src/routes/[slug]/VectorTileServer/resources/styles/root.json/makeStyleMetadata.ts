export default function makeStyleMetadata(style_json, tile_json) {
	const sources = structuredClone(style_json.sources);
	const layers = structuredClone(style_json.layers);
	style_json.sources = {};
	style_json.layers = [];
	const source_key = Object.keys(sources).find((key) => sources[key].type === 'vector');
	style_json.sources.esri = { ...sources[source_key], tiles: tile_json.tiles, url: `../../` };

	for (const layer of layers) {
		if (!layer.source) style_json.layers.push(layer);
		if (layer.source === source_key) {
			layer.source = 'esri';
			if (layer['source-layer'] === 'place')
				layer.filter = [
					'all',
					[
						'!',
						[
							'within',
							{
								type: 'Polygon',
								coordinates: [
									[
										[34.143, 31.482],
										[34.953, 29.419],
										[35.427, 31.178],
										[35.545, 31.761],
										[35.573, 32.705],
										[35.671, 33.249],
										[35.545, 33.273],
										[35.518, 33.092],
										[34.966, 33.115],
										[34.143, 31.482]
									]
								]
							}
						]
					],
					layer.filter
				];
			style_json.layers.push(layer);
		}
	}

	return style_json;
}
