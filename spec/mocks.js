export const HTMLElements = {};

export const querySpy = jest.fn((query) => {
  var newElement = {
    innerHTML: '',
  };
  HTMLElements[query] = newElement;
  return HTMLElements[query];
});
