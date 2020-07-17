import { SHAPES_RECEIVED,
  EMPHASIZE_SHAPE,
  DEEMPHASIZE_SHAPE } from '../actions';

const SHAPE_COLOR = 'rgb(120,120,120)';
const SHAPE_LINE_WIDTH = 1;
const EMPHASIZED_SHAPE_COLOR = 'blue';
const EMPHASIZED_SHAPE_LINE_WIDTH = 2;

function shapes(state = { shapeIds: [], shapesById: {} }, action) {
  let newState = {};

  switch (action.type) {
    case SHAPES_RECEIVED:
      return {
        shapeIds: action.shapes.map(shape => shape.shapeId),
        shapesById: action.shapes.reduce((result, shape) => {
          shape.color = SHAPE_COLOR;
          shape.fill = 'none';
          shape.lineWidth = SHAPE_LINE_WIDTH;
          result[shape.shapeId] = shape;
          return result;
        }, {}),
      };

    case EMPHASIZE_SHAPE:
      newState = { shapeIds: [...state.shapeIds], shapesById: { ...state.shapesById } };

      action.shapeIds.forEach((shapeId) => {
        // emphasized shapes must be drawn last so move them to the end of the array
        const id = newState.shapeIds.splice(newState.shapeIds.indexOf(shapeId), 1);
        newState.shapeIds.push(id[0]);

        newState.shapesById[shapeId] = {
          ...newState.shapesById[shapeId],
          color: EMPHASIZED_SHAPE_COLOR,
          lineWidth: EMPHASIZED_SHAPE_LINE_WIDTH,
        };
      });
      return newState;

    case DEEMPHASIZE_SHAPE:
      newState = { shapeIds: [...state.shapeIds], shapesById: { ...state.shapesById } };

      action.shapeIds.forEach((shapeId) => {
        newState.shapesById[shapeId] = {
          ...newState.shapesById[shapeId],
          color: SHAPE_COLOR,
          lineWidth: SHAPE_LINE_WIDTH,
        };
      });
      return newState;

    default:
      return state;
  }
}

export default shapes;
