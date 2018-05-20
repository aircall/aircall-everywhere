export const HTMLElements = {};

export const querySpy = jasmine.createSpy('HTML Element').and.callFake(function(query) {
  var newElement = {
    innerHTML: ''
  };
  HTMLElements[query] = newElement;
  return HTMLElements[query];
});
