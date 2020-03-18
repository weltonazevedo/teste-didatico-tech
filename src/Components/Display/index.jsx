import React, { Component } from 'react'
import { ListGroup, Button, Container, Row, Col } from 'react-bootstrap'
import './style.css'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { changeSearchBarValue } from '../../Actions/SearchBarAction'

class Display extends Component {

  state = {
    data: [],
    sroffset: 0
  }

  url = "https://en.wikipedia.org/w/api.php"

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      this.moreSearch(this.props.searchbar.searchtext)
    }
  }

  search = (srsearch, sroffset = 0) => {
    var url = this.url;
    var params = {
      action: "query",
      list: "search",
      srsearch,
      format: "json",
      sroffset
    };
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    return url
  }

  newSearch = () => {
    const { searchtext } = this.props.searchbar
    if (searchtext === '') {
      return false
    }

    const url = this.search(searchtext, 0)
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(response => {
      var data = response.query.search || null
      this.setState({ data, sroffset: 10 })
    })
    .catch(error => {
      console.error(error)
    })
  }


  moreSearch = () => {
    const { sroffset } = this.state
    const { searchtext } = this.props.searchbar
    const url = this.search(searchtext , sroffset)
    fetch(url)
    .then(response => {
      return response.json();
    })
    .then(response => {
      var sroffset = this.state.data.length+10
      var data = [...this.state.data, ...response.query.search]
      this.setState({ data, sroffset })
    })
    .catch(error => {
      console.error(error)
    })
  }


  render() {
    const { data } = this.state
    const { searchtext } = this.props.searchbar

    return (
      <Container>
        <Row className="mb-3">
          <Col>
            <Button onClick={e => this.newSearch(searchtext)}>Procurar</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup id="listgroup" className onScroll={this.handleScroll}>
              {data ? data.map( (el, id) =>
                <ListGroup.Item key={id}>
                  <b id={id+'title'}>{el.title}</b>
                  <p id={id+'snippet'} dangerouslySetInnerHTML={{ __html: el.snippet }} />
                </ListGroup.Item>) : ""
              }
            </ListGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(Display)
