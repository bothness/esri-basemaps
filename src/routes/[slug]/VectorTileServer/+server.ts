import { json, error } from "@sveltejs/kit";
import config from "$lib/config";
import makeTileMetadata from "./makeTileMetadata";

export const GET = async ({ params, fetch }) => {
    const slug = params.slug
    const tiles_url = config[slug].tiles;

    try {
        const tiles = await (await fetch(tiles_url)).json();
        return json(makeTileMetadata(tiles));
    } catch {
        error(404, "Not found");
    }
}