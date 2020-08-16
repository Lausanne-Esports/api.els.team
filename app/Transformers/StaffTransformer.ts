import MemberTransformer from './MemberTransformer'
import { MemberTransformed } from './MemberTransformer'
import Staff from 'App/Models/Staff'

interface StaffTransformed {
  id: number;
  name: string;
  order: number;
  numberOfPlayers: number;
  players?: MemberTransformed[]
}

class StaffTransformer {
  public transform (staff: Staff, includePlayers = false) {
    const transformed: StaffTransformed = {
      id: staff.id,
      name: staff.name,
      order: staff.order,
      numberOfPlayers: staff.members.length,
    }

    if (includePlayers) {
      transformed.players = staff.members.map(member => MemberTransformer.transform(member))
    }

    return transformed
  }

  public transformCollection (staff: Staff[]) {
    return staff.map(s => this.transform(s))
  }
}

export default new StaffTransformer()
