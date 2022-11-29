export type Next<CollectedState, Stimulus> = (
  _updatedState: CollectedState,
  _next: Stimulus
) => void;
export type Action<CollectedState, Stimulus> = (
  _incomingState: CollectedState,
  _next: Next<CollectedState, Stimulus>
) => void;

type Transitions<Stimulus, CollectedState> = Map<
  Stimulus,
  State<Stimulus, CollectedState>
>;

/**
 * A Very Simplistic state-machine.
 */
export class StateMachine<Stimulus, CollectedState> {
  private _transitions?: Transitions<Stimulus, CollectedState>;

  // eslint-disable-next-line no-unused-vars
  constructor(private start: State<Stimulus, CollectedState>) {}

  public set transitions(transitions: Transitions<Stimulus, CollectedState>) {
    this._transitions = transitions;
  }

  /**
   * Start running the state-machine
   * @param initialState The initial collected state of the state-machine
   */
  public run(initialState: CollectedState) {
    if (!this._transitions) {
      throw new Error("Tried to start state-machine with no transitions set");
    }
    return this.start.trigger(initialState, (a, b) => this.next(a, b));
  }

  private next(currentState: CollectedState, next: Stimulus) {
    const nextState = this._transitions?.get(next);
    if (nextState) {
      nextState.trigger(currentState, (a, b) => this.next(a, b));
    }
  }
}

export class State<Stimulus, CollectedState> {
  private _action?: Action<CollectedState, Stimulus>;

  public set action(action: Action<CollectedState, Stimulus>) {
    this._action = action;
  }

  public trigger(
    collectedState: CollectedState,
    callback: Next<CollectedState, Stimulus>
  ) {
    if (this._action) {
      this._action(collectedState, callback);
    } else {
      throw Error("Tried to trigger state that had no action");
    }
  }
}
