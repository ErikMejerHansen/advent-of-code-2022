import { State, StateMachine } from "./state-machine";

describe("state-machine", () => {
  it("triggers its action when transitioning", () => {
    const action = jest.fn();
    action.mockReturnValueOnce(42);

    const startState = new State<string, number>();
    startState.action = (incomingState, next) => next(incomingState, "toEnd");

    const endState = new State<string, number>();
    endState.action = action;

    const transitions = new Map([["toEnd", endState]]);
    const stateMachine = new StateMachine(startState);
    stateMachine.transitions = transitions;

    stateMachine.run(0);

    expect(action).toHaveBeenCalledTimes(1);
  });
});
