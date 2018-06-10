/* ReactDOMRe.renderToElementWithId(<Component1 message="Hello!" />, "index1"); */

ReactDOMRe.renderToElementWithId(
  <ReasonApollo.Provider client=Client.instance>
    <h1> (ReasonReact.string("Goals 2 + 3")) </h1>
    <Component1 />
    <h1> (ReasonReact.string("Goals 4")) </h1>
    <OpenIssueList />
  </ReasonApollo.Provider>,
  "index2",
);
