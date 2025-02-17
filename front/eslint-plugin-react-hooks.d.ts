// TODO: Remove when https://github.com/facebook/react/issues/30119 is resolved

declare module "eslint-plugin-react-hooks" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: Linter.Config;
  };

  export const rules: {
    "rules-of-hooks": Rule.RuleModule;
    "exhaustive-deps": Rule.RuleModule;
  };

  export const plugin: {
    configs: typeof configs;
    rules: typeof rules;
  };

  export default plugin;
}