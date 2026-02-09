export default function makeStyleMetadata(style_json, tile_json) {
	const sources = structuredClone(style_json.sources);
	const layers = structuredClone(style_json.layers);
	style_json.sources = {};
	style_json.layers = [];
	const source_key = Object.keys(sources).find(key => sources[key].type === 'vector');
	style_json.sources.esri = { ...sources[source_key], tiles: tile_json.tiles, url: `../../` };

	for (const layer of layers) {
		if (!layer.source) style_json.layers.push(layer);
		if (layer.source === source_key) {
			layer.source = "esri";
			style_json.layers.push(layer);
		}
	}

    return style_json;
}
