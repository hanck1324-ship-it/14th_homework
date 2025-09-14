"use client"

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSetting {
    children: React.ReactNode
}
export default function ApolloSetting(props: IApolloSetting) {
    const client = new ApolloClient({
        // 아래 uri 주소를 올바른 주소로 수정해주세요!
        uri: "http://main-practice.codebootcamp.co.kr/graphql",
        cache: new InMemoryCache()
    })    

    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}