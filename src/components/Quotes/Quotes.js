import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _random from 'lodash/random';

const styles = {
	quote: {
		float: 'left',
	},
	author: {
		float: 'right',
	}
}

function getNewRandomNumber(max, current) {
	const num = _random(0, max);

	return num === current
		? getNewRandomNumber(max, current)
		: num;
}

function Quotes({ classes, quotes, getQuotes }) {
	const [ activeQuoteIndex, setActiveQuoteIndex ] = useState(null)
	const getQuoteIndex = useCallback(() => getNewRandomNumber(quotes.length - 1, activeQuoteIndex), [ quotes, activeQuoteIndex ]);
	const quote = useMemo(() => quotes[activeQuoteIndex], [activeQuoteIndex])

	useEffect(() => {
		if (quotes.length === 0) {
			getQuotes();
		}
	}, []);

	useEffect(() => {
		if (!quotes.length) {
			return
		}

		const newActiveQuoteIndex = getQuoteIndex();

		setActiveQuoteIndex(newActiveQuoteIndex);
	}, [quotes])

	if (activeQuoteIndex === null) {
		return ''
	}

	return (
		<React.Fragment>
			<Typography className={classes.quote} variant="body2">
				"{quote.quote}"
			</Typography>
			<Typography className={classes.author} variant="caption">
				&nbsp;- {quote.author}
			</Typography>
		</React.Fragment>
	);
}

Quotes.propTypes = {
	classes: PropTypes.shape().isRequired,
	quotes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	getQuotes: PropTypes.func.isRequired,
}

export default withStyles(styles)(Quotes);