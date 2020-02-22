import React, { useEffect, Fragment, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Card,
  CardBody,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap"
import { useSelector } from 'react-redux'

import "./Input.css"

export default function Autocomplete({ suggestions, handleSearch }) {
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [searchText, setSearchText] = useState("")
  const [currentSearchText, setCurrentSearchText] = useState("")

  // Redux
  const searchTextReducer = useSelector(state => state.productReducer.searchText)

  useEffect(() => {
    setSearchText(searchTextReducer)
    setCurrentSearchText(searchTextReducer)
  }, [searchTextReducer])

  // Event fired when the input value is changed
  function onChange(e) {
    const searchText = e.target.value

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(suggestion => {
      return suggestion.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    })

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    setActiveSuggestion(-1)
    setFilteredSuggestions(filteredSuggestions.slice(0, 6))
    setSearchText(e.target.value)
    setCurrentSearchText(e.target.value)
  }

  // Event fired when the user presses a key down
  function onKeyDown(e) {
    // User pressed the enter key, update the input and close the suggestions
    if (e.keyCode === 13 && filteredSuggestions.length === 0) {
      handleSearch(currentSearchText)
    }
    else if (e.keyCode === 13) {
      handleSearch(filteredSuggestions[activeSuggestion])
    }

    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0 || activeSuggestion === -1) {
        setActiveSuggestion(-1)
        setCurrentSearchText(searchText)
      } else {
        setActiveSuggestion(activeSuggestion - 1)
        setCurrentSearchText(filteredSuggestions[activeSuggestion - 1])
      }
    }

    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion === filteredSuggestions.length - 1) {
        setActiveSuggestion(-1)
        setCurrentSearchText(searchText)
      } else {
        setActiveSuggestion(activeSuggestion + 1)
        setCurrentSearchText(filteredSuggestions[activeSuggestion + 1])
      }
    }
  }

  function inputFocus() {
    setFilteredSuggestions(suggestions.slice(0, 6))
  }

  function onClick(suggestion, index) {
    setCurrentSearchText(suggestions)
    setActiveSuggestion(index)
    handleSearch(suggestion)
  }

  const renderSuggestions = () => {
    if (filteredSuggestions.length) {
      return (
        <div className="filter-menu">
          <Row>
            <Col xs="auto" sm="6">
              <Card>
                <CardBody className="text-left">
                  <ListGroup>
                    {filteredSuggestions.map((suggestion, index) => {
                      let active = false
                      if (index === activeSuggestion) {
                        active = true
                      }

                      return (
                        <ListGroupItem active={active} key={index} className="cursor-pointer"
                          onMouseEnter={() => setActiveSuggestion(index)}
                          onClick={() => onClick(suggestion, index)}>{suggestion}</ListGroupItem>
                      )
                    })}
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )
    }
  }

  return (
    <Fragment>
      <InputGroup className="input-group-search no-border form-control-lg">
        <Input type="text" placeholder="Encontre aqui os melhores produtos para você."
          value={currentSearchText}
          onChange={e => onChange(e)}
          onKeyDown={e => onKeyDown(e)}
          onFocus={e => inputFocus(e)}
          onBlur={() => setTimeout(() => setFilteredSuggestions([]), 100)} />
        <InputGroupAddon addonType="prepend" onClick={() => handleSearch(currentSearchText)}>
          <InputGroupText className="input-group-text">
            <i className="now-ui-icons ui-1_zoom-bold"></i>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      {renderSuggestions()}
    </Fragment>
  )

}