import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import styles from './MovieIndexFooter.css';

class MovieIndexFooter extends PureComponent {

  render() {
    const {
      movies
    } = this.props;

    const count = movies.length;
    let movieFiles = 0;
    let monitored = 0;
    let totalFileSize = 0;
    let netflix = 0;
    let primeVideo = 0;
    let tubiTV = 0;
    let hoopla = 0;

    movies.forEach((s) => {

      if (s.hasFile) {
        movieFiles += 1;
      }

      // if (s.status === 'ended') {
      //   ended++;
      // } else {
      //   continuing++;
      // }

      if (s.monitored) {
        monitored++;
      }

      if (s.netflixUrl) {
        netflix++;
      }
      if (s.primeVideoUrl) {
        primeVideo++;
      }
      if (s.tubiTVUrl) {
        tubiTV++;
      }
      if (s.hooplaUrl) {
        hoopla++;
      }

      totalFileSize += s.sizeOnDisk;
    });

    return (
      <div className={styles.footer}>
        <div>
          <div className={styles.legendItem}>
            <div className={styles.ended} />
            <div>Downloaded and Monitored</div>
          </div>

          <div className={styles.legendItem}>
            <div className={styles.availNotMonitored} />
            <div>Downloaded, but not Monitored</div>
          </div>

          <div className={styles.legendItem}>
            <div className={styles.missingMonitored} />
            <div>Missing, Monitored and considered Available</div>
          </div>

          <div className={styles.legendItem}>
            <div className={styles.missingUnmonitored} />
            <div>Missing, not Monitored</div>
          </div>

          <div className={styles.legendItem}>
            <div className={styles.continuing} />
            <div>Unreleased</div>
          </div>
        </div>

        <div className={styles.statistics}>
          <DescriptionList>
            <DescriptionListItem
              title="Movies"
              data={count}
            />

            <DescriptionListItem
              title="Movie Files"
              data={movieFiles}
            />
          </DescriptionList>

          <DescriptionList>
            <DescriptionListItem
              title="Monitored"
              data={monitored}
            />

            <DescriptionListItem
              title="Unmonitored"
              data={count - monitored}
            />
          </DescriptionList>

          <DescriptionList>
            <DescriptionListItem
              title="Total File Size"
              data={formatBytes(totalFileSize)}
            />
          </DescriptionList>

          <DescriptionList>
		        <DescriptionListItem
			        title="Netflix"
			        data={netflix}
			      />

			      <DescriptionListItem
			        title="PrimeVideo"
			        data={primeVideo}
			      />
			      
            <DescriptionListItem
			        title="TubiTV"
			        data={tubiTV}
	          />
			  
            <DescriptionListItem
			        title="Hoopla"
			        data={hoopla}
			      />
			    </DescriptionList>
        </div>
      </div>
    );
  }
}

MovieIndexFooter.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MovieIndexFooter;
