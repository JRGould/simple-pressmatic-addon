const childProcess = require ('child_process' )

module.exports = function ( context ) {

	const Component = context.React.Component
	const React = context.React
	const $ = context.jQuery

	return class SiteInfoStats extends Component {
		constructor( props ) {
			super( props )
			
			this.state = {
				content: null
			}

		}

		componentDidMount() {
			// set up 
			if ( 'running' === this.props.siteStatus ) {
				this.getPluginList();
			} else {
				this.setState( { content: <p>Machine not running!</p> } )
			}
		}

		componentWillUnmount() {
			// tear down
		}

		getPluginList() {
			this.setState( { content: <p>loading...</p> } )
				
			// get site object using siteID
			let site = this.props.sites[ this.props.params.siteID ]
			
			// construct command using bundled docker binary to execute 'wp plugin list' inside container
			let command = `${context.environment.dockerPath} exec ${site.container} wp plugin list --path=/app/public --field=name --status=active --allow-root`
			
			// execute command in docker env and run callback when it returns
			childProcess.exec( command, { env: context.environment.dockerEnv }, (error, stdout, stderr) => {
				// Display error message if there's an issue
				if (error) {
					this.setState( { content:  <p>Error retrieving active plugin list: <pre>{stderr}</pre></p> } )
				} else {
					// split list into array
					let plugins = stdout.trim().split( "\n" )
					// Only create unordered list if there are plugins to list
					if ( plugins.length && plugins[0].length > 1 ) {
						this.setState( { content: <ul>{ plugins.map( (item) => <li key={ plugins.indexOf(item) }>{ item }</li> ) }</ul> } )
					} else {
						this.setState( { content: <p>No active plugins.</p> } )
					}
				}
			} );
		}

		render() {
			return (
				<div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%' }}>
					<h3>Active Plugins</h3>
					
					{ this.state.content }
				</div>
			);
		}
	}

}