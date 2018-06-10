module GetRepos = [%graphql
  {|
  query {
    viewer {
      repositories(first: 20, orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          name
          stargazers {
            totalCount
          }
          viewerHasStarred
        }
      }
    }
  }
  |}
];

module GetReposQuery = ReasonApollo.CreateQuery(GetRepos);

/* State declaration */
type state = {
  count: int,
  show: bool,
};

/* Action declaration */
type action =
  | Click
  | Toggle;

/* Component template declaration.
   Needs to be **after** state and action declarations! */
let component = ReasonReact.reducerComponent("Example");

/* greeting and children are props. `children` isn't used, therefore ignored.
   We ignore it by prepending it with an underscore */
let make = _children => {
  /* spread the other default fields of component here and override a few */
  ...component,
  initialState: () => {count: 0, show: true},
  /* State transitions */
  reducer: (action, state) =>
    switch (action) {
    | Click => ReasonReact.Update({...state, count: state.count + 1})
    | Toggle => ReasonReact.Update({...state, show: ! state.show})
    },
  render: _self => {
    let reposQuery = GetRepos.make();
    <GetReposQuery variables=reposQuery##variables>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => <div> (ReasonReact.string("No Data")) </div>
             | Error(error) =>
               Js.log(error);
               <div> (ReasonReact.string("Error")) </div>;
             | Data(response) =>
               switch (response##viewer##repositories##nodes) {
               | None => <div> (ReasonReact.string("No repositories")) </div>
               | Some(nodes) =>
                 ReasonReact.array(
                   Array.map(
                     node =>
                       switch (node) {
                       | None => <div> (ReasonReact.string("Waht?")) </div>
                       | Some(node) =>
                         let star =
                           node##viewerHasStarred ?
                             {js|⭐️ |js} : {js|★ |js};
                         <div>
                           (
                             ReasonReact.string(
                               star
                               ++ node##name
                               ++ ": "
                               ++ string_of_int(node##stargazers##totalCount),
                             )
                           )
                         </div>;
                       },
                     nodes,
                   ),
                 )
               }
             }
         )
    </GetReposQuery>;
  },
};
