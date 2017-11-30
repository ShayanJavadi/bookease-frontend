import { RESET_STATE } from "./consts";

const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE })
}

export default resetState;
