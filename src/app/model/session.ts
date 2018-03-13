import {Theme} from './theme';

export class Session {
  constructor(public id: number,
              public name: string,
              public themeId: number,
              public maxCards: number,
              public totalRounds: number,
              public categoryId: number,
              public timeForMove: number,
              public participants: string[],
              public particpantsOrganiser: string[],
              public participantIds: number[],
              public organiserIds: number[],
              public type: number,
              public sessionCardIds: number[],
              public state: number,
              public userSubmitted: boolean,
              public startDate: Date) {
  }
}
