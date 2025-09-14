"use client"

// 1. HttpLink를 추가로 import 합니다.
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";

interface IApolloSetting {
    children: React.ReactNode
}
export default function ApolloSetting(props: IApolloSetting) {
    // 2. HttpLink를 먼저 만들어줍니다.
    const httpLink = createHttpLink({
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
    });

    const client = new ApolloClient({
        // 3. uri 대신 link 옵션을 사용해서 연결합니다.
        link: httpLink,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}