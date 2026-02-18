import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { registerApolloClient } from '@apollo/client-integration-nextjs' // Recommended

const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/graphql`,
            fetchOptions: { cache: 'no-store' }, // or 'force-cache' if you want
        }),
    })
})

export { getClient }