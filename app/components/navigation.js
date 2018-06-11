import React, {Component} from 'react';
import { Navbar, Nav, NavItem, FormGroup, FormControl, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Request from 'superagent';
import auth from '../utils/auth.js';
import config from '../utils/config.js';
import { Async } from 'react-select';
import 'react-select/dist/react-select.css';
import { Redirect } from 'react-router';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faLock, faUserSecret } from '@fortawesome/fontawesome-free-solid';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: '/png/buldreinfo_logo_gray.png',
      loggedIn: auth.loggedIn()
    };
  }

  updateAuth(loggedIn) {
    this.setState({loggedIn: !!loggedIn});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pushUrl: null});
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this);
    auth.login();
  }

  optionRenderer(props) {
    return <span>{props.label} {props.value.visibility===1 && <FontAwesomeIcon icon="lock" />}{props.value.visibility===2 && <FontAwesomeIcon icon="user-secret" />} {props.value.avatar=="A" && " (area)"} {props.value.avatar=="S" && " (sector)"}</span>
  }

  componentDidMount() {
    Request.get(config.getUrl("grades?regionId=" + config.getRegion())).end((err, res) => {
      this.setState({
        error: err? err : null,
        grades: err? null : res.body
      });
    });
  }

  hoverImage(hover) {
    const logo = hover? '/png/buldreinfo_logo_white.png' : '/png/buldreinfo_logo_gray.png';
    this.setState({logo: logo});
  }

  search(input, callback) {
    if (input) {
      Request.post(config.getUrl("search"))
        .withCredentials()
        .send({regionId: config.getRegion(), value: input})
        .set('Accept', 'application/json')
        .end((err, res) => {
          callback(err, {options: res.body && res.body.map(s => {return {value: s, label: s.value}})});
        }
      );
    } else {
      callback(null, {options: null});
    }
  }

  onChange(props) {
    this.setState({pushUrl: props.value.url});
  }

  render() {
    if (this.state && this.state.pushUrl) {
      return (<Redirect to={this.state.pushUrl} push />);
    }
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a href="/" onMouseOver={this.hoverImage.bind(this, true)} onMouseOut={this.hoverImage.bind(this, false)}><img src={this.state.logo}/></a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/browse">
              <NavItem eventKey={1}>Browse</NavItem>
            </LinkContainer>
            <NavDropdown eventKey={2} title="Finder" id='basic-nav-dropdown'>
              {auth.isSuperAdmin() && <LinkContainer to="/finder/-1"><MenuItem eventKey={2.0}>Grade: <strong>superadmin</strong></MenuItem></LinkContainer>}
              {this.state && this.state.grades && this.state.grades.map((g, i) => { return <LinkContainer key={"2." + i} to={"/finder/" + g.id}><MenuItem eventKey={"3." + i}>Grade: <strong>{g.grade}</strong></MenuItem></LinkContainer> })}
            </NavDropdown>
          </Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <Async
                style={{width: '200px'}}
                placeholder="Search"
                loadOptions={this.search.bind(this)}
                filterOptions={(options, filter, currentValues) => {
                  // Do no filtering, just return all options
                  return options;
                }}
                ignoreAccents={false} // Keep special characters ae, oe, aa. Don't substitute...
                onChange={this.onChange.bind(this)}
                optionRenderer={this.optionRenderer.bind(this)}
              />
            </FormGroup>
          </Navbar.Form>

          <Nav pullRight>
            {this.state.loggedIn?
              <NavDropdown eventKey={4} title="Logged in" id='basic-nav-dropdown'>
                <LinkContainer to="/user"><MenuItem eventKey={4.1}>My profile</MenuItem></LinkContainer>
                <MenuItem divider />
                <LinkContainer to="/logout"><MenuItem eventKey={4.2}>Log out</MenuItem></LinkContainer>
              </NavDropdown>
              :
              <LinkContainer to="/login"><NavItem eventKey={5}>Sign in</NavItem></LinkContainer>
            }
            <NavDropdown eventKey={6} title="More" id='basic-nav-dropdown'>
              <LinkContainer to="/ethics">
                <NavItem eventKey={6.0}>Ethics</NavItem>
              </LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey={6.1} href="mailto:jostein.oygarden@gmail.com">Contact</MenuItem>
              <MenuItem eventKey={6.2} href="/gpl-3.0.txt" target="_blank">GNU Public License</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={6.3} href="https://buldreinfo.com" target="_blank">buldreinfo.com</MenuItem>
              <MenuItem eventKey={6.4} href="https://buldring.bergen-klatreklubb.no" target="_blank">buldring.bergen-klatreklubb.no</MenuItem>
              <MenuItem eventKey={6.5} href="https://buldring.fredrikstadklatreklubb.org" target="_blank">buldring.fredrikstadklatreklubb.org</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={6.6} href="https://brattelinjer.no" target="_blank">brattelinjer.no</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
