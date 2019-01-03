import React from 'react';
import {
  TextField
} from '@material-ui/core';

class InputComponent extends React.Component {
  render () {
    const {
      name,
      onChange,
      value,
      ...rest
    } = this.props;
    return (
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
    )
  }
}

export default InputComponent;
