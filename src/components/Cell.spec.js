import React from 'react';
import Cell from './Cell';
import Constants from '../utils/AppConstants'
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
    View,
    Image,
    Text
} from 'react-native';
configure({ adapter: new Adapter() })
test('renders correctly', () => {
    const tree = renderer.create(
        <Cell
            onUncover={jest.fn()}
            onGameOver={jest.fn()}
            setTotalNumUrchins={jest.fn()}
            key={0}
            width={Constants.CELL_SIZE}
            height={Constants.CELL_SIZE}
            x={0}
            y={0}
            ref={null}
        />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders children correctly', () => {
    const wrapper = shallow(
        <Cell
            onUncover={jest.fn()}
            onGameOver={jest.fn()}
            setTotalNumUrchins={jest.fn()}
            key={0}
            width={Constants.CELL_SIZE}
            height={Constants.CELL_SIZE}
            x={0}
            y={0}
            ref={null} />
    );
    expect(wrapper.find(View).exists()).toBeTruthy()
    expect(wrapper.find(Text).exists()).toBeFalsy()
    expect(wrapper.find(Image).exists()).toBeFalsy()

});


