export default function makeStyleMetadata(style_json, tile_json) {
	const sources = structuredClone(style_json.sources);
	style_json.sources = {};
	for (const key of Object.keys(sources)) {
		if (sources[key].type === 'vector')
			style_json.sources[key] = { ...sources[key], tiles: tile_json.tiles, url: `../../` };
	}
    return style_json;
}
