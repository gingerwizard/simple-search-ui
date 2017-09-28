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

      this.goToPage = this.goToPage.bind(this);
      this.onPageChange = props.onPageChange.bind(this);
    }


    goToPage(pageNumber){
      this.onPageChange(pageNumber);
    }

    render() {
      if (this.props.pageCount > 0){
        return (
          <div>
            <KuiHorizontalRule/>
              <KuiFlexGroup justifyContent="spaceAround">
                <KuiPagination
                  pageCount={this.props.pageCount}
                  activePage={this.props.currentPage}
                  onPageClick={this.goToPage}
                />
            </KuiFlexGroup>
           <KuiHorizontalRule />
          </div>
        )
      } else {
        return <div>
          <KuiHorizontalRule/>
        </div>
      }

    }
}

ResultPagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

module.exports = ResultPagination;
