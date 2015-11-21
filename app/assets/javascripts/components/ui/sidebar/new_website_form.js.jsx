var WebsiteForm = React.createClass({

  getInitialState: function () {
    return {url: "", error: false};
  },

  submit: function (event) {
    debugger
    event.preventDefault();
    var credentials = $(event.currentTarget).serializeJSON();
    WebsiteApiUtil.createWebsite(credentials, this.receivedSite, this.receivedError);
  },

  updateURL: function (event) {
    this.setState({url: event.currentTarget.value});
  },

  receivedError: function (data) {
    if (data.statusText === 'timeout') {
      this.setState({error: "The connection timed out. Please Try Again"});
    } else {
      this.setState({error: "This address does not point to an RSS feed or a website with an RSS feed."})
    }
  },

  receivedSite: function () {
    this.setState({error: false});
  },

  render: function () {
    var error;
    if (this.state.error) {
      error = <div className="error">{this.state.error}</div>;
    }
    return (
          <div>
            <form className="website-form" onSubmit={ this.submit }>
              <label>Website URL</label>
                <input type="text"
                       name="url"
                       value={this.state.url}
                       onChange={this.updateURL} />
                <br/>
                <input type="submit" value="Add"/>
                {error}
            </form>
            <div className="website-form-triangle" />
          </div>
          );
  }
});
