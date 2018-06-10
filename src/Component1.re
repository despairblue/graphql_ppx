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

/* This is the basic component. */
let component = ReasonReact.statelessComponent("Page");

/* `make` is the function that mandatorily takes `children` (if you want to use
   `JSX). `message` is a named argument, which simulates ReactJS props. Usage:

   `<Page message="hello" />`

   Which desugars to

   `ReasonReact.element(Page.make(~message="hello", [||]))` */
let make = _children => {
  /* spread the other default fields of component here and override a few */
  ...component,
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
