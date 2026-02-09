import { json, error } from "@sveltejs/kit";
import config from "$lib/config";
import makeStyleMetadata from "./makeStyleMetadata";

export const GET: RequestHandler = async ({ params, fetch }) => {
    const slug = params.slug
    const tiles_url = config[slug].tiles;
    const style_url = config[slug].style;

    try {
        const [tiles, style] = await Promise.all([
            await (await fetch(tiles_url)).json(),
            await (await fetch(style_url)).json()
        ]);
        return json(makeStyleMetadata(style, tiles), { headers: { 'Access-Control-Allow-Origin': '*' } });
    } catch {
        error(404, "Not found");
    }
}