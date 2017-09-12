import * as _ from 'lodash';
import React from 'react';
import cx from 'classnames';
import styles from './RaidProgression.scss';
import BossCard from './BossCard/BossCard';
import HeroicCard from './HeroicCard/HeroicCard';
import MythicCard from './MythicCard/MythicCard';
import Progress from './Progress/Progress';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaCaretDown from 'react-icons/lib/fa/caret-down';

// import BossKills from './BossKills/BossKills';


class RaidProgression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
      showHeroic: false,
      showMythic: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitHeroic = this.handleSubmitHeroic.bind(this);
    this.handleSubmitMythic = this.handleSubmitMythic.bind(this);
  };


  handleSubmit(){
    this.setState({showMe: !this.state.showMe});
  }

  handleSubmitHeroic(){
    this.setState({showHeroic: !this.state.showHeroic});
  }

  handleSubmitMythic(){
    this.setState({showMythic: !this.state.showMythic});
  }

  // {_.map(bossKills, (kills) =>
  //   <BossCard
  //     key={kills.id}
  //     kills={kills}
  //   />

  render() {
    const { profile } = this.props;
    const bossKills = _.last(profile.progression.raids).bosses;
    let normal = 0;
    let heroic = 0;
    let mythic = 0;

    _.forEach(bossKills, (key) => {
      if (key.normalKills > 0) {
        normal++;
      }
      if (key.heroicKills > 0) {
        heroic++;
      }
      if (key.mythicKills > 0) {
        mythic++;
      }
    });

    return (
      <div className={styles.raid}>
        <div className={styles.content}>
          <div className={styles.detail}>
            <table className={styles.tableDetails}>
              <thead>
                <tr>
                  <th className={styles.tableHead}>{_.last(profile.progression.raids).name}</th>
                  <th className={cx(styles.tableHead, styles.tableCenter)}>Progress</th>
                  <th className={cx(styles.tableHead, styles.tableCenter)}>Boss Kills</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span onClick={this.handleSubmit}>
                      Normal
                      { this.state.showMe ? <FaCaretDown /> : <FaCaretRight /> }
                    </span>
                  </td>
                  <td className={styles.tableCenter}>
                    <span className={styles.prog}>{normal}/9 N</span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
              { this.state.showMe &&
                <tbody>
                  {_.map(bossKills, (kills) =>
                    <BossCard
                      key={kills.id}
                      kills={kills}
                    />
                  )}
                </tbody>
              }
              <tbody>
                <tr>
                  <td>
                    <span onClick={this.handleSubmitHeroic}>
                      Heroic
                      { this.state.showHeroic ? <FaCaretDown /> : <FaCaretRight /> }
                    </span>
                  </td>
                  <td className={styles.tableCenter}>
                    <span className={styles.prog}>{heroic}/9 H</span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
              { this.state.showHeroic &&
                <tbody>
                  {_.map(bossKills, (kills) =>
                    <HeroicCard
                      key={kills.id}
                      kills={kills}
                    />
                  )}
                </tbody>
              }
              <tbody>
                <tr>
                  <td>
                    <span onClick={this.handleSubmitMythic}>
                      Mythic
                      { this.state.showMythic ? <FaCaretDown /> : <FaCaretRight /> }
                    </span>
                  </td>
                  <td className={styles.tableCenter}>
                    <span className={styles.prog}>{mythic}/9 M</span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
              { this.state.showMythic &&
                <tbody>
                  {_.map(bossKills, (kills) =>
                    <MythicCard
                      key={kills.id}
                      kills={kills}
                    />
                  )}
                </tbody>
              }
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default RaidProgression;
