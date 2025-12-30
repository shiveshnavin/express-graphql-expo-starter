import { ApolloClient, InMemoryCache, gql, ApolloLink, HttpLink } from '@apollo/client';

const link = ApolloLink.from([
    new HttpLink({ uri: "/graph" }),
]);
const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});

export class Api {
    graph = client
}


export function getGraphErrorMessage(error: any) {
    try {
        console.log(error)
        if (error?.networkError?.result)
            error = error.networkError.result
        else if (error.message) {
            return error.message
        }
        if (error.errors && error.errors.length > 0) {
            return error.errors.map((e: any) => {
                return e.message
            }).join(". ")
        }
    } catch (e) {
        return "An error occurred"
    }
    return undefined
}
