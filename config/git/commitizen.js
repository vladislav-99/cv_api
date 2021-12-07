"use strict";

module.exports = {
  // Descriptions for all types
  types: [
    {
      value: "build",
      name: "build:    Build the project or change external dependencies",
    },
    { value: "ci", name: "ci:        Setting up CI and working with scripts" },
    { value: "docs", name: "docs:     Documentation update" },
    { value: "feat", name: "feat:      Adding new functionality" },
    { value: "fix", name: "fix:       Bugs fixing" },
    {
      value: "perf",
      name: "perf:      Changes to improve performance",
    },
    {
      value: "refactor",
      name: "refactor:  Code changes without fixing bugs or adding new features",
    },
    { value: "revert", name: "revert:    Rollback to previous commits" },
    {
      value: "style",
      name: "style:     Codestyle edits (tabs, indents, periods, commas, etc.)",
    },
    { value: "test", name: "test:      Adding tests" },
  ],

  //  Scope. It characterizes the piece of code that was affected by the changes.
  scopes: [{ name: "services" }, { name: "controllers" }, { name: "database" }],

  // Ability to set a special SCOPE for a specific commit type (example for 'fix')
  /*
  scopeOverrides: {
    fix: [
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */

  // Default questions
  messages: {
    type: "What changes are you making?",
    scope: "\nSelect the SCOPE you changed (optional):",
    // if allowCustomScopes is true
    customScope: "Indicate your SCOPE:",
    subject: "Write a SHORT description\n",
    body: 'Write a DETAILED description (optional). Use "|" for newline:\n',
    breaking: "List of BREAKING CHANGES (optional):\n",
    footer:
      "A place for meta data (tickets, links and the rest). For example: SECRETMRKT-700, SECRETMRKT-800:\n",
    confirmCommit: "Are you satisfied with the resulting commit?",
  },

  allowCustomScopes: true,

  allowBreakingChanges: false,

  footerPrefix: "META DATA:",

  // limit subject length
  subjectLimit: 72,
};
