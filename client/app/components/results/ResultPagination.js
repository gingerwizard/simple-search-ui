var React = require('react');
import {
  KuiPagination,
} from '../../ui_framework/components';

class ResultPagination extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        activePage: 0
      };

      this.PAGE_COUNT = 10;
      this.goToPage = this.goToPage.bind(this);
    }


    goToPage(pageNumber){
      alert(pageNumber);
      this.setState({
        activePage: pageNumber,
      });
    }

    render() {
      return (
        <div className="pagination-bar">
          <KuiPagination
            pageCount={this.PAGE_COUNT}
            activePage={this.state.activePage}
            onPageClick={this.goToPage}
          />
        </div>
      );
    }
}

module.exports = ResultPagination;
