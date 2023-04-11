import { renderToString } from 'react-dom/server';
import { RemixServer } from '@remix-run/react';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';

const key = 'custom';
const cache = createCache({ key });
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

export default function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
    let markup = renderToString(
        <CacheProvider value={cache}>
            <RemixServer context={remixContext} url={request.url} />
        </CacheProvider>
    );

    const chunks = extractCriticalToChunks(markup);
    const styles = constructStyleTagsFromChunks(chunks);

    markup = markup.replace('__STYLES__', styles);

    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
        status: responseStatusCode,
        headers: responseHeaders
    });
}
