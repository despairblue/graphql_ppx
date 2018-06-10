// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_json = require("bs-platform/lib/js/js_json.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var ReasonApollo = require("reason-apollo/src/ReasonApollo.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var Graphql_error = Caml_exceptions.create("Component1-ReactTemplate.GetRepos.Graphql_error");

var ppx_printed_query = "query   {\nviewer  {\nrepositories(first: 20, orderBy: {field: STARGAZERS, direction: DESC})  {\nnodes  {\nname  \nstargazers  {\ntotalCount  \n}\nviewerHasStarred  \n}\n}\n}\n}";

function parse(value) {
  var match = Js_json.decodeObject(value);
  if (match) {
    var value$1 = match[0]["viewer"];
    var match$1 = Js_json.decodeObject(value$1);
    var tmp;
    if (match$1) {
      var value$2 = match$1[0]["repositories"];
      var match$2 = Js_json.decodeObject(value$2);
      var tmp$1;
      if (match$2) {
        var value$3 = match$2[0]["nodes"];
        var match$3 = Js_json.decodeNull(value$3);
        var tmp$2;
        if (match$3) {
          tmp$2 = /* None */0;
        } else {
          var match$4 = Js_json.decodeArray(value$3);
          var tmp$3;
          if (match$4) {
            tmp$3 = match$4[0].map((function (value) {
                    var match = Js_json.decodeNull(value);
                    if (match) {
                      return /* None */0;
                    } else {
                      var match$1 = Js_json.decodeObject(value);
                      var tmp;
                      if (match$1) {
                        var value$1 = match$1[0];
                        var value$2 = value$1["name"];
                        var match$2 = Js_json.decodeString(value$2);
                        var tmp$1;
                        if (match$2) {
                          tmp$1 = match$2[0];
                        } else {
                          throw Graphql_error;
                        }
                        var value$3 = value$1["stargazers"];
                        var match$3 = Js_json.decodeObject(value$3);
                        var tmp$2;
                        if (match$3) {
                          var value$4 = match$3[0]["totalCount"];
                          var match$4 = Js_json.decodeNumber(value$4);
                          var tmp$3;
                          if (match$4) {
                            tmp$3 = match$4[0] | 0;
                          } else {
                            throw Graphql_error;
                          }
                          tmp$2 = {
                            totalCount: tmp$3
                          };
                        } else {
                          throw Graphql_error;
                        }
                        var value$5 = value$1["viewerHasStarred"];
                        var match$5 = Js_json.decodeBoolean(value$5);
                        var tmp$4;
                        if (match$5) {
                          tmp$4 = match$5[0];
                        } else {
                          throw Graphql_error;
                        }
                        tmp = {
                          name: tmp$1,
                          stargazers: tmp$2,
                          viewerHasStarred: tmp$4
                        };
                      } else {
                        throw Graphql_error;
                      }
                      return /* Some */[tmp];
                    }
                  }));
          } else {
            throw Graphql_error;
          }
          tmp$2 = /* Some */[tmp$3];
        }
        tmp$1 = {
          nodes: tmp$2
        };
      } else {
        throw Graphql_error;
      }
      tmp = {
        repositories: tmp$1
      };
    } else {
      throw Graphql_error;
    }
    return {
            viewer: tmp
          };
  } else {
    throw Graphql_error;
  }
}

function make() {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeWithVariables() {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function ret_type() {
  return /* module */[];
}

var MT_Ret = /* module */[];

var GetRepos = /* module */[
  /* Graphql_error */Graphql_error,
  /* ppx_printed_query */ppx_printed_query,
  /* query */ppx_printed_query,
  /* parse */parse,
  /* make */make,
  /* makeWithVariables */makeWithVariables,
  /* ret_type */ret_type,
  /* MT_Ret */MT_Ret
];

var GetReposQuery = ReasonApollo.CreateQuery([
      ppx_printed_query,
      parse
    ]);

var component = ReasonReact.statelessComponent("Page");

function make$1() {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function () {
              var reposQuery = make(/* () */0);
              return ReasonReact.element(/* None */0, /* None */0, Curry.app(GetReposQuery[/* make */3], [
                              /* Some */[reposQuery.variables],
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              /* None */0,
                              (function (param) {
                                  var result = param[/* result */0];
                                  if (typeof result === "number") {
                                    return React.createElement("div", undefined, "No Data");
                                  } else if (result.tag) {
                                    var match = result[0].viewer.repositories.nodes;
                                    if (match) {
                                      return $$Array.map((function (node) {
                                                    if (node) {
                                                      var node$1 = node[0];
                                                      var match = node$1.viewerHasStarred;
                                                      var star = match ? "⭐️ " : "★ ";
                                                      return React.createElement("div", undefined, star + (node$1.name + (": " + String(node$1.stargazers.totalCount))));
                                                    } else {
                                                      return React.createElement("div", undefined, "Waht?");
                                                    }
                                                  }), match[0]);
                                    } else {
                                      return React.createElement("div", undefined, "No repositories");
                                    }
                                  } else {
                                    console.log(result[0]);
                                    return React.createElement("div", undefined, "Error");
                                  }
                                })
                            ]));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.GetRepos = GetRepos;
exports.GetReposQuery = GetReposQuery;
exports.component = component;
exports.make = make$1;
/* GetReposQuery Not a pure module */
