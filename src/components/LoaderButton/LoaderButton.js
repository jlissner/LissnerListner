import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoaderButton extends React.PureComponent {
  render() {
    const {
      isLoading,
      text,
      loadingText,
      className = "",
      disabled = false,
      ...props
    } = this.props;

    return (
      <Button
        className={`LoaderButton ${className}`}
        color="primary"
        disabled={disabled || isLoading}
        variant="contained"
        {...props}
      >
        {isLoading && <CircularProgress />}
        {!isLoading ? text : loadingText}
      </Button>
    )
  }
}

export default LoaderButton
