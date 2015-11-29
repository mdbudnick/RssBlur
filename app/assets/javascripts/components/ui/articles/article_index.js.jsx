var isScrolling = false;

var ArticleIndex = React.createClass({

  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch(),
            articles: null,
            unreadArticleIds: null,
            articleListClick: null};
  },

  componentDidMount: function () {
    this.fetchUnreads();
    SidebarClickedStore.addChangeListener(this._onSidebarChange);
    ArticleStore.addChangeListener(this._onArticlesChange);
    if (typeof this.state.sidebar === 'undefined') {
      WebsiteApiUtil.fetchClickedWebsite(this.props.params.id);
    } else {
      this._onSidebarChange();
    }
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onSidebarChange);
    ArticleStore.removeChangeListener(this._onArticlesChange);
  },

  fetchUnreads: function () {
    ArticleApiUtil.fetchUnread(this.props.params.id, this.setUnreads);
  },

  setUnreads: function (data) {
    unreads = {};
    for (var i = 0; i < data.length; i++) {
      articleId = data[i].article_id;
      unreads[articleId] = true;
    }
    this.setState({unreadArticleIds: unreads})
  },

  _onSidebarChange: function () {
    clickedItem = SidebarClickedStore.fetch();
    ArticleApiUtil.fetchArticles(clickedItem);
    this.setState({sidebar: clickedItem,
                   articles: null});
  },

  _onArticlesChange: function () {
    ArticleApiUtil.fetchUnread(this.props.params.id, this.setUnreads);
    this.setState({articles: ArticleStore.all()});
  },

  autoScroll: function (toScroll, idx) {
    isScrolling = true;
    toScroll.scrollTo(toScroll.children()[idx],
                      {duration: 250},
                      function() {TimerMixin.setTimeout(function () {this.clearScrolling()}.bind(this), 300)}.bind(this));
  },

  clearScrolling: function () {
    isScrolling = false;
  },

  _listClick: function (e) {
    var articleListUL = $('.article-list');
    var articleDetailUL = $('.detail-article-list');
    idx = parseInt(e.currentTarget.dataset.index);
    articleId = parseInt(e.currentTarget.dataset.articleId);
    this.autoScroll(articleListUL, idx);
    this.autoScroll(articleDetailUL, idx);
    if (this.state.articleListClick === idx &&
        e.currentTarget.dataset.unread) {
      ArticleApiUtil.markRead(articleId);
    } else {
      this.setState({articleListClick: idx})
    }
  },

  render: function () {
    return (
            <div className="article-index group">
              <ul className="article-list">
                  {this.state.articles &&
                    this.state.articles.map(function (article, idx) {
                      if (this.state.unreadArticleIds) {
                        var readVal = this.state.unreadArticleIds[parseInt(article.id)]
                      }
                              return <ArticleListItem key={"listed"+article.id}
                                                      article-id={article.id}
                                                      index={idx}
                                                      unread={readVal}
                                                      clickHandler={this._listClick}
                                                      article={article} />
                             }.bind(this))
                  }
              </ul>
              <ul className="detail-article-list">
              {this.state.articles &&
                this.state.articles.map(function (article, idx) {
                          return <ArticleDetail key={"deets"+article.id}
                                                articleId={article.id}
                                                index={idx}
                                                article={article}/>
                         })
              }
              </ul>
            </div>
          );
  }
});
