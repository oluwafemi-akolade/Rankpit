import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ProfileApi } from './profile/profile.api'

import { GameApi } from './game/game.api'

import { UsergameApi } from './usergame/usergame.api'

import { TeamApi } from './team/team.api'

import { TeammemberApi } from './teammember/teammember.api'

import { MessageApi } from './message/message.api'

import { ArticleApi } from './article/article.api'

import { TournamentApi } from './tournament/tournament.api'

import { ChallengeApi } from './challenge/challenge.api'

import { MatchApi } from './match/match.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Profile extends ProfileApi {}

  export class Game extends GameApi {}

  export class Usergame extends UsergameApi {}

  export class Team extends TeamApi {}

  export class Teammember extends TeammemberApi {}

  export class Message extends MessageApi {}

  export class Article extends ArticleApi {}

  export class Tournament extends TournamentApi {}

  export class Challenge extends ChallengeApi {}

  export class Match extends MatchApi {}
}
