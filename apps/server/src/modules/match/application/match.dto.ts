import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class MatchCreateDto {
  @IsString()
  @IsOptional()
  result?: string

  @IsString()
  @IsOptional()
  tournamentId?: string

  @IsString()
  @IsOptional()
  team1Id?: string

  @IsString()
  @IsOptional()
  team2Id?: string

  @IsString()
  @IsOptional()
  challengeId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class MatchUpdateDto {
  @IsString()
  @IsOptional()
  result?: string

  @IsString()
  @IsOptional()
  tournamentId?: string

  @IsString()
  @IsOptional()
  team1Id?: string

  @IsString()
  @IsOptional()
  team2Id?: string

  @IsString()
  @IsOptional()
  challengeId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
