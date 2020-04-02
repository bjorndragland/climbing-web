import React, { useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { Label, Grid, Statistic, Icon, Image, Card, Feed, Segment, Placeholder, Button, Checkbox, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../utils/react-auth0-spa';
import { getActivity, getFrontpage, getImageUrl, numberWithCommas } from '../api';
import { LockSymbol, Stars } from './common/widgets/widgets';

const Frontpage = () => {
  const { loading, accessToken } = useAuth0();
  const [frontpage, setFrontpage] = useState(null);
  const [activity, setActivity] = useState(null);
  const [minGrade, setMinGrade] = useState(0);
  const [minGradeText, setMinGradeText] = useState(null);
  const [excludeTicks, setExcludeTicks] = useState(false);

  useEffect(() => {
    if (!loading) {
      getFrontpage(accessToken).then((res) => {
        setFrontpage(res);
      });
    }
  }, [loading, accessToken]);
  useEffect(() => {
    if (!loading) {
      getActivity(accessToken, minGrade, excludeTicks).then((res) => {
        setActivity(res);
      });
    }
  }, [loading, accessToken, minGrade, excludeTicks]);

  const filter = frontpage && (
    <div style={{float: 'right'}}>
      <Button.Group size="mini" compact>
        <Dropdown
          text={minGradeText? "Lower grade: " + minGradeText : "Lower grade"}
          icon="filter"
          floating
          labeled
          button
          className='icon'>
          <Dropdown.Menu>
            <Dropdown.Menu scrolling>
              {frontpage.metadata.grades.map((a, i) => (
                <Dropdown.Item key={i} text={a.grade} onClick={() => {
                  setActivity(null);
                  setMinGrade(a.id);
                  setMinGradeText(a.grade);
                }}/>
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </Button.Group>
      <Button size="mini" compact icon labelPosition="left" onClick={() => {
        setActivity(null);
        setExcludeTicks(!excludeTicks);
      }}>
        <Icon name={excludeTicks? "check square outline" : "square outline"}/>
        Exclude ticks
      </Button>
    </div>
  );

  return (
    <>
      {frontpage &&
        <MetaTags>
          <title>{frontpage.metadata.title}</title>
          <meta name="description" content={frontpage.metadata.description} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={frontpage.metadata.description} />
          <meta property="og:url" content={frontpage.metadata.og.url} />
          <meta property="og:title" content={frontpage.metadata.title} />
          <meta property="og:image" content={frontpage.metadata.og.image} />
          <meta property="og:image:width" content={frontpage.metadata.og.imageWidth} />
          <meta property="og:image:height" content={frontpage.metadata.og.imageHeight} />
          <meta property="fb:app_id" content={frontpage.metadata.og.fbAppId} />
        </MetaTags>
      }
      <Grid>
        <Grid.Row>
          {frontpage?
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <Statistic.Group size="mini" horizontal as={Segment}>
                <Statistic as={Link} to="/browse" color="blue">
                  <Statistic.Value><Icon name='list' /> {numberWithCommas(frontpage.numProblems)}</Statistic.Value>
                  <Statistic.Label>{frontpage.metadata.isBouldering? "Problems" : "Routes"}</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value><Icon name='map marker' /> {numberWithCommas(frontpage.numProblemsWithCoordinates)}</Statistic.Value>
                  <Statistic.Label>With coordinates</Statistic.Label>
                </Statistic>
                {!frontpage.metadata.isBouldering &&
                  <Statistic>
                    <Statistic.Value><Icon name='image outline' /> {numberWithCommas(frontpage.numProblemsWithTopo)}</Statistic.Value>
                    <Statistic.Label>With topo</Statistic.Label>
                  </Statistic>
                }
                <Statistic as={Link} to="/ticks/1" color="blue">
                  <Statistic.Value><Icon name='check' /> {numberWithCommas(frontpage.numTicks)}</Statistic.Value>
                  <Statistic.Label>Public ascents</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value><Icon name='image' /> {numberWithCommas(frontpage.numImages)}</Statistic.Value>
                  <Statistic.Label>Images</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value><Icon name='film' /> {numberWithCommas(frontpage.numMovies)}</Statistic.Value>
                  <Statistic.Label>Ascents on video</Statistic.Label>
                </Statistic>
              </Statistic.Group>
              {frontpage.randomMedia &&
                <>
                  <Card>
                    <Link to={`/problem/${frontpage.randomMedia.idProblem}`}>
                      <Image size="medium" style={{maxHeight: '250px', objectFit: 'cover'}} src={getImageUrl(frontpage.randomMedia.idMedia, 275)} />
                    </Link>
                    <Card.Content>
                      <Card.Header as={Link} to={`/problem/${frontpage.randomMedia.idProblem}`}>
                        {frontpage.randomMedia.problem} {frontpage.randomMedia.grade}
                      </Card.Header>
                      <Card.Description>
                        <Link to={`/area/${frontpage.randomMedia.idArea}`}>{frontpage.randomMedia.area}</Link> / <Link to={`/sector/${frontpage.randomMedia.idSector}`}>{frontpage.randomMedia.sector}</Link>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Label.Group size="mini">
                        {frontpage.randomMedia.tagged && frontpage.randomMedia.tagged.map((x, i) => (<Label basic key={i} as={Link} to={`/user/${x.id}`}><Icon name="user"/>{x.name}</Label>))}
                        {frontpage.randomMedia.photographer && <Label basic as={Link} to={`/user/${frontpage.randomMedia.photographer.id}`}><Icon name="photo"/>{frontpage.randomMedia.photographer.name}</Label>}
                      </Label.Group>
                    </Card.Content>
                  </Card><br/>
                </>
              }
            </Grid.Column>
          :
            <Grid.Column mobile={16} tablet={8} computer={4} style={{marginBottom: '10px'}}>
              <Segment>
                <Placeholder>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                </Placeholder>
              </Segment>
              <Card>
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Card.Content>
              </Card>
            </Grid.Column>
          }
          {activity?
            <Grid.Column mobile={16} tablet={8} computer={12}>
              <Feed as={Segment}>
                {activity.map((a, i) => {
                  // FA
                  if (a.users) {
                    const typeDescription = frontpage && frontpage.metadata.isBouldering? "problem" : "route";
                    return (
                      <Feed.Event key={i}>
                        <Feed.Label>
                          {a.problemRandomMediaId>0 && <img style={{height: '35px', objectFit: 'cover'}} src={getImageUrl(a.problemRandomMediaId, 35)} />}
                        </Feed.Label>
                        <Feed.Content>
                          <Feed.Summary>
                            New {typeDescription} <Feed.User as={Link} to={`/problem/${a.problemId}`}>{a.problemName}</Feed.User> {a.grade}<LockSymbol visibility={a.problemVisibility}/><Feed.Date>{a.timeAgo}</Feed.Date>
                          </Feed.Summary>
                          <Feed.Extra text>
                            {a.description}
                          </Feed.Extra>
                          {a.media &&
                            <>
                              <Feed.Extra images as={Link} to={`/problem/${a.problemId}`}>
                                {a.media.map((m, i) => (<img key={i} src={getImageUrl(m.id, 115)}/>))}
                              </Feed.Extra>
                              <br/>
                            </>
                          }
                          {a.users &&
                            <Feed.Meta>
                              {a.users.map((u, i) => (
                                <Label basic key={i} as={Link} to={`/user/${u.id}`} image>
                                  {u.picture?  <img src={u.picture} /> : <Icon name="user"/>} {u.name}
                                </Label>
                              ))}
                            </Feed.Meta>
                          }
                        </Feed.Content>
                        {i === 0 && filter}
                      </Feed.Event>
                    )
                  }
                  // Media
                  else if (a.media) {
                    const numImg = a.media.filter(m => !m.isMovie).length;
                    const img = (numImg>0 && <>{numImg} new <Icon name="photo"/></>);
                    const numMov = a.media.filter(m => m.isMovie).length;
                    const mov = (numMov>0 && <>{numMov} new <Icon name="film"/></>);
                    var summary;
                    if (img && mov) {
                      summary = <>{img}and {mov}</>;
                    } else if (mov) {
                      summary = mov;
                    } else {
                      summary = img;
                    }
                    return (
                      <Feed.Event key={i}>
                        <Feed.Label>
                          {a.problemRandomMediaId>0 && <img style={{height: '35px', objectFit: 'cover'}} src={getImageUrl(a.problemRandomMediaId, 35)} />}
                        </Feed.Label>
                        <Feed.Content>
                          <Feed.Summary style={{marginBottom: '3px'}}>
                            {summary}on <Feed.User as={Link} to={`/problem/${a.problemId}`}>{a.problemName}</Feed.User> {a.grade}<LockSymbol visibility={a.problemVisibility}/><Feed.Date>{a.timeAgo}</Feed.Date>
                          </Feed.Summary>
                          <Feed.Extra images as={Link} to={`/problem/${a.problemId}`}>
                            {a.media.map((m, i) => (<img key={i} src={getImageUrl(m.id, 115)}/>))}
                          </Feed.Extra>
                        </Feed.Content>
                        {i === 0 && filter}
                      </Feed.Event>
                    )
                  }
                  // Guestbook
                  else if (a.message) {
                    return (
                      <Feed.Event key={i}>
                        <Feed.Label>
                          {a.picture && <img src={a.picture} />}
                        </Feed.Label>
                        <Feed.Content>
                          <Feed.Summary>
                            <Feed.User as={Link} to={`/user/${a.id}`} style={{color: "black"}}>{a.name}</Feed.User> posted a comment on <Feed.User as={Link} to={`/problem/${a.problemId}`}>{a.problemName}</Feed.User> {a.grade}<LockSymbol visibility={a.problemVisibility}/><Feed.Date>{a.timeAgo}</Feed.Date>
                          </Feed.Summary>
                          <Feed.Extra text>
                            {a.message}
                          </Feed.Extra>
                        </Feed.Content>
                        {i === 0 && filter}
                      </Feed.Event>
                    )
                  }
                  // Tick
                  else {
                    return (
                      <Feed.Event key={i}>
                        <Feed.Label>
                          {a.picture && <img src={a.picture} />}
                        </Feed.Label>
                        <Feed.Content>
                          <Feed.Summary>
                            <Feed.User as={Link} to={`/user/${a.id}`} style={{color: "black"}}>{a.name}</Feed.User> ticked <Feed.User as={Link} to={`/problem/${a.problemId}`}>{a.problemName}</Feed.User> {a.grade}<LockSymbol visibility={a.problemVisibility}/><Feed.Date>{a.timeAgo}</Feed.Date>
                          </Feed.Summary>
                          {a.description && <Feed.Extra text>{a.description}</Feed.Extra>}
                          {a.stars>0 && <Feed.Meta><Stars numStars={a.stars} /></Feed.Meta>}
                        </Feed.Content>
                        {i === 0 && filter}
                      </Feed.Event>
                    )
                  }
                })}
              </Feed>
            </Grid.Column>
          :
            <Grid.Column mobile={16} tablet={8} computer={12}>
              <Segment>
                <Placeholder fluid>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                  <Placeholder.Header image><Placeholder.Line/></Placeholder.Header>
                </Placeholder>
              </Segment>
            </Grid.Column>
          }
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Frontpage;
