var React = require('react');
var PropTypes = require('prop-types');

import {
  KuiPagination,
  KuiFlexGroup,
  KuiFlexItem,
  KuiHorizontalRule
} from '../../ui_framework/components';

class ResultPagination extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        activePage: 0
      };

      this.goToPage = this.goToPage.bind(this);
      this.onPageChange = props.onPageChange.bind(this);
    }


    goToPage(pageNumber){
      this.onPageChange(pageNumber);
      this.setState({
        activePage: pageNumber,
      });
    }

    render() {
      return (
        <div>
          <KuiHorizontalRule/>
            <KuiFlexGroup justifyContent="spaceAround">
              <KuiPagination
                pageCount={this.props.pageCount}
                activePage={this.state.activePage}
                onPageClick={this.goToPage}
              />
          </KuiFlexGroup>
         <KuiHorizontalRule />
        </div>
      );
    }
}

ResultPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
};

module.exports = ResultPagination;
