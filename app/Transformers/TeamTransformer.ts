/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Team from 'App/Models/Team'
import MemberTransformer from './MemberTransformer'
import { MemberTransformed } from './MemberTransformer'

interface TeamTransformed {
  id: number;
  name: string;
  order: number;
  academy: boolean;
  numberOfPlayers: number;
  category_id: number;
  players?: MemberTransformed[]
}

class TeamTransformer {
  public transform (team: Team, includePlayers = false) {
    const transformed: TeamTransformed = {
      id: team.id,
      name: team.name,
      order: team.order,
      academy: team.academy,
      numberOfPlayers: team.members.length,
      category_id: team.categoryId,
    }

    if (includePlayers) {
      transformed.players = team.members.map(member => MemberTransformer.transform(member))
    }

    return transformed
  }

  public transformCollection (teams: Team[]) {
    return teams.map(team => this.transform(team))
  }
}

export default new TeamTransformer()
