import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import ReactPlayer from 'react-player'
import {parseSVG, makeAbsolute} from 'svg-path-parser';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Icon, Container } from 'semantic-ui-react';
import objectFitImages from 'object-fit-images'; // objectFit does not work on IE and Edge http://caniuse.com/#search=object-fit
import { getImageUrl, deleteMedia } from '../../../api';

class Gallery extends Component<any, any> {
  imageGallery: any;
  player: any;

  constructor(props) {
    super(props);
    this.state = {
      mediaIndex: 0,
      hoverTrash: false,
      hoverEdit: false,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: false,
      showVideo: {},
      isFullscreen: false,
      pushUrl: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mediaIndex: 0,
      hoverTrash: false,
      hoverEdit: false,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: false,
      showVideo: {},
      isFullscreen: false,
      pushUrl: null,
    });
    if (this.imageGallery) {
      this.imageGallery.slideToIndex(0);
    }
  }

  toggleHoverTrash() {
    this.setState({hoverTrash: !this.state.hoverTrash});
  }

  toggleHoverEdit() {
    this.setState({hoverEdit: !this.state.hoverEdit});
  }

  onDeleteImage(event) {
    if (confirm('Are you sure you want to delete this image?')) {
      const idMedia = this.props.media[this.state.mediaIndex].id;
      deleteMedia(this.props.auth.getAccessToken(), idMedia)
      .then((response) => {
        if (this.props.media.length>1 && this.state.mediaIndex>=this.props.media.length-1) {
          const nextMediaIndex = this.state.mediaIndex-1;
          this.setState({mediaIndex: nextMediaIndex});
          this.imageGallery.slideToIndex(nextMediaIndex);
        }
        this.props.removeMedia(idMedia);
      })
      .catch ((error) => {
        console.warn(error);
      });
    }
  }

  onSlide(index) {
    this.resetVideo();
    this.setState({mediaIndex: index});
  }

  onScreenChange(fullscreenElement) {
    this.setState({isFullscreen: fullscreenElement});
  }

  resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  toggleShowVideo(url) {
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  renderVideo(item) {
    return (
      <div className='image-gallery-image'>
        {
          this.state.showVideo[item.embedUrl] ?
            <span>
              <a className='gallery-close-video' onClick={this.toggleShowVideo.bind(this, item.embedUrl)}></a>
              <ReactPlayer
                ref={player => { this.player = player }}
                className='react-player'
                width='100%'
                height='100%'
                url={item.embedUrl}
                onDuration={duration => this.setState({ duration })}
                onStart={() => this.player.seekTo(parseFloat(item.seekTo)/this.state.duration.toFixed(1))}
                controls={true}
                playing={true} />
            </span>
          :
            <a onClick={this.toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='gallery-play-button'></div>
              <img src={item.original} alt={this.props.alt}/>
            </a>
        }
      </div>
    );
  }

  pushUrl(url) {
    this.setState({pushUrl: url});
  }

  generateShapes(svgs, svgProblemId, w, h) {
    return svgs.map((svg, key) => {
      const path: any = parseSVG(svg.path);
      makeAbsolute(path); // Note: mutates the commands in place!
      var ixNr;
      var maxY = 0;
      var ixAnchor;
      var minY = 99999999;
      for (var i=0, len=path.length; i < len; i++) {
        if (path[i].y > maxY) {
          ixNr = i;
          maxY = path[i].y;
        }
        if (path[i].y < minY) {
          ixAnchor = i;
          minY = path[i].y;
        }
      }
      var x = path[ixNr].x;
      var y = path[ixNr].y;
      const r = 0.012*w;
      if (x < r) x = r;
      if (x > (w-r)) x = w-r;
      if (y < r) y = r;
      if (y > (h-r)) y = h-r;
      var anchor = null;
      if (svg.hasAnchor) {
        anchor = <circle className="buldreinfo-svg-ring" cx={path[ixAnchor].x} cy={path[ixAnchor].y} r={0.006*w}/>
      }
      return (
        <g className={"buldreinfo-svg-pointer buldreinfo-svg-hover" + ((svgProblemId===0 || svg.problemId===svgProblemId)? "" : " buldreinfo-svg-opacity")} key={key} onClick={this.pushUrl.bind(this, "/problem/" + svg.problemId)}>
          <path d={svg.path} className="buldreinfo-svg-route" strokeWidth={0.003*w} strokeDasharray={0.006*w}/>
          <circle className="buldreinfo-svg-ring" cx={x} cy={y} r={r}/>
          <text className="buldreinfo-svg-routenr" x={x} y={y} fontSize={0.02*w} dy=".3em">{svg.nr}</text>
          {anchor}
        </g>
      );
    });
  }

  renderImage(m) {
    if (m.svgs) {
      return (
        <div className='image-gallery-image'>
          <canvas className="buldreinfo-svg-canvas-ie-hack" width={m.width} height={m.height}></canvas>
          <svg className="buldreinfo-svg" viewBox={"0 0 " + m.width + " " + m.height} preserveAspectRatio="xMidYMid meet">
            <image xlinkHref={getImageUrl(m.id, null)} width="100%" height="100%"/>
            {this.generateShapes(m.svgs, m.svgProblemId, m.width, m.height)}
          </svg>
        </div>
      );
    }
    const style = !this.state.isFullscreen && {height: this.props.height};
    return (
      <div className='image-gallery-image'>
        <img style={style} src={getImageUrl(m.id, null)} className="buldreinfo-scale-img" alt={this.props.alt}/>
      </div>
    );
  }

  render() {
    objectFitImages(null, {watchMQ: true});
    if (this.state && this.state.pushUrl) {
      return (<Redirect to={this.state.pushUrl} push />);
    }
    const caruselItems = this.props.media.map((m, i) => {
      if (m.idType==1) {
        return {
          original: getImageUrl(m.id, null),
          thumbnail: getImageUrl(m.id, null),
          originalClass: 'featured-slide',
          thumbnailClass: 'featured-thumb',
          originalAlt: 'original-alt',
          thumbnailAlt: 'thumbnail-alt',
          renderItem: this.renderImage.bind(this, m)
        }
      }
      else {
        return {
          original: getImageUrl(m.id, null),
          thumbnail: getImageUrl(m.id, null),
          originalClass: 'featured-slide',
          thumbnailClass: 'featured-thumb',
          originalAlt: 'original-alt',
          thumbnailAlt: 'thumbnail-alt',
          embedUrl: 'https://buldreinfo.com/buldreinfo_media/mp4/' + (Math.floor(m.id/100)*100) + "/" + m.id + '.mp4',
          seekTo: m.t,
          renderItem: this.renderVideo.bind(this)
        }
      }
    });

    var button = null;
    const m = this.props.media[this.state.mediaIndex];
    if (!this.state.isFullscreen && m.idType==1 && this.props.isAdmin) {
      if (m.svgProblemId>0) {
        button = <span style={{position: 'absolute', zIndex: 4, background: 'rgba(0, 0, 0, 0.4)', padding: '8px 20px'}}><Link to={`/problem/svg-edit/${m.svgProblemId}-${m.id}`} onMouseEnter={this.toggleHoverEdit.bind(this)} onMouseLeave={this.toggleHoverEdit.bind(this)}><Icon name="edit" style={this.state.hoverEdit? {transform: 'scale(1.1)', color: '#fff'} : {color: '#fff'}}/></Link></span>;
      } else if (!m.svgs) {
        button = <span style={{position: 'absolute', zIndex: 4, background: 'rgba(0, 0, 0, 0.4)', padding: '8px 20px'}}><a href="#" onMouseEnter={this.toggleHoverTrash.bind(this)} onMouseLeave={this.toggleHoverTrash.bind(this)} onClick={this.onDeleteImage.bind(this)}><Icon name="trash" style={this.state.hoverTrash? {transform: 'scale(1.1)', color: '#fff'} : {color: '#fff'}}/></a></span>;
      }
    }

    return (
      <Container>
        {button}
        <ImageGallery
          ref={i => this.imageGallery = i}
          items={caruselItems}
          onSlide={this.onSlide.bind(this)}
          onScreenChange={this.onScreenChange.bind(this)}
          showThumbnails={this.props.showThumbnails}
          showBullets={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton && this.props.media.length>1}
          showIndex={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={false}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}/>
      </Container>
    );
  }
}

export default Gallery;
