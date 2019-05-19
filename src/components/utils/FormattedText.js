import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import _map from 'lodash/map';

const styles = (theme) => ({
  fraction: {
    display: 'inline-block',
    fontSize: '.8rem',
    marginRight: '-.5rem',
    lineHeight: 1,
  },
  numerator: {
    display: 'inline-block',
    position: 'relative',
    top: '-.15rem',
  },
  denominator: {
    display: 'inline-block',
    position: 'relative',
    left: '-.65rem',
    top: '.05rem',
  },
  dash: {
    display: 'inline-block',
    height: 1,
    width: '1rem',
    transform: 'rotate(-60deg)',
    position: 'relative',
    left: '-.3rem',
    top: '-.35rem',
    background: theme.palette.grey[500],
  },
  underline: {
    textDecoration: 'underline'
  },
});

const fractionMatcher = new RegExp(/([0-9]\/[0-9])/gi);
const boldMatcher = new RegExp(/(^|\n| |\0)(\*.*?\*)(\0| |\.|$)/gi);
const underlineMatcher = new RegExp(/(^|\n| |\0)(_.*?_)(\0| |\.|$)/gi);

function setUnderlineFormatting({ classes, text }) {
  return _map(text.split(underlineMatcher).filter(Boolean), textPart => (
    textPart.match(underlineMatcher)
      ? <span key={textPart} className={classes.underline}>{textPart.replace(/_/gi, '')}</span>
      : <span key={textPart}>{textPart}</span>
  ));
}

function setBoldFormatting({ classes, text }) {
  return _map(text.split(boldMatcher).filter(Boolean), textPart => (
    textPart.match(boldMatcher)
      ? <strong key={textPart}>{textPart.replace(/\*/gi, '')}</strong>
      : setUnderlineFormatting({ classes, text: textPart })
  ));
}

function setFractionFormatting({ classes, text }) {
  return _map(text.split(fractionMatcher).filter(Boolean), textPart => (
    textPart.match(fractionMatcher)
      ? <span key={textPart} className={classes.fraction}>
          <span className={classes.numerator}>{textPart[0]}</span>
          <span className={classes.dash}></span>
          <span className={classes.denominator}>{textPart[2]}</span>
        </span>
      : setBoldFormatting({ classes, text: textPart })
    ));
}

function FormattedText({ classes, text }) {
  return setFractionFormatting({ classes, text })
}

export default withStyles(styles)(FormattedText);