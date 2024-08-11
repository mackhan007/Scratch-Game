interface iActionStore {
  actions: tActions;
  selectedAction: string;
}

type tActions = Record<string, string[]>;

export { iActionStore, tActions };
