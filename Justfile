dev:
    @deno run --allow-all --watch src/index.ts

build:
    # handle build job
    @deno compile --allow-all --import-map=maps.json src/index.ts

fmt:
    @deno fmt