import React from 'react';
import { shallow } from 'enzyme';
import { ApiHeader } from './api-header.component';
import header from './__fixtures/header';

let defaultProps;

test('should render ApiHeader with no props', () => {
  const wrapper = shallow(<ApiHeader />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ApiHeader correctly', () => {
  const wrapper = shallow(<ApiHeader {...header} />);
  expect(wrapper).toMatchSnapshot();
});
