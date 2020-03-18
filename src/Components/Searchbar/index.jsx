import React, { Component } from 'react'
import { Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { changeSearchBarValue } from '../../Actions/SearchBarAction'

class SearchBar extends Component {

  render = () => {
    const { searchtext } = this.props.searchbar
    return (
      <Container>
        <Row className="mt-3" >
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Procurar"
                aria-label="Procurar"
                aria-describedby="search"
                id="search-bar"
                type="text"
                onChange={e => this.props.changeSearchBarValue(e.target.value)}
                value={searchtext}
                required
              />
              <InputGroup.Append>
                <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  searchbar: state.searchbar
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSearchBarValue }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)