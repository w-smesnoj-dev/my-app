import React from 'react';
import './ItemEditor.css';
import './EditorBar.css';
import ColorPalette from './ColorPalette';
import Slider from './Slider';

import Ic from './ic.js';

import BarButton from './BarButton';

export default class EditorBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
    this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);
    this.handleBorderSizeChange = this.handleBorderSizeChange.bind(this);
    this.handleBorderOpacityChange = this.handleBorderOpacityChange.bind(this);
  }

  toggleTextStyle(type) {
    let item = Object.assign({}, this.props.item);
    let style = item.text.style;
    switch (type) {
      case 'bold':
        style.bold = !style.bold;
        break;
      case 'italic':
        style.italic = !style.italic;
        break;
      case 'underline':
        style.underline = !style.underline;
        break;
      case 'strikethrough':
        style.strikethrough = !style.strikethrough;
        break;
      default:
        break;
    }
    this.props.onApplyItemChanges(item);
  }
  handleBorderOpacityChange(e) {
    console.log(e.target.value);
    let item = Object.assign({}, this.props.item);
    item.style.borderOpacity = e.target.value;
    this.props.onApplyItemChanges(item);
  }
  handleBorderSizeChange(e) {
    console.log(e.target.value);
    let item = Object.assign({}, this.props.item);
    item.style.borderSize = e.target.value;
    this.props.onApplyItemChanges(item);
  }
  handleFontFamilyChange(e) {
    let item = Object.assign({}, this.props.item);
    item.text.style.fontFamily = e.target.value;
    this.props.onApplyItemChanges(item);
  }
  handleFontSizeChange(e) {
    let item = Object.assign({}, this.props.item);
    const size = e.target.value;
    item.text.style.fontSize = size.substring(0, size.length - 2);
    this.props.onApplyItemChanges(item);
  }
  formatAlign(alignment) {
    let item = Object.assign({}, this.props.item);
    item.text.style.align = alignment;
    this.props.onApplyItemChanges(item);
  }
  formatAlignVertical(alignment) {
    let item = Object.assign({}, this.props.item);
    item.text.style.alignVertical = alignment;
    this.props.onApplyItemChanges(item);
  }
  changeBorderColor(color) {
    let item = Object.assign({}, this.props.item);
    item.style.borderColor = color;
    this.props.onApplyItemChanges(item);
  }
  changeBackgroundColor(color) {
    let item = Object.assign({}, this.props.item);
    item.style.backgroundColor = color;
    this.props.onApplyItemChanges(item);
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    const item = this.props.item;

    let controls = [];

    if (this.props.item?.text) {
      let fontSizeValues = [10, 14, 16, 18, 24, 36, 48, 64, 80, 144, 288];
      let fontFamilyValues = ['Inter', 'Arial', 'Avenir'];
      controls.push(
        <div className='group'>
          <div className='font-family'>
            <select
              value={item.text.style.fontFamily}
              onChange={this.handleFontFamilyChange}
            >
              {fontFamilyValues.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      );
      controls.push(
        <div className='group'>
          <div className='font-size'>
            <select
              value={`${item.text.style.fontSize}px`}
              onChange={this.handleFontSizeChange}
            >
              {fontSizeValues.map((value) => (
                <option key={value}>{value}px</option>
              ))}
            </select>
          </div>
        </div>
      );
      controls.push(
        <div className='group'>
          <BarButton ic='text_format'>
            <div className='group'>
              <button onClick={() => this.toggleTextStyle('bold')}>
                <Ic>format_bold</Ic>
              </button>
              <button onClick={() => this.toggleTextStyle('italic')}>
                <Ic>format_italic</Ic>
              </button>
              <button onClick={() => this.toggleTextStyle('underline')}>
                <Ic>format_underline</Ic>
              </button>
              <button onClick={() => this.toggleTextStyle('strikethrough')}>
                <Ic>strikethrough_s</Ic>
              </button>
            </div>
          </BarButton>

          <BarButton ic='format_align_center'>
            <div>
              <div className='group'>
                <button onClick={() => this.formatAlign('left')}>
                  <Ic>format_align_left</Ic>
                </button>
                <button onClick={() => this.formatAlign('center')}>
                  <Ic>format_align_center</Ic>
                </button>
                <button onClick={() => this.formatAlign('right')}>
                  <Ic>format_align_right</Ic>
                </button>
              </div>
              <div className='group'>
                <button onClick={() => this.formatAlignVertical('top')}>
                  <Ic>align_vertical_top</Ic>
                </button>
                <button onClick={() => this.formatAlignVertical('center')}>
                  <Ic>align_vertical_center</Ic>
                </button>
                <button onClick={() => this.formatAlignVertical('bottom')}>
                  <Ic>align_vertical_bottom</Ic>
                </button>
              </div>
            </div>
          </BarButton>
        </div>
      );
    }
    if (this.props.item?.style) {
      controls.push(
        <div className='group'>
          <BarButton
            io='trip_origin'
            iconColor={item.style.borderColor}
            className='row'
          >
            <div className='group row'>
              <Slider
                label='Thickness'
                vals={[0, 9]}
                val={item.style.borderSize}
                onChange={this.handleBorderSizeChange}
              />
              <Slider
                label='Opacity'
                vals={[0, 10]}
                val={item.style.borderOpacity}
                onChange={this.handleBorderOpacityChange}
              />
            </div>
            <div className='group'>
              <ColorPalette
                selectedColor={item.style.borderColor}
                onColorChange={(color) => this.changeBorderColor(color)}
              />
            </div>
          </BarButton>
          <BarButton ic='circle' iconColor={item.style.backgroundColor}>
            <div className='group'>
              <ColorPalette
                selectedColor={item.style.backgroundColor}
                onColorChange={(color) => this.changeBackgroundColor(color)}
              />
            </div>
          </BarButton>
        </div>
      );
    }
    if (this.props.item?.type === 'smart-connection') {
      controls.push(
        <div className='group'>
          <BarButton io='trip_origin' iconColor='black'>
            <div className='group'>x1</div>
          </BarButton>
        </div>
      );
    }
    const x = item?.pos.x + item?.dim.w / 2;
    const y = item?.pos.y;
    const position = `translate(${x}px,${y}px) translate(-50%, -50%) translateY(-2.7rem)`;
    return (
      <div>
        <div className='editor' style={{ transform: position }}>
          <div className='control-groups'>{controls}</div>
        </div>
      </div>
    );
  }
}
