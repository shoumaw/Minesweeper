import React from 'react';
import Board from './Board';
import renderer from 'react-test-renderer';
import Cell from '../components/Cell';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('renders correctly', () => {
    const tree = renderer.create(
        <Board
        />).toJSON();
    expect(tree).toMatchSnapshot();
});


test('renders children correctly', () => {
    const wrapper = shallow(
        <Board />
    );
    expect(wrapper.find(Cell).exists()).toBeTruthy()

});