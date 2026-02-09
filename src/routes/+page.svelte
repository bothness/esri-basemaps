<script lang="ts">
    import { resolve } from "$app/paths";
    import config from "$lib/config";
</script>

<h1>ArcGIS compatible vector tile services</h1>
<p>The links below serve Mapbox vector tiles and styles in a format consumable by ArcGIS Pro and ArcGIS Online:</p>
<ul>
    {#each Object.keys(config) as key}
        {@const path = `/${key}/VectorTileServer`}
        <li><a href={resolve(path)}>{path}</a></li>
    {/each}
</ul>