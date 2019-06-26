import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Home from '../../../components/Home'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

const ProviderWrapper = ({ store }) => {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

describe("Home", () => {
  test("it matches the snapshot", () => {
    const props = {}
    const renderer = new ShallowRenderer()
    const result = renderer.render(<ProviderWrapper store={mockStore({})} />)
    expect(result).toMatchSnapshot()
  });
});