let inMemoryCache = ApolloInMemoryCache.createInMemoryCache();

let httpLink =
  ApolloLinks.createHttpLink(
    ~uri="https://api.github.com/graphql",
    ~headers=
      Js.Json.object_(
        Js.Dict.fromList([
          ("Authorization", Js.Json.string("bearer TOKEN")),
        ]),
      ),
    (),
  );

let instance =
  ReasonApollo.createApolloClient(~link=httpLink, ~cache=inMemoryCache, ());
