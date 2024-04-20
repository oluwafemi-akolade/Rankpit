import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Profile as ProfileModel } from './profile/profile.model'

import { Game as GameModel } from './game/game.model'

import { Usergame as UsergameModel } from './usergame/usergame.model'

import { Team as TeamModel } from './team/team.model'

import { Teammember as TeammemberModel } from './teammember/teammember.model'

import { Message as MessageModel } from './message/message.model'

import { Article as ArticleModel } from './article/article.model'

import { Tournament as TournamentModel } from './tournament/tournament.model'

import { Challenge as ChallengeModel } from './challenge/challenge.model'

import { Match as MatchModel } from './match/match.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Profile extends ProfileModel {}

  export class Game extends GameModel {}

  export class Usergame extends UsergameModel {}

  export class Team extends TeamModel {}

  export class Teammember extends TeammemberModel {}

  export class Message extends MessageModel {}

  export class Article extends ArticleModel {}

  export class Tournament extends TournamentModel {}

  export class Challenge extends ChallengeModel {}

  export class Match extends MatchModel {}
}
