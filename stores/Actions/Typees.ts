interface iActionStore {
  actions: tActions;
  selectedAction: string;
  actionIndex: number;
}

type tActions = Record<string, string[]>;

export { iActionStore, tActions };
