import React from 'react';
import SearchResultForm from '../search/SearchForm';
import { mount } from 'enzyme';

let wrapped;

beforeEach(() => {
  wrapped = mount(<SearchResultForm />);
});

afterEach(() => {
  wrapped.unmount();
});

it('has a select to choose rover type', () => {
  expect(wrapped.find('#rovers').at(0).length).toEqual(1);
});
