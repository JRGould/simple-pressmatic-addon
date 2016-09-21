module.exports = function (context) {

	const Component = context.React.Component;
	const React = context.React;
	const $ = context.jQuery;

	return class SiteInfoStats extends Component {
		constructor(props) {
			super( props );
			// init class vars
		}

		componentDidMount() {
			// set up 
		}

		componentWillUnmount() {
			// tear down
		}

		render() {
			return (
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
					<h3>Plugins</h3>
				</div>
			);
		}
	}

}