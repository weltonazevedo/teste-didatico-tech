import React, { Component } from 'react'
import Searchbar from '../Components/Searchbar'
import Display from '../Components/Display'
import logo from '../assets/images/enwiki.png'
import { Container } from 'react-bootstrap'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { changeSearchBarValue } from '../Actions/SearchBarAction'

class Main extends Component {
  render() {
    return (
      <Container fluid>
      <img src={logo} alt="Logo" />
        <Searchbar></Searchbar>
        <Display></Display>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  searchbar: state.searchbar
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeSearchBarValue }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)